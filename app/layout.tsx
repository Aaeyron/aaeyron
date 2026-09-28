import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile, siteUrl } from "@/lib/content";
import { themeScript } from "@/lib/theme-script";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import RevealRoot from "./components/ui/RevealRoot";
import SmoothScroll from "./components/layout/SmoothScroll";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const description =
  "Aaron Seth Nagtalon is an aspiring software and AI/ML engineer in Davao City, Philippines, building web apps end to end. Open to internships and mentorship.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.shortName}`,
  },
  description,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description,
    locale: "en_PH",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed left-4 top-3 z-50 -translate-y-20 rounded-md bg-accent px-4 py-3 font-medium text-on-accent transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {/* Decorative guide lines on the content edges (large screens only). */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 hidden [transform:translateZ(0)] lg:block">
          <div className="container-x h-full">
            <div className="h-full border-x border-[var(--guide)]" />
          </div>
        </div>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealRoot />
        <SmoothScroll />
      </body>
    </html>
  );
}
