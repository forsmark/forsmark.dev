import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siGithub } from "simple-icons";
import { fadeInVariants, transition } from "../lib/animation";
import { useReducedMotion } from "../hooks/useReducedMotion";
import resumeData from "../data/resume.json";

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const EP = ["marc", "forsmark", "dev"];

const btnBase =
  "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]";

export function Hero() {
  const reduced = useReducedMotion();
  const variants = fadeInVariants(reduced);
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    const addr = `${EP[0]}@${EP[1]}.${EP[2]}`;

    const fallbackCopy = (text: string) => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);
      return success;
    };

    const copyText = async (text: string) => {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
      return fallbackCopy(text);
    };

    copyText(addr)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Clipboard unsupported or copy failed; keep UI stable.
      });
  }

  const [first, ...rest] = resumeData.name.split(" ");
  const lastName = rest[rest.length - 1];
  const middleNames = rest.slice(0, -1).join(" ");

  return (
    <section id="hero" className="min-h-[85dvh] flex items-center pt-16 pb-16 xl:pt-8">
      <div className="w-full flex flex-col md:flex-row md:items-end gap-8">

        {/* LEFT — content */}
        <div className="flex-1">
          <motion.p
            variants={variants}
            initial="hidden"
            animate="visible"
            className="text-xs tracking-[6px] uppercase text-accent mb-6"
          >
            {resumeData.title}
          </motion.p>

          <motion.h1
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={reduced ? undefined : { ...transition(0.7), delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] font-display mb-8"
          >
            {first} {middleNames}
            <br />
            {lastName}
          </motion.h1>

          <motion.p
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={reduced ? undefined : { ...transition(0.7), delay: 0.2 }}
            className="text-sm text-text-muted leading-relaxed max-w-md mb-8"
          >
            {resumeData.aboutShort}
          </motion.p>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={reduced ? undefined : { ...transition(0.7), delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnBase} bg-accent text-bg-dark font-semibold hover:bg-accent-light`}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d={siGithub.path} />
              </svg>
              GitHub
            </a>

            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnBase} border border-white/[0.08] text-text-secondary hover:border-white/[0.15]`}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d={LINKEDIN_PATH} />
              </svg>
              LinkedIn
            </a>

            <button
              onClick={copyEmail}
              className={`${btnBase} border border-white/[0.08] text-text-secondary hover:border-white/[0.15] cursor-pointer`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.svg
                  key={copied ? "check" : "envelope"}
                  viewBox="0 0 24 24"
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                >
                  {copied ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  )}
                </motion.svg>
              </AnimatePresence>
              {copied ? "Copied!" : "Email"}
            </button>
          </motion.div>
        </div>

        {/* RIGHT — portrait */}
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={reduced ? undefined : { ...transition(0.9), delay: 0.15 }}
          className="hidden md:block shrink-0 w-80 lg:w-96 xl:w-[28rem]"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <img
            src="/portrait.webp"
            alt="Marc Forsmark Nielsen"
            className="w-full object-contain object-bottom select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
