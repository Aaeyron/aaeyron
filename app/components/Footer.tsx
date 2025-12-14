"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        {/* Left Side */}
<div className="footer-left text-center md:text-left">

  <h2 className="text-xl font-bold">Aaron Seth Nagtalon</h2>
  <p className="text-sm mt-2">
    Aspiring Frontend Developer passionate about building responsive, 
    clean, and modern web applications. Always learning, always growing.
  </p>
</div>


        {/* Center Side */}
        <div className="footer-center">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-blue-400 transition">About</Link></li>
            <li><Link href="/projects" className="hover:text-blue-400 transition">Projects</Link></li>
            <li><Link href="/certificates" className="hover:text-blue-400 transition">Certificates</Link></li>
          </ul>
        </div>

        {/* Right Side */}
<div className="footer-right text-center md:text-right">

  <h3 className="text-lg font-semibold mb-2">Connect</h3>
  <div className="flex justify-center md:justify-end space-x-4">

    {/* GitHub */}
    <a href="https://github.com/Aaeyron" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.42 7.86 10.96.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.95-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.18a10.93 10.93 0 012.86-.39c.97.01 1.95.13 2.86.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.57.23 2.73.11 3.02.73.81 1.18 1.85 1.18 3.11 0 4.43-2.69 5.41-5.25 5.69.41.36.77 1.08.77 2.18 0 1.57-.02 2.84-.02 3.23 0 .31.21.66.79.55C20.71 21.42 24 17.1 24 12c0-6.27-5.23-11.5-12-11.5z"/>
      </svg>
    </a>

    {/* Facebook */}
    <a href="https://www.facebook.com/aaronsethnagtalon" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.494v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.464.098 2.796.142v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.766v2.317h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z"/>
      </svg>
    </a>

    {/* Email */}
    <a href="mailto:aaronseth.nagtalon@hcdc.edu.ph" className="hover:text-blue-400 transition">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M12 12.713l11.985-9.713H.015L12 12.713zm0 2.574L.015 5.74V18c0 1.104.896 2 2 2h19.97c1.104 0 2-.896 2-2V5.74L12 15.287z"/>
      </svg>
    </a>
  </div>
</div>

      </div>
    </footer>
  );
}
