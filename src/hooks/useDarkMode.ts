import { useEffect, useState } from "react";

const STORAGE_KEY = "jogo-dark-mode";

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem(STORAGE_KEY, String(dark));
  }, [dark]);

  const toggle = () => setDark((prev) => !prev);

  return { dark, toggle };
}
