"use client";

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from "next/link";
import Footer from './components/Footer';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

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


      <main className="pt-28 pb-50 min-h-screen bg-white px-2 sm:px-4 md:px-6 flex-grow">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-20 md:mt-30 gap-6 md:gap-0">
          {/* Text */}
          <div className="flex-1 max-w-full sm:max-w-md md:max-w-lg text-center md:text-left md:ml-0 md:ml-60 mt-16 md:mt-28" data-aos="fade-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 whitespace-nowrap">
              Hello! I'm Aaron Seth 
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 whitespace-nowrap">
              Nagtalon
            </h1>
            <p className="mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg font-serif text-gray-800">
              Welcome to my portfolio. I’m a student learning web development and design, and I’m excited to build beautiful and functional websites as I continue improving my skills.
            </p>
            <Link href="/projects">
  <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition text-sm sm:text-base">
    View My Work
  </button>
</Link>
          </div>

          {/* Profile Image */}
          <div className="flex-1 flex items-start mt-10 md:mt-16 justify-center md:justify-end pr-0 md:pr-10 lg:pr-50" data-aos="fade-left">
            <div className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative rounded-full overflow-hidden border-4 border-black">
              <Image
                src="/images/Okayy.jpg"
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <section id="about" className="mt-32 md:mt-60 px-2 sm:px-4 md:px-6 py-16 md:py-20 bg-gray-50">
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center mb-4 sm:mb-5 md:mb-6" data-aos="fade-up">
            About Me
          </h2>

          <p className="max-w-xs sm:max-w-md md:max-w-3xl mx-auto text-center text-sm sm:text-base md:text-lg text-gray-800 mb-8 sm:mb-10 md:mb-12" data-aos="fade-up" data-aos-delay="100">
            I am an aspiring frontend developer passionate about creating clean, responsive, and user-friendly websites. I love exploring new technologies, learning modern web frameworks, and continuously improving my skills to build beautiful and functional web experiences.
          </p>

          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-8">
            {/* Card 1 */}
            <div className="w-56 sm:w-64 md:w-64 lg:w-64 h-52 sm:h-56 md:h-56 border-2 border-black rounded-lg flex flex-col items-center justify-center p-4" style={{ backgroundColor: 'rgba(245, 245, 220, 0.6)' }} data-aos="fade-up">
              <div className="w-16 h-16 sm:w-20 sm:h-16 border-2 border-black rounded-md flex items-center justify-center mb-3 sm:mb-4 relative">
                <span className="absolute text-black font-mono text-base sm:text-lg">&lt; / &gt;</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 text-center">Clean & Semantic Code</h3>
              <p className="text-gray-700 text-center text-xs sm:text-sm">I write organized and semantic HTML, maintainable CSS, and clean JavaScript for readable and scalable web projects.</p>
            </div>

            {/* Card 2 */}
            <div className="w-56 sm:w-64 md:w-64 lg:w-64 h-52 sm:h-56 md:h-56 border-2 border-black rounded-lg flex flex-col items-center justify-center p-4" style={{ backgroundColor: 'rgba(245, 245, 220, 0.6)' }} data-aos="fade-up" data-aos-delay="100">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className="w-10 h-10 sm:w-12 sm:h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM3 14h7v7H3v-7zM14 14h7v7h-7v-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 text-center">UI/UX Styling</h3>
              <p className="text-gray-700 text-center text-xs sm:text-sm">I design clean, modern, and user-friendly interfaces with attention to visual hierarchy, responsiveness, and intuitive interactions.</p>
            </div>

            {/* Card 3 */}
            <div className="w-56 sm:w-64 md:w-64 lg:w-64 h-52 sm:h-56 md:h-56 border-2 border-black rounded-lg flex flex-col items-center justify-center p-4" style={{ backgroundColor: 'rgba(245, 245, 220, 0.6)' }} data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className="w-10 h-10 sm:w-12 sm:h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18v14H3V5z M3 7h18 M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 text-center">Responsive Components</h3>
              <p className="text-gray-700 text-center text-xs sm:text-sm">I build interfaces that adapt seamlessly across devices, ensuring consistent usability on desktop, tablet, and mobile screens.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
