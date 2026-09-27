// Single source of truth for all site content.
// Anything wrapped in [TODO: …] is a placeholder waiting for real details.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; // [TODO: production URL]

export const profile = {
  name: "Aaron Seth Nagtalon",
  shortName: "Aaron Seth",
  role: "Aspiring Full-Stack Developer & AI/ML learner",
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
  "I learn by building. Every project gives me a new problem to solve, a better question to ask, and another chance to improve how I work, from planning the experience to shipping the final result.",
];

export const now = {
  building: "[TODO: what you’re currently building]",
  learning: "[TODO: what you’re currently learning]",
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

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  context: string;
  stack: string[];
  image: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
  links: { repo: string; live?: string };
  caseStudy: {
    short: string;
    problem: string;
    constraints: string[];
    decisions: Decision[];
    result: string;
  };
};

export const projects: Project[] = [
  {
    slug: "library-management-system",
    title: "Library Management System",
    tagline: "A role-based library platform connecting a React interface to a Django REST backend.",
    context: "WS final project",
    stack: ["React", "Django", "Python", "REST API"],
    image: { src: "/images/LMS1.png", alt: "Library Management System dashboard" },
    gallery: [
      { src: "/images/LMS1.png", alt: "Library Management System dashboard" },
      { src: "/images/LMS2.png", alt: "Library Management System detail screen" },
    ],
    links: { repo: "https://github.com/Aaeyron/Library-Management-System" },
    caseStudy: {
      short:
        "A full-stack library system with separate roles for Admins, Librarians and Users. It covers book management, borrowing and return tracking, and authentication, with a React front end talking to a Django REST API.",
      problem:
        "A library has to keep track of its books, who has borrowed them and when they come back, and different people need different levels of access. [TODO: who was this built for, and what was hard about how it worked before?]",
      constraints: [
        "Built as my WS final project. [TODO: team size and timeline]",
        "Three roles with different permissions: Admin, Librarian and User.",
        "[TODO: any other constraint, e.g. deadline, hosting, or data requirements]",
      ],
      decisions: [
        {
          title: "Separate front end and API",
          detail:
            "React.js for the interface and Django for the backend, connected through a REST API. [TODO: why you chose this split over a single Django app]",
        },
        {
          title: "Role-based access",
          detail:
            "Admin, Librarian and User roles behind user authentication, so each person only sees the actions they’re allowed to take.",
        },
        {
          title: "[TODO: a third decision]",
          detail: "[TODO: e.g. how you modelled borrowing and returns in the database]",
        },
      ],
      result:
        "A working system with book management, borrowing and return tracking, user authentication and a responsive interface. [TODO: outcome, e.g. grade, feedback, or what you’d do differently]",
    },
  },
  {
    slug: "janas-boutique",
    title: "Jana’s Boutique",
    tagline: "Online ordering and inventory for a real clothing business in Davao.",
    context: "IM101 project · real client",
    stack: ["Next.js", "PHP", "MySQL", "XAMPP"],
    image: { src: "/images/Boutique1.png", alt: "Jana’s Boutique storefront" },
    gallery: [
      { src: "/images/Boutique1.png", alt: "Jana’s Boutique storefront" },
      { src: "/images/Boutique2.png", alt: "Jana’s Boutique product and ordering screen" },
    ],
    links: { repo: "https://github.com/Aaeyron/Janasboutique" },
    caseStudy: {
      short:
        "For my IM101 project we worked with local businesses in Davao to set up online ordering. For Jana’s Boutique I built a Next.js storefront on a PHP backend with a MySQL database, where customers browse products and place orders and the business tracks its inventory.",
      problem:
        "Jana’s Boutique, a local clothing business in Davao, needed a way for customers to browse and order online, and a way to keep track of stock. [TODO: how did they take orders and track inventory before?]",
      constraints: [
        "IM101 course project with a real local business as the client.",
        "Backend in PHP with a MySQL database running on XAMPP.",
        "[TODO: timeline, team size, or requirements from the owner]",
      ],
      decisions: [
        {
          title: "Next.js front end, PHP backend",
          detail:
            "Next.js (on Node.js) for the storefront, with PHP handling backend processing. [TODO: why this combination]",
        },
        {
          title: "Orders tied to inventory",
          detail:
            "Customers browse products and place orders, and inventory is tracked in the same system. [TODO: how stock updates when an order is placed]",
        },
        {
          title: "[TODO: a third decision]",
          detail: "[TODO: e.g. how you designed the product catalogue for the owner to manage]",
        },
      ],
      result:
        "Customers can browse products and place orders, and the business can track its inventory. [TODO: outcome, e.g. is it in use, and what did the owner say?]",
    },
  },
  {
    slug: "flashmind",
    title: "FlashMind",
    tagline: "A flashcard app built around active recall and better study habits.",
    context: "Personal project · live",
    stack: ["React", "UI/UX", "Vercel"],
    image: { src: "/images/FlashMind Display.png", alt: "FlashMind flashcard study screen" },
    gallery: [
      { src: "/images/FlashMind Display.png", alt: "FlashMind flashcard study screen" },
      { src: "/images/FlashMind UIUX.png", alt: "FlashMind UI/UX design" },
    ],
    links: { repo: "https://github.com/Aaeyron/FlashMind", live: "https://flash-mind-alpha.vercel.app/" },
    caseStudy: {
      short:
        "An interactive flashcard app that helps students study through active recall and spaced repetition. It’s built in React and deployed on Vercel.",
      problem:
        "Rereading notes feels productive, but active recall and spaced repetition are better ways to remember material. [TODO: what made you want to build this, e.g. your own study habits?]",
      constraints: [
        "Built entirely around a reactive React UI.",
        "[TODO: where decks are stored, e.g. local storage or a backend]",
        "[TODO: timeline, or whether this was for a class]",
      ],
      decisions: [
        {
          title: "Designed around active recall",
          detail:
            "Users interact with flashcard decks directly, so studying means answering, not rereading.",
        },
        {
          title: "UI/UX first",
          detail: "[TODO: describe your design process, e.g. the FlashMind UI/UX mockups]",
        },
        {
          title: "Deployed on Vercel",
          detail: "Shipped as a live app anyone can open. [TODO: why deploying mattered to you]",
        },
      ],
      result: "Live at flash-mind-alpha.vercel.app. [TODO: outcome, e.g. who uses it or what you learned]",
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
      { name: "UI/UX", projects: ["flashmind"] },
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
    group: "Data & delivery",
    items: [
      { name: "MySQL", projects: ["janas-boutique"] },
      { name: "Authentication & roles", projects: ["library-management-system"] },
      { name: "Deployment (Vercel)", projects: ["flashmind"] },
    ],
  },
];

export type Certificate = { title: string; issuer: string; date: string; image: string };

export const certificates: Certificate[] = [
  {
    title: "Developing Applications with Google Cloud",
    issuer: "Google Developer Group",
    date: "May 16, 2026",
    image: "/images/GDG Certificate.png",
  },
  {
    title: "Cyber Hygiene and Security Best Practices",
    issuer: "Holy Cross of Davao College – IAES",
    date: "January 28, 2026",
    image: "/images/Cyber Hygiene Cert.png",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Networking Academy",
    date: "December 15, 2025",
    image: "/images/Certificate3.png",
  },
  {
    title: "CodeChum Certificate",
    issuer: "CodeChum Academy",
    date: "May 18, 2025",
    image: "/images/Certificate1.png",
  },
];

export type ChangeKind = "event" | "cert";
export type Release = {
  version: string;
  date: string;
  changes: { kind: ChangeKind; title: string; org: string; detail: string }[];
};

// Changelog: only dated items are included. [TODO: add project ship dates]
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
        kind: "cert",
        title: "Developing Applications with Google Cloud",
        org: "Google Developer Group",
        detail: "Certificate issued May 16, 2026.",
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
        kind: "event",
        title: "Cyber Hygiene Training",
        org: "Holy Cross of Davao College · IAES",
        detail:
          "Completed four days of training in threat awareness, data protection, safer systems, and incident response.",
      },
    ],
  },
  {
    version: "v2025.12",
    date: "December 2025",
    changes: [
      {
        kind: "cert",
        title: "Introduction to Cybersecurity",
        org: "Networking Academy",
        detail: "Certificate issued December 15, 2025.",
      },
    ],
  },
  {
    version: "v2025.05",
    date: "May 2025",
    changes: [
      {
        kind: "cert",
        title: "CodeChum Certificate",
        org: "CodeChum Academy",
        detail: "Certificate issued May 18, 2025.",
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
