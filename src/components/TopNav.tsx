import { useActiveSection } from "../hooks/useActiveSection";

const NAV_SECTIONS = [
  { id: "hero", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
];

const ALL_IDS = NAV_SECTIONS.map((s) => s.id);

export function TopNav() {
  const active = useActiveSection(ALL_IDS);

  return (
    <nav className="fixed top-0 inset-x-0 z-40 xl:hidden h-12 flex items-center px-6 bg-bg-dark/85 backdrop-blur-sm border-b border-border">
      <a
        href="#hero"
        className="text-accent text-sm tracking-widest font-bold mr-auto transition-colors duration-300 hover:text-accent-light"
      >
        F
      </a>
      <div className="flex items-center gap-5">
        {NAV_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
              active === section.id
                ? "text-accent"
                : "text-text-dim hover:text-text-muted"
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
