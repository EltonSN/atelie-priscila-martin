import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { portfolioItems, type PortfolioItem } from "@/content/portfolio";
import { site } from "@/content/site";

/** Tailwind precisa das classes por extenso para as detetar na compilação. */
const spanClass: Record<PortfolioItem["span"], string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

export function Portfolio() {
  return (
    <section id="portefolio" aria-labelledby="portefolio-titulo" className="bg-cream">
      <div className="shell py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 id="portefolio-titulo" className="section-label text-clay-deep">
              Trabalhos selecionados
            </h2>
            <p className="mt-5 max-w-lg font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] text-ink">
              Cada janela pede uma solução própria.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <Button href={site.instagram.href} variant="ghost" withArrow>
              Ver mais no Instagram
            </Button>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
          {portfolioItems.map((item, index) => (
            <Reveal
              as="li"
              key={item.src}
              delay={(index % 3) * 90}
              className={`group ${spanClass[item.span]}`}
            >
              <Figure
                src={item.src}
                alt={item.alt}
                ratio={item.ratio}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
              <p className="eyebrow mt-5 text-ink">{item.title}</p>
              <p className="mt-1.5 font-display text-lg italic text-ink-muted">{item.location}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
