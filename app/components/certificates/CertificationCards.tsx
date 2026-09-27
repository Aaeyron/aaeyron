import { certifications } from "@/lib/content";
import CertificatePreview from "./CertificatePreview";

/** Certifications (skills earned) as cards with real certificate thumbnails. */
export default function CertificationCards({ headingLevel = 3 }: { headingLevel?: 3 | 4 }) {
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {certifications.map((cert) => (
        <li key={cert.id} className="flex flex-col gap-4 rounded-lg border border-line p-4 sm:p-5" data-reveal>
          <CertificatePreview cert={cert} />
          <div>
            <H className="font-semibold leading-snug">{cert.title}</H>
            <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
            <p className="label mt-3">Issued {cert.date}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
