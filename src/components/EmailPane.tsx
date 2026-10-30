import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "./Icons";
import { Pane } from "./Pane";
import resume from "../data/resume.json";

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "absolute";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
}

/** The one lit pane in the wall: the primary action. */
export function EmailPane({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    copyText(resume.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Copy is a convenience; the mailto link still works.
      });
  }

  return (
    <Pane tone="signal" reveal={false} className={`flex flex-col justify-between gap-6 ${className}`}>
      <a
        href={`mailto:${resume.email}`}
        className="group flex flex-1 flex-col justify-between gap-6 p-6 transition-[background-color] duration-500 ease-glass hover:bg-white/8 lg:p-7"
      >
        <span className="flex justify-end">
          <ArrowUpRight className="size-5 transition-transform duration-500 ease-glass group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
        <span
          aria-label={`Email ${resume.email}`}
          className={`font-display uppercase leading-none tracking-[0.02em] ${
            size === "lg" ? "text-[clamp(2.25rem,6vw,5.5rem)]" : "text-[clamp(1.75rem,2.05vw,2rem)]"
          }`}
        >
          {resume.email}
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        className="absolute top-4 left-3 flex h-9 items-center gap-2 px-3 text-sm underline-offset-4 hover:underline lg:left-4"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </Pane>
  );
}
