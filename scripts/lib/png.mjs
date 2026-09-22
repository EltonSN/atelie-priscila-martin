/**
 * Leitura e escrita mínimas de PNG (8 bits por canal, sem entrelaçamento),
 * apenas com os módulos nativos do Node. Usado pelos scripts de preparação de
 * imagens — não faz parte do bundle da aplicação.
 */
import { inflateSync, deflateSync } from "node:zlib";

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const crcTable = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

export function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

export function decodePng(buf) {
  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (buf[i] !== PNG_SIGNATURE[i]) throw new Error("Ficheiro nao e um PNG valido.");
  }

  let offset = 8;
  let header = null;
  const idat = [];

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + length);

    if (type === "IHDR") {
      header = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
        interlace: data[12],
      };
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }

    offset += 12 + length;
  }

  if (!header) throw new Error("Chunk IHDR em falta.");
  if (header.bitDepth !== 8) throw new Error(`Profundidade ${header.bitDepth} nao suportada.`);
  if (header.interlace !== 0) throw new Error("PNG entrelacado nao suportado.");

  const channelsByColorType = { 0: 1, 2: 3, 4: 2, 6: 4 };
  const channels = channelsByColorType[header.colorType];
  if (!channels) throw new Error(`Color type ${header.colorType} nao suportado.`);

  const raw = inflateSync(Buffer.concat(idat));
  const { width, height } = header;
  const stride = width * channels;
  const pixels = Buffer.alloc(stride * height);

  let pos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = raw.subarray(pos, pos + stride);
    pos += stride;

    const out = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? out[x - channels] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= channels ? prev[x - channels] : 0;
      let value = line[x];

      switch (filter) {
        case 0: break;
        case 1: value += a; break;
        case 2: value += b; break;
        case 3: value += (a + b) >> 1; break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          value += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          break;
        }
        default: throw new Error(`Filtro ${filter} desconhecido.`);
      }

      out[x] = value & 0xff;
    }
  }

  return { width, height, channels, pixels };
}

export function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filtro "None"
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  const chunk = (type, data) => {
    const out = Buffer.alloc(data.length + 12);
    out.writeUInt32BE(data.length, 0);
    out.write(type, 4, "ascii");
    data.copy(out, 8);
    out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
    return out;
  };

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from(PNG_SIGNATURE),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** Redimensiona por média de área — suficiente para reduções de logótipo. */
export function resize(rgba, srcW, srcH, dstW, dstH) {
  const out = Buffer.alloc(dstW * dstH * 4);
  const scaleX = srcW / dstW;
  const scaleY = srcH / dstH;

  for (let y = 0; y < dstH; y++) {
    const y0 = Math.floor(y * scaleY);
    const y1 = Math.max(y0 + 1, Math.floor((y + 1) * scaleY));

    for (let x = 0; x < dstW; x++) {
      const x0 = Math.floor(x * scaleX);
      const x1 = Math.max(x0 + 1, Math.floor((x + 1) * scaleX));

      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      let n = 0;

      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const s = (sy * srcW + sx) * 4;
          // Média em espaço pré-multiplicado, para não sujar as bordas.
          const alpha = rgba[s + 3] / 255;
          r += rgba[s] * alpha;
          g += rgba[s + 1] * alpha;
          b += rgba[s + 2] * alpha;
          a += rgba[s + 3];
          n++;
        }
      }

      const p = (y * dstW + x) * 4;
      const meanAlpha = a / n;
      const unpremultiply = meanAlpha > 0 ? 255 / meanAlpha : 0;
      out[p] = Math.min(255, Math.round((r / n) * unpremultiply));
      out[p + 1] = Math.min(255, Math.round((g / n) * unpremultiply));
      out[p + 2] = Math.min(255, Math.round((b / n) * unpremultiply));
      out[p + 3] = Math.round(meanAlpha);
    }
  }

  return out;
}

/** Compõe sobre uma cor opaca, com margem proporcional. */
export function onBackground(rgba, width, height, size, [br, bg, bb], inset = 0.16) {
  const inner = Math.round(size * (1 - inset * 2));
  const scale = Math.min(inner / width, inner / height);
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const scaled = resize(rgba, width, height, w, h);

  const out = Buffer.alloc(size * size * 4);
  for (let p = 0; p < out.length; p += 4) {
    out[p] = br;
    out[p + 1] = bg;
    out[p + 2] = bb;
    out[p + 3] = 255;
  }

  const offsetX = Math.round((size - w) / 2);
  const offsetY = Math.round((size - h) / 2);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const s = (y * w + x) * 4;
      const alpha = scaled[s + 3] / 255;
      if (alpha === 0) continue;
      const d = ((y + offsetY) * size + x + offsetX) * 4;
      out[d] = Math.round(scaled[s] * alpha + out[d] * (1 - alpha));
      out[d + 1] = Math.round(scaled[s + 1] * alpha + out[d + 1] * (1 - alpha));
      out[d + 2] = Math.round(scaled[s + 2] * alpha + out[d + 2] * (1 - alpha));
    }
  }

  return out;
}
