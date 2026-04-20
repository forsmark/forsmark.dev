import { ProjectCard } from "./ProjectCard";
import type { Project } from "../data/types";

export function MasonryGrid({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (project: Project) => void;
}) {
  return (
    <div className="columns-1 sm:columns-2 gap-4 mt-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onSelect(project)}
        />
      ))}
    </div>
  );
}
