"use client";

import { useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { isActivePath, navLinks, profile } from "@/lib/content";
import { Label } from "../ui/primitives";
import { ContactButtonsCompact } from "../ui/ContactButtons";

export default function MobileNav({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="tap inline-flex cursor-pointer items-center justify-center rounded-md text-ink md:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
      >
        <Menu size={20} aria-hidden />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-0 ml-auto h-dvh max-h-none w-[min(24rem,100vw)] max-w-none overflow-y-auto border-l border-line bg-bg p-0 md:hidden"
      >
        <div className="flex min-h-full flex-col px-[var(--gutter)] pb-8">
          <div className="flex h-16 items-center justify-between">
            <Label>Menu</Label>
            <button
              type="button"
              onClick={close}
              className="tap -mr-2 inline-flex cursor-pointer items-center justify-center rounded-md"
              aria-label="Close menu"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-6">
            <ul className="stagger flex flex-col">
              {navLinks.map((link, i) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href} className="border-b border-line" style={{ "--i": i } as React.CSSProperties}>
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className="flex min-h-16 items-baseline gap-4 py-3"
                    >
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                      <span className={`text-3xl font-semibold leading-none tracking-[-0.03em] ${active ? "text-ink" : "text-muted"}`}>
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto pt-8">
            <p className="mb-4">
              <Label index="//">Connect</Label>
            </p>
            <ContactButtonsCompact startIndex={navLinks.length} />
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <span aria-hidden className="status-dot" />
              {profile.status}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
