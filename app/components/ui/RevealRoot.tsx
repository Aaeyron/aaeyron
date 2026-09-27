"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MAX_STAGGER = 6;

/**
 * One observer for the whole site. Reveals each [data-reveal] element once
 * as it enters the viewport. Elements that enter together (one observer
 * batch) are staggered top-to-bottom, left-to-right via --reveal-i, so a
 * section's label/heading lead and its cards/rows follow.
 * Timing lives in the motion tokens in globals.css.
 */
export default function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // Not set when reduced motion is on (or the head script didn't run): nothing is hidden.
    if (!root.classList.contains("reveal-ready")) return;
    root.classList.add("reveal-js"); // disables the CSS no-JS safety net

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          );
        entering.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.setProperty("--reveal-i", String(Math.min(i, MAX_STAGGER)));
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
