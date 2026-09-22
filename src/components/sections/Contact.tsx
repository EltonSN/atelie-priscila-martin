import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function Contact() {
  return (
    <section id="contactos" aria-labelledby="contactos-titulo" className="border-t border-line bg-bone">
      <div className="shell grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 id="contactos-titulo" className="text-[clamp(2rem,4.2vw,3.25rem)] text-ink">
            Vamos vestir as suas janelas<span className="text-clay">.</span>
          </h2>
          <p className="mt-7 max-w-md text-[1.0625rem] text-ink-soft">
            Envie-nos a localidade e a largura das paredes. Com esses dois dados respondemos com
            uma proposta clara — a visita é gratuita e sem compromisso.
          </p>
        </Reveal>

        <Reveal delay={90} className="lg:justify-self-end">
          <div className="flex flex-col gap-8">
            <Button href={site.whatsapp.hrefWithMessage} withArrow className="self-start">
              Pedir orçamento por WhatsApp
            </Button>

            <ul className="flex flex-col gap-5">
              <li>
                <a
                  href={site.phone.href}
                  className="group flex cursor-pointer items-center gap-4 text-ink transition-colors duration-200 hover:text-clay-deep"
                >
                  <Icon name="phone" className="h-5 w-5 shrink-0 text-clay" />
                  <span>
                    <span className="block text-[1.0625rem]">{site.phone.display}</span>
                    <span className="block text-[0.8125rem] text-ink-muted">{site.phone.note}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center gap-4 text-ink transition-colors duration-200 hover:text-clay-deep"
                >
                  <Icon name="instagram" className="h-5 w-5 shrink-0 text-clay" />
                  <span>
                    <span className="block text-[1.0625rem]">{site.instagram.handle}</span>
                    <span className="block text-[0.8125rem] text-ink-muted">
                      Trabalhos recentes no Instagram
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 text-ink">
                <Icon name="pin" className="h-5 w-5 shrink-0 text-clay" />
                <span>
                  <span className="block text-[1.0625rem]">{site.serviceArea}</span>
                  <span className="block text-[0.8125rem] text-ink-muted">
                    Medição e instalação em sua casa
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
