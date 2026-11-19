import { Pane } from "../../components/Pane";
import { EmailPane } from "../../components/EmailPane";
import { ArrowUpRight } from "../../components/Icons";
import { SiteFooter } from "../../components/SiteFooter";
import {
  CaseStudyNav,
  CodeExcerpt,
  ExternalLink,
  MaintainerTodo,
  Section,
  SectionHead,
  Shot,
  Stat,
  TextPane,
} from "../layout";
import statusAlerts from "./excerpts/status-alerts.ts.txt?raw";
import actName from "./excerpts/act-name.ts.txt?raw";
import tokens from "./excerpts/tokens.ts.txt?raw";

// Every number here was read from the private CopenScene repository on 2026-11-19.
// They drift as the project moves, so refresh them together.

const LIVE = "https://copenscene.rocks";
const SHOTS = "/projects/copenscene";

const FACTS = [
  { label: "Role", value: "Sole developer and maintainer" },
  { label: "This version", value: "Since 16 September 2026" },
  { label: "Status", value: "1.0.0 “Doors open” is a release candidate. Sign-up opens on 1 December 2026." },
  { label: "Stack", value: "TypeScript, NestJS, Postgres, Drizzle, React, Vite, TanStack, Playwright, OpenSpec" },
];

const STATS = [
  { value: "48", label: "capability specs" },
  { value: "1,889", label: "requirements in them" },
  { value: "3,426", label: "of 3,795 scenarios mapped to a test or a written reason" },
  { value: "2,554", label: "end-to-end runs in the last full suite, all passed" },
  { value: "~6,900", label: "unit and integration tests" },
  { value: "3,570", label: "commits since 16 September 2026" },
  { value: "53", label: "releases, and 76 release candidates" },
  { value: "26", label: "architecture decision records" },
];

const DECISIONS = [
  {
    adr: "ADR 0001",
    title: "The venue list is the boundary",
    decision:
      "A concert exists in CopenScene only if it happens at a venue on a hand-picked list. Genre and geography follow from the list. I rejected scraping the whole region and judging every event, because then each disputed booking becomes an argument about what the site covers.",
    cost: "Coverage grows one venue at a time, and each venue needs its own scraper. A festival on its own grounds was out of scope by construction. Festivals came later as a second curated list beside the venues (ADR 0017).",
  },
  {
    adr: "ADR 0004 and 0024",
    title: "A concert's key holds its date",
    decision:
      "A concert is matched across runs by venue, date and normalised headliner, kept beside a surrogate key. An earlier version hashed the event and ticket URLs, and a venue adding a ticket link after the announcement produced a duplicate.",
    cost: "A show moved to a new date became a new row, which I accepted as rare. On 31 October 2026 a venue moved a show from November 2026 to September 2027 on the same page, and the readers going to it heard nothing. ADR 0024 now reads that pair as a Move: the old concert reads postponed and names the new date, and its watches move with it.",
  },
  {
    adr: "ADR 0008",
    title: "Delisting tells nobody",
    decision:
      "When a concert drops off a venue's programme, CopenScene records it and sends nothing. A cancellation is read only from the status the venue publishes. I checked first: all 63 delistings in the database had a harmless cause. 61 came from one bad run, and two were shows that had already taken place.",
    cost: "The ADR names the risk: someone holding a ticket to a show a venue quietly withdraws is not told. It also says to reopen the decision the day such a case is seen. The moved show above was the first, and ADR 0024 answered it.",
  },
  {
    adr: "ADR 0011",
    title: "A digest window moves only on a send",
    decision:
      "The weekly digest is built from the catalogue when it is sent, and a row is written only when the mail went out. There is no outbox and no retry. A failed send leaves the window where it was.",
    cost: "Four failed weeks make the fifth digest hold five weeks of concerts. The first design measured the window seven days back from the pass, so a new reader whose first send failed lost that week. Both ends of the window are now stored moments.",
  },
];

export function CopenScene() {
  return (
    <>
      <CaseStudyNav />
      <main id="main-content" className="grid gap-0.5 bg-rule">
        {/* Header: the open project's oxblood pane, at full size. */}
        <section aria-labelledby="title" className="grid gap-px bg-rule lg:grid-cols-[minmax(0,1fr)_22rem]">
          <Pane tone="note" reveal={false} className="flex min-h-[26rem] flex-col justify-between gap-10 p-6 lg:min-h-[34rem] lg:p-8">
            <p className="font-display text-xl tracking-[0.08em] uppercase opacity-90">Case study</p>
            <div>
              <h1 id="title" className="font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.86] uppercase">
                CopenScene
              </h1>
              <p className="mt-6 max-w-[48ch] text-xl leading-snug">
                A free concert listing for Copenhagen's metal, hardcore and punk scene. I build and run it alone,
                with AI coding agents working inside a process I wrote down and enforce with checks.
              </p>
            </div>
          </Pane>
          <div className="grid gap-px bg-rule">
            {FACTS.map((f) => (
              <Pane key={f.label} reveal={false} className="p-6">
                <p className="text-sm text-dim">{f.label}</p>
                <p className="mt-1 leading-snug">{f.value}</p>
              </Pane>
            ))}
            <Pane tone="rest" reveal={false}>
              <a
                href={LIVE}
                className="flex h-full min-h-28 items-end justify-between gap-6 p-6 transition-colors duration-500 ease-glass hover:bg-pane-lit"
              >
                <span>
                  <span className="block font-display text-3xl leading-none uppercase">copenscene.rocks</span>
                  <span className="mt-2 block text-sm text-dim">The live site. The repository is private.</span>
                </span>
                <ArrowUpRight />
              </a>
            </Pane>
          </div>
        </section>

        <section aria-label="In numbers" className="grid grid-cols-2 gap-px bg-rule md:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </section>

        <Section id="problem">
          <SectionHead
            id="problem"
            title="Problem"
            lede="Metal, hardcore and punk concerts in and around Copenhagen are announced on each venue's own website, and nobody put them in one list."
          />
          <div className="grid gap-px bg-rule md:grid-cols-2">
            <TextPane title="The problem">
              <p>
                To know what's on next month, a fan had to check the programmes of a couple of dozen venues. Many
                of them mix the scene with everything else the venue books, and when a show sells out or moves, only
                that venue's page says so.
              </p>
              <p>
                The live site now reads 28 venues: 16 in Copenhagen, 7 elsewhere in Denmark and 5 across the
                bridge in Sweden. On the day of the screenshots below it listed 293 concerts and 7 festivals.
              </p>
            </TextPane>
            <TextPane title="The people">
              <p>
                Fans of the scene. Anyone can browse without an account, and an account adds watches, follows, a
                Profile and mail.
              </p>
              <p>
                During the beta, accounts came by invitation. Sign-up opens to everyone with 1.0.0 on 1 December
                2026. The site is free and non-commercial.
              </p>
            </TextPane>
          </div>
        </Section>

        <Section id="product">
          <SectionHead
            id="product"
            title="Product"
            lede="A catalogue anyone can read, and an account for the people who want to hear when something changes."
          />
          <div className="grid gap-px bg-rule md:grid-cols-2">
            <TextPane title="The catalogue">
              <p>
                For a visitor the home page is the catalogue. Search by band or venue, and narrow it by genre,
                venue, ticket status, dates and price. The filters live in the address, so a filtered list can be
                shared and returned to.
              </p>
            </TextPane>
            <TextPane title="A concert's page">
              <p>
                Each concert is drawn as a ticket, with the line-up, genres, venue, price, door time and a Tickets
                button. It can go into your calendar or become a picture for an Instagram story. Where the headliner
                has played enough recent shows, the page offers a playlist of the songs it is likely to play.
              </p>
            </TextPane>
            <TextPane title="Watches, follows and Clashes">
              <p>
                A reader watches a concert, and marks it going once they hold a ticket. Following a band brings a
                mail when a venue books it, and following friends shows where they are going.
              </p>
              <p>
                A concert you are not going to that shares a day with one you are going to is a Clash. The
                catalogue dims it, and the concert's page names the show it clashes with.
              </p>
            </TextPane>
            <TextPane title="The mail">
              <p>
                A welcome mail after sign-up. An alert when a watched show is nearly sold out, postponed or
                cancelled, and a booking alert when a venue books a band you follow. On the day of a show you are
                going to, a reminder arrives three hours before doors. A weekly digest lists every concert found
                since the last one. Each of them but the welcome mail has its own switch.
              </p>
            </TextPane>
          </div>
          <TextPane title="The visual identity" tone="deep">
            <p>
              The look is written as a spec too, with 34 requirements: one dark theme, and six colours with one
              meaning each. Orange fills the Tickets button and no other control, and only a ticket has a cut
              corner. Every control takes a tap of 44 by 44 pixels. The contrast ratio behind each colour sits next
              to it in the code, as the third excerpt below shows.
            </p>
          </TextPane>

          <div className="grid gap-px bg-rule">
            <Shot
              src={`${SHOTS}/catalogue-desktop.webp`}
              width={1600}
              height={1000}
              alt="The CopenScene catalogue on a desktop screen: filters on the left, concerts drawn as tickets on the right."
              caption="The catalogue, with the introduction a first-time visitor sees"
            />
            <div className="grid gap-px bg-rule md:grid-cols-2">
              <Shot
                src={`${SHOTS}/concert-desktop.webp`}
                width={1600}
                height={775}
                alt="One concert's page, drawn as a ticket with the date on its stub and an orange Tickets button."
                caption="A concert's page"
              />
              <Shot
                src={`${SHOTS}/venues-desktop.webp`}
                width={1600}
                height={1000}
                alt="A dark map of Zealand and southern Sweden with a pin for each venue."
                caption="The venues on a map, drawn from map files the site serves itself"
              />
            </div>
            <div className="grid gap-px bg-rule sm:grid-cols-3">
              {[
                ["catalogue-phone", "The catalogue on a phone", "The catalogue at phone width, with filters folded into one button."],
                ["concert-phone", "A concert's page on a phone", "A concert's page at phone width."],
                ["about-phone", "The about page on a phone", "The about page at phone width, listing the venues by region."],
              ].map(([file, caption, alt]) => (
                <Shot
                  key={file}
                  src={`${SHOTS}/${file}.webp`}
                  width={780}
                  height={1688}
                  alt={alt}
                  caption={caption}
                  className="[&>img]:mx-auto [&>img]:max-w-[18rem]"
                />
              ))}
            </div>
          </div>
        </Section>

        <Section id="architecture">
          <SectionHead
            id="architecture"
            title="Architecture"
            lede="A TypeScript monorepo on pnpm and Turborepo: four apps that share five packages over one Postgres database."
          />
          <div className="grid gap-px bg-rule lg:grid-cols-3" role="group" aria-label="How data moves through CopenScene">
            <div className="flex flex-col gap-px bg-rule [&>*:last-child]:flex-1">
              <Pane tone="rest" className="px-6 py-4 font-display text-xl tracking-[0.06em] uppercase lg:px-8">
                1 · Read
              </Pane>
              <Pane className="p-6 lg:px-8">
                <p className="font-display text-2xl uppercase">Venue websites</p>
                <p className="mt-2 text-dim">28 venues, each read by its own scraper on a schedule.</p>
              </Pane>
              <Pane className="p-6 lg:px-8">
                <p className="font-display text-2xl uppercase">Public music databases</p>
                <p className="mt-2 text-dim">Genre tags for bands, to judge whether a show belongs.</p>
              </Pane>
            </div>
            <div className="flex flex-col gap-px bg-rule [&>*:last-child]:flex-1">
              <Pane tone="rest" className="px-6 py-4 font-display text-xl tracking-[0.06em] uppercase lg:px-8">
                2 · Store
              </Pane>
              <Pane className="p-6 lg:px-8">
                <p className="font-display text-2xl uppercase">Scraper worker</p>
                <p className="mt-2 text-dim">
                  A standalone NestJS process. Its scheduled passes scrape the venues, check ticket status in the
                  two weeks before each show, enrich bands and send the mail.
                </p>
              </Pane>
              <Pane className="p-6 lg:px-8">
                <p className="font-display text-2xl uppercase">Postgres</p>
                <p className="mt-2 text-dim">Schema, migrations and typed queries in Drizzle.</p>
              </Pane>
            </div>
            <div className="flex flex-col gap-px bg-rule [&>*:last-child]:flex-1">
              <Pane tone="rest" className="px-6 py-4 font-display text-xl tracking-[0.06em] uppercase lg:px-8">
                3 · Serve
              </Pane>
              <Pane className="p-6 lg:px-8">
                <p className="font-display text-2xl uppercase">API</p>
                <p className="mt-2 text-dim">NestJS over REST, with its OpenAPI document generated from the code.</p>
              </Pane>
              <Pane className="p-6 lg:px-8">
                <p className="font-display text-2xl uppercase">Web app</p>
                <p className="mt-2 text-dim">React on Vite, with TanStack Router and Query, and a MapLibre map.</p>
              </Pane>
              <Pane className="p-6 lg:px-8">
                <p className="font-display text-2xl uppercase">Console</p>
                <p className="mt-2 text-dim">A second React app, for the maintainer only. It is not public.</p>
              </Pane>
              <Pane className="p-6 lg:px-8">
                <p className="font-display text-2xl uppercase">Mail</p>
                <p className="mt-2 text-dim">Templates in React Email, written to read right when a client drops the CSS.</p>
              </Pane>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3 lg:grid-cols-5" role="group" aria-label="Shared packages">
            {[
              ["contracts", "Shared types and zod schemas"],
              ["db", "Schema, migrations and queries"],
              ["identity", "Colours and the ticket shape"],
              ["mail", "Every mail template"],
              ["nest", "Modules both Nest apps use"],
            ].map(([name, what]) => (
              <Pane key={name} tone="deep" className="p-5 lg:px-7">
                <p className="font-mono text-sm">packages/{name}</p>
                <p className="mt-1 text-sm text-dim">{what}</p>
              </Pane>
            ))}
          </div>
          <TextPane>
            <p>
              The scraper runs as its own process, so a crash while reading one venue cannot take the site down
              (ADR 0003). NestJS was more ceremony than three read-only endpoints needed when I chose it. I took
              that cost knowingly. The plan already held notifications, playlists and an admin surface, Nest's
              conventions give an agent one obvious place for each of them, and I wanted to learn it.
            </p>
            <p>
              A first run for a venue is slow, because door times are often only on each concert's own page. After
              that a run re-reads only the concerts whose listing changed, and a daily pass takes a couple of
              seconds.
            </p>
          </TextPane>
        </Section>

        <Section id="process">
          <SectionHead
            id="process"
            title="How it is built"
            lede="Specs say what the site does, and a coverage map ties their scenarios to tests. AI agents write most of the code."
          />
          <div className="grid gap-px bg-rule md:grid-cols-2">
            <TextPane title="Specs first">
              <p>
                Behaviour lives in 48 capability specs in OpenSpec, with 1,889 requirements and 3,795 scenarios. A
                change that alters behaviour carries an OpenSpec change, proposed, applied and archived in the same
                pull request. 433 changes have been archived so far.
              </p>
              <p>
                A glossary fixes the words for code, specs and issue titles alike. A Concert is never an event,
                partly because <code className="font-mono text-[0.9em]">Event</code> collides with the DOM type in
                TypeScript.
              </p>
            </TextPane>
            <TextPane title="From scenario to test">
              <p>
                Every scenario has one entry in a coverage map. It names an end-to-end test, a unit test, or the
                reason no test can show it. Today 1,683 scenarios point to a Playwright test, 1,654 to a unit test
                and 89 carry a reason. 369 older scenarios wait on a list that is only allowed to shrink.
              </p>
              <p>
                The check runs in <code className="font-mono text-[0.9em]">pnpm verify</code> in under a second. It
                fails a new scenario that has neither a test nor a reason, and a scenario whose steps changed while
                its test did not. Other
                checks make a requirement carry a scenario for each SHALL sentence, and keep any one fact in a
                single spec.
              </p>
            </TextPane>
            <TextPane title="Why the checks exist">
              <p>
                On 17 September 2026, the second day of the project, a change shipped with every
                task ticked and the suite green, and the identifier it specified was stored for no row at all.
                Nobody was careless. The workflow let it through, so the workflow changed.
              </p>
            </TextPane>
            <TextPane title="Agents build, I decide">
              <p>
                I work through one main Claude Code session. With me, it refines each issue and writes the OpenSpec
                proposal. Then it hands the issue to a builder agent in its own git worktree, at most two at a
                time. A builder applies the change, writes the tests and opens a pull request.
              </p>
              <p>
                3,484 of the 3,570 commits carry an AI co-author. Releases, deploys and the production server stay
                with me: an agent touches them only when I ask.
              </p>
            </TextPane>
            <TextPane title="Review has three questions">
              <p>Every pull request is answered in a comment before it merges:</p>
              <ol className="grid list-decimal gap-2 pl-5">
                <li>Each spec edit made after the proposal: accept it, or revert it.</li>
                <li>Each thing in the diff a reader or a schedule would notice: the requirement that states it.</li>
                <li>Each new or changed scenario: the file and line of the assertion that shows its outcome.</li>
              </ol>
              <p>An answer that cannot be given is a finding, and goes back to the builder.</p>
            </TextPane>
            <TextPane title="Releases">
              <p>
                Work ships in batches on a release branch. A merge runs only the tests its change can reach. Once per
                batch the whole suite runs, end-to-end in desktop Chromium and again as an iPhone in WebKit. The last
                full run passed 2,554 of 2,554.
              </p>
              <p>
                I test each release candidate by hand in a throwaway environment with seeded data, then promote it.
                That made 53 releases between 25 September and 14 November 2026. Since 0.21.0 each batch has a theme
                and a name, such as Read the poster, Fits in your hand and Finding your sound. The changelog's reader
                lines appear on the site once for each returning reader.
              </p>
            </TextPane>
          </div>
          <TextPane tone="deep">
            <p>
              A change to any page is checked on a phone before its pull request opens. A script opens every page in
              WebKit as an iPhone and in Chromium at 360 pixels wide, and the pull request carries its summary.
            </p>
          </TextPane>
        </Section>

        <Section id="decisions">
          <SectionHead
            id="decisions"
            title="Decisions"
            lede="26 decisions are written down as ADRs, each with the options I turned down and what the choice costs. Four of them:"
          />
          <div className="grid gap-px bg-rule md:grid-cols-2">
            {DECISIONS.map((d) => (
              <Pane key={d.adr} className="flex flex-col gap-6 p-6 lg:p-8">
                <div>
                  <p className="text-sm text-dim">{d.adr}</p>
                  <h3 className="mt-2 font-display text-[clamp(1.875rem,2.6vw,2.5rem)] leading-[0.95] uppercase">{d.title}</h3>
                </div>
                <p className="max-w-[60ch] leading-relaxed">{d.decision}</p>
                <div className="border-t border-rule pt-5">
                  <h4 className="font-display text-lg tracking-[0.06em] uppercase text-dim">What it costs</h4>
                  <p className="mt-2 max-w-[60ch] leading-relaxed">{d.cost}</p>
                </div>
              </Pane>
            ))}
          </div>
        </Section>

        <Section id="code">
          <SectionHead
            id="code"
            title="Code"
            lede="Three short excerpts, as they stand in the repository. A comment there follows one written rule: it is a reason, an invariant, a measurement or a trap."
          />
          <CodeExcerpt path="packages/db/src/status-alerts.ts" code={statusAlerts}>
            <p>
              The whole rule for status alerts, in one function beside the data it filters. An alert that a reader's
              preference declines is never written (ADR 0010), so a pending alert in the outbox always means one
              that has yet to be sent.
            </p>
          </CodeExcerpt>
          <CodeExcerpt path="packages/contracts/src/act-name.ts" code={actName}>
            <p>
              Venues spell bands differently, and one band has to be one Act. “Mgła”, “MGŁA” and “Mgla” reduce to
              the same key, and so does “Мгла” in Cyrillic (ADR 0019). The function lives in the contracts package,
              so the web app builds a band's address the same way the API does.
            </p>
          </CodeExcerpt>
          <CodeExcerpt path="packages/identity/src/tokens.ts" code={tokens}>
            <p>
              The six colours as values. Each comment holds the measured contrast that decided it, and a test fails
              when the stylesheet and these numbers disagree.
            </p>
          </CodeExcerpt>
        </Section>

        <Section id="hindsight">
          <SectionHead
            id="hindsight"
            title="Hindsight"
            lede="CopenScene was built before, in an earlier repository. The ADRs record what those versions taught, and where this one got it wrong first."
          />
          <div className="grid gap-px bg-rule md:grid-cols-2">
            <TextPane title="From earlier versions">
              <p>
                One filtered by genre during the scrape, so a concert it rejected was never stored. Widening the
                scene meant re-scraping history that no longer existed. Now every verdict is stored with its source,
                and can be recomputed without a scrape (ADR 0002).
              </p>
              <p>One keyed a concert on a hash of two URLs, and a late ticket link duplicated it (ADR 0004).</p>
            </TextPane>
            <TextPane title="In this version">
              <p>
                Three things on this page were changed after they went wrong: the empty identifier that led to the
                coverage map, the digest window (ADR 0011) and the moved show (ADR 0024).
              </p>
              <p>
                ADR 0008 also corrected the evidence an earlier decision had cited. The 60 rows blamed on delisting
                came from a stale build, and the decision stood on better grounds.
              </p>
            </TextPane>
          </div>
          <MaintainerTodo>
            TODO(maintainer): In your own words, what would you do differently if you started CopenScene again? The
            repository records the corrections above, but not your view of them.
          </MaintainerTodo>
        </Section>

        <section aria-label="Contact" className="grid gap-px bg-rule md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
          <TextPane>
            <p className="text-lg leading-snug">
              The live site is at <ExternalLink href={LIVE}>copenscene.rocks</ExternalLink>. Email me with
              questions about how it is built.
            </p>
          </TextPane>
          <EmailPane size="lg" className="min-h-[12rem]" />
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
