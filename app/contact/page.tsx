"use client";

import { useEffect, useState } from "react";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaGithub, 
  FaInstagram, 
  FaTiktok 
} from "react-icons/fa";

interface ContactSlideProps {
  onClose: () => void;
}

export default function ContactSlide({ onClose }: ContactSlideProps) {
  const [isClosing, setIsClosing] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white border-l-2 border-black shadow-lg z-50 flex flex-col p-6 font-sans ${
        isClosing ? "animate-slideOut" : "animate-slideIn"
      }`}
      style={{ animationDuration: "0.3s" }}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-black text-2xl font-bold hover:text-red-600 transition cursor-pointer"
      >
        X
      </button>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-black mb-6 mt-20 text-center">
        Get in Touch
      </h2>

      {/* Contact Info */}
      <div className="flex flex-col gap-4 mt-16 mb-8">
        <div className="flex items-center gap-3 text-black text-base">
          <FaEnvelope size={20} />
          <span>aaronseth.nagtalon@hcdc.edu.ph</span>
        </div>
        <div className="flex items-center gap-3 text-black text-base">
          <FaPhone size={20} />
          <span>+63 915 660 4726</span>
        </div>
        <div className="flex items-center gap-3 text-black text-base">
          <FaMapMarkerAlt size={20} />
          <span>Davao, Philippines</span>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-12"> {/* Slight spacing below contact info */}
        {/* Divider Line */}
        <hr className="border-black mb-2" />

        {/* Social Media Text */}
        <span className="text-black font-semibold text-base mb-1">Social Medias</span>

        {/* Social Icons */}
        <div className="flex gap-6 mt-4"> {/* Added mt-4 to lower icons slightly */}
          <a
            href="https://www.facebook.com/aaronsethnagtalon"
            target="_blank"
            className="text-black hover:text-blue-600 transition"
          >
            <FaFacebook size={28} />
          </a>
          <a
            href="https://github.com/Aaeyron"
            target="_blank"
            className="text-black hover:text-gray-800 transition"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.instagram.com/aaeyron/"
            target="_blank"
            className="text-black hover:text-pink-500 transition"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="https://www.tiktok.com/@aaesthr0xnz"
            target="_blank"
            className="text-black hover:text-black transition"
          >
            <FaTiktok size={28} />
          </a>
        </div>
      </div>
    </div>
  );
}
