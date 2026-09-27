import Link from "next/link";
import { navLinks, profile, socials } from "@/lib/content";
import { Kbd } from "../ui/primitives";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid-12 gap-y-10 py-12 sm:py-16">
        <div className="col-span-4 sm:col-span-8 lg:col-span-5">
          <p className="font-serif text-3xl leading-tight">{profile.name}</p>
          <p className="mt-2 text-muted">{profile.role}</p>
          <p className="label mt-6">{profile.location}</p>
        </div>

        <nav aria-label="Footer" className="col-span-2 sm:col-span-3 lg:col-span-2 lg:col-start-7">
          <p className="label mb-3">Site</p>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink sm:min-h-9">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 sm:col-span-3 lg:col-span-3">
          <p className="label mb-3">Elsewhere</p>
          <ul>
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink sm:min-h-9">
                Email
              </a>
            </li>
            {socials
              .filter((s) => s.primary)
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink sm:min-h-9"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            <li>
              <a href={profile.resume} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink sm:min-h-9">
                Résumé
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="hidden items-center gap-2 sm:flex">
          Press <Kbd>Ctrl K</Kbd> or <Kbd>⌘K</Kbd> to jump anywhere
        </p>
      </div>
    </footer>
  );
}
