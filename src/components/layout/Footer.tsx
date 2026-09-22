import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { navigation, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso-deep">
      <div className="shell grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Logo variant="stacked" tone="gold" className="h-24 w-auto" />
          <p className="mt-7 max-w-xs text-[0.9375rem] text-on-dark-muted">
            Cortinados por medida. Aconselhamento, confeção artesanal e instalação, do princípio ao
            fim.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="eyebrow text-clay-light">Navegação</h2>
          <ul className="mt-6 flex flex-col gap-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="cursor-pointer text-[0.9375rem] text-on-dark-muted transition-colors duration-200 hover:text-on-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-clay-light">Contactos</h2>
          <ul className="mt-6 flex flex-col gap-3">
            <li>
              <a
                href={site.phone.href}
                className="cursor-pointer text-[0.9375rem] text-on-dark-muted transition-colors duration-200 hover:text-on-dark"
              >
                {site.phone.display}
              </a>
            </li>
            <li className="text-[0.9375rem] text-on-dark-muted">{site.serviceArea}</li>
          </ul>

          <ul className="mt-7 flex items-center gap-3">
            <li>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar connosco por WhatsApp"
                className="flex h-11 w-11 cursor-pointer items-center justify-center border border-on-dark/25 text-on-dark transition-colors duration-200 hover:border-clay-light hover:text-clay-light"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={site.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram do atelier (${site.instagram.handle})`}
                className="flex h-11 w-11 cursor-pointer items-center justify-center border border-on-dark/25 text-on-dark transition-colors duration-200 hover:border-clay-light hover:text-clay-light"
              >
                <Icon name="instagram" className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-on-dark/12">
        <div className="shell flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-on-dark-muted">
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <p className="text-[0.8125rem] text-on-dark-muted">Feito à medida, em Portugal.</p>
        </div>
      </div>
    </footer>
  );
}
