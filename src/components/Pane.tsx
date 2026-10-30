import { motion } from "framer-motion";
import type { HTMLAttributes } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { glass } from "../lib/motion";

type Tone = "glass" | "deep" | "rest" | "clear" | "signal" | "note";

const tones: Record<Tone, string> = {
  glass: "bg-pane text-ink",
  deep: "bg-pane-2 text-ink",
  rest: "bg-pane-rest text-ink",
  clear: "bg-clear text-bar",
  signal: "bg-signal text-signal-ink",
  note: "bg-note text-note-ink",
};

interface PaneProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  /** Dim the pane until it scrolls into view, as if a light comes on behind it. */
  reveal?: boolean;
}

/** One pane of glass in the wall. Bars come from the parent grid's 1px gap. */
export function Pane({ tone = "glass", reveal = true, className = "", children, ...rest }: PaneProps) {
  const reduced = useReducedMotion();

  return (
    <div className={`relative ${tones[tone]} ${className}`} {...rest}>
      {children}
      {reveal && !reduced && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-bar"
          initial={{ opacity: 0.6 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={glass(1.4)}
        />
      )}
    </div>
  );
}
