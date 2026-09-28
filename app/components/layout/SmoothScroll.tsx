"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null;

/**
 * Smooth, slightly eased wheel scrolling (Lenis), mounted once in the root layout.
 * - Touch devices keep native scrolling (syncTouch: false only smooths wheel input).
 * - Keyboard scrolling and scrollbar dragging stay native; Lenis just follows them.
 * - Same-page anchor links scroll smoothly and respect each target's scroll-margin-top
 *   (5rem in globals.css, which clears the sticky header).
 * - Pauses while any <dialog> is open (mobile menu, certificate preview); dialogs carry
 *   data-lenis-prevent so their own content still scrolls natively.
 * - Off entirely when prefers-reduced-motion is set (normal instant scrolling).
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let dialogObserver: MutationObserver | null = null;

    const start = () => {
      if (lenis || reducedMotion.matches) return;
      const instance = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: true,
        anchors: true,
        stopInertiaOnNavigate: true,
      });
      lenis = instance;

      const syncWithDialogs = () => {
        if (document.querySelector("dialog[open]")) instance.stop();
        else instance.start();
      };
      dialogObserver = new MutationObserver(syncWithDialogs);
      dialogObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
    };

    const stop = () => {
      dialogObserver?.disconnect();
      dialogObserver = null;
      lenis?.destroy();
      lenis = null;
    };

    const onMotionPreferenceChange = () => (reducedMotion.matches ? stop() : start());

    start();
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    return () => {
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      stop();
    };
  }, []);

  // New page, new content height.
  useEffect(() => {
    lenis?.resize();
  }, [pathname]);

  return null;
}
