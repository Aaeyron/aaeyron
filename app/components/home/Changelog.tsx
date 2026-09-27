import { changelog, now, type ChangeKind } from "@/lib/content";
import { Tag, Txt } from "../ui/primitives";

const kindLabel: Record<ChangeKind, string> = { event: "event", cert: "certificate" };

/** Growth timeline, written like a software changelog (newest first). */
export default function Changelog() {
  return (
    <ol className="border-b border-line">
      <li className="grid-12 gap-y-3 border-t border-line py-8" data-reveal>
        <div className="col-span-4 sm:col-span-2 lg:col-span-3">
          <h3 className="font-mono text-sm font-medium">Unreleased</h3>
          <p className="label mt-1">In progress</p>
        </div>
        <ul className="col-span-4 space-y-3 sm:col-span-6 lg:col-span-9">
          <li className="flex gap-3">
            <span aria-hidden className="font-mono text-accent-text">~</span>
            <p>
              <span className="font-mono text-sm text-muted">building: </span>
              <Txt>{now.building}</Txt>
            </p>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="font-mono text-accent-text">~</span>
            <p>
              <span className="font-mono text-sm text-muted">learning: </span>
              <Txt>{now.learning}</Txt>
            </p>
          </li>
        </ul>
      </li>

      {changelog.map((release) => (
        <li key={release.version} className="grid-12 gap-y-4 border-t border-line py-8" data-reveal>
          <div className="col-span-4 sm:col-span-2 lg:col-span-3">
            <h3 className="font-mono text-sm font-medium">{release.version}</h3>
            <p className="label mt-1">{release.date}</p>
          </div>
          <ul className="col-span-4 space-y-6 sm:col-span-6 lg:col-span-9">
            {release.changes.map((change) => (
              <li key={change.title} className="flex gap-3">
                <span aria-hidden className="font-mono text-accent-text">+</span>
                <div className="measure">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-medium">{change.title}</span>
                    <Tag>{kindLabel[change.kind]}</Tag>
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{change.org}</p>
                  <p className="mt-2 text-[0.975rem] text-muted">{change.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
