import { changelog, getCertificate, now, type ChangeKind } from "@/lib/content";
import { Tag } from "../ui/primitives";
import CertificatePreview from "../certificates/CertificatePreview";

const kindLabel: Record<ChangeKind, string> = {
  event: "event",
  "event-cert": "event certificate",
  training: "training",
};

type Props = { showUnreleased?: boolean; headingLevel?: 3 | 4 };

/** Events & training, written like a software changelog (newest first). */
export default function Changelog({ showUnreleased = true, headingLevel = 3 }: Props) {
  const H = headingLevel === 3 ? "h3" : "h4";

  return (
    <ol className="border-b border-line">
      {showUnreleased && (
        <li className="grid-12 gap-y-3 border-t border-line py-8" data-reveal>
          <div className="col-span-4 sm:col-span-2 lg:col-span-3">
            <H className="font-mono text-sm font-medium">Unreleased</H>
            <p className="label mt-1">In progress</p>
          </div>
          <ul className="col-span-4 space-y-3 sm:col-span-6 lg:col-span-9">
            <li className="flex gap-3">
              <span aria-hidden className="font-mono text-accent-text">~</span>
              <p className="measure">
                <span className="font-mono text-sm text-muted">building: </span>
                {now.building.detail}
              </p>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="font-mono text-accent-text">~</span>
              <p className="measure">
                <span className="font-mono text-sm text-muted">learning: </span>
                {now.learning.detail}
              </p>
            </li>
          </ul>
        </li>
      )}

      {changelog.map((release) => (
        <li key={release.version} className="grid-12 gap-y-4 border-t border-line py-8" data-reveal>
          <div className="col-span-4 sm:col-span-2 lg:col-span-3">
            <H className="font-mono text-sm font-medium">{release.version}</H>
            <p className="label mt-1">{release.date}</p>
          </div>
          <ul className="col-span-4 space-y-8 sm:col-span-6 lg:col-span-9">
            {release.changes.map((change) => {
              const cert = change.certificateId ? getCertificate(change.certificateId) : undefined;
              return (
                <li key={change.title} className="flex gap-3">
                  <span aria-hidden className="font-mono text-accent-text">+</span>
                  <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:justify-between sm:gap-8">
                    <div className="measure">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="font-medium">{change.title}</span>
                        <Tag>{kindLabel[change.kind]}</Tag>
                      </p>
                      <p className="mt-0.5 text-sm text-muted">{change.org}</p>
                      <p className="mt-2 text-[0.975rem] text-muted">{change.detail}</p>
                    </div>
                    {cert && <CertificatePreview cert={cert} variant="thumb" className="max-w-40 shrink-0 sm:w-40" />}
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ol>
  );
}
