import { siGithub } from "simple-icons";

interface IconProps {
  className?: string;
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square" as const,
};

export function ArrowUpRight({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowDown({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
      <path d="M12 4v16M5 13l7 7 7-7" />
    </svg>
  );
}

export function Close({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function Copy({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
      <path d="M8 8h11v11H8z" />
      <path d="M16 8V5H5v11h3" />
    </svg>
  );
}

export function Check({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
      <path d="M4 12.5 9.5 18 20 6" />
    </svg>
  );
}

/** Half-lit pane: the day and night sides of the wall. */
export function ThemeIcon({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="4.75" y="4.75" width="14.5" height="14.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 4.75h7.25v14.5H12z" fill="currentColor" />
    </svg>
  );
}

export function GitHub({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d={siGithub.path} />
    </svg>
  );
}

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

export function LinkedIn({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d={LINKEDIN_PATH} />
    </svg>
  );
}
