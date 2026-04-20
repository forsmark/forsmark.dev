import { motion } from "framer-motion";
import { fadeInVariants } from "../lib/animation";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Role } from "../data/types";

export function TimelineItem({ role }: { role: Role }) {
  const reduced = useReducedMotion();
  const variants = fadeInVariants(reduced);

  const [startYear, endYear] = role.period.split("–");

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex gap-6 relative"
    >
      <div className="shrink-0 w-16 text-right pt-1">
        <div className={`text-xs font-bold ${role.current ? "text-accent" : "text-text-muted"}`}>
          {startYear}
        </div>
        {endYear && <div className="text-[10px] text-text-dim">{endYear}</div>}
      </div>
      <div
        className={`w-3 h-3 rounded-full shrink-0 mt-1.5 z-10 border-[3px] border-bg-mid ${
          role.current ? "bg-accent" : "bg-text-muted"
        }`}
      />
      <div
        className={`flex-1 rounded-xl p-5 mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${
          role.current
            ? "bg-accent-subtle border border-accent-border"
            : "bg-surface border border-white/[0.06]"
        }`}
      >
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold">{role.title}</h3>
            <p className={`text-sm mt-0.5 ${role.current ? "text-accent" : "text-text-muted"}`}>
              {role.company}
            </p>
          </div>
          {role.current && (
            <span className="px-2.5 py-0.5 bg-accent-subtle text-accent rounded-full text-[10px] font-semibold">
              CURRENT
            </span>
          )}
        </div>
        <p className="text-xs text-text-muted mt-3 leading-relaxed">{role.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {role.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 bg-surface-hover text-text-secondary rounded text-[10px]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
