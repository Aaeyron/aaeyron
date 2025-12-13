"use client";
import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import ContactSlide from "../contact/page";

export default function ContactWrapper() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsContactOpen(true)}
        className="
          fixed 
          top-4 
          right-4 
          z-50 
          text-black 
          hover:text-blue-600 
          transition 
          text-2xl
          sm:top-3 sm:right-3
          xs:top-3 xs:right-3
          cursor-pointer
        "
        aria-label="Open Contact Slide"
      >
        <FaPhone />
      </button>

      {isContactOpen && <ContactSlide onClose={() => setIsContactOpen(false)} />}
    </>
  );
}
