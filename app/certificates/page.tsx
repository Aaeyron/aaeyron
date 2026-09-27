import type { Metadata } from "next";
import Changelog from "../components/home/Changelog";
import CertificationCards from "../components/certificates/CertificationCards";
import { Highlight, SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Events, training and certifications completed by Aaron Seth Nagtalon, including Google Developer Group, AWS User Group Davao and Networking Academy.",
};

export default function Certificates() {
  return (
    <>
      <div className="container-x pt-14 sm:pt-24">
        <SectionHeader
          as="h1"
          label="Certificates"
          title={<>Events, training & <Highlight>certifications</Highlight>.</>}
        >
          <p>What I’ve attended and what I’ve earned, kept separate. Select any certificate to view it larger.</p>
        </SectionHeader>
      </div>

      <section aria-labelledby="events-title" className="pb-16 sm:pb-24">
        <div className="container-x">
          <p className="label mb-3 flex gap-3">
            <span className="text-accent-text">01</span>
            <span>Changelog</span>
          </p>
          <h2 id="events-title" className="h2 mb-8">
            Events & training
          </h2>
          <Changelog showUnreleased={false} headingLevel={3} />
        </div>
      </section>

      <section aria-labelledby="certs-title" className="section border-t border-line">
        <div className="container-x">
          <p className="label mb-3 flex gap-3">
            <span className="text-accent-text">02</span>
            <span>Skills earned</span>
          </p>
          <h2 id="certs-title" className="h2 mb-8">
            Certifications
          </h2>
          <CertificationCards headingLevel={3} />
        </div>
      </section>
    </>
  );
}
