"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Journal() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentType, setModalContentType] = useState<"camera" | "paper" | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cameraImages: string[] = [
  "/images/Dump1.jpg",
  "/images/Dumpic2.jpg",
  "/images/Dump3.jpg",
  "/images/Dump4.jpg",
  "/images/Dump5.jpg",
  "/images/Dump6.jpg",
  "/images/Dump7.jpg",
  "/images/Dump12.jpg",
  "/images/Dump9.jpeg",
  "/images/Dump10.jpg",
  "/images/Dump11.jpg",
  "/images/Dump13.jpeg",
   "/images/Dump14.jpeg",
   "/images/Dump15.jpeg",
   "/images/Dump16.jpeg",
   "/images/Dump17.jpg",
   "/images/Dump18.jpeg",
   "/images/Dump19.jpeg",
   "/images/Dump20.jpeg",
];

const paperImages: string[] = [
  "/images/Journal1.jpg",
  "/images/Journal2.jpg",
  "/images/Journal3.jpg",
  "/images/Journal4.jpg",
  "/images/Journal5.jpg",
  "/images/Journal6.jpg",
  "/images/Journal7.jpg",
  "/images/Journal8.jpg",
  
];

  const openModal = (type: "camera" | "paper") => {
    setModalContentType(type);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const prevImage = () => {
    const images = modalContentType === "camera" ? cameraImages : paperImages;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    const images = modalContentType === "camera" ? cameraImages : paperImages;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  
  const journalEntriesDay1 = [
    {
      title: "WORLDTECH INFORMATION SOLUTIONS, INC.",
      date: "November 19, 2025",
      description:
        "Our visit to WORLDTECH Information Solutions, Inc. was really eye-opening. Their team explained how they deal with cybersecurity, including how they track digital activities, protect systems from threats, and understand different hacking methods. They also showed us how important security is in today’s technology, especially in protecting data and preventing attacks. Overall, it was a fun and interesting experience that gave me a clearer idea of how cybersecurity works in real life.",
      image: "/images/WORLDTECH (DAY1).jpg",
    },
    {
      title: "Davao Airport",
      date: "November 19, 2025",
      description:
        "Here’s a group photo of our team, Bus B, right before our flight to Cebu! Everyone was full of excitement and energy, ready to start our adventure together. It was fun seeing all of us gathered, laughing, and sharing the anticipation for the experiences ahead. This moment really captured the start of an unforgettable journey with my team.",
      image: "/images/DAVAOAIRP(DAY1).jpg",
    },
  ];

  const journalEntriesDay2 = [
    {
      title: "CODECHUM",
      date: "November 20, 2025",
      description:
        "During our visit to Codechum, I got a closer look at how a modern software development team works together. I observed their coding methods, learned about simple project management techniques, and saw how team members solve problems and collaborate day to day.",
      image: "/images/CCODECHUM(DAY2).jpeg",
    },
    {
      title: "RIVAN IT CEBU",
      date: "November 20, 2025",
      description:
        "Visiting Rivan IT Cebu taught us a lot about how networking works, especially with Cisco systems. We learned how data moves across networks and the basics of network security.",
      image: "/images/RIVAN (DAY2).jpg",
    },
  ];

  const journalEntriesDay3 = [
    {
      title: "MATA TECHNOLOGIES, INC",
      date: "November 21, 2025",
      description:
        "At Mata Technologies, Inc., we learned a lot about UI/UX design which is all about making websites and apps easy and enjoyable for people to use.",
      image: "/images/MATA TECHNO(DAY3).jpeg",
    },
    {
      title: "MATA TECHNOLOGIES, INC",
      date: "November 21, 2025",
      description:
        "Here’s a group photo of Bus B at Mata Technologies! We were all excited to be there and explore how design and creativity come together.",
      image: "/images/MATATECHNOLOGIES (DAY3).jpg",
    },
  ];

  const journalEntriesDay4 = [
    {
      title: "BOHOL TARSIER",
      date: "November 22, 2025",
      description:
        "Before heading into the forest to see the tarsiers, our Bus B team gathered for a group photo.",
      image: "/images/TARSIER(DAY4).jpg",
    },
    {
      title: "CHOCOLATE HILLS",
      date: "November 22, 2025",
      description:
        "Group photo at the Chocolate Hills in Bohol. Surrounded by the unique, rolling hills.",
      image: "/images/BOHOL DAY4.jpg",
    },
    {
      title: "T.A.R.S.I.E.R 177",
      date: "November 22, 2025",
      description:
        "During our visit to T.A.R.S.I.E.R 177, we got to see how emergency response systems work.",
      image: "/images/TARSIERRRR117.jpg",
    },
  ];

  const currentImages =
  modalContentType === "camera"
    ? cameraImages
    : modalContentType === "paper"
    ? paperImages
    : [];


  const renderDaySection = (
    dayEntries: typeof journalEntriesDay1,
    dayLabel: string,
    dayDate: string,
    columns: number
  ) => (
    <div className="mb-20">
      <div className="max-w-6xl mx-auto text-left mb-10">
        <p
          className="text-base font-semibold tracking-wide"
          style={{ color: "hsl(25, 29.37%, 53.62%)" }}
        >
          {dayLabel}
        </p>
        <p
          className="text-sm font-medium"
          style={{ color: "hsl(25, 29.37%, 53.62%)" }}
        >
          {dayDate}
        </p>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        } gap-6 sm:gap-8`}
      >
        {dayEntries.map((entry, index) => (
          <div
            key={index}
            className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-400/50 transition-colors"
          >
            <div className="relative overflow-hidden aspect-[4/3] h-64 sm:h-72 md:h-80">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
              <Image
                src={entry.image}
                alt={entry.title}
                fill
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-grow">
              <div
                className="flex items-center gap-2 text-sm sm:text-base font-medium mb-3"
                style={{ color: "hsl(25, 29.37%, 53.62%)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span>{entry.date}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-serif font-medium mb-3 text-black group-hover:text-blue-500 transition-colors">
                {entry.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {entry.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 z-50 py-4 shadow-md">
  <nav className="flex flex-wrap justify-center md:justify-center space-x-2 sm:space-x-4 md:space-x-20 text-gray-700 font-sans font-semibold text-sm sm:text-base">
    <Link href="/about" className="hover:text-blue-500 transition">About</Link>
    <Link href="/projects" className="hover:text-blue-500 transition">Projects</Link>
    <Link href="/certificates" className="hover:text-blue-500 transition">Certificates</Link>
    <Link href="/journal" className="hover:text-blue-500 transition">Journal</Link>
  </nav>
</header>

      {/* Main */}
      <main className="pt-28 px-4 sm:px-6 flex-grow pb-50">
        <section className="max-w-6xl mx-auto text-center" data-aos="fade-up">
          {/* Title */}
          <div className="mb-8 sm:mb-12">
            <span
              className="block text-sm font-medium tracking-widest uppercase mb-3"
              style={{ color: "hsl(25, 29.37%, 53.62%)" }}
            >
              Educational Tour
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-tight text-black mb-2">
              Journal & <br /> Field Trips
            </h2>
          </div>
          {/* DAY 1 Label */}
          <div className="max-w-6xl mx-auto text-left mb-10">
            <p
              className="text-base font-semibold tracking-wide"
              style={{ color: "hsl(25, 29.37%, 53.62%)" }}
            >
              DAY 1
            </p>
            <p
              className="text-sm font-medium"
              style={{ color: "hsl(25, 29.37%, 53.62%)" }}
            >
              November 19, 2025
            </p>
          </div>

          {/* DAY 1 Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {journalEntriesDay1.map((entry, index) => (
              <div
                key={index}
                className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-400/50 transition-colors"
              >
                <div className="relative overflow-hidden aspect-[4/3] h-64 md:h-72 lg:h-80">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                  {!entry.image ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      Image Placeholder
                    </div>
                  ) : (
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div
                    className="flex items-center gap-2 text-sm font-medium mb-3"
                    style={{ color: "hsl(25, 29.37%, 53.62%)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-calendar"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                    <span>{entry.date}</span>
                  </div>

                  <h3 className="text-xl font-serif font-medium mb-3 text-black group-hover:text-blue-500 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* DAY 2 Label */}
          <div className="max-w-6xl mx-auto text-left mb-10">
            <p
              className="text-base font-semibold tracking-wide"
              style={{ color: "hsl(25, 29.37%, 53.62%)" }}
            >
              DAY 2
            </p>
            <p
              className="text-sm font-medium"
              style={{ color: "hsl(25, 29.37%, 53.62%)" }}
            >
              November 20, 2025
            </p>
          </div>

          {/* DAY 2 Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {journalEntriesDay2.map((entry, index) => (
              <div
                key={index}
                className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-400/50 transition-colors"
              >
                <div className="relative overflow-hidden aspect-[4/3] h-64 md:h-72 lg:h-80">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                  {!entry.image ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      Image Placeholder
                    </div>
                  ) : (
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out ${
                        entry.title === "RIVAN IT CEBU"
                          ? "object-[center_35%]"
                          : "object-center"
                      }`}
                    />
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div
                    className="flex items-center gap-2 text-sm font-medium mb-3"
                    style={{ color: "hsl(25, 29.37%, 53.62%)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-calendar"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                    <span>{entry.date}</span>
                  </div>

                  <h3 className="text-xl font-serif font-medium mb-3 text-black group-hover:text-blue-500 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* DAY 3 Label */}
          <div className="max-w-6xl mx-auto text-left mt-20 mb-10">
            <p
              className="text-base font-semibold tracking-wide"
              style={{ color: "hsl(25, 29.37%, 53.62%)" }}
            >
              DAY 3
            </p>
            <p
              className="text-sm font-medium"
              style={{ color: "hsl(25, 29.37%, 53.62%)" }}
            >
              November 21, 2025
            </p>
          </div>

          {/* DAY 3 Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {journalEntriesDay3.map((entry, index) => (
              <div
                key={index}
                className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-400/50 transition-colors"
              >
                <div className="relative overflow-hidden aspect-[4/3] h-64 md:h-72 lg:h-80">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                  {!entry.image ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      Image Placeholder
                    </div>
                  ) : (
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div
                    className="flex items-center gap-2 text-sm font-medium mb-3"
                    style={{ color: "hsl(25, 29.37%, 53.62%)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-calendar"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                    <span>{entry.date}</span>
                  </div>

                  <h3 className="text-xl font-serif font-medium mb-3 text-black group-hover:text-blue-500 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* DAY 4 Label */}
          <div className="max-w-6xl mx-auto text-left mt-20 mb-10">
            <p
              className="text-base font-semibold tracking-wide"
              style={{ color: "hsl(25, 29.37%, 53.62%)" }}
            >
              DAY 4
            </p>
            <p
              className="text-sm font-medium"
              style={{ color: "hsl(25, 29.37%, 53.62%)" }}
            >
              November 22, 2025
            </p>
          </div>

          {/* DAY 4 Cards - 3 Images Row */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {journalEntriesDay4.map((entry, index) => (
              <div
                key={index}
                className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-400/50 transition-colors"
              >
                <div className="relative overflow-hidden aspect-[4/3] h-64 md:h-72 lg:h-80">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                  {!entry.image ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      Image Placeholder
                    </div>
                  ) : (
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div
                    className="flex items-center gap-2 text-sm font-medium mb-3"
                    style={{ color: "hsl(25, 29.37%, 53.62%)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-calendar"
                    >
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                    <span>{entry.date}</span>
                  </div>

                  <h3 className="text-xl font-serif font-medium mb-3 text-black group-hover:text-blue-500 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

         {/* Icons - Camera & Writing Paper */}
<div className="relative flex justify-center gap-10 mt-10 mb-20" id="icon-row">

  {/* Camera Icon */}
  <svg  
    onClick={() => openModal("camera")}
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="cursor-pointer hover:scale-110 transition-transform"
  >
    <path d="M23 19V7a2 2 0 0 0-2-2h-3l-2-3H8L6 5H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>

  {/* Writing Paper Icon */}
  <svg
    onClick={() => openModal("paper")}
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="cursor-pointer hover:scale-110 transition-transform"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <line x1="17" y1="21" x2="7" y2="21"></line>
    <line x1="7" y1="10" x2="17" y2="10"></line>
    <line x1="7" y1="14" x2="17" y2="14"></line>
  </svg>

  {isModalOpen && (
  <div
  className="absolute bg-white border-2 border-black flex items-center justify-center z-50"
  style={{
    top: -400,
    left: "50%",
    transform: "translateX(-50%)",
    width: "800px",
    maxWidth: "95vw",
    height: "780px",
    maxHeight: "95vh",
  }}
>

    {/* Close Button */}
    <button
      onClick={closeModal}
      className="absolute top-2 right-2 text-black font-bold text-2xl hover:text-red-600 transition cursor-pointer"
    >
      X
    </button>

    {/* Image Container */}
    <div
      className="relative flex items-center justify-center"
      style={{
        width: "600px",
        maxWidth: "90vw",
        height: "680px",
        maxHeight: "85vh",
      }}
    >
      {/* Left Arrow */}
      <button
        onClick={prevImage}
        className="absolute left-0 text-black text-3xl font-bold hover:text-gray-700 transition cursor-pointer z-10"
        style={{ transform: "translateX(-50%)" }}
      >
        &lt;
      </button>

      {/* Image */}
      {currentImages.length > 0 && (
        <Image
          src={currentImages[currentImageIndex]}
          alt="Modal Image"
          fill
          className="object-cover"
        />
      )}

      {/* Right Arrow */}
      <button
        onClick={nextImage}
        className="absolute right-0 text-black text-3xl font-bold hover:text-gray-700 transition cursor-pointer z-10"
        style={{ transform: "translateX(50%)" }}
      >
        &gt;
      </button>
    </div>
  </div>
)}

</div>



        </section>
      </main>
         {/* Footer */}
              <Footer />
    </div>
  );
}
