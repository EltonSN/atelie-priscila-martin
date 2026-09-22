"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Atraso em milissegundos, para escalonar elementos irmãos. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Revela o conteúdo quando entra no viewport.
 *
 * O deslocamento e a transição são anulados em CSS quando o utilizador tem
 * `prefers-reduced-motion: reduce`, e o conteúdo fica visível de imediato se o
 * `IntersectionObserver` não estiver disponível.
 */
export function Reveal({ children, delay = 0, as: Tag = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // Fallback para motores sem IntersectionObserver: revela já, sem passar
      // pelo estado (evitaria uma cascata de renders logo no primeiro efeito).
      node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
}
