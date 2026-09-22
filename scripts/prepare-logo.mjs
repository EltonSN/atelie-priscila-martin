/**
 * Prepara os ficheiros do logótipo a partir do original (fundo preto opaco).
 *
 * O original e um PNG 1080x1080 com o lockup dourado sobre preto solido.
 * Como o fundo e preto puro, a opacidade de cada pixel pode ser derivada da
 * sua luminancia: alpha = max(r, g, b). Desfazendo a pre-multiplicacao
 * obtem-se a cor dourada original com canal alfa limpo, o que permite usar o
 * logotipo sobre qualquer fundo (claro ou escuro).
 *
 * Gera, em public/logo/:
 *   - lockup-gold.png      monograma + wordmark, dourado, fundo transparente
 *   - lockup-ink.png       o mesmo, recolorido para o tom escuro da marca
 *   - monogram-gold.png    apenas o monograma, dourado
 *   - monogram-ink.png     apenas o monograma, recolorido
 *
 * E ainda, em src/app/: icon.png e apple-icon.png (monograma sobre espresso),
 * usados pelo Next.js como favicon e ícone de ecrã inicial.
 *
 * Uso: node scripts/prepare-logo.mjs <ficheiro-original.png>
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { decodePng, encodePng, onBackground } from "./lib/png.mjs";

/** Tom escuro da marca (--color-ink) usado na variante para fundos claros. */
const INK = [0x24, 0x1d, 0x18];

/** Converte o PNG opaco num RGBA em que o preto do fundo se torna transparente. */
function keyOutBlack({ width, height, channels, pixels }) {
  const rgba = Buffer.alloc(width * height * 4);

  for (let i = 0, p = 0; i < width * height; i++, p += 4) {
    const s = i * channels;
    const r = pixels[s];
    const g = channels >= 3 ? pixels[s + 1] : r;
    const b = channels >= 3 ? pixels[s + 2] : r;

    const alpha = Math.max(r, g, b);
    if (alpha === 0) continue; // fundo preto puro -> totalmente transparente

    // Desfaz a pre-multiplicacao sobre preto para recuperar a cor original.
    const scale = 255 / alpha;
    rgba[p] = Math.min(255, Math.round(r * scale));
    rgba[p + 1] = Math.min(255, Math.round(g * scale));
    rgba[p + 2] = Math.min(255, Math.round(b * scale));
    rgba[p + 3] = alpha;
  }

  return rgba;
}

/** Caixa delimitadora do conteudo visivel, com margem. */
function contentBounds(rgba, width, height, { threshold = 12, padding = 0, fromY = 0, toY = height } = {}) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = fromY; y < toY; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] <= threshold) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < 0) throw new Error("Nenhum conteudo visivel encontrado.");

  return {
    x: Math.max(0, minX - padding),
    y: Math.max(0, minY - padding),
    width: Math.min(width, maxX + padding + 1) - Math.max(0, minX - padding),
    height: Math.min(height, maxY + padding + 1) - Math.max(0, minY - padding),
  };
}

/** Linhas totalmente transparentes, usadas para separar monograma e wordmark. */
function emptyRowRanges(rgba, width, height, threshold = 12) {
  const rowHasInk = new Array(height).fill(false);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (rgba[(y * width + x) * 4 + 3] > threshold) {
        rowHasInk[y] = true;
        break;
      }
    }
  }

  const ranges = [];
  let start = null;
  for (let y = 0; y <= height; y++) {
    if (y < height && !rowHasInk[y]) {
      if (start === null) start = y;
    } else if (start !== null) {
      ranges.push({ start, end: y });
      start = null;
    }
  }
  return ranges;
}

function crop(rgba, width, box) {
  const out = Buffer.alloc(box.width * box.height * 4);
  for (let y = 0; y < box.height; y++) {
    const from = ((box.y + y) * width + box.x) * 4;
    rgba.copy(out, y * box.width * 4, from, from + box.width * 4);
  }
  return out;
}

/** Substitui a cor mantendo o canal alfa (variante para fundos claros). */
function recolor(rgba, [r, g, b]) {
  const out = Buffer.from(rgba);
  for (let p = 0; p < out.length; p += 4) {
    if (out[p + 3] === 0) continue;
    out[p] = r;
    out[p + 1] = g;
    out[p + 2] = b;
  }
  return out;
}

const source = resolve(process.argv[2] ?? "");
if (!process.argv[2]) {
  console.error("Uso: node scripts/prepare-logo.mjs <ficheiro-original.png>");
  process.exit(1);
}

const decoded = decodePng(readFileSync(source));
const { width, height } = decoded;
const rgba = keyOutBlack(decoded);

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "logo");
mkdirSync(outDir, { recursive: true });

const write = (name, box, buffer) => {
  const path = resolve(outDir, name);
  writeFileSync(path, encodePng(box.width, box.height, buffer));
  console.log(`${name}  ${box.width}x${box.height}`);
};

// Lockup completo.
const lockupBox = contentBounds(rgba, width, height, { padding: 8 });
const lockup = crop(rgba, width, lockupBox);
write("lockup-gold.png", lockupBox, lockup);
write("lockup-ink.png", lockupBox, recolor(lockup, INK));

// Monograma: a maior faixa vazia dentro do lockup separa-o do wordmark.
const gaps = emptyRowRanges(rgba, width, height)
  .filter((r) => r.start > lockupBox.y && r.end < lockupBox.y + lockupBox.height)
  .sort((a, b) => b.end - b.start - (a.end - a.start));

const splitY = gaps.length ? Math.round((gaps[0].start + gaps[0].end) / 2) : lockupBox.y + lockupBox.height;
const monogramBox = contentBounds(rgba, width, height, { padding: 8, fromY: 0, toY: splitY });
const monogram = crop(rgba, width, monogramBox);
write("monogram-gold.png", monogramBox, monogram);
write("monogram-ink.png", monogramBox, recolor(monogram, INK));

// Ícones da aplicação: monograma dourado sobre o espresso da marca.
const ESPRESSO = [0x1b, 0x15, 0x12];
const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "src", "app");
mkdirSync(appDir, { recursive: true });

for (const [name, size] of [
  ["icon.png", 96],
  ["apple-icon.png", 180],
]) {
  const buffer = onBackground(monogram, monogramBox.width, monogramBox.height, size, ESPRESSO);
  writeFileSync(resolve(appDir, name), encodePng(size, size, buffer));
  console.log(`src/app/${name}  ${size}x${size}`);
}
