import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function Philosophy() {
  return (
    <section id="atelier" aria-labelledby="atelier-titulo" className="bg-espresso">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center px-6 py-20 md:px-12 md:py-24 lg:justify-end lg:px-16 lg:py-32">
          <Reveal className="max-w-lg">
            <p className="section-label text-clay-light">O nosso atelier</p>

            <h2
              id="atelier-titulo"
              className="mt-6 text-[clamp(1.875rem,3.6vw,2.75rem)] text-on-dark"
            >
              Um cortinado bem feito não se vê — sente-se.
            </h2>

            <span aria-hidden="true" className="mt-8 block h-px w-14 bg-clay-light" />

            <p className="mt-8 text-[1.0625rem] text-on-dark-muted">
              Trabalhamos com o tempo que cada peça exige. Medimos ao milímetro, escolhemos o tecido
              consigo, à luz da sua casa, e cosemos cada acabamento no atelier. O resultado é um
              caimento que dura anos e um ambiente que finalmente respira.
            </p>

            <p className="mt-5 text-[1.0625rem] text-on-dark-muted">
              Não trabalhamos por catálogo. Trabalhamos por medida — a da janela, a da luz e a de
              quem ali vive.
            </p>

            <div className="mt-10">
              <Button href={site.whatsapp.hrefWithMessage} variant="onDark" withArrow>
                Falar com o atelier
              </Button>
            </div>
          </Reveal>
        </div>

        <Figure
          src="/portfolio/atelier.jpg"
          alt="Pormenor de trabalho no atelier: tecido a ser cosido sobre a mesa de corte"
          ratio={null}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="aspect-[4/3] lg:h-full lg:aspect-auto"
        />
      </div>
    </section>
  );
}
