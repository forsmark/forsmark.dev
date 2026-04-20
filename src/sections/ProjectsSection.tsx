import { useState, useCallback } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { MasonryGrid } from "../components/MasonryGrid";
import { ProjectExpanded } from "../components/ProjectExpanded";
import { fadeInVariants } from "../lib/animation";
import { useReducedMotion } from "../hooks/useReducedMotion";
import projectsData from "../data/projects.json";
import type { Project } from "../data/types";

export function ProjectsSection() {
  const reduced = useReducedMotion();
  const variants = fadeInVariants(reduced);
  const [selected, setSelected] = useState<Project | null>(null);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <LayoutGroup>
      <section id="projects" className="py-28 border-t border-border-subtle">
        <motion.p
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs tracking-[6px] uppercase text-accent mb-3"
        >
          Side
        </motion.p>
        <motion.h2
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-black tracking-tight font-display"
        >
          Projects
        </motion.h2>
        <MasonryGrid
          projects={projectsData as Project[]}
          onSelect={setSelected}
        />
      </section>
      <AnimatePresence>
        {selected && (
          <ProjectExpanded project={selected} onClose={handleClose} />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
