"use client";
import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import ContactSlide from "../contact/page";

export default function ContactWrapper() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      {/* Floating Contact Button */}
      <button
        onClick={() => setIsContactOpen(true)}
        aria-label="Open Contact"
        className="
          fixed
          top-4 right-4
          sm:top-5 sm:right-5
          z-50
          flex items-center justify-center
          w-12 h-12 sm:w-14 sm:h-14
          rounded-full
          bg-white
          border border-black
          text-black
          shadow-md
          hover:bg-blue-500 hover:text-white
          transition-all
          active:scale-95
          cursor-pointer
        "
      >
        <FaPhone className="text-lg sm:text-xl" />
      </button>

      {isContactOpen && (
        <ContactSlide onClose={() => setIsContactOpen(false)} />
      )}
    </>
  );
}
