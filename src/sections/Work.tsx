import { useEffect, useRef } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Pane } from "../components/Pane";
import { ArrowRight, ArrowUpRight, Close, GitHub } from "../components/Icons";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { glass } from "../lib/motion";
import projects from "../data/projects.json";
import type { Project } from "../data/types";

const all = projects as Project[];
const lead = all.filter((p) => p.tier === "lead");

interface WorkProps {
  openId: string | null;
  onToggle: (id: string) => void;
}

/**
 * Lites of unequal size, as in a real partition: one tall feature, two stacked
 * beside it and a wide low lite under them.
 */
const LITES: Record<string, { span: string; title: string; minH: string; feature?: boolean }> = {
  copenscene: {
    span: "md:col-span-2 lg:row-span-2",
    title: "text-[clamp(3.25rem,6.5vw,7rem)]",
    minH: "min-h-[24rem] lg:min-h-[34rem]",
    feature: true,
  },
  fstack: { span: "", title: "text-[clamp(2.5rem,3.4vw,3.5rem)]", minH: "min-h-[17rem]" },
  sieve: { span: "", title: "text-[clamp(2.5rem,3.4vw,3.5rem)]", minH: "min-h-[17rem]" },
  "agent-clis": {
    span: "md:col-span-2 lg:col-span-3",
    title: "text-[clamp(2.75rem,4.5vw,4.5rem)]",
    minH: "min-h-[14rem]",
  },
};

function ClosedPane({ project }: { project: Project }) {
  const lite = LITES[project.id];
  const shot = lite?.feature ? project.images?.[0] : undefined;
  return (
    <div className={`flex h-full flex-col justify-between gap-10 p-6 lg:p-8 ${lite?.minH ?? "min-h-[17rem]"}`}>
      <span className="block">
        <span className={`block font-display leading-[0.92] uppercase ${lite?.title ?? "text-5xl"}`}>
          {project.title}
        </span>
        <span className="mt-4 block max-w-[46ch] text-lg">{project.problem}</span>
      </span>
      {/* The screenshot is decorative here: the open pane and the case study carry the captions. */}
      {shot && <img src={shot.src} alt="" loading="lazy" className="w-full border border-rule" />}
      <span className="flex flex-wrap justify-between gap-x-6 gap-y-1 text-sm text-dim">
        <span>
          {project.status} · <span className="tabular">{project.year}</span>
        </span>
        <span>{project.tech.join(" · ")}</span>
      </span>
    </div>
  );
}

function OpenPane({ project, onClose }: { project: Project; onClose: () => void }) {
  const links = [
    project.caseStudyUrl && { href: project.caseStudyUrl, label: "Read the case study", icon: <ArrowRight /> },
    project.demoUrl && { href: project.demoUrl, label: "Open the live site", icon: <ArrowUpRight /> },
    project.githubUrl && { href: project.githubUrl, label: "Read the code on GitHub", icon: <GitHub className="size-4" /> },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  return (
    <div className="grid gap-px bg-rule">
      <div className="flex flex-wrap items-end justify-between gap-6 bg-note p-6 text-note-ink lg:p-8">
        <div>
          <h3 className="font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.9] uppercase">{project.title}</h3>
          <p className="mt-3 text-sm opacity-90">
            {project.status} · <span className="tabular">{project.year}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 items-center gap-2 border border-current/40 px-4 text-sm transition-colors duration-300 hover:bg-white/10"
        >
          <Close className="size-4" />
          Close
        </button>
      </div>

      <div className="grid gap-px bg-rule md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <div className="grid gap-px bg-rule">
          <div className="bg-pane p-6 lg:p-8">
            <h4 className="font-display text-xl tracking-[0.06em] uppercase text-dim">Problem</h4>
            <p className="mt-3 max-w-[48ch] text-xl leading-snug">{project.problem}</p>
          </div>
          <div className="bg-pane p-6 lg:p-8">
            <h4 className="font-display text-xl tracking-[0.06em] uppercase text-dim">People</h4>
            <p className="mt-3 max-w-[48ch] text-lg leading-snug">{project.people}</p>
          </div>
        </div>
        <div className="bg-pane-2 p-6 lg:p-8">
          <h4 className="font-display text-xl tracking-[0.06em] uppercase text-dim">Build</h4>
          <ul className="mt-2">
            {project.build.map((b) => (
              <li key={b} className="max-w-[62ch] border-b border-rule py-4 leading-relaxed last:border-b-0">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {project.images && project.images.length > 0 && (
        <div className="grid gap-px bg-rule sm:grid-cols-2">
          {project.images.map((img) => (
            <figure key={img.src} className="bg-pane p-3">
              <img src={img.src} alt={img.caption ?? ""} loading="lazy" className="w-full border border-rule" />
              {img.caption && <figcaption className="px-1 pt-3 pb-1 text-sm text-dim">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      <div className="grid gap-px bg-rule md:grid-cols-[minmax(0,1fr)_auto]">
        <p className="bg-pane p-6 text-dim lg:px-8">{project.tech.join(" · ")}</p>
        {links.length > 0 ? (
          <div className="flex flex-wrap gap-px bg-rule">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="flex flex-1 items-center justify-between gap-6 bg-pane p-6 transition-colors duration-500 ease-glass hover:bg-pane-lit lg:px-8"
              >
                {l.label}
                {l.icon}
              </a>
            ))}
            {!project.githubUrl && <p className="flex flex-1 items-center bg-pane p-6 text-dim lg:px-8">Private repository</p>}
          </div>
        ) : (
          <p className="bg-pane p-6 text-dim lg:px-8">Private repository</p>
        )}
      </div>
    </div>
  );
}

function ProjectGrid({ items, openId, onToggle, className }: { items: Project[]; className: string } & WorkProps) {
  const reduced = useReducedMotion();
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const lastOpened = useRef<string | null>(null);

  // Bring a freshly opened pane into view once its layout has settled.
  useEffect(() => {
    if (!openId || openId === lastOpened.current) return;
    lastOpened.current = openId;
    const el = refs.current[openId];
    if (!el) return;
    const t = setTimeout(() => el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }), reduced ? 0 : 380);
    return () => clearTimeout(t);
  }, [openId, reduced]);

  useEffect(() => {
    if (!openId) lastOpened.current = null;
  }, [openId]);

  return (
    <div className={`grid gap-px bg-rule ${className}`}>
      {items.map((p) => {
        const open = p.id === openId;
        const span = LITES[p.id]?.span ?? "";
        return (
          <motion.article
            key={p.id}
            id={`project-${p.id}`}
            ref={(el) => {
              refs.current[p.id] = el;
            }}
            layout={!reduced}
            transition={glass(0.65)}
            className={`relative flex scroll-mt-14 flex-col bg-pane lg:scroll-mt-0 ${open ? "col-span-full" : span}`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {open ? (
                <motion.div
                  key="open"
                  layout={!reduced ? "position" : false}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1, transition: glass(0.6) }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  id={`project-${p.id}-detail`}
                >
                  <OpenPane project={p} onClose={() => onToggle(p.id)} />
                </motion.div>
              ) : (
                <motion.button
                  key="closed"
                  type="button"
                  layout={!reduced ? "position" : false}
                  onClick={() => onToggle(p.id)}
                  aria-expanded={false}
                  aria-controls={`project-${p.id}-detail`}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1, transition: glass(0.6) }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="block w-full flex-1 bg-pane text-left transition-colors duration-500 ease-glass hover:bg-pane-lit"
                >
                  <ClosedPane project={p} />
                </motion.button>
              )}
            </AnimatePresence>
            {/* A link of its own, so the case study is one click away without opening the pane. */}
            {!open && p.caseStudyUrl && (
              <a
                href={p.caseStudyUrl}
                className="flex items-center justify-between gap-6 border-t border-rule bg-note p-6 text-lg text-note-ink transition-opacity duration-500 ease-glass hover:opacity-90 lg:px-8"
              >
                Read the {p.title} case study
                <ArrowRight />
              </a>
            )}
          </motion.article>
        );
      })}
    </div>
  );
}

export function Work({ openId, onToggle }: WorkProps) {
  return (
    <section id="work" aria-labelledby="work-title" className="grid gap-px bg-rule">
      <div className="grid gap-px bg-rule md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <Pane tone="rest" className="flex items-end p-6 [container-type:inline-size] lg:p-8">
          <h2 id="work-title" className="font-display text-[clamp(3.5rem,18cqw,8rem)] leading-[0.85] uppercase">
            Work
          </h2>
        </Pane>
        <Pane className="flex items-end p-6 lg:p-8">
          <p className="max-w-[52ch] text-lg leading-snug text-dim">
            Personal projects. Open a pane to read how it was built.
          </p>
        </Pane>
      </div>
      <LayoutGroup id="lead">
        <ProjectGrid items={lead} openId={openId} onToggle={onToggle} className="md:grid-cols-2 lg:grid-cols-3" />
      </LayoutGroup>
    </section>
  );
}
