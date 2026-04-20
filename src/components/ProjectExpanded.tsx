import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siGithub } from "simple-icons";
import { transition } from "../lib/animation";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Project } from "../data/types";

export function ProjectExpanded({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const images = project.images ?? [];
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const imgs = images.map((img) => {
      const el = new Image();
      el.src = img.src;
      return el;
    });
    return () => { imgs.length = 0; };
  }, [images]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setSlide((s) => Math.min(s + 1, images.length - 1));
      if (e.key === "ArrowLeft") setSlide((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, images.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: reduced ? { duration: 0 } : transition(0.3) }}
      exit={{ opacity: 0, transition: reduced ? { duration: 0 } : transition(0.2) }}
      className="fixed inset-0 z-50 bg-bg-dark/80 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <div className="mx-auto max-w-3xl py-6 px-4 md:py-12 md:px-6" onClick={(e) => e.stopPropagation()}>
        <motion.div
          layoutId={`project-${project.id}`}
          className="bg-surface border border-white/[0.06] rounded-2xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_40px_rgba(0,0,0,0.3)]"
        >
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-text-muted hover:text-text-secondary hover:bg-white/[0.08] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              ✕
            </button>
          </div>

          {/* Carousel */}
          {images.length > 0 ? (
            <div className="mx-4 md:mx-6">
              <div className="relative overflow-hidden rounded-xl border border-white/[0.06]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={slide}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: reduced ? 0 : 0.2 }}
                  >
                    <div className="aspect-video bg-bg-dark flex items-center justify-center">
                      <img
                        src={images[slide].src}
                        alt={images[slide].caption ?? project.title}
                        className="w-full h-full object-contain block"
                      />
                    </div>
                    {images[slide].caption && (
                      <figcaption className="px-4 py-2 text-[10px] tracking-[2px] uppercase text-text-muted bg-bg-dark/40">
                        {images[slide].caption}
                      </figcaption>
                    )}
                  </motion.figure>
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSlide((s) => Math.max(s - 1, 0))}
                      disabled={slide === 0}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg-dark/70 flex items-center justify-center text-text-secondary disabled:opacity-20 hover:bg-bg-dark transition-all duration-200 cursor-pointer"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setSlide((s) => Math.min(s + 1, images.length - 1))}
                      disabled={slide === images.length - 1}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bg-dark/70 flex items-center justify-center text-text-secondary disabled:opacity-20 hover:bg-bg-dark transition-all duration-200 cursor-pointer"
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-3">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === slide ? "w-5 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-40 bg-accent-subtle flex items-center justify-center mx-4 md:mx-6 rounded-xl">
              <span className="text-xs text-accent">Project Screenshot / Demo Preview</span>
            </div>
          )}

          <div className="p-4 md:p-6">
            <h2 className="text-2xl font-black tracking-tight font-display">{project.title}</h2>
            <p className="text-sm text-accent mt-1">
              {project.tech.join(" · ")} · {project.year}
            </p>

            <div className="mt-5">
              <p className="text-xs tracking-[3px] uppercase text-accent font-semibold mb-2">About</p>
              <p className="text-xs text-text-muted leading-relaxed">{project.description}</p>
            </div>

            <div className="mt-5">
              <p className="text-xs tracking-[3px] uppercase text-accent font-semibold mb-2">Highlights</p>
              <div className="space-y-1.5">
                {project.highlights.map((h, i) => (
                  <p key={i} className="text-xs text-text-muted">→ {h}</p>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6 flex-wrap">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-accent text-bg-dark rounded-full text-xs font-semibold hover:bg-accent-light transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                >
                  Live Demo →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/[0.08] text-text-secondary rounded-full text-xs hover:border-white/[0.15] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true">
                    <path d={siGithub.path} />
                  </svg>
                  GitHub
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="md:hidden mt-5 w-full py-3.5 rounded-xl border border-white/[0.08] text-text-muted text-sm hover:border-white/[0.15] hover:text-text-secondary transition-all duration-300 cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
