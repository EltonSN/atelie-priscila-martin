import { existsSync } from "node:fs";
import { join } from "node:path";

import Image from "next/image";

type FigureProps = {
  src: string;
  alt: string;
  /**
   * Proporção aplicada ao contentor — reserva o espaço e evita CLS.
   * Passar `null` deixa o dimensionamento a cargo das classes (ex.: altura
   * total de uma coluna), continuando a reservar espaço via CSS.
   */
  ratio?: string | null;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Imagem de projeto com espaço sempre reservado.
 *
 * A existência do ficheiro é verificada na compilação (esta página é toda
 * estática): enquanto a fotografia não estiver em `public/`, é desenhado um
 * marcador gráfico em vez de uma imagem partida. Basta adicionar o ficheiro e
 * voltar a compilar para a fotografia aparecer, sem alterar código.
 */
export function Figure({
  src,
  alt,
  ratio = "4 / 3",
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw",
  priority = false,
  className,
}: FigureProps) {
  const available = existsSync(join(process.cwd(), "public", src));

  return (
    <div
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={`relative w-full overflow-hidden bg-sand ${className ?? ""}`}
    >
      {available ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[var(--ease-refined)] group-hover:scale-[1.03]"
        />
      ) : (
        <CurtainPlaceholder />
      )}
    </div>
  );
}

/** Marcador decorativo: pregas de cortinado desenhadas em SVG. */
function CurtainPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 grid place-items-center bg-linear-to-b from-sand to-line"
    >
      <svg
        viewBox="0 0 120 90"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-ink/12"
      >
        <g fill="none" stroke="currentColor" strokeWidth="0.6">
          {Array.from({ length: 13 }, (_, index) => {
            const x = 4 + index * 9.3;
            const bow = index % 2 === 0 ? 3.2 : -3.2;
            return <path key={index} d={`M${x} 0 C ${x + bow} 30, ${x - bow} 60, ${x} 90`} />;
          })}
        </g>
      </svg>
      <span className="eyebrow relative text-ink-muted"></span>
    </div>
  );
}
