import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";
import { GitHub, LinkedIn, ThemeIcon } from "./Icons";
import resume from "../data/resume.json";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "principles", label: "Principles" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = SECTIONS.map((s) => s.id);

function ThemeButton() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="grid size-11 place-items-center text-dim transition-colors duration-300 hover:bg-pane-lit hover:text-ink"
    >
      <ThemeIcon />
    </button>
  );
}

/** Left column of the wall on desktop, a top strip on smaller screens. */
export function NavColumn() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <header className="sticky top-0 z-20 lg:h-dvh">
      {/* Desktop: a column of panes, one per destination. */}
      <nav
        aria-label="Sections"
        className="hidden h-full grid-rows-[6rem_repeat(5,minmax(0,1fr))_auto] gap-px bg-rule lg:grid"
      >
        <a
          href="#overview"
          className="flex items-center bg-pane px-7 font-display text-2xl font-medium uppercase tracking-[0.12em]"
        >
          Forsmark
        </a>
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={on ? "location" : undefined}
              className={`flex items-end px-7 pb-5 font-display text-xl uppercase tracking-[0.1em] transition-colors duration-500 ease-glass ${
                on ? "bg-pane-lit text-ink" : "bg-pane-2 text-dim hover:bg-pane-lit hover:text-ink"
              }`}
            >
              {s.label}
            </a>
          );
        })}
        <div className="flex items-center justify-between bg-pane px-4 py-3">
          <div className="flex">
            <a
              href={resume.linkedin}
              aria-label="LinkedIn"
              className="grid size-11 place-items-center text-dim transition-colors duration-300 hover:bg-pane-lit hover:text-ink"
            >
              <LinkedIn className="size-4" />
            </a>
            <a
              href={resume.github}
              aria-label="GitHub"
              className="grid size-11 place-items-center text-dim transition-colors duration-300 hover:bg-pane-lit hover:text-ink"
            >
              <GitHub className="size-4" />
            </a>
          </div>
          <ThemeButton />
        </div>
      </nav>

      {/* Mobile and tablet: one strip of panes along the top. */}
      <nav
        aria-label="Sections"
        className="grid grid-cols-[minmax(0,1fr)_auto] gap-px border-b border-rule bg-rule sm:grid-cols-[auto_minmax(0,1fr)_auto] lg:hidden"
      >
        <a
          href="#overview"
          className="hidden items-center bg-pane px-4 font-display text-lg font-medium uppercase tracking-[0.12em] sm:flex"
        >
          Forsmark
        </a>
        <div className="flex gap-px overflow-x-auto [scrollbar-width:none]">
          {SECTIONS.slice(1).map((s) => {
            const on = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex h-13 shrink-0 grow items-center justify-center px-2.5 font-display text-sm uppercase tracking-[0.04em] transition-colors duration-500 sm:px-4 sm:text-base sm:tracking-[0.08em] ${
                  on ? "bg-pane-lit text-ink" : "bg-pane-2 text-dim"
                }`}
              >
                {s.label}
              </a>
            );
          })}
        </div>
        <div className="grid place-items-center bg-pane">
          <ThemeButton />
        </div>
      </nav>
    </header>
  );
}
