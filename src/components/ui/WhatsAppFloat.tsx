import { site } from "@/content/site";
import { Icon } from "./Icon";

/**
 * Botão flutuante de WhatsApp.
 *
 * Fica fixo no canto inferior direito durante todo o scroll e respeita as áreas
 * seguras dos ecrãs com entalhe. Em ecrãs pequenos é um círculo de 56 px (acima
 * do mínimo de 44 px recomendado para alvos de toque), com o nome acessível a
 * vir do `aria-label`; a partir de `md` mostra o rótulo por extenso.
 *
 * A entrada é uma animação CSS, não estado de React: o botão aparece mesmo sem
 * JavaScript e não precisa de ser um componente de cliente.
 */
export function WhatsAppFloat() {
  return (
    <div
      className="fixed right-5 bottom-5 z-50 print:hidden"
      style={{
        paddingRight: "env(safe-area-inset-right)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <a
        href={site.whatsapp.hrefWithMessage}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Falar connosco por WhatsApp (${site.phone.display})`}
        className="float-in flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#1e8e4a] text-white shadow-[0_10px_30px_-8px_rgba(30,142,74,0.55)] transition-colors duration-200 ease-[var(--ease-refined)] hover:bg-[#17743c] focus-visible:outline-offset-4 md:w-auto md:gap-3 md:px-6"
      >
        <Icon name="whatsapp" className="h-7 w-7 shrink-0" />
        <span className="hidden text-[0.7rem] font-medium whitespace-nowrap uppercase tracking-[0.16em] md:inline">
          Pedir orçamento
        </span>
      </a>
    </div>
  );
}
