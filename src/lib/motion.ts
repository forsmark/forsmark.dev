import type { Transition } from "framer-motion";

// Glass brightens and settles: a long exponential ease-out, never a bounce.
export const glassEase = [0.16, 1, 0.3, 1] as const;

export function glass(duration = 0.7): Transition {
  return { duration, ease: glassEase };
}
