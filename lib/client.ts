"use client";

export type Theme = "light" | "dark";

/** Fallback only: how long .theme-fading stays on <html> — the 100ms colour fade plus a small buffer. */
const FADE_MS = 140;
let fadeTimer: ReturnType<typeof setTimeout> | undefined;
let transition: ViewTransition | null = null;
/** The theme being switched to, before a view transition has applied it to data-theme. */
let pending: Theme | null = null;

const currentTheme = (): Theme =>
  pending ?? (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

/**
 * Applies a theme with a 100ms cross-dissolve (globals.css, "Theme switch"):
 * - View Transitions where supported: the new page fades in over a snapshot of the old one.
 *   A change during a running transition skips it to the end and starts the new one.
 * - Otherwise .theme-fading colour transitions; a change mid-fade restarts the 140ms timer.
 * Neither leaves a class behind. With prefers-reduced-motion the switch is instant.
 */
export function setTheme(next: Theme, { remember = true }: { remember?: boolean } = {}): void {
  const root = document.documentElement;
  if (currentTheme() === next) return;

  const apply = () => {
    root.dataset.theme = next;
    if (remember) {
      try {
        localStorage.setItem("theme", next);
      } catch {}
    }
  };

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    apply();
    return;
  }

  if (typeof document.startViewTransition === "function") {
    transition?.skipTransition();
    root.classList.add("theme-vt");
    pending = next;
    const t = document.startViewTransition(apply);
    transition = t;
    t.finished.finally(() => {
      if (transition !== t) return; // a newer toggle owns the class now
      transition = null;
      pending = null;
      root.classList.remove("theme-vt");
    });
    return;
  }

  clearTimeout(fadeTimer);
  root.classList.add("theme-fading");
  void root.offsetHeight; // commit the transition rules before the colours change
  apply();
  fadeTimer = setTimeout(() => root.classList.remove("theme-fading"), FADE_MS);
}

/** Toggle button: flips the theme (with the fade) and remembers the choice. */
export function toggleTheme(): Theme {
  const next: Theme = currentTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

/**
 * Follow OS light/dark changes while the visitor hasn't picked a theme themselves
 * (nothing saved in localStorage). Returns a cleanup function.
 */
export function followSystemTheme(): () => void {
  const mq = matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {}
    if (saved === "light" || saved === "dark") return;
    setTheme(mq.matches ? "dark" : "light", { remember: false });
  };
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
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
