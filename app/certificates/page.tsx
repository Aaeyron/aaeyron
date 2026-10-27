import type { Metadata } from "next";
import { certifications } from "@/lib/content";
import { CertificateList } from "../components/certificates/CertificateCard";
import { Highlight, SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Certificates",
  alternates: { canonical: "/certificates" },
  description: "Courses Aaron Seth Nagtalon has finished, and the work behind each certificate.",
};

/** /certificates: every certificate in lib/content.ts `certifications`, newest first. */
export default function Certificates() {
  const newestFirst = [...certifications].sort((a, b) => b.dateIso.localeCompare(a.dateIso));
  return (
    <div className="container-x section">
      <SectionHeader as="h1" rule label="Certificates" title={<>What I’ve <Highlight>completed</Highlight>.</>}>
        <p>Courses I’ve finished and the work behind them.</p>
      </SectionHeader>

      <CertificateList certs={newestFirst} headingLevel="h2" />
    </div>
  );
}
