import type { IconType } from "react-icons";
import {
  SiCanva,
  SiCmake,
  SiCplusplus,
  SiCss3,
  SiDart,
  SiDjango,
  SiFigma,
  SiFlutter,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import type { TechItem } from "@/lib/content";

/** Logos for items in lib/content.ts `techStack` (monochrome via currentColor). */
const icons: Record<string, IconType> = {
  SiCanva,
  SiCmake,
  SiCplusplus,
  SiCss3,
  SiDart,
  SiDjango,
  SiFigma,
  SiFlutter,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiVercel,
};

/**
 * One tech item (home Tech Stack section and /stack): logo + name in a raised chip with the
 * site card shadow + hover lift; on hover the border turns accent and a small accent corner
 * mark appears. Text stays ink. Not a link, so it has no focus state.
 */
export default function TechChip({ item, size = "md" }: { item: TechItem; size?: "md" | "lg" }) {
  const Icon = item.icon ? icons[item.icon] : undefined;
  const sizing = size === "lg" ? "min-h-12 gap-2.5 px-4 text-[0.9375rem]" : "min-h-10 gap-2 px-3 text-sm";
  return (
    <span
      className={`group card card-lift relative inline-flex items-center border border-line bg-bg font-medium text-ink hover:border-accent ${sizing}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[3px] -top-[3px] size-2 border-l border-t border-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      {Icon && <Icon size={size === "lg" ? 17 : 15} aria-hidden className="shrink-0" />}
      {item.name}
    </span>
  );
}
