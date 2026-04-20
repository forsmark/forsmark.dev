import { motion } from "framer-motion";
import { fadeInVariants } from "../lib/animation";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Education as EducationType } from "../data/types";

export function Education({ items }: { items: EducationType[] }) {
  const reduced = useReducedMotion();
  const variants = fadeInVariants(reduced);

  return (
    <section className="pt-8 mt-8 border-t border-border-subtle">
      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-xs tracking-[6px] uppercase text-accent mb-4"
      >
        Education
      </motion.p>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row gap-4"
      >
        {items.map((edu) => (
          <div
            key={`${edu.institution}-${edu.period}`}
            className="flex-1 p-4 bg-surface border border-white/[0.06] rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <h4 className="text-sm font-bold">{edu.degree}</h4>
            <p className="text-xs text-text-muted mt-1">
              {edu.institution} · {edu.period}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
