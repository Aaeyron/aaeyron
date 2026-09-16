"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SiteNav from "../components/SiteNav";
import ScrollAnimations from "../components/ScrollAnimations";
import { ArrowDownRight, ArrowUpRight, Award } from "lucide-react";

type Certificate = {
  title: string;
  issuer: string;
  year: string;
  image: string;
  isPlaceholder?: boolean;
};

export default function Certificates() {
  const certificates: Certificate[] = [
    {
      title: "CODECHUM Certificate",
      issuer: "Codechum Academy",
      year: "May 18, 2025",
      image: "/images/Certificate1.png",
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Networking Academy",
      year: "Dec 15, 2025",
      image: "/images/Certificate3.png", 
    },
    {
      title: "Developing Applications with Google Cloud",
      issuer: "Google Developer Group",
      year: "May 16, 2026",
      image: "/images/GDG Certificate.png", 
    },
    {
      title: "Cyber Hygiene and Security Best Practices",
      issuer: "Holy Cross of Davao College - IAES",
      year: "January 28, 2026",
      image: "/images/Cyber Hygiene Cert.png", 
    },

  ];

  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedCert !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCert]);

  return (
    <div className="site-shell certificates-page">
      <SiteNav />
      <ScrollAnimations />

      <main>
        <section className="certificates-hero">
          <div className="certificates-hero-copy" data-aos="fade-up">
            <p className="eyebrow">CERTIFICATES / CONTINUOUS LEARNING</p>
            <h1>
              Proof of progress.
              <span> Built through learning.</span>
            </h1>
            <p className="certificates-hero-summary">
              A growing record of technical training, community learning, and the skills I continue to develop beyond the classroom.
            </p>
            <a href="#certificate-archive" className="certificates-scroll-link">
              Explore credentials <ArrowDownRight size={20} />
            </a>
          </div>

          <div className="certificates-hero-count" aria-label={`${certificates.length} certificates`} data-aos="fade-left" data-aos-delay="140">
            <Award size={34} />
            <strong>0{certificates.length}</strong>
            <span>Credentials<br />and achievements</span>
          </div>
        </section>

        <section className="certificate-archive" id="certificate-archive">
          <div className="certificate-archive-heading" data-aos="fade-up">
            <div>
              <p className="eyebrow">THE ARCHIVE / 2025—2026</p>
              <h2>Learning, <span>documented.</span></h2>
            </div>
            <p>Open any credential to view the complete certificate.</p>
          </div>

          <div className="certificate-grid">
            {certificates.map((cert, idx) => (
              <button
                type="button"
                key={cert.title}
                className="certificate-card"
                data-aos="fade-up"
                data-aos-delay={String(Math.min(idx * 90, 270))}
                onClick={() => {
                  if (!cert.isPlaceholder) setSelectedCert(idx);
                }}
                disabled={cert.isPlaceholder}
              >
                <div className="certificate-card-image">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="certificate-card-picture"
                  />
                  <span className="certificate-open-icon"><ArrowUpRight size={20} /></span>
                </div>

                <div className="certificate-card-copy">
                  <div className="certificate-card-meta">
                    <span>0{idx + 1}</span>
                    <span>{cert.year}</span>
                  </div>
                  <h3>{cert.title}</h3>
                  <p>{cert.issuer}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Modal */}
        {selectedCert !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#14213d]/70 backdrop-blur-sm p-4 overflow-auto"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="bg-white text-[#14213d] w-full max-w-3xl sm:max-w-5xl overflow-hidden relative p-4 sm:p-6 md:p-8 border border-[#14213d]/20 shadow-2xl animate-pop-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-11 h-11 grid place-items-center text-white bg-[#2457f5] hover:bg-[#14213d] text-lg sm:text-xl font-bold cursor-pointer transition-colors"
                onClick={() => setSelectedCert(null)}
              >
                ✕
              </button>

              <div className="relative w-full aspect-[16/10] mb-5 sm:mb-7 bg-[#f5f8ff] border border-[#14213d]/15">
                <Image
                  src={certificates[selectedCert].image}
                  alt={certificates[selectedCert].title}
                  fill
                  className="object-contain"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-extrabold tracking-[-0.04em] leading-tight mb-2 text-[#14213d]">
                {certificates[selectedCert].title}
              </h2>
              <p className="text-[#2457f5] font-bold text-sm sm:text-base">
                Issued by {certificates[selectedCert].issuer} — {certificates[selectedCert].year}
              </p>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .animate-pop-in {
          animation: popIn 0.3s ease-out forwards;
        }
        @keyframes popIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
