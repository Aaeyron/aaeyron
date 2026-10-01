"use client";

export type Theme = "light" | "dark";

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

const THEME_FADE_MS = 300;
const THEME_REVEAL_MS = 500;

/**
 * Flips the theme and remembers the choice. With motion allowed, the new theme
 * expands in a circle from `origin` (View Transitions API), or colours fade where
 * that API is missing. With reduced motion it switches instantly.
 */
export function toggleTheme(origin?: { x: number; y: number }): Theme {
  const root = document.documentElement;
  const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyTheme(next);
    return next;
  }

  if (typeof document.startViewTransition === "function") {
    const x = origin?.x ?? innerWidth / 2;
    const y = origin?.y ?? 0;
    // Distance to the farthest corner, so the circle always covers the screen.
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: THEME_REVEAL_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
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
