import { existsSync } from "node:fs";
import { join } from "node:path";
import { Terminal } from "lucide-react";
import { aiTools, type AiTool } from "@/lib/content";

/** True when a /public file is present (checked on the server, so an added logo shows up without code changes). */
const hasPublicFile = (path: string) => existsSync(join(process.cwd(), "public", path));

/** Generic UI icons for tools whose official logo file isn't in the repo yet (placeholders, not logos). */
const fallbackIcons: Record<NonNullable<AiTool["fallbackIcon"]>, typeof Terminal> = { terminal: Terminal };

/**
 * AI tools row in the home hero, from `aiTools` in lib/content.ts (logo sources and licenses are
 * noted there). Logos only: each in a 32px circle (--line-strong outline, page fill so the grid
 * doesn't show through), with the tool's name as screen-reader text. The logo is the SVG used as
 * a CSS mask over the ink colour, so it's one colour in both themes. Without the file, the
 * tool's generic fallback icon goes in the same circle; with neither, the name shows as text.
 * Static: no hover, no pointer cursor.
 */
export default function AiTools({ className = "" }: { className?: string }) {
  return (
    <ul aria-label="AI tools I use" className={`flex flex-wrap items-center gap-4 ${className}`}>
      {aiTools.map((tool) => {
        const Fallback = tool.fallbackIcon ? fallbackIcons[tool.fallbackIcon] : undefined;
        const icon = hasPublicFile(tool.logo) ? (
          <span
            aria-hidden
            className="size-4 bg-current mask-contain mask-center mask-no-repeat"
            style={{ maskImage: `url(${tool.logo})`, WebkitMaskImage: `url(${tool.logo})` }}
          />
        ) : Fallback ? (
          <Fallback aria-hidden size={16} strokeWidth={2} />
        ) : null;

        return icon ? (
          <li key={tool.name} className="icon-halo flex size-8 items-center justify-center rounded-full border border-line-strong bg-bg text-ink">
            {icon}
            <span className="sr-only">{tool.name}</span>
          </li>
        ) : (
          <li key={tool.name} className="text-sm font-medium text-ink">
            {tool.name}
          </li>
        );
      })}
    </ul>
  );
}
