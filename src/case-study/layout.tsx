import type { ReactNode } from "react";
import { Pane } from "../components/Pane";
import { ArrowUpRight, ThemeIcon } from "../components/Icons";
import { useTheme } from "../hooks/useTheme";

/**
 * The parts a case study page is built from. Each page is one wall of panes,
 * as the home page is, so a study reads as a project pane opened full size.
 */

function ThemeButton() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="grid size-13 place-items-center text-dim transition-colors duration-300 hover:bg-pane-lit hover:text-ink"
    >
      <ThemeIcon />
    </button>
  );
}

/** One strip of panes along the top, at every width. */
export function CaseStudyNav() {
  return (
    <header className="sticky top-0 z-20">
      <nav
        aria-label="Site"
        className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-px border-b border-rule bg-rule"
      >
        <a
          href="/"
          className="flex h-13 items-center bg-pane px-4 font-display text-lg font-medium uppercase tracking-[0.12em] lg:px-7 lg:text-xl"
        >
          Forsmark
        </a>
        <a
          href="/#work"
          className="flex h-13 items-center bg-pane-2 px-4 font-display text-sm uppercase tracking-[0.08em] text-dim transition-colors duration-500 ease-glass hover:bg-pane-lit hover:text-ink sm:text-base lg:px-7"
        >
          All work
        </a>
        <div className="grid place-items-center bg-pane">
          <ThemeButton />
        </div>
      </nav>
    </header>
  );
}

/** A title pane and a lede pane, as every section of the home page opens. */
export function SectionHead({ id, title, lede }: { id: string; title: string; lede: ReactNode }) {
  return (
    <div className="grid gap-px bg-rule md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
      <Pane tone="rest" className="flex items-end p-6 [container-type:inline-size] lg:p-8">
        <h2 id={id} className="font-display text-[clamp(2.75rem,14cqw,6rem)] leading-[0.88] uppercase">
          {title}
        </h2>
      </Pane>
      <Pane className="flex items-end p-6 lg:p-8">
        <p className="max-w-[56ch] text-lg leading-snug text-dim">{lede}</p>
      </Pane>
    </div>
  );
}

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-px bg-rule">
      {children}
    </section>
  );
}

/** A pane of running text, with an optional sub-head in the label style. */
export function TextPane({
  title,
  tone = "glass",
  className = "",
  children,
}: {
  title?: string;
  tone?: "glass" | "deep" | "rest";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Pane tone={tone} className={`p-6 lg:p-8 ${className}`}>
      {title && <h3 className="font-display text-2xl tracking-[0.06em] uppercase">{title}</h3>}
      <div className={`${title ? "mt-4" : ""} grid max-w-[66ch] gap-4 leading-relaxed`}>{children}</div>
    </Pane>
  );
}

/** One number and what it counts. */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Pane className="flex min-h-36 flex-col justify-between gap-6 p-6 lg:p-7">
      <span className="font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-none tabular">{value}</span>
      <span className="max-w-[24ch] text-sm leading-snug text-dim">{label}</span>
    </Pane>
  );
}

export function Shot({
  src,
  alt,
  caption,
  width,
  height,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <figure className={`bg-pane p-3 ${className}`}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" className="h-auto w-full border border-rule" />
      <figcaption className="px-1 pt-3 pb-1 text-sm text-dim">{caption}</figcaption>
    </figure>
  );
}

/** A short excerpt of real code, set as it is in the repository. */
export function CodeExcerpt({ path, code, children }: { path: string; code: string; children: ReactNode }) {
  return (
    <div className="grid gap-px bg-rule lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
      <Pane className="p-6 lg:p-8">
        <p className="font-mono text-sm break-all text-dim">{path}</p>
        <div className="mt-4 grid max-w-[52ch] gap-4 leading-relaxed">{children}</div>
      </Pane>
      <Pane tone="deep" className="min-w-0">
        <pre className="overflow-x-auto p-6 font-mono text-[0.8125rem] leading-relaxed lg:p-8">
          <code>{code.trimEnd()}</code>
        </pre>
      </Pane>
    </div>
  );
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="inline-flex items-center gap-1.5 underline decoration-rule hover:decoration-current">
      {children}
      <ArrowUpRight className="size-4" />
    </a>
  );
}
