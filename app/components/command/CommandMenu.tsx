"use client";

import { useEffect, useId, useMemo, useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Award,
  Copy,
  CornerDownLeft,
  FileText,
  FolderGit2,
  House,
  Mail,
  MoonStar,
  Search,
  User,
  Layers,
} from "lucide-react";
import { navLinks, profile, projects, socials } from "@/lib/content";
import { copyText, toggleTheme } from "@/lib/client";
import { useCommandMenu } from "./CommandProvider";
import { Kbd } from "../ui/primitives";

type Item = {
  id: string;
  group: "Pages" | "Projects" | "Actions" | "Links";
  label: string;
  hint?: string;
  keywords?: string;
  icon: ComponentType<{ size?: number; "aria-hidden"?: boolean; className?: string }>;
  /** Return true to keep the menu open after running. */
  run: () => boolean | void | Promise<boolean | void>;
};

const pageIcons: Record<string, Item["icon"]> = {
  "/": House,
  "/projects": Layers,
  "/about": User,
  "/certificates": Award,
  "/contact": Mail,
};

const GROUPS: Item["group"][] = ["Pages", "Projects", "Actions", "Links"];

function matches(item: Item, q: string) {
  const hay = `${item.label} ${item.keywords ?? ""} ${item.group}`.toLowerCase();
  return q.split(/\s+/).every((word) => hay.includes(word));
}

export default function CommandMenu() {
  const { open, setOpen } = useCommandMenu();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("");
  const baseId = useId();

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    return [
      ...navLinks.map((l) => ({
        id: `page-${l.href}`,
        group: "Pages" as const,
        label: l.label,
        hint: l.href,
        icon: pageIcons[l.href] ?? House,
        run: go(l.href),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Projects" as const,
        label: p.title,
        hint: p.stack.slice(0, 2).join(" · "),
        keywords: `${p.stack.join(" ")} case study`,
        icon: FolderGit2,
        run: go(`/projects/${p.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        keywords: "mail contact clipboard",
        icon: Copy,
        run: async () => {
          const ok = await copyText(profile.email);
          setStatus(ok ? "Copied!" : "Couldn’t copy. Email is " + profile.email);
          setTimeout(() => setOpen(false), ok ? 900 : 2500);
          return true;
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download résumé",
        hint: "PDF",
        keywords: "resume cv pdf",
        icon: FileText,
        run: () => {
          window.open(profile.resume, "_blank", "noopener");
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle dark mode",
        keywords: "theme light dark colour color",
        icon: MoonStar,
        run: () => {
          const next = toggleTheme();
          setStatus(`Switched to ${next} mode`);
          return true;
        },
      },
      ...socials
        .filter((s) => s.primary)
        .map((s) => ({
          id: `link-${s.label}`,
          group: "Links" as const,
          label: `Open ${s.label}`,
          hint: s.handle,
          icon: ArrowUpRight,
          run: () => {
            window.open(s.href, "_blank", "noopener");
          },
        })),
    ];
  }, [router, setOpen]);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => (q ? items.filter((i) => matches(i, q)) : items), [items, q]);
  const grouped = GROUPS.map((g) => ({ group: g, items: filtered.filter((i) => i.group === g) })).filter(
    (g) => g.items.length,
  );
  const flat = grouped.flatMap((g) => g.items);
  const activeItem = flat[Math.min(active, flat.length - 1)];

  // Open / close the native dialog in sync with state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      setStatus("");
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!activeItem) return;
    document.getElementById(`${baseId}-${activeItem.id}`)?.scrollIntoView({ block: "nearest" });
  }, [activeItem, baseId]);

  const run = async (item: Item) => {
    const keepOpen = await item.run();
    if (!keepOpen) setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!flat.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + flat.length) % flat.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(flat.length - 1);
    } else if (e.key === "Enter" && activeItem) {
      e.preventDefault();
      run(activeItem);
    }
  };

  const listboxId = `${baseId}-list`;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      onClose={() => {
        setOpen(false);
        returnFocus.current?.focus?.();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) setOpen(false);
      }}
      className="cmd-dialog mx-auto mt-[10vh] w-[min(40rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-lg border border-line bg-bg p-0 shadow-[0_24px_80px_-20px_rgb(0_0_0/0.45)]"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search size={18} aria-hidden className="shrink-0 text-muted" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls={listboxId}
          aria-activedescendant={activeItem ? `${baseId}-${activeItem.id}` : undefined}
          aria-autocomplete="list"
          aria-label="Search pages, projects and actions"
          placeholder="Jump to a page, project or action…"
          className="h-14 w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-muted"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="tap -mr-2 hidden items-center justify-center sm:inline-flex"
          aria-label="Close command menu"
        >
          <Kbd>Esc</Kbd>
        </button>
      </div>

      <div id={listboxId} role="listbox" aria-label="Results" className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain p-2">
        {grouped.length === 0 && <p className="px-3 py-8 text-center text-muted">No results for “{query}”</p>}
        {grouped.map((g) => (
          <div key={g.group} role="group" aria-labelledby={`${baseId}-g-${g.group}`} className="mb-1">
            <p id={`${baseId}-g-${g.group}`} className="label px-3 pb-1 pt-3">
              {g.group}
            </p>
            {g.items.map((item) => {
              const isActive = item === activeItem;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  id={`${baseId}-${item.id}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseMove={() => setActive(flat.indexOf(item))}
                  onClick={() => run(item)}
                  className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 transition-colors duration-150 ${
                    isActive ? "bg-surface text-ink" : "text-muted"
                  }`}
                >
                  <Icon size={17} aria-hidden className={isActive ? "text-accent-ink" : ""} />
                  <span className="flex-1 truncate text-[0.9375rem] text-ink">
                    {item.id === "copy-email" && status === "Copied!" ? "Copied!" : item.label}
                  </span>
                  {item.hint && <span className="hidden truncate font-mono text-xs sm:inline">{item.hint}</span>}
                  {isActive && <CornerDownLeft size={14} aria-hidden className="shrink-0" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.7rem] text-muted">
        <span className="hidden gap-3 sm:flex">
          <span><Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate</span>
          <span><Kbd>↵</Kbd> select</span>
        </span>
        <span role="status" aria-live="polite" className="text-accent-ink">
          {status}
        </span>
      </div>
    </dialog>
  );
}
