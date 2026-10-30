import { Pane } from "../components/Pane";
import resume from "../data/resume.json";

const row = "grid gap-px bg-rule md:grid-cols-[11rem_minmax(0,1fr)_minmax(0,1.5fr)]";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="grid gap-px bg-rule">
      <div className="grid gap-px bg-rule md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <Pane tone="rest" className="flex items-end p-6 [container-type:inline-size] lg:p-8">
          <h2 id="experience-title" className="font-display text-[clamp(3.5rem,18cqw,8rem)] leading-[0.85] uppercase">
            Experience
          </h2>
        </Pane>
        <Pane className="flex items-end p-6 lg:p-8">
          <p className="max-w-[52ch] text-lg leading-snug text-dim">
            Seven years on data-heavy products: an IoT platform, SaaS web applications, and now a medical data
            platform in a regulated industry.
          </p>
        </Pane>
      </div>

      {resume.roles.map((r) => (
        <div key={`${r.company}-${r.period}`} className={row}>
          <Pane tone="deep" className="p-6 text-dim lg:p-8">
            <p className="tabular">{r.period}</p>
          </Pane>
          <Pane className="p-6 lg:p-8">
            <h3 className="font-display text-3xl leading-none uppercase">{r.title}</h3>
            <p className="mt-2 text-dim">{r.company}</p>
          </Pane>
          <Pane className="p-6 lg:p-8">
            <ul className="space-y-3">
              {r.points.map((pt) => (
                <li key={pt} className="max-w-[62ch] leading-relaxed">
                  {pt}
                </li>
              ))}
            </ul>
          </Pane>
        </div>
      ))}

      <Pane className="px-6 py-5 lg:px-8">
        <h3 className="font-display text-2xl tracking-[0.06em] uppercase">Education</h3>
      </Pane>
      {resume.education.map((e) => (
        <div key={`${e.degree}-${e.period}`} className={row}>
          <Pane tone="deep" className="p-6 text-dim lg:px-8 lg:py-6">
            <p className="tabular">{e.period}</p>
          </Pane>
          <Pane className="p-6 lg:px-8 lg:py-6">
            <p className="text-lg">{e.degree}</p>
          </Pane>
          <Pane className="p-6 text-dim lg:px-8 lg:py-6">
            <p>{e.institution}</p>
          </Pane>
        </div>
      ))}
    </section>
  );
}
