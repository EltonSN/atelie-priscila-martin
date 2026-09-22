/**
 * Dados institucionais do Atelier Priscila Martin.
 *
 * Ponto único de verdade para contactos, navegação e metadados. Alterar aqui
 * reflete-se no cabeçalho, no rodapé, no botão flutuante e nos dados
 * estruturados da página.
 */

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
  // TODO(cliente): confirmar o domínio final antes de publicar.
  url: "https://atelierpriscilamartin.pt",
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
