import { Pane } from "../components/Pane";
import resume from "../data/resume.json";

export function Principles() {
  return (
    <section id="principles" aria-labelledby="principles-title" className="grid gap-px bg-rule">
      <div className="grid gap-px bg-rule md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <Pane tone="rest" className="flex items-end p-6 [container-type:inline-size] lg:p-8">
          <h2 id="principles-title" className="font-display text-[clamp(3.5rem,18cqw,8rem)] leading-[0.85] uppercase">
            Principles
          </h2>
        </Pane>
        <Pane className="flex items-end p-6 lg:p-8">
          <p className="max-w-[52ch] text-lg leading-snug text-dim">
            How I work on AI and on products in regulated industries.
          </p>
        </Pane>
      </div>
      <div className="grid gap-px bg-rule md:grid-cols-3">
        {resume.principles.map((p) => (
          <Pane key={p.title} className="flex flex-col gap-4 p-6 md:min-h-[20rem] md:justify-between md:gap-10 lg:p-8">
            <h3 className="font-display text-[clamp(2.5rem,3.6vw,3.5rem)] leading-[0.92] uppercase">{p.title}</h3>
            <p className="max-w-[40ch] text-lg leading-snug">{p.body}</p>
          </Pane>
        ))}
      </div>
    </section>
  );
}
