"use client";

export type Theme = "light" | "dark";

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

/** Keep in sync with the theme crossfade duration in globals.css. */
const THEME_FADE_MS = 400;

/**
 * Flips the theme and remembers the choice. With motion allowed, old and new
 * themes crossfade (View Transitions API, animated in globals.css), or colours
 * fade where that API is missing. With reduced motion it switches instantly.
 */
export function toggleTheme(): Theme {
  const root = document.documentElement;
  const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyTheme(next);
    return next;
  }

  if (typeof document.startViewTransition === "function") {
    document.startViewTransition(() => applyTheme(next));
    return next;
  }

  // Fallback: fade colours, only for the duration of this switch.
  root.classList.add("theme-transition");
  applyTheme(next);
  window.setTimeout(() => root.classList.remove("theme-transition"), THEME_FADE_MS + 50);
  return next;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without the async clipboard API.
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      el.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
