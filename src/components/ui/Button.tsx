import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const base =
  "group inline-flex min-h-11 cursor-pointer items-center justify-center gap-3 px-7 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-200 ease-[var(--ease-refined)]";

const variants: Record<Variant, string> = {
  primary: "bg-espresso text-cream hover:bg-clay-deep",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  ghost: "px-0 py-1 text-clay-deep hover:text-ink",
  onDark: "border border-on-dark/30 text-on-dark hover:border-clay-light hover:bg-clay-light hover:text-espresso-deep",
};

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  /** Mostra uma seta que avança ligeiramente em hover. */
  withArrow?: boolean;
  children: ReactNode;
};

export function Button({
  href,
  variant = "primary",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const isExternal = href.startsWith("http");
  const content = (
    <>
      {children}
      {withArrow ? (
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-refined)] group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  const classes = `${base} ${variants[variant]} ${className ?? ""}`;

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
