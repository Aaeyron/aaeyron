"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <header className="site-nav">
        <button
          type="button"
          className={`menu-toggle ${isOpen ? "menu-toggle-open" : ""}`}
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="site-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`menu-backdrop ${isOpen ? "menu-backdrop-open" : ""}`} onClick={() => setIsOpen(false)} aria-hidden="true" />

      <aside id="site-menu" className={`menu-panel ${isOpen ? "menu-panel-open" : ""}`} aria-hidden={!isOpen}>
        <div className="menu-panel-inner">
          <p className="menu-label">NAVIGATION</p>
          <nav aria-label="Site navigation" className="menu-links">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={pathname === link.href ? "menu-link-active" : ""}
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="menu-footer-note">Aaron Seth Nagtalon · Software Developer</p>
        </div>
      </aside>
    </>
  );
}
