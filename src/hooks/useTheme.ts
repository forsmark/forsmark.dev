import { useCallback, useState } from "react";

export type Theme = "dark" | "light";

const KEY = "theme";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Dark is the default. index.html applies a stored choice before first paint. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only.
    }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
