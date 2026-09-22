import Image from "next/image";

import { site } from "@/content/site";

/**
 * Marca do atelier.
 *
 * Os ficheiros em `public/logo/` foram derivados do logótipo original (dourado
 * sobre preto) com o fundo tornado transparente, o que permite usar o monograma
 * real sobre fundos claros e escuros. Ver `scripts/prepare-logo.mjs`.
 */
type LogoProps = {
  /** `horizontal` para o cabeçalho, `stacked` para o rodapé. */
  variant?: "horizontal" | "stacked";
  /** `gold` para fundos escuros, `ink` para fundos claros. */
  tone?: "ink" | "gold";
  className?: string;
};

export function Logo({ variant = "horizontal", tone = "ink", className }: LogoProps) {
  if (variant === "stacked") {
    return (
      <Image
        src={tone === "gold" ? "/logo/lockup-gold.png" : "/logo/lockup-ink.png"}
        alt={site.name}
        width={833}
        height={462}
        className={className}
        priority={false}
      />
    );
  }

  return (
    <span className={`flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src={tone === "gold" ? "/logo/monogram-gold.png" : "/logo/monogram-ink.png"}
        alt=""
        width={292}
        height={257}
        className="h-9 w-auto sm:h-10"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.95rem] font-light uppercase tracking-[0.3em] sm:text-base ${
            tone === "gold" ? "text-on-dark" : "text-ink"
          }`}
        >
          Priscila Martin
        </span>
        <span
          className={`mt-1.5 text-[0.5625rem] font-medium uppercase tracking-[0.28em] ${
            tone === "gold" ? "text-on-dark-muted" : "text-ink-muted"
          }`}
        >
          Cortinados por medida
        </span>
      </span>
    </span>
  );
}
