import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Pane } from "../components/Pane";
import { EmailPane } from "../components/EmailPane";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { glassEase } from "../lib/motion";
import resume from "../data/resume.json";
import projects from "../data/projects.json";
import type { Project } from "../data/types";

const featured = (projects as Project[]).filter((p) => p.tier === "lead").slice(0, 3);

/**
 * The name drifts across the portrait: in on load, then further as the visitor
 * scrolls, so the colour inversion visibly moves over the face.
 */
function Name() {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const intro = useMotionValue(reduced ? 0 : 9);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 30%", "end start"] });
  const x = useTransform([scrollYProgress, intro], ([s, i]: number[]) =>
    reduced ? "0%" : `${i - s * 16}%`,
  );

  useEffect(() => {
    if (reduced) return;
    const controls = animate(intro, 0, { duration: 1.8, ease: glassEase, delay: 0.15 });
    return () => controls.stop();
  }, [intro, reduced]);

  const [first, ...rest] = resume.name.split(" ");
  const last = rest.slice(0, -1).join(" ");

  return (
    <motion.h1
      ref={ref}
      style={{ x }}
      className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 font-display text-[clamp(5.5rem,23cqw,17rem)] lg:text-[clamp(5.5rem,24.5cqw,32rem)] leading-[0.84] font-bold text-white uppercase mix-blend-difference lg:left-8"
    >
      {first}
      <br />
      {last}
      <span className="sr-only"> {rest[rest.length - 1]}, {resume.title}</span>
    </motion.h1>
  );
}

export function Hero({ onOpenProject }: { onOpenProject: (id: string) => void }) {
  return (
    <section
      id="overview"
      aria-label="Overview"
      className="grid gap-px bg-rule lg:min-h-dvh lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[auto_minmax(0,1fr)_auto]"
    >
      <Pane
        reveal={false}
        className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 px-5 py-5 lg:col-span-2 lg:px-8"
      >
        <p className="font-display text-2xl uppercase tracking-[0.06em] lg:text-3xl">{resume.title}</p>
        <p className="text-dim">
          {resume.subtitle} · {resume.location}
        </p>
      </Pane>

      {/* Clear glass in both modes: dark type on light ground flips to white over the figure. */}
      <Pane tone="clear" reveal={false} className="isolate min-h-[34rem] overflow-hidden [container-type:inline-size] lg:min-h-0">
        <img
          src="/portrait.webp"
          alt="Marc Forsmark Nielsen in profile, in black and white"
          width={1024}
          height={1290}
          fetchPriority="high"
          className="absolute right-[-6%] bottom-0 h-[94%] w-auto max-w-none grayscale lg:right-[-2.5rem] lg:bottom-[-16%] lg:h-[114%]"
        />
        <Name />
      </Pane>

      <div className="grid gap-px bg-rule lg:grid-rows-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        {featured.map((p, i) => (
          <Pane key={p.id} tone={i === 0 ? "rest" : "deep"} reveal={false}>
            <button
              type="button"
              onClick={() => onOpenProject(p.id)}
              className="flex h-full w-full flex-col justify-end gap-3 p-6 text-left transition-colors duration-500 ease-glass hover:bg-pane-lit lg:p-7"
            >
              <span className={`block font-display uppercase leading-none ${i === 0 ? "text-5xl" : "text-3xl"}`}>
                {p.title}
              </span>
              {i === 0 && <span className="block max-w-[34ch]">{p.problem}</span>}
              <span className="block text-sm text-dim">
                {p.status} · <span className="tabular">{p.year}</span>
              </span>
            </button>
          </Pane>
        ))}
      </div>

      <div className="grid gap-px bg-rule md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:col-span-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_20rem]">
        <Pane reveal={false} className="flex items-end p-5 lg:p-8">
          <p className="max-w-[46ch] text-lg leading-snug">{resume.statement}</p>
        </Pane>
        <Pane reveal={false} className="flex items-end p-5 lg:p-8">
          <p className="font-display text-4xl leading-none uppercase lg:text-5xl">
            {resume.motto.split(". ").map((line, i, lines) => (
              <span key={line} className="block">
                {i < lines.length - 1 ? `${line}.` : line}
              </span>
            ))}
          </p>
        </Pane>
        <EmailPane className="min-h-44 md:col-span-2 lg:col-span-1" />
      </div>
    </section>
  );
}
