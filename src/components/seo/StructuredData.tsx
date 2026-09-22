import { faqItems } from "@/content/faq";
import { site } from "@/content/site";

/**
 * Dados estruturados (JSON-LD) para resultados de pesquisa: identifica o
 * negócio local e expõe as perguntas frequentes como rich result.
 */
export function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: site.name,
      description: site.description,
      url: site.url,
      telephone: site.phone.display,
      image: `${site.url}/logo/lockup-gold.png`,
      address: { "@type": "PostalAddress", addressCountry: "PT" },
      areaServed: { "@type": "Country", name: "Portugal" },
      sameAs: [site.instagram.href],
      knowsLanguage: ["pt-PT"],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Conteúdo estático definido no repositório — sem dados externos.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
