"use client";

import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/lib/client";

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      className="tap inline-flex items-center justify-center rounded-md text-muted transition-colors duration-200 hover:text-ink"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {/* Icon is chosen by CSS so server and client markup always match. */}
      <Moon size={18} aria-hidden className="dark:hidden" />
      <Sun size={18} aria-hidden className="hidden dark:block" />
    </button>
  );
}
