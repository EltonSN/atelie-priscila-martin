import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/process";

export function Process() {
  return (
    <section id="processo" aria-labelledby="processo-titulo" className="bg-bone">
      <div className="shell py-20 md:py-28">
        <Reveal className="text-center">
          <h2 id="processo-titulo" className="section-label text-clay-deep">
            Como trabalhamos
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] text-ink">
            Cinco passos, do primeiro contacto à última prega.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 80} className="relative lg:text-center">
              <span
                aria-hidden="true"
                className="hidden lg:absolute lg:top-4 lg:left-[calc(50%+2.5rem)] lg:right-[calc(-50%+2.5rem)] lg:block lg:h-px lg:bg-line"
              />
              <p className="relative font-display text-3xl text-clay">{step.number}</p>
              <h3 className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] text-ink-soft lg:mx-auto lg:max-w-[16rem]">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
