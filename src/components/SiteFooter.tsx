import { Pane } from "./Pane";
import resume from "../data/resume.json";

// Simple Analytics' free plan requires this exact link on every page from December 2026.
const SA_LINK = "https://www.simpleanalytics.com?utm_source=forsmark.dev&utm_content=badge";

type Colors = { background: string; text: string; logo: string };

const badgeSrc = (c: Colors) =>
  `https://simpleanalyticsbadges.com/forsmark.dev?background=${c.background}&text=${c.text}&logo=${c.logo}&radius=0&counter=false`;

// The badge image cannot follow the site's theme toggle, so each theme gets its own copy and CSS shows one.
// The colours are the footer's own: pane-2 behind, dim for the text and bars.
const BADGES = [
  { colors: { background: "151719", text: "9a9ea3", logo: "9a9ea3" }, className: "in-data-[theme=light]:hidden" },
  { colors: { background: "dad9d1", text: "565a60", logo: "565a60" }, className: "hidden in-data-[theme=light]:block" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="grid gap-px bg-rule sm:grid-cols-2">
      <Pane tone="deep" reveal={false} className="flex items-center px-6 py-5 text-sm text-dim lg:px-8">
        <p>
          © {year} {resume.name}
        </p>
      </Pane>
      <Pane tone="deep" reveal={false} className="flex items-center px-6 py-3 sm:justify-end lg:px-8">
        <a href={SA_LINK} referrerPolicy="origin" target="_blank" className="inline-block w-[168px]">
          {BADGES.map((b) => (
            <img
              key={b.className}
              src={badgeSrc(b.colors)}
              width={210}
              height={50}
              alt="Simple Analytics"
              loading="lazy"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className={`h-auto w-full ${b.className}`}
            />
          ))}
        </a>
      </Pane>
    </footer>
  );
}
