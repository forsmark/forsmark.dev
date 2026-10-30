import { Pane } from "../components/Pane";
import { EmailPane } from "../components/EmailPane";
import { ArrowUpRight, GitHub, LinkedIn } from "../components/Icons";
import resume from "../data/resume.json";

const SA_LINK = "https://www.simpleanalytics.com?utm_source=forsmark.dev&utm_content=badge";

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" aria-labelledby="contact-title" className="grid gap-px bg-rule">
      <div className="grid gap-px bg-rule md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <Pane tone="rest" className="flex items-end p-6 [container-type:inline-size] lg:p-8">
          <h2 id="contact-title" className="font-display text-[clamp(3.5rem,18cqw,8rem)] leading-[0.85] uppercase">
            Contact
          </h2>
        </Pane>
        <Pane className="flex items-end p-6 lg:p-8">
          <p className="max-w-[52ch] text-lg leading-snug text-dim">
            Email is the quickest way to reach me.
          </p>
        </Pane>
      </div>

      <EmailPane size="lg" className="min-h-[14rem]" />

      <div className="grid gap-px bg-rule sm:grid-cols-2">
        {[
          { href: resume.linkedin, label: "LinkedIn", detail: "marc-forsmark-nielsen", icon: <LinkedIn className="size-5" /> },
          { href: resume.github, label: "GitHub", detail: "forsmark", icon: <GitHub className="size-5" /> },
        ].map((l) => (
          <Pane key={l.label} reveal={false}>
            <a
              href={l.href}
              className="group flex h-full min-h-40 flex-col justify-between gap-6 p-6 transition-colors duration-500 ease-glass hover:bg-pane-lit lg:p-8"
            >
              <span className="flex justify-between text-dim">
                {l.icon}
                <ArrowUpRight className="size-5 transition-transform duration-500 ease-glass group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span>
                <span className="block font-display text-4xl leading-none uppercase">{l.label}</span>
                <span className="mt-2 block text-dim">{l.detail}</span>
              </span>
            </a>
          </Pane>
        ))}
      </div>

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
    </section>
  );
}
