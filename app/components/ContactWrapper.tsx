"use client";
import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import ContactSlide from "../contact/page";

export default function ContactWrapper() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  // Monitor DOM state to hide the button if the project modal or lightbox is open
  useEffect(() => {
    const handleBodyOverflow = () => {
      const isScrollLocked = document.body.style.overflow === "hidden";
      setIsModalActive(isScrollLocked);
    };

    // Initial check
    handleBodyOverflow();

    // Create a mutation observer to listen for style updates on the body tag
    const observer = new MutationObserver(handleBodyOverflow);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Floating Contact Button - Hidden on mobile if modal is active */}
      <button
        onClick={() => setIsContactOpen(true)}
        aria-label="Open Contact"
        className={`
          fixed
          top-4 right-4
          sm:top-5 sm:right-5
          z-50
          ${isModalActive ? "hidden md:flex" : "flex"} items-center justify-center
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
        `}
      >
        <FaPhone className="text-lg sm:text-xl" />
      </button>

      {isContactOpen && (
        <ContactSlide onClose={() => setIsContactOpen(false)} />
      )}
    </>
  );
}