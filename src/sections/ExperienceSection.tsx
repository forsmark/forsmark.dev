import { motion } from "framer-motion";
import { Timeline } from "../components/Timeline";
import { Education } from "../components/Education";
import { fadeInVariants } from "../lib/animation";
import { useReducedMotion } from "../hooks/useReducedMotion";
import resumeData from "../data/resume.json";
import type { Role, Education as EducationType } from "../data/types";

export function ExperienceSection() {
  const reduced = useReducedMotion();
  const variants = fadeInVariants(reduced);

  return (
    <section id="experience" className="py-28 border-t border-border-subtle">
      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-xs tracking-[6px] uppercase text-accent mb-3"
      >
        Career
      </motion.p>
      <motion.h2
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl font-black tracking-tight font-display"
      >
        Experience
      </motion.h2>
      <motion.p
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-sm text-text-muted mt-2"
      >
        7+ years building interfaces across medical tech, SaaS, IoT & robotics
      </motion.p>
      <Timeline roles={resumeData.roles as Role[]} />
      <Education items={resumeData.education as EducationType[]} />
    </section>
  );
}
