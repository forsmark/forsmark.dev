import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import resumeData from "../data/resume.json";
import { transition } from "../lib/animation";
import {
  siReact, siTypescript, siTailwindcss, siLit, siFramer,
  siJest, siCypress,
  siGit, siFigma, siVite, siBun, siClaude, siNodedotjs,
  siPython, siOpenjdk, siGo, siOllama, siTanstack,
  siJavascript,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const SKILL_ICONS: Record<string, SimpleIcon> = {
  "React": siReact,
  "TypeScript": siTypescript,
  "JavaScript": siJavascript,
  "Tailwind CSS": siTailwindcss,
  "Lit": siLit,
  "Framer Motion": siFramer,
  "Jest": siJest,
  "Cypress": siCypress,
  "Git": siGit,
  "Figma": siFigma,
  "Vite": siVite,
  "Bun": siBun,
  "Claude Code": siClaude,
  "Python": siPython,
  "Java": siOpenjdk,
  "Go": siGo,
  "LLM": siOllama,
  "TanStack": siTanstack,
  "Node.js": siNodedotjs,
};

// Brand color overrides: pitch-black icons are invisible on dark bg;
// Playwright has no simple-icons entry so its brand green goes here too.
const HEX_OVERRIDES: Record<string, string> = {
  "Bun": "F9F0DC",
  "Java": "F89820",
  "LLM": "E8E8E8",
  "Playwright": "2EAD33",
  "TanStack": "FFFFFF",
};

const SKILL_URLS: Record<string, string> = {
  "React": "https://react.dev",
  "TypeScript": "https://www.typescriptlang.org",
  "JavaScript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "Tailwind CSS": "https://tailwindcss.com",
  "Lit": "https://lit.dev",
  "Framer Motion": "https://motion.dev",
  "Jest": "https://jestjs.io",
  "Playwright": "https://playwright.dev",
  "Cypress": "https://cypress.io",
  "Git": "https://git-scm.com",
  "Figma": "https://figma.com",
  "Vite": "https://vitejs.dev",
  "Bun": "https://bun.sh",
  "Claude Code": "https://claude.ai/code",
  "Python": "https://www.python.org",
  "LLM": "https://ollama.com",
  "Java": "https://openjdk.org",
  "Go": "https://go.dev",
  "TanStack": "https://tanstack.com",
  "Node.js": "https://nodejs.org",
};

function brand(name: string): string {
  const override = HEX_OVERRIDES[name];
  if (override) return `#${override}`;
  const icon = SKILL_ICONS[name];
  return icon ? `#${icon.hex}` : "#0d9488";
}

// Playwright logo paths (multi-color, fetched from playwright.dev/img/playwright-logo.svg)
function PlaywrightIcon({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" style={style} className={className} aria-hidden="true">
      <path d="M136.444 221.556C123.558 225.213 115.104 231.625 109.535 238.032C114.869 233.364 122.014 229.08 131.652 226.348C141.51 223.554 149.92 223.574 156.869 224.915V219.481C150.941 218.939 144.145 219.371 136.444 221.556ZM108.946 175.876L61.0895 188.484C61.0895 188.484 61.9617 189.716 63.5767 191.36L104.153 180.668C104.153 180.668 103.578 188.077 98.5847 194.705C108.03 187.559 108.946 175.876 108.946 175.876ZM149.005 288.347C81.6582 306.486 46.0272 228.438 35.2396 187.928C30.2556 169.229 28.0799 155.067 27.5 145.928C27.4377 144.979 27.4665 144.179 27.5336 143.446C24.04 143.657 22.3674 145.473 22.7077 150.721C23.2876 159.855 25.4633 174.016 30.4473 192.721C41.2301 233.225 76.8659 311.273 144.213 293.134C158.872 289.185 169.885 281.992 178.152 272.81C170.532 279.692 160.995 285.112 149.005 288.347ZM161.661 128.11V132.903H188.077C187.535 131.206 186.989 129.677 186.447 128.11H161.661Z" fill="#2D4552" />
      <path d="M193.981 167.584C205.861 170.958 212.144 179.287 215.465 186.658L228.711 190.42C228.711 190.42 226.904 164.623 203.57 157.995C181.741 151.793 168.308 170.124 166.674 172.496C173.024 167.972 182.297 164.268 193.981 167.584ZM299.422 186.777C277.573 180.547 264.145 198.916 262.535 201.255C268.89 196.736 278.158 193.031 289.837 196.362C301.698 199.741 307.976 208.06 311.307 215.436L324.572 219.212C324.572 219.212 322.736 193.41 299.422 186.777ZM286.262 254.795L176.072 223.99C176.072 223.99 177.265 230.038 181.842 237.869L274.617 263.805C282.255 259.386 286.262 254.795 286.262 254.795ZM209.867 321.102C122.618 297.71 133.166 186.543 147.284 133.865C153.097 112.156 159.073 96.0203 164.029 85.204C161.072 84.5953 158.623 86.1529 156.203 91.0746C150.941 101.747 144.212 119.124 137.7 143.45C123.586 196.127 113.038 307.29 200.283 330.682C241.406 341.699 273.442 324.955 297.323 298.659C274.655 319.19 245.714 330.701 209.867 321.102Z" fill="#2D4552" />
      <path d="M161.661 262.296V239.863L99.3324 257.537C99.3324 257.537 103.938 230.777 136.444 221.556C146.302 218.762 154.713 218.781 161.661 220.123V128.11H192.869C189.471 117.61 186.184 109.526 183.423 103.909C178.856 94.612 174.174 100.775 163.545 109.665C156.059 115.919 137.139 129.261 108.668 136.933C80.1966 144.61 57.179 142.574 47.5752 140.911C33.9601 138.562 26.8387 135.572 27.5049 145.928C28.0847 155.062 30.2605 169.224 35.2445 187.928C46.0272 228.433 81.663 306.481 149.01 288.342C166.602 283.602 179.019 274.233 187.626 262.291H161.661V262.296ZM61.0848 188.484L108.946 175.876C108.946 175.876 107.551 194.288 89.6087 199.018C71.6614 203.743 61.0848 188.484 61.0848 188.484Z" fill="#E2574C" />
      <path d="M341.786 129.174C329.345 131.355 299.498 134.072 262.612 124.185C225.716 114.304 201.236 97.0224 191.537 88.8994C177.788 77.3834 171.74 69.3802 165.788 81.4857C160.526 92.163 153.797 109.54 147.284 133.866C133.171 186.543 122.623 297.706 209.867 321.098C297.093 344.47 343.53 242.92 357.644 190.238C364.157 165.917 367.013 147.5 367.799 135.625C368.695 122.173 359.455 126.078 341.786 129.174ZM166.497 172.756C166.497 172.756 180.246 151.372 203.565 158C226.899 164.628 228.706 190.425 228.706 190.425L166.497 172.756ZM223.42 268.713C182.403 256.698 176.077 223.99 176.077 223.99L286.262 254.796C286.262 254.791 264.021 280.578 223.42 268.713ZM262.377 201.495C262.377 201.495 276.107 180.126 299.422 186.773C322.736 193.411 324.572 219.208 324.572 219.208L262.377 201.495Z" fill="#2EAD33" />
      <path d="M139.88 246.04L99.3324 257.532C99.3324 257.532 103.737 232.44 133.607 222.496L110.647 136.33L108.663 136.933C80.1918 144.611 57.1742 142.574 47.5704 140.911C33.9554 138.563 26.834 135.572 27.5001 145.929C28.08 155.063 30.2557 169.224 35.2397 187.929C46.0225 228.433 81.6583 306.481 149.005 288.342L150.989 287.719L139.88 246.04ZM61.0848 188.485L108.946 175.876C108.946 175.876 107.551 194.288 89.6087 199.018C71.6615 203.743 61.0848 188.485 61.0848 188.485Z" fill="#D65348" />
      <path d="M225.27 269.163L223.415 268.712C182.398 256.698 176.072 223.99 176.072 223.99L232.89 239.872L262.971 124.281L262.607 124.185C225.711 114.304 201.232 97.0224 191.532 88.8994C177.783 77.3834 171.735 69.3802 165.783 81.4857C160.526 92.163 153.797 109.54 147.284 133.866C133.171 186.543 122.623 297.706 209.867 321.097L211.655 321.5L225.27 269.163ZM166.497 172.756C166.497 172.756 180.246 151.372 203.565 158C226.899 164.628 228.706 190.425 228.706 190.425L166.497 172.756Z" fill="#1D8D22" />
      <path d="M141.946 245.451L131.072 248.537C133.641 263.019 138.169 276.917 145.276 289.195C146.513 288.922 147.74 288.687 149 288.342C152.302 287.451 155.364 286.348 158.312 285.145C150.371 273.361 145.118 259.789 141.946 245.451ZM137.7 143.451C132.112 164.307 127.113 194.326 128.489 224.436C130.952 223.367 133.554 222.371 136.444 221.551L138.457 221.101C136.003 188.939 141.308 156.165 147.284 133.866C148.799 128.225 150.318 122.978 151.832 118.085C149.393 119.637 146.767 121.228 143.776 122.867C141.759 129.093 139.722 135.898 137.7 143.451Z" fill="#C04B41" />
    </svg>
  );
}

// Unified icon renderer — handles both simple-icons (single fill) and Playwright (multi-color)
function SkillIcon({
  name,
  hovered,
  size,
}: {
  name: string;
  hovered: boolean;
  size: "md" | "sm";
}) {
  const color = brand(name);
  const dim = size === "md" ? "w-6 h-6" : "w-3 h-3";

  if (name === "Playwright") {
    return (
      <PlaywrightIcon
        className={`${dim} shrink-0 transition-[filter,opacity] duration-300`}
        style={{
          filter: hovered ? "none" : "grayscale(1)",
          opacity: hovered ? 1 : 0.5,
        }}
      />
    );
  }

  const icon = SKILL_ICONS[name];
  if (!icon) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={`${dim} shrink-0 transition-[fill] duration-300`}
      style={{ fill: hovered ? color : "#666666" }}
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function itemVariants(reduced: boolean) {
  if (reduced) return { hidden: { opacity: 1 }, visible: { opacity: 1 } };
  return {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: transition(0.5) },
  };
}

function PrimarySkillTile({ name, since, reduced }: { name: string; since: number; reduced: boolean }) {
  const [hovered, setHovered] = useState(false);
  const color = brand(name);
  const url = SKILL_URLS[name];

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants(reduced)}
      whileHover={reduced ? {} : { y: -4, transition: { duration: 0.18, ease: "easeOut" } }}
      whileTap={reduced ? {} : { scale: 0.92, transition: { type: "spring", stiffness: 500, damping: 16 } }}
      onHoverStart={() => !reduced && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? `${color}12` : undefined,
        borderColor: hovered ? `${color}55` : undefined,
      }}
      className="flex flex-col items-center px-4 py-4 border border-border bg-surface rounded-xl select-none transition-[border-color,background-color] duration-300 cursor-pointer"
    >
      <div className="mb-3">
        <SkillIcon name={name} hovered={hovered} size="md" />
      </div>
      <span
        className="block text-xs font-semibold leading-tight transition-colors duration-300 mb-1.5"
        style={{ color: hovered ? color : "#cccccc" }}
      >
        {name}
      </span>
      <span
        className="text-[10px] transition-colors duration-300"
        style={{ color: hovered ? `${color}99` : "#888888" }}
      >
        since {since}
      </span>
    </motion.a>
  );
}

function SecondarySkillPill({ name, since, reduced }: { name: string; since: number; reduced: boolean }) {
  const [hovered, setHovered] = useState(false);
  const color = brand(name);
  const url = SKILL_URLS[name];

  const Tag = url ? motion.a : motion.span;
  const linkProps = url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Tag
      {...(linkProps as object)}
      variants={itemVariants(reduced)}
      whileHover={reduced ? {} : { y: -2, transition: { duration: 0.15, ease: "easeOut" } }}
      whileTap={reduced ? {} : { scale: 0.92, transition: { type: "spring", stiffness: 500, damping: 16 } }}
      onHoverStart={() => !reduced && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      title={`since ${since}`}
      style={{ borderColor: hovered ? `${color}40` : undefined }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-subtle bg-surface rounded text-xs select-none transition-[border-color] duration-200 cursor-pointer"
    >
      <SkillIcon name={name} hovered={hovered} size="sm" />
      <span
        className="transition-colors duration-200"
        style={{ color: hovered ? "#cccccc" : "#888888" }}
      >
        {name}
      </span>
    </Tag>
  );
}

export function Skills() {
  const reduced = useReducedMotion();

  const primaryGroup = resumeData.skillGroups.find((g) => g.primary);
  const secondaryGroups = resumeData.skillGroups.filter((g) => !g.primary);

  return (
    <section id="skills" className="py-28 border-t border-border-subtle">
      <motion.p
        variants={itemVariants(reduced)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-xs tracking-[6px] uppercase text-accent mb-10"
      >
        Tech Stack
      </motion.p>

      {primaryGroup && (
        <div className="mb-12">
          <p className="text-[10px] text-text-dim uppercase tracking-[0.2em] mb-4">
            {primaryGroup.category}
          </p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3"
          >
            {primaryGroup.skills.map((skill) => (
              <PrimarySkillTile key={skill.name} name={skill.name} since={skill.since} reduced={reduced} />
            ))}
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {secondaryGroups.map((group) => (
          <div key={group.category}>
            <p className="text-[10px] text-text-dim uppercase tracking-[0.2em] mb-3">
              {group.category}
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {group.skills.map((skill) => (
                <SecondarySkillPill key={skill.name} name={skill.name} since={skill.since} reduced={reduced} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
