// Single source of truth for all site content.
// Anything wrapped in [TODO: …] is a placeholder waiting for real details.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; // [TODO: production URL]

export const profile = {
  name: "Aaron Seth Nagtalon",
  shortName: "Aaron Seth",
  role: "Aspiring Software & AI/ML Engineer",
  location: "Davao City, Philippines",
  email: "aaronseth041@gmail.com",
  phone: { display: "+63 915 660 4726", href: "tel:+639156604726" },
  status: "Open to internships & mentorship",
  availability: "[TODO: availability, e.g. “Available for internships from …”]",
  resume: "/resume.pdf", // [TODO: add public/resume.pdf]
  heroImage: "/images/MeAgain.jpeg",
  aboutImage: "/images/About.jpg",
  intro:
    "I’m Aaron, an Information Technology student who enjoys turning simple ideas into useful digital products.",
};

export const story = [
  "My work moves across web interfaces, mobile concepts, backend logic, and databases. I’m especially interested in how thoughtful design and solid engineering come together to make software easier to understand and use.",
  "I learn by building. Every project gives me a new problem to solve, a better question to ask, and another chance to improve how I work, from planning the experience to finishing the final version.",
];

// `short` fits the hero's Now block; `detail` is the full description (tooltip, changelog, About).
export const now = {
  building: {
    short: "TactileLens, my capstone project",
    detail: "TactileLens, my capstone project. A text-to-braille mobile app for teachers who handle visually impaired students.",
  },
  learning: {
    short: "AI/ML Engineer Intern @ Apno AI",
    detail: "AI/ML engineering. I’m currently an AI/ML Engineer intern at Apno AI, a Government of India registered MSME enterprise.",
  },
};

export const focus = [
  "Building stronger full-stack projects with clearer structure and real-world use cases.",
  "Improving how I turn product ideas into responsive, accessible interfaces.",
  "Exploring AI-assisted development as a tool for learning, research, and iteration.",
];

export type Social = { label: string; href: string; handle: string; primary: boolean };

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/Aaeyron", handle: "@Aaeyron", primary: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aaron-seth-nagtalon-289769437/",
    handle: "aaron-seth-nagtalon",
    primary: true,
  },
  { label: "Facebook", href: "https://www.facebook.com/Aaeyronn", handle: "Aaeyronn", primary: false },
  { label: "Instagram", href: "https://www.instagram.com/aaeyron/", handle: "@aaeyron", primary: false },
  { label: "TikTok", href: "https://www.tiktok.com/@aaesthr0xnz", handle: "@aaesthr0xnz", primary: false },
];

export const githubUser = "Aaeyron";

export type Decision = { title: string; detail: string };

// All three are school projects from my 3rd year of college, built as a beginner to learn.
// None are deployed or used by real clients — keep the wording honest (no "shipped", "live", "customers").
export type Project = {
  slug: string;
  title: string;
  tagline: string;
  context: string;
  stack: string[];
  image: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
  /** GitHub repo, only if a real public repo exists. */
  repo?: string;
  caseStudy: {
    short: string;
    problem: string;
    constraints: string[];
    decisions: Decision[];
    result: { learned: string; next: string };
  };
};

/** This year's highlights, shown first. Only the details Aaron provided — nothing is deployed. */
export type SelectedProject = {
  slug: string;
  title: string;
  label?: string;
  category: string;
  description: string;
  badges: string[];
  /** Only set when a real public repo exists. */
  repo?: string;
  /** [TODO: add screenshot] — put images in /public/images and set { src, alt } here. */
  image?: { src: string; alt: string };
  initials: string;
};

export const selectedProjects: SelectedProject[] = [
  {
    slug: "mg-sakura-learning-platform",
    title: "MG Sakura Learning Platform",
    category: "Centralized learning & student management platform",
    description:
      "A centralized learning and student management platform for MG Sakura Technical Institute, built for Filipinos who want to learn the Japanese language.",
    badges: ["In progress"],
    repo: "https://github.com/Aaeyron/mg-sakura-learning-platform",
    initials: "MG",
  },
  {
    slug: "tactilelens",
    title: "TactileLens",
    label: "Capstone project",
    category: "AI-assisted mobile app / Accessibility",
    description:
      "A capstone project developing an AI-assisted mobile app that recognizes printed English text and General Algebra expressions, then converts them into digital text, UEB, and Nemeth Braille, built for teachers who handle visually impaired students.",
    badges: ["Capstone", "In progress"],
    repo: "https://github.com/Aaeyron/TactileLens",
    initials: "TL",
  },
  {
    slug: "jm-learning-hub",
    title: "JM Learning Hub",
    category: "Full-Stack Educational Web Platform / Tutoring Booking & E-Commerce System",
    description:
      "A tutoring services and learning materials platform that combines service booking, e-commerce, an admin dashboard, and a learning platform.",
    badges: ["In development"],
    initials: "JM",
  },
];

export const projectsSummary = "3 school projects";

export const projects: Project[] = [
  {
    slug: "library-management-system",
    title: "Library Management System",
    tagline: "A 3rd-year school project: a role-based library system with a React front end and a Django REST backend.",
    context: "3rd-year school project",
    stack: ["React", "Django", "Python", "REST API"],
    image: { src: "/images/LMS1.png", alt: "Library Management System dashboard" },
    gallery: [
      { src: "/images/LMS1.png", alt: "Library Management System dashboard" },
      { src: "/images/LMS2.png", alt: "Library Management System detail screen" },
    ],
    repo: "https://github.com/Aaeyron/Library-Management-System",
    caseStudy: {
      short:
        "A school project I built in my 3rd year of college to learn full-stack development. A React front end talks to a Django REST API, with role-based features for Admins, Librarians and Users: book management, borrowing and return tracking, and sign-in.",
      problem:
        "I wanted to understand how a full-stack app fits together, from the interface to the API and the database. A library system was a good exercise: it has to keep track of books, who borrowed them and when they come back, and different users need different levels of access. [TODO: anything specific the course asked for]",
      constraints: [
        "A 3rd-year college project, built as a beginner.",
        "Three roles with different permissions: Admin, Librarian and User.",
        "[TODO: team size, timeline, or other course requirements]",
      ],
      decisions: [
        {
          title: "Separate front end and API",
          detail:
            "React for the interface and Django for the backend, connected through a REST API. [TODO: why you chose this split over a single Django app]",
        },
        {
          title: "Role-based access",
          detail:
            "Admin, Librarian and User roles behind sign-in, so each person only sees the actions they’re allowed to take.",
        },
        {
          title: "[TODO: a third decision]",
          detail: "[TODO: e.g. how you modelled borrowing and returns in the database]",
        },
      ],
      result: {
        learned:
          "[TODO: what you learned, e.g. how a React front end and a Django REST API talk to each other, and how to structure role-based access]",
        next: "[TODO: what you’d improve next, e.g. tests, validation, or error handling]",
      },
    },
  },
  {
    slug: "janas-boutique",
    title: "Jana’s Boutique",
    tagline: "A 3rd-year school project: an online boutique storefront and inventory concept.",
    context: "3rd-year school project · concept",
    stack: ["Next.js", "PHP", "MySQL"],
    image: { src: "/images/Boutique1.png", alt: "Jana’s Boutique storefront concept" },
    gallery: [
      { src: "/images/Boutique1.png", alt: "Jana’s Boutique storefront concept" },
      { src: "/images/Boutique2.png", alt: "Jana’s Boutique product and ordering screen" },
    ],
    repo: "https://github.com/Aaeyron/Janasboutique",
    caseStudy: {
      short:
        "A school project from my 3rd year of college: a concept storefront for an online boutique, with product browsing, ordering and inventory tracking. Built with a Next.js front end, a PHP backend and a MySQL database.",
      problem:
        "For a course project I explored how a small clothing boutique could take orders online and keep track of its stock. Jana’s Boutique is a concept, not a real business. [TODO: what the assignment asked for]",
      constraints: [
        "A 3rd-year college project, built as a beginner.",
        "Backend in PHP with a MySQL database, run locally with XAMPP.",
        "[TODO: team size, timeline, or other course requirements]",
      ],
      decisions: [
        {
          title: "Next.js front end, PHP backend",
          detail: "Next.js for the storefront, with PHP handling backend processing. [TODO: why this combination]",
        },
        {
          title: "Orders and inventory in one system",
          detail:
            "Browsing products, placing orders and tracking inventory are part of the same system. [TODO: how stock updates when an order is placed]",
        },
        {
          title: "[TODO: a third decision]",
          detail: "[TODO: e.g. how you designed the product catalogue]",
        },
      ],
      result: {
        learned: "[TODO: what you learned, e.g. connecting a Next.js front end to a PHP backend, or designing a MySQL schema]",
        next: "[TODO: what you’d improve next]",
      },
    },
  },
  {
    slug: "flashmind",
    title: "FlashMind",
    tagline: "A UI/UX design exploration for my HCI class: a flashcard concept based on active recall.",
    context: "3rd-year HCI design exploration",
    stack: ["UI/UX", "HCI", "React"],
    image: { src: "/images/FlashMind Display.png", alt: "FlashMind flashcard study screen" },
    gallery: [
      { src: "/images/FlashMind Display.png", alt: "FlashMind flashcard study screen" },
      { src: "/images/FlashMind UIUX.png", alt: "FlashMind UI/UX design" },
    ],
    repo: "https://github.com/Aaeyron/FlashMind",
    caseStudy: {
      short:
        "A UI/UX design exploration for my HCI (Human-Computer Interaction) subject in my 3rd year of college. I used it to practise and test my UI/UX skills on a flashcard concept built around active recall.",
      problem:
        "Rereading notes feels productive, but active recall, testing yourself, is a better way to remember material. For my HCI class I explored how a flashcard interface could make that habit feel easy. [TODO: what the assignment asked for]",
      constraints: [
        "A design exploration for my HCI subject in my 3rd year of college.",
        "The goal was to practise and test my UI/UX skills.",
        "[TODO: timeline, tools used (e.g. Figma), and how you tested the design]",
      ],
      decisions: [
        {
          title: "Designed around active recall",
          detail:
            "Cards are built for answering, not rereading, so the design supports active recall. [TODO: describe the key interaction]",
        },
        {
          title: "Design process",
          detail: "[TODO: describe your process, e.g. the FlashMind UI/UX mockups]",
        },
        {
          title: "Testing the design",
          detail: "[TODO: how you tested it and what you changed as a result]",
        },
      ],
      result: {
        learned: "[TODO: what you learned about UI/UX and HCI from this project]",
        next: "[TODO: what you’d improve next]",
      },
    },
  },
];

export type Skill = { name: string; projects: string[] };

export const skills: { group: string; items: Skill[] }[] = [
  {
    group: "Front end",
    items: [
      { name: "React", projects: ["library-management-system", "flashmind"] },
      { name: "Next.js", projects: ["janas-boutique"] },
    ],
  },
  {
    group: "Back end",
    items: [
      { name: "Django", projects: ["library-management-system"] },
      { name: "Python", projects: ["library-management-system"] },
      { name: "PHP", projects: ["janas-boutique"] },
      { name: "REST APIs", projects: ["library-management-system"] },
    ],
  },
  {
    group: "Data & design",
    items: [
      { name: "MySQL", projects: ["janas-boutique"] },
      { name: "Authentication & roles", projects: ["library-management-system"] },
      { name: "UI/UX design", projects: ["flashmind"] },
      { name: "Human-Computer Interaction", projects: ["flashmind"] },
    ],
  },
];

// Image paths are matched from the original app/certificates/page.tsx data.
// (public/images/Certificate2.jpg was never used there, so it isn't used here.)
export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  alt: string;
};

export const certificates: Certificate[] = [
  {
    id: "google-cloud",
    title: "Developing Applications with Google Cloud",
    issuer: "Google Developer Group",
    date: "May 16, 2026",
    image: "/images/GDG Certificate.png",
    alt: "Developing Applications with Google Cloud certificate",
  },
  {
    id: "cyber-hygiene",
    title: "Cyber Hygiene and Security Best Practices",
    issuer: "Holy Cross of Davao College – IAES",
    date: "January 28, 2026",
    image: "/images/Cyber Hygiene Cert.png",
    alt: "Cyber Hygiene and Security Best Practices certificate",
  },
  {
    id: "intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Networking Academy",
    date: "December 15, 2025",
    image: "/images/Certificate3.png",
    alt: "Introduction to Cybersecurity certificate",
  },
  {
    id: "codechum",
    title: "CodeChum Certificate",
    issuer: "CodeChum Academy",
    date: "May 18, 2025",
    image: "/images/Certificate1.png",
    alt: "CodeChum Academy certificate",
  },
];

export const getCertificate = (id: string) => certificates.find((c) => c.id === id);

/** Certifications: skills earned (shown as cards, not in the changelog). */
export const certifications = ["intro-cybersecurity", "codechum"]
  .map(getCertificate)
  .filter((c): c is Certificate => Boolean(c));

export type ChangeKind = "event" | "event-cert" | "training";
export type Change = {
  kind: ChangeKind;
  title: string;
  org: string;
  detail: string;
  /** Links the entry to its certificate image, if it has one. */
  certificateId?: string;
};
export type Release = { version: string; date: string; changes: Change[] };

/** Changelog: events & training only, newest first. */
export const changelog: Release[] = [
  {
    version: "v2026.05",
    date: "May 2026",
    changes: [
      {
        kind: "event",
        title: "Build With AI: Davao",
        org: "Google Developer Groups Davao",
        detail:
          "Explored agentic AI, Google’s AI ecosystem, and practical ways developers can build AI-powered products.",
      },
      {
        kind: "event-cert",
        title: "Developing Applications with Google Cloud",
        org: "Google Developer Group",
        detail: "Certificate issued May 16, 2026.",
        certificateId: "google-cloud",
      },
    ],
  },
  {
    version: "v2026.01",
    date: "January 2026",
    changes: [
      {
        kind: "event",
        title: "Cloud Catchup Session",
        org: "AWS User Group Davao",
        detail:
          "Learned from local developers about AWS re:Invent updates, cloud services, and real-world deployment practices.",
      },
      {
        kind: "training",
        title: "Cyber Hygiene Training",
        org: "Holy Cross of Davao College · IAES",
        detail:
          "Completed four days of training in threat awareness, data protection, safer systems, and incident response.",
        certificateId: "cyber-hygiene",
      },
    ],
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
