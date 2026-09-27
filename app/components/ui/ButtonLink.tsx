import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-[0.9375rem] font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-ink hover:text-bg",
  secondary: "border border-line bg-transparent text-ink hover:border-ink",
  ghost: "px-3 text-ink hover:text-accent-ink",
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
  download?: boolean;
} & Omit<ComponentProps<"a">, "href" | "children">;

export default function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  external,
  download,
  ...rest
}: Props) {
  const cls = buttonClass(variant, className);

  if (external || download || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
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
