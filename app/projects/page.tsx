"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SiteNav from "../components/SiteNav";
import ScrollAnimations from "../components/ScrollAnimations";
import { ArrowDownRight, ArrowUpRight, Github, ExternalLink } from "lucide-react";

export default function Projects() {
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
  const badgeColor = "#2457f5";

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
      <SiteNav />
      <ScrollAnimations />

      <main className="projects-page">
        <section className="projects-hero">
          <div className="projects-hero-copy" data-aos="fade-up" data-aos-duration="950">
            <p className="eyebrow">SELECTED WORK / 2025—2026</p>
            <h1>
              Projects built to
              <span> solve real problems.</span>
            </h1>
            <p className="projects-hero-summary">
              A focused collection of full-stack systems and digital experiences shaped through learning, iteration, and practical use cases.
            </p>
            <a href="#project-01" className="projects-scroll-link">
              Explore the work <ArrowDownRight size={20} />
            </a>
          </div>

          <div className="projects-hero-count" aria-label={`${projects.length} selected projects`} data-aos="fade-left" data-aos-delay="160">
            <strong>0{projects.length}</strong>
            <span>Selected builds<br />across web and product</span>
          </div>
        </section>

        {projects.map((proj, idx) => (
          <section
            id={`project-0${idx + 1}`}
            className={`project-showcase ${idx % 2 === 1 ? "project-showcase-alt" : ""}`}
            key={proj.title}
          >
            <div className="project-showcase-inner">
              <button
                type="button"
                className="project-showcase-image"
                onClick={() => openModal(idx)}
                aria-label={`View details for ${proj.title}`}
                data-aos={idx % 2 === 1 ? "fade-left" : "fade-right"}
                data-aos-duration="900"
              >
                <Image
                  src={proj.cardImage}
                  alt={`${proj.title} interface preview`}
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                  className="project-showcase-picture"
                />
                <span className="project-image-action">View project <ArrowUpRight size={20} /></span>
              </button>

              <div
                className="project-showcase-copy"
                data-aos={idx % 2 === 1 ? "fade-right" : "fade-left"}
                data-aos-delay="130"
                data-aos-duration="900"
              >
                <div className="project-showcase-meta">
                  <span>0{idx + 1}</span>
                  <span>{proj.tech.join(" / ")}</span>
                </div>
                <h2>{proj.title}</h2>
                <p>{proj.shortDescription}</p>
                <div className="project-showcase-tags">
                  {proj.tech.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <button type="button" className="project-details-button" onClick={() => openModal(idx)}>
                  View case study <ArrowUpRight size={21} />
                </button>
              </div>
            </div>
          </section>
        ))}

        {/* Modal */}
        {selectedProject !== null && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 sm:px-4 transition-opacity duration-300 ${
              showModal ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className={`relative bg-white text-[#14213d] w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-[#14213d]/20 transform transition-all duration-300 ${
                showModal ? "scale-100" : "scale-95"
              }`}
            >
              {/* Close Button Container - Styled for clear tap accessibility on mobile screen widths */}
              <div className="sticky top-0 bg-white/90 backdrop-blur-sm flex justify-end items-center z-30 pr-2 border-b border-[#14213d]/10">
                <button
                  onClick={closeModal}
                  className="p-3 text-xl font-bold text-[#5f6b7a] hover:text-[#2457f5] transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 px-4 pb-6 sm:px-6 md:px-8">
                
                {/* Image Gallery Section */}
                <div className="w-full">
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-square bg-[#dce7ff] border border-[#14213d]/20 rounded-lg overflow-hidden group/img">
                    
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
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#14213d] p-2 rounded-full shadow border border-[#14213d]/20 transition z-20 text-xs font-bold w-8 h-8 flex items-center justify-center cursor-pointer"
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
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#14213d] p-2 rounded-full shadow border border-[#14213d]/20 transition z-20 text-xs font-bold w-8 h-8 flex items-center justify-center cursor-pointer"
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
                  <h2 className="text-2xl sm:text-3xl font-sans font-extrabold mb-4 text-[#14213d]">
                    {projects[selectedProject].title}
                  </h2>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projects[selectedProject].tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs sm:text-sm font-bold px-2 py-1 rounded-md"
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
                    className="text-[#14213d]/80 font-medium text-sm sm:text-base leading-relaxed mb-6"
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
                      className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 border-2 border-[#2457f5] text-[#2457f5] rounded-full hover:bg-[#2457f5] hover:text-white transition cursor-pointer"
                    >
                      <Github size={20} />
                    </a>

                    {/* Vercel Live Deployment Button */}
                    {projects[selectedProject].liveLink && (
                      <a
                        href={projects[selectedProject].liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 border-2 border-[#2457f5] text-[#2457f5] rounded-full hover:bg-[#2457f5] hover:text-white transition cursor-pointer"
                        title="View Live Site"
                      >
                        <ExternalLink size={20} />
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
              className="absolute top-4 right-4 text-white text-2xl hover:text-[#8fb0ff] transition focus:outline-none cursor-pointer"
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

    </>
  );
}
