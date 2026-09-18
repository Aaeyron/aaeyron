import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Code2, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import SiteNav from "../components/SiteNav";
import ScrollAnimations from "../components/ScrollAnimations";

export const metadata: Metadata = {
  title: "Contact — Aaron Seth",
  description: "Get in touch with Aaron Seth Nagtalon about projects, collaboration, and opportunities.",
};

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Aaeyron", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aaron-seth-nagtalon-289769437/", icon: FaLinkedinIn },
  { label: "Facebook", href: "https://www.facebook.com/Aaeyronn", icon: FaFacebookF },
  { label: "Instagram", href: "https://www.instagram.com/aaeyron/", icon: FaInstagram },
  { label: "TikTok", href: "https://www.tiktok.com/@aaesthr0xnz", icon: FaTiktok },
];

export default function Contact() {
  return (
    <div className="site-shell">
      <SiteNav />
      <ScrollAnimations />

      <main className="contact-page">
        <section className="contact-hero">
          <div className="contact-hero-inner" data-aos="fade-up">
            <p className="eyebrow">CONTACT / LET’S TALK</p>
            <h1>
              Let’s build something
              <span> useful together.</span>
            </h1>
          </div>
        </section>

        <section className="contact-content">
          <div className="contact-intro" data-aos="fade-up">
            <p className="contact-lead">
              Have a project, opportunity, or idea you want to discuss? <span>Send me a message</span> and tell me what you’re working on.
            </p>
            <p>I’m always open to meeting people who care about thoughtful products and practical software.</p>
          </div>

          <div className="contact-details" data-aos="fade-up" data-aos-delay="120">
            <a href="mailto:aaronseth041@gmail.com" className="contact-primary-link">
              <span><Mail size={19} /> Email me</span>
              <strong>aaronseth041@gmail.com</strong>
              <ArrowUpRight size={26} />
            </a>

            <a href="tel:+639156604726" className="contact-detail-row">
              <span><Phone size={18} /> Phone</span>
              <strong>+63 915 660 4726</strong>
            </a>

            <div className="contact-detail-row">
              <span><MapPin size={18} /> Location</span>
              <strong>Davao City, Philippines</strong>
            </div>
          </div>
        </section>

        <section className="contact-socials">
          <div data-aos="fade-up">
            <p className="eyebrow">ELSEWHERE</p>
            <h2>Find me <span>online.</span></h2>
          </div>
          <div className="social-link-list" data-aos="fade-up" data-aos-delay="120">
            {socialLinks.map((social, index) => (
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                key={social.label}
                aria-label={`Visit my ${social.label}`}
                title={social.label}
                data-aos="zoom-in"
                data-aos-delay={String(100 + index * 75)}
              >
                <social.icon aria-hidden="true" />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-back-link">
          <div data-aos="fade-up">
            <p className="eyebrow">NEXT / SELECTED WORK</p>
            <Link href="/projects">
              <span className="contact-project-icon" aria-hidden="true"><Code2 size={28} /></span>
              <span className="contact-back-copy">
                <span>See what I’ve</span>
                <strong>been building.</strong>
              </span>
              <ArrowUpRight size={34} />
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}
