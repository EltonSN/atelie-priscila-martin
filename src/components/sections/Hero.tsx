import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

const assurances = ["Visita e orçamento gratuitos", "Confeção artesanal", "Instalação incluída"];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-cream pt-28 md:pt-23">
      <div className="shell grid items-center gap-12 pb-16 md:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16 lg:pb-0">
        <Reveal className="relative z-10 max-w-xl">
          <p className="eyebrow text-clay-deep">Atelier de cortinados · Portugal</p>

          <h1 className="mt-7 text-[clamp(2.75rem,7.5vw,5rem)]">
            Cortinados
            <br /> à sua medida<span className="text-clay">.</span>
          </h1>

          <span aria-hidden="true" className="mt-9 block h-px w-16 bg-clay" />

          <p className="mt-8 max-w-md text-[1.0625rem] text-ink-soft">
            Do aconselhamento de tecidos à colocação final, o Atelier Priscila Martin concebe e
            confeciona cada peça com o rigor artesanal que uma casa de exceção merece.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href={site.whatsapp.hrefWithMessage} withArrow>
              Pedir orçamento
            </Button>
            <Button href="#portefolio" variant="secondary">
              Ver portefólio
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3">
            {assurances.map((item) => (
              <li key={item} className="eyebrow flex items-center gap-2.5 text-ink-muted">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-clay" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={120}
          className="relative lg:-ml-24 lg:-mr-[max(0px,calc((100vw-82rem)/2+4rem))]"
        >
          <Figure
            src="/portfolio/hero.jpg"
            alt="Cortinado de linho do teto ao chão numa sala inundada de luz natural"
            ratio={null}
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
            className="hero-fade aspect-[4/3.4] lg:aspect-[4/3]"
          />
        </Reveal>
      </div>
    </section>
  );
}
