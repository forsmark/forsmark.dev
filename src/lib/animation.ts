import type { Variants, Transition } from "framer-motion";

export function transition(duration = 0.6): Transition {
  return { duration, ease: [0.32, 0.72, 0, 1] };
}

export function pageVariants(reduced: boolean): Variants {
  if (reduced) {
    return { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } };
  }
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: transition(0.7) },
    exit: { opacity: 0, y: -16, transition: transition(0.4) },
  };
}

export function fadeInVariants(reduced: boolean): Variants {
  if (reduced) {
    return { hidden: { opacity: 1 }, visible: { opacity: 1 } };
  }
  return {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: transition(0.8) },
  };
}
