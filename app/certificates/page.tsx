import type { Metadata } from "next";
import { SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Certificates and training completed by Aaron Seth Nagtalon.",
};

// Phase 4 builds this page out.
export default function Certificates() {
  return (
    <div className="container-x section">
      <SectionHeader as="h1" label="Certificates" title="Learning, documented." />
    </div>
  );
}
