"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "@/lib/content";
import { copyText } from "@/lib/client";
import { buttonClass } from "./ButtonLink";

type Props = { variant?: "primary" | "secondary"; showAddress?: boolean; className?: string };

export default function CopyEmailButton({ variant = "primary", showAddress = true, className = "" }: Props) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(profile.email);
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  };

  return (
    <>
      <button type="button" onClick={onCopy} className={buttonClass(variant, className)}>
        {state === "copied" ? <Check size={17} aria-hidden /> : <Copy size={17} aria-hidden />}
        <span>
          {state === "copied"
            ? "Copied!"
            : state === "failed"
              ? "Couldn’t copy"
              : showAddress
                ? profile.email
                : "Copy email"}
        </span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Email address copied to clipboard" : ""}
      </span>
    </>
  );
}
