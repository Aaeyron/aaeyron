"use client";

import { useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { isActivePath, navLinks, profile, socials } from "@/lib/content";

export default function MobileNav({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="tap inline-flex items-center justify-center rounded-md text-ink md:hidden"
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
        className="m-0 ml-auto h-dvh max-h-none w-[min(24rem,100vw)] max-w-none border-l border-line bg-bg p-0 md:hidden"
      >
        <div className="flex h-full flex-col px-[var(--gutter)] pb-8">
          <div className="flex h-16 items-center justify-between">
            <span className="label">Menu</span>
            <button
              type="button"
              onClick={close}
              className="tap -mr-2 inline-flex items-center justify-center rounded-md"
              aria-label="Close menu"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-6">
            <ul className="flex flex-col">
              {navLinks.map((link, i) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href} className="border-b border-line">
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

          <div className="mt-auto space-y-3 pt-8">
            <p className="label">{profile.status}</p>
            <ul className="flex flex-wrap gap-x-5">
              {socials
                .filter((s) => s.primary)
                .map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center">
                      {s.label}
                    </a>
                  </li>
                ))}
              <li>
                <a href={`mailto:${profile.email}`} className="link inline-flex min-h-11 items-center">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}
