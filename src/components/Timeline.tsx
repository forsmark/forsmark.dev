import { TimelineItem } from "./TimelineItem";
import type { Role } from "../data/types";

export function Timeline({ roles }: { roles: Role[] }) {
  return (
    <div className="relative pl-4 mt-4">
      <div className="absolute left-[5.5rem] top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-transparent" />
      {roles.map((role) => (
        <TimelineItem key={`${role.company}-${role.period}`} role={role} />
      ))}
    </div>
  );
}
