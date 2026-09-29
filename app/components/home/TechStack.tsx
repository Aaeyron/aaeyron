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
import { techStack } from "@/lib/content";
import { Label, SectionHeader } from "../ui/primitives";

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

export default function TechStack() {
  return (
    <section aria-labelledby="stack-title" className="section border-t border-line">
      <div className="container-x">
        <SectionHeader id="stack-title" index="03" label="Tech Stack" title="What I work with.">
          <p>Languages, frameworks, and tools I’ve used in my projects.</p>
        </SectionHeader>

        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group, g) => (
            <div key={group.group}>
              <h3 className="mb-4" data-reveal>
                <Label index={String(g + 1).padStart(2, "0")}>{group.group}</Label>
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const Icon = item.icon ? icons[item.icon] : undefined;
                  return (
                    <li key={item.name} data-reveal>
                      <span className="inline-flex min-h-10 items-center gap-2 border border-line bg-bg px-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent-text">
                        {Icon && <Icon size={15} aria-hidden className="shrink-0" />}
                        {item.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
