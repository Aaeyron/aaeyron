"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { toggleTheme, type Theme } from "@/lib/client";

/** Follows <html data-theme>, which the pre-paint theme script sets. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const getServerTheme = (): Theme | null => null;

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const label = theme === "dark" ? "Switch to light mode" : theme === "light" ? "Switch to dark mode" : "Toggle dark mode";

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      className="tap inline-flex cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-ink"
      aria-label={label}
      title={label}
    >
      {/* Icons are swapped by CSS (dark: variant) so server and client markup always match. */}
      <Moon size={18} aria-hidden className="dark:hidden" />
      <Sun size={18} aria-hidden className="hidden dark:block" />
    </button>
  );
}
