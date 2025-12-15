"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer"; // Import Footer
import { Github } from "lucide-react";

export default function Projects() {
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
  ];

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const badgeColor = "hsl(25, 29.37%, 53.62%)";

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const openModal = (idx: number) => {
    setSelectedProject(idx);
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
  <nav className="flex flex-wrap justify-center md:justify-center space-x-2 sm:space-x-4 md:space-x-20 text-gray-700 font-sans font-semibold text-sm sm:text-base">
    <Link href="/about" className="hover:text-blue-500 transition">About</Link>
    <Link href="/projects" className="hover:text-blue-500 transition">Projects</Link>
    <Link href="/certificates" className="hover:text-blue-500 transition">Certificates</Link>
    <Link href="/journal" className="hover:text-blue-500 transition">Journal</Link>
  </nav>
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
                  className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4 sm:mb-6 bg-gray-200 flex items-center justify-center border border-black"
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
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="sticky top-0 ml-auto block p-3 text-xl text-gray-600 hover:text-black z-10 cursor-pointer"
      >
        ✕
      </button>

      {/* Modal Content */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 px-4 pb-6 sm:px-6 md:px-8">
        
        {/* Image Section */}
        <div className="w-full">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-square bg-gray-200 border border-black rounded-lg overflow-hidden">
            <Image
              src={projects[selectedProject].modalImage}
              alt={projects[selectedProject].title}
              fill
              className="object-cover"
            />
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

          {/* GitHub Button */}
          <div className="mt-auto">
            <a
              href={projects[selectedProject].githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 border border-black rounded-full hover:bg-gray-100 transition"
            >
              <Github size={20} className="text-black" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
