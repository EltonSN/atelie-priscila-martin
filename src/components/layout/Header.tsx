"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { navigation, site } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu com Escape e impede o scroll do corpo enquanto está aberto.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      data-scrolled={scrolled}
      className="fixed inset-x-0 top-0 z-40 transition-colors duration-300 ease-[var(--ease-refined)] data-[scrolled=true]:border-b data-[scrolled=true]:border-line data-[scrolled=true]:bg-cream/90 data-[scrolled=true]:backdrop-blur-md"
    >
      <div className="shell flex items-center justify-between py-5 md:py-6">
        <Link href="#inicio" aria-label={`${site.name} — início`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="eyebrow relative cursor-pointer text-ink-soft transition-colors duration-200 hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-clay-deep after:transition-[width] after:duration-300 after:ease-[var(--ease-refined)] hover:after:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.whatsapp.hrefWithMessage}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 cursor-pointer items-center border border-ink/25 px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-cream sm:inline-flex"
          >
            Pedir orçamento
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center text-ink lg:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!menuOpen}
        className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-line bg-cream lg:hidden"
      >
        <nav aria-label="Navegação principal (menu)" className="shell py-6">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-line/70 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-14 cursor-pointer items-center justify-between py-2 font-display text-2xl text-ink"
                >
                  {item.label}
                  <Icon name="arrowRight" className="h-4 w-4 text-clay-deep" />
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={site.whatsapp.hrefWithMessage}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-7 flex min-h-12 cursor-pointer items-center justify-center gap-3 bg-espresso px-6 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-cream"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Pedir orçamento
          </a>
        </nav>
      </div>
    </header>
  );
}
