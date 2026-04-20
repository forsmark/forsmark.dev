import { motion } from "framer-motion";
import type { Project } from "../data/types";

const heightMap = { sm: "h-20", md: "h-28", lg: "h-36" };

export function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      onClick={onClick}
      className="bg-surface border border-white/[0.06] rounded-xl overflow-hidden cursor-pointer hover:border-accent-border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] break-inside-avoid mb-4"
    >
      <div
        className={`${heightMap[project.previewHeight ?? "md"]} bg-accent-subtle flex items-center justify-center overflow-hidden`}
      >
        {project.preview ? (
          <img
            src={project.preview}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <span className="text-[10px] text-accent">Preview</span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-bold">{project.title}</h3>
        <p className="text-[10px] text-text-muted mt-1">{project.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 bg-accent-subtle text-accent rounded text-[9px]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
