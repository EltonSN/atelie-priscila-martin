import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="border-y border-line bg-bone">
      <div className="shell py-20 md:py-24">
        <Reveal className="text-center">
          <h2 id="servicos-titulo" className="section-label text-clay-deep">
            O que fazemos
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-12 max-w-4xl mx-auto md:grid-cols-2 md:gap-0">
          {services.map((service, index) => (
            <Reveal
              as="li"
              key={service.title}
              delay={index * 90}
              className="md:border-l md:border-line md:first:border-l-0 md:px-12 md:first:pl-0 md:last:pr-0"
            >
              <Icon name={service.icon} className="h-9 w-9 text-clay" />
              <h3 className="mt-6 text-2xl text-ink">{service.title}</h3>
              <p className="mt-4 text-[0.9375rem] text-ink-soft">{service.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
