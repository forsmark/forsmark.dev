import { useEffect, useRef } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Pane } from "../components/Pane";
import { ArrowUpRight, Close, GitHub } from "../components/Icons";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { glass } from "../lib/motion";
import projects from "../data/projects.json";
import type { Project } from "../data/types";

const all = projects as Project[];
const lead = all.filter((p) => p.tier === "lead");
const more = all.filter((p) => p.tier === "more");

interface WorkProps {
  openId: string | null;
  onToggle: (id: string) => void;
}

/**
 * Lites of unequal size, as in a real partition: one tall feature, two stacked
 * beside it and a wide low lite under them. The "more" band uses 2/1/2 spans.
 */
const LITES: Record<string, { span: string; title: string; minH: string; feature?: boolean }> = {
  copenscene: {
    span: "md:col-span-2 lg:row-span-2",
    title: "text-[clamp(3.25rem,6.5vw,7rem)]",
    minH: "min-h-[24rem] lg:min-h-[34rem]",
    feature: true,
  },
  "new-era": { span: "", title: "text-[clamp(2.5rem,3.4vw,3.5rem)]", minH: "min-h-[17rem]" },
  citadel: { span: "", title: "text-[clamp(2.5rem,3.4vw,3.5rem)]", minH: "min-h-[17rem]" },
  "agent-clis": {
    span: "md:col-span-2 lg:col-span-3",
    title: "text-[clamp(2.75rem,4.5vw,4.5rem)]",
    minH: "min-h-[14rem]",
  },
};

const MORE_SPANS = ["lg:col-span-2", "", "lg:col-span-2"];
const MORE_TAIL_SPAN = "lg:col-span-5 lg:min-h-[9rem]";

function ClosedPane({ project, size, narrow }: { project: Project; size: "lead" | "more"; narrow: boolean }) {
  const lite = LITES[project.id];
  return (
    <div
      className={`flex h-full flex-col justify-between gap-10 p-6 lg:p-8 ${
        size === "lead" ? lite?.minH ?? "min-h-[17rem]" : "min-h-[15rem]"
      }`}
    >
      <span className="block">
        <span
          className={`block font-display leading-[0.92] uppercase ${
            size === "lead" ? lite?.title ?? "text-5xl" : "text-4xl"
          }`}
        >
          {project.title}
        </span>
        <span className={`mt-4 block max-w-[46ch] ${size === "lead" ? "text-lg" : ""}`}>{project.problem}</span>
      </span>
      {lite?.feature && (
        <span className="grid border-y border-rule md:grid-cols-2">
          <span className="block border-b border-rule py-5 md:border-b-0 md:pr-8">
            <span className="block max-w-[40ch] leading-relaxed text-dim">{project.people}</span>
          </span>
          <span className="block py-5 md:border-l md:border-rule md:pl-8">
            {project.build.slice(0, 2).map((b) => (
              <span key={b} className="mb-3 block max-w-[46ch] leading-relaxed last:mb-0">
                {b}
              </span>
            ))}
          </span>
        </span>
      )}
      <span className="flex flex-wrap justify-between gap-x-6 gap-y-1 text-sm text-dim">
        <span>
          {project.status} · <span className="tabular">{project.year}</span>
        </span>
        {!narrow && <span>{project.tech.join(" · ")}</span>}
      </span>
    </div>
  );
}

function OpenPane({ project, onClose }: { project: Project; onClose: () => void }) {
  const links = [
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
          <div className="flex gap-px bg-rule">
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
          </div>
        ) : (
          <p className="bg-pane p-6 text-dim lg:px-8">Private repository</p>
        )}
      </div>
    </div>
  );
}

function ProjectGrid({
  items,
  size,
  openId,
  onToggle,
  className,
}: { items: Project[]; size: "lead" | "more"; className: string } & WorkProps) {
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
      {items.map((p, i) => {
        const open = p.id === openId;
        const span = size === "lead" ? LITES[p.id]?.span ?? "" : MORE_SPANS[i] ?? "";
        return (
          <motion.article
            key={p.id}
            id={`project-${p.id}`}
            ref={(el) => {
              refs.current[p.id] = el;
            }}
            layout={!reduced}
            transition={glass(0.65)}
            className={`relative scroll-mt-14 bg-pane lg:scroll-mt-0 ${open ? "col-span-full" : span}`}
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
                  className={`block h-full w-full text-left transition-colors duration-500 ease-glass hover:bg-pane-lit ${
                    size === "lead" ? "bg-pane" : "bg-pane-2"
                  }`}
                >
                  <ClosedPane project={p} size={size} narrow={size === "more" && span === ""} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
      {size === "more" && (
        <a
          href="https://github.com/forsmark?tab=repositories"
          className={`flex min-h-[15rem] flex-col justify-between gap-8 bg-pane-rest p-6 transition-colors duration-500 ease-glass hover:bg-pane-lit lg:p-8 ${MORE_TAIL_SPAN}`}
        >
          <span className="flex justify-end text-dim">
            <ArrowUpRight />
          </span>
          <span className="block">
            <span className="block font-display text-4xl leading-[0.95] uppercase">Everything else on GitHub</span>
            <span className="mt-2 block text-sm text-dim">github.com/forsmark</span>
          </span>
        </a>
      )}
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
            Personal projects. Most of them run on my own self-hosted platform. Each one starts with a problem and
            the people who have it. Open a pane to read how it was built.
          </p>
        </Pane>
      </div>
      <LayoutGroup id="lead">
        <ProjectGrid items={lead} size="lead" openId={openId} onToggle={onToggle} className="md:grid-cols-2 lg:grid-cols-3" />
      </LayoutGroup>
      <Pane className="px-6 py-5 lg:px-8">
        <h3 className="font-display text-2xl tracking-[0.06em] uppercase">More projects</h3>
      </Pane>
      <LayoutGroup id="more">
        <ProjectGrid
          items={more}
          size="more"
          openId={openId}
          onToggle={onToggle}
          className="sm:grid-cols-2 lg:grid-cols-5"
        />
      </LayoutGroup>
    </section>
  );
}
