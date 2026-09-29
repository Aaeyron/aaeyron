// Single source of truth for all site content.

/** Production URL, used for metadataBase, Open Graph and canonical URLs. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aaeyron.vercel.app";

/** Résumé on Google Drive — every "View résumé" link uses this. Opens in a new tab. */
export const resumeUrl = "https://drive.google.com/file/d/1KY1VFjOZdBADFLHZlbeNZwm0yjq3mFfE/view";
export const resumeAriaLabel = "View my résumé (opens in a new tab)";

export const profile = {
  name: "Aaron Seth Nagtalon",
  shortName: "Aaron Seth",
  role: "Aspiring Software & AI/ML Engineer",
  location: "Davao City, Philippines",
  /** For very tight spots (e.g. photo captions). */
  locationShort: "Davao City, PH",
  email: "aaronseth041@gmail.com",
  phone: { display: "+63 915 660 4726", href: "tel:+639156604726" },
  status: "Open to opportunities & collaborations",
  availability: "Open to opportunities & collaborations. Feel free to reach out.",
  /** Profile photo, shared by the home About section and /experience "About me". */
  photo: "/images/MeAgain.jpeg",
};

/** About text in Aaron's own wording: /experience "About me" section + home About teaser. */
export const aboutMe = {
  heading: "Hi, I’m Aaron.",
  paragraphs: [
    "I’m an Information Technology student from Davao City, Philippines. I like building websites and apps that solve real problems.",
    "I work on web apps, mobile apps, backends, and databases. I care about making software that is simple and easy to use.",
    "I learn best by building. Every project teaches me something new, and I try to do better on the next one.",
  ],
  teaser:
    "I’m Aaron, an Information Technology student from Davao City, Philippines. I like building websites and apps that solve real problems, and I learn best by building.",
};

// `short` fits the hero's Now block; `detail` is the full description (tooltip).
// The "learning" line (Apno AI internship) lives in lib/internship.ts because it
// switches from "incoming" to "currently" automatically on October 1, 2026.
export const now = {
  building: {
    short: "TactileLens, my capstone project",
    detail: "TactileLens, my capstone project. A text-to-braille mobile app for teachers who handle visually impaired students.",
  },
};

export const focus = [
  "Building stronger full-stack projects with clearer structure and real-world use cases.",
  "Improving how I turn product ideas into responsive, accessible interfaces.",
  "Exploring AI-assisted development as a tool for learning, research, and iteration.",
];

/** Main contact links: contact buttons, footer and mobile menu all read from here. */
export type ContactLink = {
  id: "github" | "linkedin" | "email";
  label: string;
  handle: string;
  href: string;
  external: boolean;
  ariaLabel: string;
};

export const contactLinks: ContactLink[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@Aaeyron",
    href: "https://github.com/Aaeyron",
    external: true,
    ariaLabel: "Open my GitHub profile (opens in a new tab)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Aaron Seth Nagtalon",
    href: "https://www.linkedin.com/in/aaron-seth-nagtalon-289769437/",
    external: true,
    ariaLabel: "Open my LinkedIn profile (opens in a new tab)",
  },
  {
    id: "email",
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
    ariaLabel: `Send me an email at ${profile.email}`,
  },
];

/** Social media (footer icons). Separate from the GitHub / LinkedIn / Email contact links. */
export type SocialLink = { id: "facebook" | "instagram" | "tiktok" | "x"; label: string; href: string };

export const socialLinks: SocialLink[] = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/Aaeyronn" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/aaeyron/" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@aaeyron_" },
  { id: "x", label: "X (Twitter)", href: "https://x.com/aaron_seth14842" },
];

export const githubUser = "Aaeyron";

// All three are school projects from my 3rd year of college, built solo as a beginner to learn.
// Not real products. Only FlashMind (frontend-only) has a live demo; the other two were never put online.
export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** Short paragraph shown on the home page rows. */
  summary: string;
  context: string;
  stack: string[];
  image: { src: string; alt: string };
  /** GitHub repo, only if a real public repo exists. */
  repo?: string;
  /** Hosted demo, only if one really exists. */
  live?: string;
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
  /** Optional screenshot. Put it in /public/images and set { src, alt }; leave unset for the text-only card. */
  image?: { src: string; alt: string };
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
  },
  {
    slug: "jm-learning-hub",
    title: "JM Learning Hub",
    category: "Full-Stack Educational Web Platform / Tutoring Booking & E-Commerce System",
    description:
      "A tutoring services and learning materials platform that combines service booking, e-commerce, an admin dashboard, and a learning platform.",
    badges: ["In development"],
  },
];

export const projectsSummary = "3 school projects";

export const projects: Project[] = [
  {
    slug: "library-management-system",
    title: "Library Management System",
    tagline: "A 3rd-year school project: a role-based library system with a React front end and a Django REST backend.",
    summary:
      "A school project I built in my 3rd year of college to learn full-stack development. A React front end talks to a Django REST API, with role-based features for Admins, Librarians and Users: book management, borrowing and return tracking, and sign-in.",
    context: "3rd-year school project",
    stack: ["React", "Django", "Python", "REST API"],
    image: { src: "/images/LMS1.png", alt: "Library Management System dashboard" },
    repo: "https://github.com/Aaeyron/Library-Management-System",
  },
  {
    slug: "janas-boutique",
    title: "Jana’s Boutique",
    tagline: "A 3rd-year school project: an online boutique storefront and inventory concept.",
    summary:
      "A school project from my 3rd year of college: a concept storefront for an online boutique, with product browsing, ordering and inventory tracking. Built with a Next.js front end, a PHP backend and a MySQL database.",
    context: "3rd-year school project · concept",
    stack: ["Next.js", "PHP", "MySQL"],
    image: { src: "/images/Boutique1.png", alt: "Jana’s Boutique storefront concept" },
    repo: "https://github.com/Aaeyron/Janasboutique",
  },
  {
    slug: "flashmind",
    title: "FlashMind",
    tagline: "A UI/UX design exploration for my HCI class: a flashcard concept based on active recall, with a live demo.",
    summary:
      "A UI/UX design exploration for my HCI (Human-Computer Interaction) subject in my 3rd year of college. I used it to practise and test my UI/UX skills on a flashcard concept built around active recall. It’s a frontend-only project with a live demo you can try.",
    context: "3rd-year HCI design exploration",
    stack: ["UI/UX", "HCI", "React"],
    image: { src: "/images/FlashMind Display.png", alt: "FlashMind flashcard study screen" },
    repo: "https://github.com/Aaeyron/FlashMind",
    // From the original projects page (git c54bef3: liveLink).
    live: "https://flash-mind-alpha.vercel.app/",
  },
];

/**
 * Home page "Tech Stack". Add items or groups here.
 * `icon` is a react-icons/si name (mapped in app/components/home/TechStack.tsx);
 * leave it out for items without a logo and only the name is shown.
 */
export type TechItem = { name: string; icon?: string };
export type TechGroup = { group: string; items: TechItem[] };

export const techStack: TechGroup[] = [
  {
    group: "Languages",
    items: [
      { name: "Python", icon: "SiPython" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "Dart", icon: "SiDart" },
      { name: "Kotlin", icon: "SiKotlin" },
      { name: "C++", icon: "SiCplusplus" },
      { name: "PHP", icon: "SiPhp" },
      { name: "HTML", icon: "SiHtml5" },
      { name: "CSS", icon: "SiCss3" },
    ],
  },
  {
    group: "Frontend & Mobile",
    items: [
      { name: "React", icon: "SiReact" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "Flutter", icon: "SiFlutter" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Django", icon: "SiDjango" },
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "REST APIs" },
    ],
  },
  {
    group: "Databases",
    items: [
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "Supabase", icon: "SiSupabase" },
      { name: "PL/pgSQL" },
    ],
  },
  {
    group: "Tools & Deployment",
    items: [
      { name: "Postman", icon: "SiPostman" },
      { name: "Vercel", icon: "SiVercel" },
      { name: "CMake", icon: "SiCmake" },
    ],
  },
  {
    group: "Design",
    items: [
      { name: "UI/UX Design" },
      { name: "Figma", icon: "SiFigma" },
      { name: "Canva", icon: "SiCanva" },
    ],
  },
];

// Certifications shown on the site (home + /experience), in display order.
// Image paths are matched from the original app/certificates/page.tsx data.
// Event certificates (GDG Certificate.png, Cyber Hygiene Cert.png) and Certificate2.jpg
// stay in /public/images but are intentionally not displayed.
export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  alt: string;
};

export const certifications: Certificate[] = [
  {
    id: "codechum",
    title: "CodeChum Certificate",
    issuer: "CodeChum Academy",
    date: "May 18, 2025",
    image: "/images/Certificate1.png",
    alt: "CodeChum Academy certificate",
  },
  {
    id: "intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Networking Academy",
    date: "December 15, 2025",
    image: "/images/Certificate3.png",
    alt: "Introduction to Cybersecurity certificate",
  },
];

/** "Currently working on" copy for /experience (Aaron's wording). */
export const currentWork = {
  featured: {
    slug: "tactilelens",
    lead: "TactileLens, my capstone project.",
    description:
      "An AI-assisted mobile app that recognizes printed English text and General Algebra expressions and converts them into digital text, UEB, and Nemeth Braille, for teachers who handle visually impaired students.",
  },
  also: ["mg-sakura-learning-platform", "jm-learning-hub"],
};

/** "Where I started" section on /experience: the 3 school projects, framed as early solo work. */
export const earlySolo = {
  intro:
    "My 3rd year of college was my first time building projects on my own as a solo developer. These three school projects are where I practised, made mistakes, and strengthened my skills across frontend, backend, and UI/UX.",
  introEmphasis: "my first time building projects on my own",
  note: "I built them to learn. They were class projects, not real products. Two of them were never put online; FlashMind has a live demo.",
  labels: ["School project", "3rd year college", "Solo developer"],
  marker: "v1 · first solo build",
};

/** Experience entries. Only details Aaron provided. */
export const experience = [
  {
    role: "AI/ML Engineer Intern",
    company: "Apno AI",
    companyNote: "A Government of India registered MSME enterprise.",
  },
];

/** Tech events and community meetups (plain text — no certificates shown). */
export const techEvents = [
  { title: "Build With AI: Davao", org: "GDG Davao" },
  { title: "AWS Community Day", org: "AWS User Group Davao" },
  { title: "Cyber Hygiene Training", org: "Holy Cross of Davao College · IAES" },];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];


export const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
