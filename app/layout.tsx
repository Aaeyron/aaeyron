import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aaron Seth — Software Developer",
  description: "Portfolio of Aaron Seth Nagtalon, a software developer building web, mobile, and backend experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        {children}
      </body>
    </html>
  );
}
