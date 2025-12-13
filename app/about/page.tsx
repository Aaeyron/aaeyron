"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Footer from "../components/Footer";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 z-50 py-4 shadow-md">
  <nav className="flex flex-wrap justify-center md:justify-center space-x-2 sm:space-x-4 md:space-x-20 text-gray-700 font-sans font-semibold text-sm sm:text-base">
     <Link href="/" className="hover:text-blue-500 transition">Home</Link>
    <Link href="/projects" className="hover:text-blue-500 transition">Projects</Link>
    <Link href="/certificates" className="hover:text-blue-500 transition">Certificates</Link>
    <Link href="/journal" className="hover:text-blue-500 transition">Journal</Link>
  </nav>
</header>

      {/* Main Content */}
      <main className="pt-28 min-h-screen bg-gray-50 px-4 md:px-6 py-20">

        {/* Portrait + Text Section */}
        <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10" data-aos="fade-up">

          {/* Portrait Image */}
          <div className="w-64 sm:w-72 md:w-80 h-96 sm:h-[26rem] md:h-[28rem] relative rounded-lg overflow-hidden border-4 border-black flex-shrink-0 mt-24">
            <img
              src="/images/MeAgain.jpeg"
              alt="Aaron Seth Portrait"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="text-center md:text-left mt-12 md:mt-24 md:ml-10 flex-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900 drop-shadow-sm tracking-wide">About Me</h1>
            <p className="text-base sm:text-lg md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0 mb-12 font-sans">
              Hi! I am Aaron, an aspiring frontend developer who enjoys creating clean, responsive, and user-friendly websites. I love learning new tools and frameworks, improving my skills, and building simple ideas into real and functional web designs. As I continue growing, I aim to develop better websites and become a more confident and reliable developer.
            </p>

            {/* Skill Cards */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-6 mt-6 justify-center md:justify-start">
              {/* Card 1 */}
              <div className="w-64 sm:w-72 md:w-72 h-40 border-2 border-black rounded-lg p-3 flex flex-col items-center justify-center"
                   style={{ backgroundColor: "rgba(245, 245, 220, 0.6)" }}>
                <div className="w-10 h-10 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18v16H3V4zm3 3v10h12V7H6z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">Frontend Development</h3>
                <p className="text-xs text-gray-700 text-center">
                  Building responsive, clean, and user-friendly web interfaces with HTML, CSS, and JavaScript.
                </p>
              </div>

              {/* Card 2 */}
              <div className="w-64 sm:w-72 md:w-72 h-40 border-2 border-black rounded-lg p-3 flex flex-col items-center justify-center"
                   style={{ backgroundColor: "rgba(245, 245, 220, 0.6)" }}>
                <div className="w-10 h-10 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">UI/UX Design</h3>
                <p className="text-xs text-gray-700 text-center">
                  Creating clean and user-friendly interfaces with good layout, colors, and interactions for better user experiences.
                </p>
              </div>

              {/* Card 3 */}
              <div className="w-64 sm:w-72 md:w-72 h-40 border-2 border-black rounded-lg p-3 flex flex-col items-center justify-center"
                   style={{ backgroundColor: "rgba(245, 245, 220, 0.6)" }}>
                <div className="w-10 h-10 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    <circle cx="12" cy="10" r="1" stroke="black" strokeWidth={2} />
                    <circle cx="12" cy="14" r="1" stroke="black" strokeWidth={2} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">Full Stack / Backend</h3>
                <p className="text-xs text-gray-700 text-center">
                  Learning to handle server-side logic, databases, and APIs to create complete, functional web applications.
                </p>
              </div>
            </div>
          </div>
        </section>

       {/* Education Timeline Section */}
<section 
  className="relative w-full bg-white py-20 mt-60" // Full-width white background
  data-aos="fade-up"
>
  {/* Full-width wrapper to cover left and right */}
  <div className="w-full">
    <div className="max-w-5xl mx-auto px-6">
      
      {/* Small left-aligned title */}
      <span
        className="block text-sm font-normal tracking-widest uppercase mb-3"
        style={{ color: 'hsl(25, 29.37%, 53.62%)', fontFamily: 'sans-serif' }}
      >
        Academic Background
      </span>

      {/* Main heading */}
      <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-16 text-black">
        Education
      </h2>

      {/* Timeline container */}
      <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent space-y-12">

        {/* College */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-yellow-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 10v6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white border border-gray-200 rounded-xl shadow-xs hover:shadow-md transition-all">
            <div className="flex flex-col mb-2">
              <span className="text-yellow-500 text-sm font-bold tracking-wider uppercase mb-1">2024 - 2025</span>
              <h3 className="text-xl font-serif font-medium text-black">Bachelor of Science in Information Technology</h3>
              <span className="text-gray-500 text-sm">Holy Cross of Davao College</span>
            </div>
            <p className="text-gray-500 leading-relaxed mt-4">
              Dean’s Lister. Currently in Year 3, specializing in Web Development and IT Systems.
            </p>
          </div>
        </div>

        {/* Senior High School */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-yellow-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 10v6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white border border-gray-200 rounded-xl shadow-xs hover:shadow-md transition-all">
            <div className="flex flex-col mb-2">
              <span className="text-yellow-500 text-sm font-bold tracking-wider uppercase mb-1">2021 - 2023</span>
              <h3 className="text-xl font-serif font-medium text-black">Senior High School</h3>
              <span className="text-gray-500 text-sm">Davao City National High School</span>
            </div>
            <p className="text-gray-500 leading-relaxed mt-4">
              With High Honors.
            </p>
          </div>
        </div>

        {/* Junior High School */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-yellow-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 10v6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white border border-gray-200 rounded-xl shadow-xs hover:shadow-md transition-all">
            <div className="flex flex-col mb-2">
              <span className="text-yellow-500 text-sm font-bold tracking-wider uppercase mb-1">2020 - 2021</span>
              <h3 className="text-xl font-serif font-medium text-black">Junior High School</h3>
              <span className="text-gray-500 text-sm">Davao City National High School</span>
            </div>
            <p className="text-gray-500 leading-relaxed mt-4">
              Completed Junior High School with strong academic performance.
            </p>
          </div>
        </div>

        {/* Elementary */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-yellow-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 group-hover:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 10v6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
            </svg>
          </div>
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white border border-gray-200 rounded-xl shadow-xs hover:shadow-md transition-all">
            <div className="flex flex-col mb-2">
              <span className="text-yellow-500 text-sm font-bold tracking-wider uppercase mb-1">2010 - 2017</span>
              <h3 className="text-xl font-serif font-medium text-black">Elementary</h3>
              <span className="text-gray-500 text-sm">Saint Jude Elementary School</span>
            </div>
            <p className="text-gray-500 leading-relaxed mt-4">
              Top Achiever.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

{/* My Tech Stack Section */}
<section 
  className="relative w-full bg-gray-50 py-20" 
  data-aos="fade-up"
>
  <div className="max-w-5xl mx-auto px-6 text-center">
    
    <span
      className="block text-sm font-normal tracking-widest uppercase mb-3"
      style={{ color: 'hsl(25, 29.37%, 53.62%)', fontFamily: 'sans-serif' }}
    >
      Skills & Tools
    </span>

    <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-16 text-black">
      My Tech Stack
    </h2>
    <p
  className="text-gray-600 text-lg md:text-xl mb-16 max-w-3xl mx-auto"
  style={{ fontFamily: 'Times New Roman, serif' }}
>
  While studying Information Technology, I have gained hands-on experience with tools like HTML, CSS, JavaScript, React, Node.js, MySQL, Firebase, and PHP. I enjoy building responsive websites and dynamic applications, continuously learning new ways to solve problems and create projects that are both functional and visually appealing.
</p>


    {/* Continuous marquee container */}
    <div className="overflow-hidden relative">
      <div className="flex space-x-8 animate-marquee">
        {[
          { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
          { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
          { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
          { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
          { name: "Firebase", src: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" },
          { name: "PHP", src: "https://www.php.net/images/logos/php-logo.svg" },
          { name: "MySQL", src: "https://www.mysql.com/common/logos/logo-mysql-170x115.png" }
        ].concat([
          { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
          { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
          { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
          { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
          { name: "Firebase", src: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" },
          { name: "PHP", src: "https://www.php.net/images/logos/php-logo.svg" },
          { name: "MySQL", src: "https://www.mysql.com/common/logos/logo-mysql-170x115.png" }
        ]).map((tech, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center flex-shrink-0 hover:scale-110 transition-transform">
            <img src={tech.src} alt={tech.name} className="w-16 h-16 mb-2 rotate-12 hover:rotate-0 transition-transform" />
            <span className="text-gray-700 font-medium text-sm">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

{/* What I Can Do Section */}
<section 
  className="relative w-full bg-white py-20" 
  data-aos="fade-up"
>
  <div className="max-w-5xl mx-auto px-6 text-center">
    
    <span
      className="block text-sm font-normal tracking-widest uppercase mb-3"
      style={{ color: 'hsl(25, 29.37%, 53.62%)', fontFamily: 'sans-serif' }}
    >
      Capabilities
    </span>

    <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight mb-16 text-black">
      What I Can Do
    </h2>

    <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-3xl mx-auto"
       style={{ fontFamily: 'Times New Roman, serif' }}
    >
      I leverage my skills in frontend and backend development, UI/UX design, and problem-solving to create interactive, responsive, and visually appealing applications. I am comfortable collaborating on team projects and continuously learning new technologies to deliver efficient and reliable solutions.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* Card 1: Web Development */}
  <div className="border-2 border-black rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
    {/* Icon: Code */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
    <h3 className="text-xl font-semibold mb-2 text-center text-black">Web Development</h3>
    <p className="text-sm text-center text-black">
      Building responsive and interactive websites using HTML, CSS, JavaScript, and React.
    </p>
  </div>

  {/* Card 2: UI/UX Design */}
  <div className="border-2 border-black rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
    {/* Icon: Paint Brush */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l-4 4v4h4l4-4m0 0L20.485 7.757a2.828 2.828 0 10-4-4L9 11z" />
    </svg>
    <h3 className="text-xl font-semibold mb-2 text-center text-black">UI/UX Design</h3>
    <p className="text-sm text-center text-black">
      Designing user-friendly interfaces with intuitive navigation, layouts, and visual appeal.
    </p>
  </div>

  {/* Card 3: Full Stack & Backend */}
  <div className="border-2 border-black rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition">
    {/* Icon: Server */}
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      <circle cx="12" cy="10" r="1" stroke="black" strokeWidth={2} />
      <circle cx="12" cy="14" r="1" stroke="black" strokeWidth={2} />
    </svg>
    <h3 className="text-xl font-semibold mb-2 text-center text-black">Full Stack & Backend</h3>
    <p className="text-sm text-center text-black">
      Handling server-side logic, databases, and APIs to create complete and functional applications.
    </p>
  </div>
</div>

  </div>
</section>
      </main>

       <Footer /> 
    </>
  );
}
