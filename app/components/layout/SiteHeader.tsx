"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, navLinks } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="nav-enter sticky top-0 z-40 border-b border-line bg-bg/95 [transform:translateZ(0)]">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group -ml-1 flex min-h-11 items-center gap-1.5 rounded-md px-1" aria-label="Aaeyron, home">
          <span className="text-lg font-semibold leading-none tracking-[-0.03em]">Aaeyron</span>
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
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
                    className={`inline-flex min-h-11 items-center rounded-md px-3 text-[0.9375rem] no-underline transition-colors duration-200 ${
                      active ? "font-medium text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
