import { Figure } from "@/components/ui/Figure";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/content/testimonials";

export function Testimonial() {
  const [testimonial] = testimonials;
  if (!testimonial) return null;

  return (
    <section aria-label="Testemunho de cliente" className="bg-espresso-deep">
      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="flex items-center px-6 py-20 md:px-12 md:py-24 lg:px-16">
          <Reveal className="max-w-2xl">
            <span aria-hidden="true" className="block font-display text-6xl leading-none text-clay-light">
              &ldquo;
            </span>
            <figure className="mt-2">
              <blockquote>
                <p className="font-display text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.3] text-on-dark">
                  {testimonial.quote}
                </p>
              </blockquote>
              <figcaption className="eyebrow mt-8 text-on-dark-muted">
                {testimonial.author} · {testimonial.context}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Figure
          src="/portfolio/testemunho.jpg"
          alt="Sala serena com cortinados claros a filtrar a luz da tarde"
          ratio={null}
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="aspect-[16/10] lg:h-full lg:aspect-auto"
        />
      </div>
    </section>
  );
}
