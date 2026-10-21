import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/content";
import LegalPage, { legalSite, type LegalSection } from "../components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description: `How the portfolio of ${profile.name} handles your information: contact form messages, hosting, and local storage.`,
};

// Keep this page true to what the site actually does. If analytics, cookies, or new third-party
// services are added later, update the matching sections (and the "last updated" date).
const sections: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <p>
        This is a personal portfolio, so I collect as little information as possible. This page explains what that is,
        why, and what you can ask me to do with it.
      </p>
    ),
  },
  {
    id: "collect",
    title: "Information I collect",
    body: (
      <>
        <p>
          <strong>Contact form.</strong> If you send me a message, I receive your first and last name, email address,
          subject, message, and your phone number if you choose to add it.
        </p>
        <p>
          <strong>No analytics or ad trackers.</strong> This site doesn’t use analytics, advertising, or tracking tools,
          and it doesn’t ask you to create an account.
        </p>
        <p>
          <strong>Basic technical data.</strong> Like any website, the hosting provider may automatically log standard
          request details, such as your IP address, browser type, and the time of your visit, to keep the site running
          and secure.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "How I use it",
    body: (
      <>
        <ul>
          <li>To read and reply to your message.</li>
          <li>To keep the site working, secure, and free from spam.</li>
        </ul>
        <p>
          I don’t sell your information, share it for advertising, or add you to any mailing list.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party services",
    body: (
      <>
        <ul>
          <li>
            <strong>Web3Forms</strong> delivers contact form messages to my email inbox.
          </li>
          <li>
            <strong>Vercel</strong> hosts this website and may process the basic technical data described above.
          </li>
          <li>
            <strong>GitHub</strong> provides the contribution and language stats on the home page. The site requests these
            itself, so none of your information is sent to GitHub when you view them.
          </li>
        </ul>
        <p>
          Links to GitHub, LinkedIn, WhatsApp, and my résumé on Google Drive take you to those services, and their own
          privacy policies apply there.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: (
      <p>
        This site doesn’t use cookies for tracking. It saves one setting in your browser’s local storage: your
        light/dark <strong>theme preference</strong>. It stays on your device, is never sent to me, and you can clear it
        anytime in your browser settings.
      </p>
    ),
  },
  {
    id: "security",
    title: "How your information is protected",
    body: (
      <p>
        The site is served over HTTPS, so what you type into the contact form is encrypted while it’s sent. Messages are
        kept in my private email inbox, not in a public database. No system is 100% secure, but I take reasonable care
        to protect what you send me.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your choices and rights",
    body: (
      <>
        <p>
          I keep messages only as long as they’re useful for our conversation. You can ask me at any time to see,
          correct, or <strong>delete</strong> the information you sent through the contact form, and I’ll do it.
        </p>
        <p>
          Prefer not to use the form? You can email me directly instead. See also the{" "}
          <Link href="/terms" className="link">
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        If how I handle information changes, I’ll update this page and the “last updated” date at the top.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      highlight="Privacy"
      intro={`What I collect, why, and how to reach me about it. Questions? Email me or visit ${legalSite}.`}
      updated={{ label: "October 22, 2026", iso: "2026-10-22" }}
      sections={sections}
    />
  );
}
