"use client";

import { useEffect, useState } from "react";

// True after the first page has mounted, so the fade only plays on client navigations.
let hasNavigated = false;

/** Page transition: each newly visited page fades in with a small upward slide (see .page-in). */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return <div className={animate ? "page-in" : undefined}>{children}</div>;
}
