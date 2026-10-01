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

const icon =
  "absolute inset-0 m-auto transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const label = theme === "dark" ? "Switch to light mode" : theme === "light" ? "Switch to dark mode" : "Toggle dark mode";

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      className="tap relative inline-flex cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-ink"
      aria-label={label}
      title={label}
    >
      {/* Icons are swapped by CSS (dark: variant) so server and client markup always match. */}
      <span aria-hidden className="relative block size-[18px]">
        <Moon size={18} className={`${icon} rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-0 dark:opacity-0`} />
        <Sun size={18} className={`${icon} rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100`} />
      </span>
    </button>
  );
}
