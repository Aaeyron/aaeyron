"use client";

import AOS from "aos";
import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 70,
      anchorPlacement: "top-bottom",
    });

    const refreshTimer = window.setTimeout(() => AOS.refreshHard(), 120);

    return () => window.clearTimeout(refreshTimer);
  }, []);

  return null;
}
