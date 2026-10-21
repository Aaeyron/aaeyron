import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/content";
import LegalPage, { legalSite, type LegalSection } from "../components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  alternates: { canonical: "/terms" },
  description: `Terms for using the portfolio of ${profile.name}: content ownership, acceptable use, and project disclaimers.`,
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    body: (
      <p>
        By visiting or using this website, you agree to these terms. If you don’t agree, please don’t use the site. They
        are written in plain language because this is a personal portfolio, not a business.
      </p>
    ),
  },
  {
    id: "about-site",
    title: "What this site is",
    body: (
      <>
        <p>
          This is the personal portfolio of <strong>{profile.name}</strong>, an aspiring software and AI/ML engineer. It
          shows my projects, experience, certifications, and ways to contact me.
        </p>
        <p>
          <strong>Many projects here are student work</strong>, built for coursework, a capstone, or my own learning. They
          are shown to demonstrate what I’ve learned, not offered as commercial products or services.
        </p>
      </>
    ),
  },
  {
    id: "ownership",
    title: "Content ownership and use",
    body: (
      <>
        <p>
          Unless stated otherwise, the text, design, photos, and project write-ups on this site are mine. Names, logos,
          and trademarks of other organizations belong to their owners.
        </p>
        <ul>
          <li>You’re welcome to view the site and share links to it.</li>
          <li>Please don’t copy or republish my content, design, or photos, or present them as your own, without my permission.</li>
          <li>
            Code in my public GitHub repositories is covered by each repository’s own license. If a repository has no
            license, ask me before reusing it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "conduct",
    title: "Acceptable use",
    body: (
      <>
        <p>When using this site, please don’t:</p>
        <ul>
          <li>Scrape or bulk-download content with bots or other automated tools.</li>
          <li>Use my content, photos, or name in a misleading way or without permission.</li>
          <li>Try to break, overload, or get unauthorized access to the site.</li>
          <li>Send spam, abuse, or harmful content through the contact form.</li>
        </ul>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "Projects and code disclaimer",
    body: (
      <>
        <p>
          The projects and code shown here are <strong>educational in nature</strong>. They are provided “as is”, without
          any warranty, and may contain bugs or incomplete features. They aren’t meant for production use.
        </p>
        <p>
          If you choose to use any of my code or ideas, you do so at your own risk, and I’m not responsible for any
          problems that result. Details of in-progress projects may change as I keep building.
        </p>
      </>
    ),
  },
  {
    id: "external-links",
    title: "External links",
    body: (
      <p>
        This site links to other services, like GitHub, LinkedIn, WhatsApp, and my résumé on Google Drive. I don’t
        control those sites and I’m not responsible for their content or practices. Their own terms apply when you use
        them.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        How I handle the information you send me is explained in the{" "}
        <Link href="/privacy" className="link">
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        I may update these terms from time to time. The “last updated” date at the top shows when they last changed.
        Continuing to use the site after a change means you accept the updated terms.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <LegalPage
      label="Legal"
      title="Terms & Conditions"
      highlight="Conditions"
      intro={`The simple rules for using this portfolio. Questions? Email me or visit ${legalSite}.`}
      updated={{ label: "October 22, 2026", iso: "2026-10-22" }}
      sections={sections}
    />
  );
}
