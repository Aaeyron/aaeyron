"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer"; // Import Footer

export default function Certificates() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const certificates = [
    {
      title: "CODECHUM Certificate",
      issuer: "Codechum Academy",
      year: "2025",
      image: "/images/Certificate1.png",
    },
    {
      title: "WATT Certificate",
      issuer: "Educational Tour",
      year: "2025",
      image: "/images/Certificate2.jpg",
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
    <div className="bg-white min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 z-50 py-4 shadow-md">
  <nav className="flex flex-wrap justify-center md:justify-center space-x-2 sm:space-x-4 md:space-x-20 text-gray-700 font-sans font-semibold text-sm sm:text-base">
    <Link href="/about" className="hover:text-blue-500 transition">About</Link>
    <Link href="/projects" className="hover:text-blue-500 transition">Projects</Link>
    <Link href="/certificates" className="hover:text-blue-500 transition">Certificates</Link>
    <Link href="/journal" className="hover:text-blue-500 transition">Journal</Link>
  </nav>
</header>

      {/* Main Section */}
      <main className="pt-28 px-4 sm:px-6 pb-50 flex-grow">
        <section className="max-w-6xl mx-auto text-center" data-aos="fade-up">
          <div className="mb-12 sm:mb-16">
            <span
              className="block text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: "hsl(25, 29.37%, 53.62%)" }}
            >
              Achievements
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-tight text-black">
              Certificates & <br /> Awards
            </h2>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col cursor-pointer"
                onClick={() => setSelectedCert(idx)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "hsl(25, 29.37%, 53.62%)" }}
                    >
                      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                      <circle cx="12" cy="8" r="6"></circle>
                    </svg>
                  </div>
                </div>

                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-serif font-medium mb-2 group-hover:text-blue-500 transition-colors text-black">
                    {cert.title}
                  </h3>

                  <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-200 flex justify-between items-center text-sm sm:text-base text-gray-500">
                    <span className="font-medium">{cert.issuer}</span>
                    <span>{cert.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal */}
        {selectedCert !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-auto"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="bg-white rounded-lg w-full max-w-3xl sm:max-w-5xl overflow-hidden relative p-4 sm:p-6 md:p-8 shadow-lg animate-pop-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 text-white bg-black/60 p-2 rounded-full hover:bg-black/80 text-lg sm:text-xl cursor-pointer"
                onClick={() => setSelectedCert(null)}
              >
                ✕
              </button>

              <div className="relative w-full aspect-[16/10] mb-4 sm:mb-6">
                <Image
                  src={certificates[selectedCert].image}
                  alt={certificates[selectedCert].title}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-medium mb-2 text-black">
                {certificates[selectedCert].title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Issued by {certificates[selectedCert].issuer} — {certificates[selectedCert].year}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

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
