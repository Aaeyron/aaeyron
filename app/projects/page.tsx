"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer"; // Import Footer
import { Github, ExternalLink } from "lucide-react";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const projects = [
    {
      title: "Library Management System",
      shortDescription:
        "A full-stack Library Management System with a React.js frontend and Django backend.",
      longDescription:
        "This is my WS Final Project. It features a Python backend with Django database and a React.js frontend. The system supports multiple roles including Admin, Librarian, and Users. Features include book management, borrowing and return tracking, user authentication, and a responsive interface for seamless library operations.",
      cardImage: "/images/LMS1.png",
      modalImage: "/images/LMS2.png",
      tech: ["React.js", "Django", "REST API"],
      githubLink: "https://github.com/Aaeyron/Library-Management-System",
    },
    {
      title: "Jana's Boutique Clothing",
      shortDescription:
        "Online ordering with inventory management. Next.js frontend, PHP backend with XAMPP database.",
      longDescription:
        "This project is part of my IM101 Project, where we explored local businesses in Davao, Philippines, and helped them establish online ordering systems. I used Next.js with Node.js for the frontend, PHP for backend processing, and XAMPP as the database. The system allows customers to browse products, place orders, and track inventory efficiently.",
      cardImage: "/images/Boutique1.png",
      modalImage: "/images/Boutique2.png",
      tech: ["Next.js", "PHP", "XAMPP"],
      githubLink: "https://github.com/Aaeyron/Janasboutique",
    },
    {
      title: "FlashMind (Cards)",
      shortDescription:
        "An interactive flashcard application built to help students enhance their memory, thinking, and retention skills.",
      longDescription:
        "FlashMind (Cards) is a dedicated learning tool engineered to help students optimize their study habits. Built purely around a reactive UI layout, it allows users to dynamically interact with flashcard decks, stimulating active recall and spaced repetition to drastically improve cognitive retention and memory performance over time.",
      cardImage: "/images/FlashMind Display.png",
      modalImage: "/images/FlashMind UIUX.png",
      tech: ["React.js"],
      githubLink: "https://github.com/Aaeyron/FlashMind", 
      liveLink: "https://flash-mind-alpha.vercel.app/",
    },
  ];

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const badgeColor = "hsl(25, 29.37%, 53.62%)";

  useEffect(() => {
    document.body.style.overflow = (showModal || lightboxImage) ? "hidden" : "auto";
  }, [showModal, lightboxImage]);

  const openModal = (idx: number) => {
    setSelectedProject(idx);
    setCurrentImgIndex(0); // Default to first display image
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 z-50 py-4 shadow-md">
        <div className="flex flex-col items-center justify-center px-4">
          
          {/* Mobile Menu Toggle Button (Shows only on small screens) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center transition focus:outline-none mb-1 cursor-pointer"
          >
            <svg
              className={`w-5 h-5 text-black transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Nav Container - Desktop horizontal row / Mobile conditional slide down */}
          <nav className={`grid transition-all duration-300 ease-in-out overflow-hidden w-full md:w-auto text-gray-700 font-sans font-semibold text-sm sm:text-base
            ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 md:opacity-100 md:grid-rows-none"}
          `}>
            <div className={`overflow-hidden flex flex-col items-center space-y-3 pt-3 md:pt-0 md:space-y-0 md:flex-row md:justify-center md:space-x-2 sm:space-x-4 md:space-x-20`}>
              <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition cursor-pointer">
                About
              </Link>
              <Link href="/projects" onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition cursor-pointer">
                Projects
              </Link>
              <Link href="/certificates" onClick={() => setIsOpen(false)} className="hover:text-blue-500 transition cursor-pointer">
                Certificates
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-28 pb-50 min-h-screen bg-gray-50 px-4 md:px-6">
        <section className="max-w-6xl mx-auto text-center" data-aos="fade-up">
          <span
            className="block text-sm font-normal tracking-widest uppercase mb-3"
            style={{ color: badgeColor, fontFamily: "sans-serif" }}
          >
            Portfolio
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-tight mb-6 text-black">
            My Projects
          </h2>

          <p
            className="text-gray-600 text-base sm:text-lg md:text-xl mb-12 md:mb-16 max-w-3xl mx-auto"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Here are some of the projects I’ve built while learning web development. Each project demonstrates my skills and approach to solving problems with modern tools and frameworks.
          </p>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
            {projects.map((proj, idx) => (
              <div key={idx} className="group cursor-pointer text-left">
                <div
                  className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4 sm:mb-6 bg-gray-200 flex items-center justify-center border border-black cursor-pointer"
                  onClick={() => openModal(idx)}
                >
                  {proj.cardImage ? (
                    <Image
                      src={proj.cardImage}
                      alt={proj.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <span className="text-gray-500">Image Placeholder</span>
                  )}

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white text-black rounded-full font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs sm:text-sm font-medium px-2 py-1 rounded-md"
                        style={{
                          color: badgeColor,
                          backgroundColor: "white",
                          border: `1px solid ${badgeColor}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-medium group-hover:text-primary transition-colors text-black">
                    {proj.title}
                  </h3>

                  {/* Project Short Description */}
                  <p
                    className="leading-relaxed text-gray-600 text-sm sm:text-base line-clamp-3"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    {proj.shortDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal */}
        {selectedProject !== null && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 sm:px-4 transition-opacity duration-300 ${
              showModal ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-black transform transition-all duration-300 ${
                showModal ? "scale-100" : "scale-95"
              }`}
            >
              {/* Close Button Container - Styled for clear tap accessibility on mobile screen widths */}
              <div className="sticky top-0 bg-white/90 backdrop-blur-sm flex justify-end items-center z-30 pr-2 border-b border-gray-100">
                <button
                  onClick={closeModal}
                  className="p-3 text-xl font-bold text-gray-600 hover:text-black transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 px-4 pb-6 sm:px-6 md:px-8">
                
                {/* Image Gallery Section */}
                <div className="w-full">
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-square bg-gray-200 border border-black rounded-lg overflow-hidden group/img">
                    
                    {/* View/Click full layout container */}
                    <div 
                      key={currentImgIndex}
                      onClick={() => {
                        const targetImage = currentImgIndex === 0 
                          ? projects[selectedProject].cardImage 
                          : projects[selectedProject].modalImage;
                        setLightboxImage(targetImage);
                      }}
                      className="relative w-full h-full cursor-zoom-in transition-opacity duration-300 ease-in-out animate-in fade-in"
                    >
                      <Image
                        src={currentImgIndex === 0 ? projects[selectedProject].cardImage : projects[selectedProject].modalImage}
                        alt={`${projects[selectedProject].title} display view`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">Click to view full image</span>
                      </div>
                    </div>

                    {/* Arrow Navigation Button - Left */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImgIndex(prev => (prev === 0 ? 1 : 0));
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow border border-gray-300 transition z-20 text-xs font-bold w-8 h-8 flex items-center justify-center cursor-pointer"
                      title="Previous Image"
                    >
                      ❮
                    </button>

                    {/* Arrow Navigation Button - Right */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImgIndex(prev => (prev === 0 ? 1 : 0));
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow border border-gray-300 transition z-20 text-xs font-bold w-8 h-8 flex items-center justify-center cursor-pointer"
                      title="Next Image"
                    >
                      ❯
                    </button>

                    {/* Image indicator dots indicator bottom */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/40 px-2 py-1 rounded-full">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentImgIndex(0); }}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${currentImgIndex === 0 ? "bg-white scale-110" : "bg-white/50"}`}
                      />
                      <button 
                        onClick={(e) => { e.stopPropagation(); setCurrentImgIndex(1); }}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${currentImgIndex === 1 ? "bg-white scale-110" : "bg-white/50"}`}
                      />
                    </div>

                  </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col">
                  <h2 className="text-2xl sm:text-3xl font-serif font-medium mb-4 text-black">
                    {projects[selectedProject].title}
                  </h2>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projects[selectedProject].tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs sm:text-sm font-medium px-2 py-1 rounded-md"
                        style={{
                          color: badgeColor,
                          backgroundColor: "white",
                          border: `1px solid ${badgeColor}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p
                    className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    {projects[selectedProject].longDescription}
                  </p>

                  {/* Action Buttons Container */}
                  <div className="mt-auto flex items-center gap-3">
                    {/* GitHub Button */}
                    <a
                      href={projects[selectedProject].githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 border border-black rounded-full hover:bg-gray-100 transition cursor-pointer"
                    >
                      <Github size={20} className="text-black" />
                    </a>

                    {/* Vercel Live Deployment Button */}
                    {projects[selectedProject].liveLink && (
                      <a
                        href={projects[selectedProject].liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 border border-black rounded-full hover:bg-gray-100 transition cursor-pointer"
                        title="View Live Site"
                      >
                        <ExternalLink size={20} className="text-black" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Lightbox Portal Overlay */}
        {lightboxImage && (
          <div 
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out transition-opacity duration-300 ease-in-out animate-in fade-in"
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition focus:outline-none cursor-pointer"
            >
              ✕
            </button>
            <div className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center">
              <img 
                src={lightboxImage} 
                alt="Fullscreen project view" 
                className="max-w-full max-h-full object-contain border border-neutral-800 rounded shadow-2xl"
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}