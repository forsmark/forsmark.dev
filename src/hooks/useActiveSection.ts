import { useState, useEffect } from "react";

/** The section whose top has passed 40% of the viewport height. */
export function useActiveSection(sectionIds: readonly string[]) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    function update() {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 8;
      if (atBottom) {
        setActive(sectionIds[sectionIds.length - 1]);
        return;
      }
      const line = window.innerHeight * 0.4;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds]);

  return active;
}
