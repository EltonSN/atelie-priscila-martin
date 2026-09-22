import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { faqItems } from "@/content/faq";

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="perguntas-titulo" className="bg-cream">
      <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal>
          <h2 id="perguntas-titulo" className="section-label text-clay-deep">
            Perguntas frequentes
          </h2>
          <p className="mt-5 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] text-ink">
            Antes de nos escrever.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="border-t border-line">
            {faqItems.map((item) => (
              <li key={item.question} className="border-b border-line">
                {/* <details> mantém o conteúdo no DOM e acessível sem JavaScript. */}
                <details className="group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[1.0625rem] text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <Icon
                      name="plus"
                      className="h-4 w-4 shrink-0 text-clay-deep transition-transform duration-300 ease-[var(--ease-refined)] group-open:rotate-45"
                    />
                  </summary>
                  <p className="pb-6 text-[0.9375rem] text-ink-soft lg:max-w-prose">{item.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
