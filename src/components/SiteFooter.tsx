import { Pane } from "./Pane";
import resume from "../data/resume.json";

// Simple Analytics' free plan requires this exact link on every page from December 2026.
const SA_LINK = "https://www.simpleanalytics.com?utm_source=forsmark.dev&utm_content=badge";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="grid gap-px bg-rule sm:grid-cols-2">
      <Pane tone="deep" reveal={false} className="px-6 py-5 text-sm text-dim lg:px-8">
        <p>
          © {year} {resume.name}
        </p>
      </Pane>
      <Pane tone="deep" reveal={false} className="px-6 py-5 text-sm text-dim sm:text-right lg:px-8">
        <a
          href={SA_LINK}
          referrerPolicy="origin"
          target="_blank"
          className="underline decoration-rule hover:text-ink hover:decoration-current"
        >
          100% privacy-first analytics by Simple Analytics
        </a>
      </Pane>
    </footer>
  );
}
