import type { SVGProps } from "react";

/**
 * Conjunto de ícones em SVG traçado (nunca emojis), desenhados com o mesmo
 * peso de linha do resto da interface e herdando a cor via `currentColor`.
 */
const paths = {
  curtain: (
    <>
      <path d="M3 4h18" />
      <path d="M7 4c0 6.5-1.3 11.6-3 16 2.6 0 4.2-1 4.2-1V4" />
      <path d="M12 4v16" />
      <path d="M17 4c0 6.5 1.3 11.6 3 16-2.6 0-4.2-1-4.2-1V4" />
    </>
  ),
  blind: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1" />
      <path d="M3.5 8h17M3.5 12h17M3.5 16h17" />
    </>
  ),
  fabric: (
    <>
      <path d="M3 6c3-2.5 6-2.5 9 0s6 2.5 9 0" />
      <path d="M3 12c3-2.5 6-2.5 9 0s6 2.5 9 0" />
      <path d="M3 18c3-2.5 6-2.5 9 0s6 2.5 9 0" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.8 2.5C10.4 19.2 4.8 13.6 4 5.8A2.5 2.5 0 0 1 6.5 3Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths | "whatsapp";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  /** Espessura do traço; 1.25 é o peso base da interface. */
  strokeWidth?: number;
};

export function Icon({ name, strokeWidth = 1.25, ...props }: IconProps) {
  // O WhatsApp é um logótipo: só lê bem como forma cheia.
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.21-8.25 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31s-.87.85-.87 2.07.89 2.4 1.02 2.57c.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
