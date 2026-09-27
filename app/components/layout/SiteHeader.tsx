"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { isActivePath, navLinks } from "@/lib/content";
import { useShortcutLabel } from "@/lib/client";
import { useCommandMenu } from "../command/CommandProvider";
import { Kbd } from "../ui/primitives";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";

export default function SiteHeader() {
  const pathname = usePathname();
  const { setOpen } = useCommandMenu();
  const shortcut = useShortcutLabel();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group -ml-1 flex min-h-11 items-center gap-2 px-1" aria-label="Aaron Seth, home">
          <span className="font-serif text-[1.6rem] leading-none tracking-tight">Aaron Seth</span>
          <span aria-hidden className="size-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex min-h-11 items-center px-3 text-[0.9375rem] transition-colors duration-200 hover:text-ink ${
                      active ? "text-ink" : "text-muted"
                    }`}
                  >
                    {link.label}
                    {active && <span aria-hidden className="absolute inset-x-3 bottom-2 h-px bg-accent" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="tap inline-flex items-center justify-center gap-3 rounded-md text-muted transition-colors duration-200 hover:text-ink sm:border sm:border-line sm:px-3 sm:hover:border-ink"
            aria-label={`Open command menu (${shortcut})`}
            aria-keyshortcuts="Control+K Meta+K"
          >
            <Search size={17} aria-hidden />
            <span className="hidden text-sm sm:inline">Search</span>
            <span className="hidden sm:inline-flex">
              <Kbd>{shortcut}</Kbd>
            </span>
          </button>
          <ThemeToggle />
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
