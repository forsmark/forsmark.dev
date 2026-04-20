import { useActiveSection } from "../hooks/useActiveSection";

const NAV_SECTIONS = [
  { id: "hero", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
];

const ALL_IDS = NAV_SECTIONS.map((s) => s.id);

export function SideNav() {
  const active = useActiveSection(ALL_IDS);

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-5">
      {NAV_SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`text-[11px] tracking-[0.15em] uppercase transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            active === section.id
              ? "text-accent translate-x-1"
              : "text-text-dim hover:text-text-muted"
          }`}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
