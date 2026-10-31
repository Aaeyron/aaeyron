import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "ink";

// Every boxed button copies the home hero's "See my work" / "View résumé" pair: sharp corners,
// the same size and type, and no blue in any state (the accent is for text and static details).
const base =
  "sharp group inline-flex min-h-11 cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-50 justify-center gap-2 rounded-none px-5 text-[0.9375rem] font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px";

// "See my work": ink fill that inverts on hover, plus a faint dot strip on the right
// (.btn-dots in globals.css; extra right padding keeps it clear of the label/icon).
const inkButton = "btn-dots relative border border-ink bg-ink pr-9 text-bg hover:bg-bg hover:text-ink";

const variants: Record<Variant, string> = {
  primary: inkButton,
  // "View résumé": outline that firms up to ink on hover.
  secondary: "border border-line-strong bg-transparent text-ink hover:border-ink",
  ghost: "px-3 text-muted hover:text-ink",
  ink: inkButton,
};

export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `${base} ${variants[variant]} ${extra}`;

type Props = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Opens in a new tab with rel=noopener. */
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "children">;

export default function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  external,
  ...rest
}: Props) {
  const cls = buttonClass(variant, className);

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
