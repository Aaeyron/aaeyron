"use client";

export type Theme = "light" | "dark";

/**
 * Flips the theme instantly and remembers the choice. Transitions are switched
 * off for that one frame (.theme-switching in globals.css), so nothing eases its
 * colours; hover transitions work again from the next frame.
 */
export function toggleTheme(): Theme {
  const root = document.documentElement;
  const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
  root.classList.add("theme-switching");
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
  void root.offsetHeight; // apply the new colours while transitions are off
  requestAnimationFrame(() => root.classList.remove("theme-switching"));
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
