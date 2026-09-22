/**
 * Dados institucionais do Atelier Priscila Martin.
 *
 * Ponto único de verdade para contactos, navegação e metadados. Alterar aqui
 * reflete-se no cabeçalho, no rodapé, no botão flutuante e nos dados
 * estruturados da página.
 */

/**
 * URL base do site — usada no `metadataBase`, no canonical, no `sitemap.xml`,
 * no `robots.txt` e nos dados estruturados.
 *
 * Resolvida por esta ordem:
 *   1. `NEXT_PUBLIC_SITE_URL` — o domínio final, definido manualmente.
 *   2. `VERCEL_PROJECT_PRODUCTION_URL` — domínio de produção do projeto na
 *      Vercel, preenchido automaticamente. Serve de rede de segurança enquanto
 *      o domínio próprio não estiver ligado.
 *   3. O domínio definitivo, para desenvolvimento local.
 *
 * Sem isto, uma publicação feita antes de o domínio estar ativo anunciaria
 * `atelierpriscilamartin.pt` no sitemap e nos canonical de um site que ainda
 * vive noutro endereço.
 *
 * Só é lida em contexto de servidor (metadados, sitemap, robots, JSON-LD).
 */
function resolveSiteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined);

  if (!configured) return "https://atelierpriscilamartin.pt";

  // Tolera o valor sem esquema e com barra final — `new URL()` rejeita ambos.
  const withScheme = /^https?:\/\//.test(configured) ? configured : `https://${configured}`;
  return withScheme.replace(/\/+$/, "");
}

/** Número de WhatsApp em formato internacional, sem sinais (usado em wa.me). */
const WHATSAPP_NUMBER = "351925847490";

/**
 * Mensagem pré-preenchida ao abrir a conversa a partir do site.
 *
 * Já pede os dois dados necessários ao orçamento (localidade e largura das
 * paredes), para a primeira mensagem chegar ao atelier pronta a responder.
 */
const WHATSAPP_GREETING = [
  "Olá! Vi o site do Atelier Priscila Martin e gostaria de pedir um orçamento para cortinados.",
  "",
  "Localidade:",
  "Largura das paredes:",
].join("\n");

export const site = {
  name: "Atelier Priscila Martin",
  shortName: "Priscila Martin",
  tagline: "Cortinados por medida",
  description:
    "Atelier de cortinados por medida em Portugal. Aconselhamento de tecidos, medição ao domicílio, confeção artesanal e instalação.",
  url: resolveSiteUrl(),
  locale: "pt-PT",
  /** Zona de atendimento apresentada no rodapé. TODO(cliente): confirmar. */
  serviceArea: "Portugal · atendimento ao domicílio",
  phone: {
    display: "+351 925 847 490",
    href: "tel:+351925847490",
    /** Aviso legal exigido em Portugal para números de rede móvel. */
    note: "Chamada para a rede móvel nacional",
  },
  instagram: {
    handle: "@atelierpriscilamartin",
    href: "https://www.instagram.com/atelierpriscilamartin/",
  },
  whatsapp: {
    number: WHATSAPP_NUMBER,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    /** Ligação com mensagem pré-preenchida, usada nos CTA principais. */
    hrefWithMessage: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_GREETING)}`,
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navigation: NavItem[] = [
  { label: "Atelier", href: "#atelier" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portefólio", href: "#portefolio" },
  { label: "Processo", href: "#processo" },
  { label: "Perguntas", href: "#perguntas" },
  { label: "Contactos", href: "#contactos" },
];
