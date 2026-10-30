import { useCallback, useState } from "react";
import { NavColumn } from "./components/NavColumn";
import { Hero } from "./sections/Hero";
import { Work } from "./sections/Work";
import { Experience } from "./sections/Experience";
import { Principles } from "./sections/Principles";
import { Contact } from "./sections/Contact";

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  }, []);

  const openFromHero = useCallback((id: string) => setOpenId(id), []);

  return (
    <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-px lg:bg-rule">
      <NavColumn />
      {/* Sections meet at a 2px mullion; panes inside a section at a 1px bar. */}
      <main id="main-content" className="grid gap-0.5 bg-rule">
        <Hero onOpenProject={openFromHero} />
        <Principles />
        <Experience />
        <Work openId={openId} onToggle={toggle} />
        <Contact />
      </main>
    </div>
  );
}
