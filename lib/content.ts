// Single source of truth for all site content.

/** Production URL, used for metadataBase, Open Graph and canonical URLs. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aaeyron.vercel.app";

/** Résumé on Google Drive — every "View résumé" link uses this. Opens in a new tab. */
export const resumeUrl = "https://drive.google.com/file/d/1C_EQw1ex8rhdYWN659CmFdgUbX9H-Qrs/view?usp=sharing";
export const resumeAriaLabel = "View my résumé (opens in a new tab)";

export const profile = {
  name: "Aaron Seth Nagtalon",
  shortName: "Aaron Seth",
  role: "Aspiring Software & AI/ML Engineer",
  location: "Davao City, Philippines",  /** For very tight spots (e.g. photo captions). */
  locationShort: "Davao City, PH",
  email: "aaronseth041@gmail.com",
  phone: { display: "+63 915 660 4726", href: "tel:+639156604726" },
  /** Same number; wa.me needs the international format without "+" or the leading 0. */
  whatsapp: { display: "09156604726", href: "https://wa.me/639156604726" },
  status: "Open to opportunities & collaborations",
  availability: "Open to opportunities & collaborations. Feel free to reach out.",
  /** Profile photo, used by the home Focus section. */
  photo: "/images/MeAgain.jpeg",
};

/** About text in Aaron's own wording. Not shown anywhere right now (the About page was removed). */
export const aboutMe = {
  heading: "Hi, I’m Aaron.",
  paragraphs: [
    "I’m a 4th-year Information Technology student at Holy Cross of Davao College in Davao City, Philippines. I like building websites and apps that solve real problems.",
    "I work on web apps, mobile apps, backends, and databases. I care about making software that is simple and easy to use.",
    "I learn best by building. Every project teaches me something new, and I try to do better on the next one.",
  ],
};

/** Home "Focus" section: work and direction only. */
export const homeFocus = {
  heading: "What I’m working toward.",
  text: "I’m building my skills as a software and AI/ML engineer through real projects, from full-stack web apps to an AI-assisted accessibility app for my capstone. I focus on making software that is simple, useful, and easy to use.",
};

/** "Profile" box: two capability areas side by side. Not shown anywhere right now (the About page was removed). */
export const profileCapabilities = [
  {
    id: "architecture",
    title: "Application Architecture",
    detail: "Web and mobile development. Frontend to database. Building systems that scale.",
  },
  {
    id: "genai",
    title: "Generative AI Systems",
    detail: "LLMs, computer vision, agentic workflows. Integrating intelligence into applications.",
  },
] as const;

/** Home hero capability boxes (under the photo): what I work on. */
export const capabilities = [
  { title: "AI & Agents", detail: "Building intelligent systems with LLMs and autonomous agents." },
  { title: "Design & Engineering", detail: "Full-stack development with thoughtful, user-centric design." },
];

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
  /** Short, honest status tag for the school-project cards (never "shipped" / "live product"). */
  status: string;
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
    status: "Not deployed · code on GitHub",
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
    status: "Concept · not deployed",
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
    status: "Frontend-only demo",
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

// Certifications shown on the site (home + /certificates), in display order.
// Event certificates (GDG Certificate.png, Cyber Hygiene Cert.png)
// stay in /public/images but are intentionally not displayed.
/**
 * Certificates: one list used by the home "Skills, certified" section, the Experience page and
 * /certificates. Images are shown on the cards (no click-to-enlarge). Add more entries here.
 */
export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  /** Human-readable issue date, e.g. "October 7, 2026". */
  date: string;
  /** Machine-readable issue date, used for <time> and newest-first sorting. */
  dateIso: string;
  image: string;
  alt: string;
  description?: string;
  /** Public verification link. Leave unset until there is a real one. */
  credentialUrl?: string;
  /** Shows a "Final project" note on the card. */
  finalProject?: boolean;
};

export const certifications: Certificate[] = [
  {
    id: "codechum",
    title: "CodeChum Certificate",
    issuer: "CodeChum Academy",
    date: "May 18, 2025",
    dateIso: "2025-05-18",
    image: "/images/Certificate1.png",
    credentialUrl: "https://hcdc.codechum.com/certificates/11063",
    alt: "CodeChum Academy certificate",
    description:
      "Completed Information Management through CodeChum, earning a total score of 1069/1130. This certificate recognizes my completion of the course’s MySQL-based learning activities and assessments.",
  },
  {
    id: "cs50-ai",
    title: "CS50’s Introduction to Artificial Intelligence with Python",
    issuer: "Harvard University · CS50",
    date: "October 3, 2026",
    dateIso: "2026-10-03",
    finalProject: true,
    image: "/images/Certificate 2.png",
    credentialUrl: "https://certificates.cs50.io/f6099366-f074-40a8-9d1b-13bc8e4a362d.pdf?size=letter",
    alt: "CS50 certificate awarded to Aaron Seth Nagtalon for completing Introduction to Artificial Intelligence with Python, including twelve projects, in 2026",
    description:
      "Completed all 12 hands-on projects covering search, knowledge representation, probability, optimization, machine learning, neural networks, computer vision, and natural language processing. Built AI systems in Python, from Bayesian inference and game AI to traffic sign classification, sentence parsing, and BERT attention visualization. This journey strengthened my problem-solving, testing, and debugging skills, and my understanding of how AI systems work beyond using existing tools or APIs.",
  },
  {
    id: "cs50-python",
    title: "CS50’s Introduction to Programming with Python",
    issuer: "Harvard University · CS50P",
    date: "October 7, 2026",
    dateIso: "2026-10-07",
    finalProject: true,
    image: "/images/Certificate3.png",
    credentialUrl: "https://certificates.cs50.io/d68a6b9c-467a-496d-8ea1-4c2be6a093fc.pdf?size=letter",
    alt: "CS50 certificate awarded to Aaron Seth Nagtalon for completing Introduction to Programming with Python, including nine problem sets and one final project, in 2026",
    description:
      "Completed all nine problem sets and a final project covering functions, conditionals, loops, exceptions, libraries, unit testing, file I/O, regular expressions, and object-oriented programming. Built Python command-line programs working with APIs and files, then developed DataLens, a CSV dataset analyzer using Pandas with pytest tests for dataset summaries, column statistics, validation, and error handling. This journey strengthened my problem-solving, modular programming, testing, and debugging skills, and my ability to turn raw data into useful insights.",
  },
];

/** "Currently working on" copy (Aaron's wording). Not shown anywhere right now. */
export const currentWork = {
  featured: {
    slug: "tactilelens",
    lead: "TactileLens, my capstone project.",
    description:
      "An AI-assisted mobile app that recognizes printed English text and General Algebra expressions and converts them into digital text, UEB, and Nemeth Braille, for teachers who handle visually impaired students.",
  },
  also: ["mg-sakura-learning-platform", "jm-learning-hub"],
};

/** "Early solo projects" framing for the 3 school projects. Not shown anywhere right now (the About page was removed). */
export const earlySolo = {
  intro:
    "My 3rd year of college was my first time building projects on my own as a solo developer. These three school projects are where I practised, made mistakes, and strengthened my skills across frontend, backend, and UI/UX.",
  introEmphasis: "my first time building projects on my own",
  note: "I built them to learn. They were class projects, not real products. Two of them were never put online; FlashMind has a live demo.",
  labels: ["School project", "3rd year college", "Solo developer"],
  marker: "v1 · first solo build",
};

/** A bullet in a product detail group: plain text, or a bold lead-in followed by text. */
export type ProductBullet = string | { lead: string; text: string };

/**
 * A product built during an internship: a short summary in its internship card on Experience,
 * and the full write-up on its own page at /experience/<slug>.
 */
export type InternshipProduct = {
  slug: string;
  title: string;
  /** Page heading: `titleHighlight` (accent colour) followed by `titleTail`. */
  titleHighlight: string;
  titleTail: string;
  tagline: string;
  /** `title` split into the two lines shown on the Experience card (joined, they equal `title`). */
  titleLines: [string, string];
  /** Short version for the Experience card: two-line overview and four chips. */
  summary: string;
  summaryStack: string[];
  links: { live: string; code: string };
  overview: string;
  startingPoint: string;
  stats: { value: string; label: string }[];
  stack: string[];
  /** Numbered detail sections (01–07) on the product page; `id` is the section anchor. */
  groups: { id: string; title: string; items: ProductBullet[] }[];
  footnotes: string[];
  /** Optional screenshots (files in /public). Not rendered yet; add entries when images exist. */
  screenshots: { src: string; alt: string; caption?: string }[];
};

/** First product from the Apno AI internship. Only facts Aaron provided. */
export const aiCareerCopilot: InternshipProduct = {
  slug: "ai-career-copilot",
  title: "AI Career Copilot: LLM Resume Analyzer",
  titleHighlight: "AI Career Copilot",
  titleTail: ": LLM Resume Analyzer",
  titleLines: ["AI Career", "Copilot: LLM Resume Analyzer"],
  tagline: "Built during my AI/ML internship at Apno AI (Oct 2026)",
  summary:
    "A web app that compares a resume against a job description and returns an ATS-style match score, matched and missing keywords, strengths, specific rewrite suggestions, and projects to close skill gaps.",
  summaryStack: ["Gemini API", "Vercel Serverless", "Prompt Engineering", "pdf.js"],
  links: {
    live: "https://ai-career-copilot-aaeyron.vercel.app",
    code: "https://github.com/Aaeyron/AI-Career-Copilot",
  },
  overview:
    "A web app that compares a resume against a job description and returns an ATS-style match score, matched and missing keywords, strengths, specific rewrite suggestions, and projects to close skill gaps. It’s aimed at students and fresh graduates applying to software, data, and AI/ML roles.",
  startingPoint:
    "The internship starter was a single HTML file with the API key exposed in the browser and one basic prompt. I turned it into a secured, tested, deployed product.",
  stats: [
    { value: "7 / 7", label: "scored test pairings landed in their expected range" },
    { value: "26", label: "automated API checks" },
    { value: "77", label: "automated UI checks" },
  ],
  stack: [
    "HTML, CSS, JavaScript",
    "Node.js serverless on Vercel",
    "Google Gemini API (gemini-3.5-flash)",
    "pdf.js",
    "Tesseract.js",
    "localStorage",
    "Git and GitHub",
    "PowerShell",
  ],
  groups: [
    {
      id: "security",
      title: "Security and architecture",
      items: [
        "Moved the Gemini API key out of the browser into a Vercel serverless function (Node.js), so it exists only as an environment variable.",
        "Sent the key in a request header (not the URL) and kept it out of logs.",
        "Escaped all AI and user text before rendering, to prevent XSS.",
        "Added input limits and prompt-injection defenses: user text is wrapped in tags and treated as data.",
        { lead: "Handled secrets properly:", text: ".gitignore, a placeholder .env.example, and a pre-commit scan." },
      ],
    },
    {
      id: "llm",
      title: "LLM and prompt engineering",
      items: [
        { lead: "Prompt structure:", text: "role, task, scoring rubric with calibration bands, format, rules, and one few-shot example." },
        "Structured output with Gemini’s responseSchema and JSON mode, which removed malformed-JSON failures.",
        "A server-side check that moves any “missing” keyword actually present in the resume back to “matched”.",
        "Versioned prompts (v1, v2, and a v3 I tested and reverted when it measured no better), all logged in PROMPT_LOG.md.",
      ],
    },
    {
      id: "reliability",
      title: "Reliability",
      items: [
        "Diagnosed a production failure (a retired model returning 404) by testing candidate models with the real key.",
        "Moved to gemini-3.5-flash with an automatic fallback to gemini-3.1-flash-lite on 503, 429, or 404.",
        "Added a 45-second timeout, correct Gemini 3 thinking settings, and logging of status and error messages.",
      ],
    },
    {
      id: "evaluation",
      title: "Evaluation",
      items: [
        "Wrote a test plan with 5 fictional resumes, 2 job descriptions, and 7 scored pairings with expected ranges.",
        "Every v2 score landed in its expected range, and the ordering held (strong candidate > fresh grad > weak and non-tech resumes).",
        { lead: "Edge tests:", text: "a prompt-injection resume was ignored, an XSS payload was not executed, and a recipe pasted as a resume scored 0." },
        { lead: "Automated tests:", text: "26 API checks and 77 UI checks, plus a real end-to-end script." },
      ],
    },
    {
      id: "features",
      title: "Features",
      items: [
        {
          lead: "PDF resume upload:",
          text: "client-side with pdf.js. It joins wrapped lines, normalizes bullets, reads two-column layouts, and gives friendly errors for scanned, password-protected, renamed, and oversized files.",
        },
        {
          lead: "Job description screenshot upload:",
          text: "in-browser OCR with Tesseract.js, with drag-and-drop and paste. Large images are scaled down, dark-mode screenshots are inverted, and low-confidence text gets a warning. Nothing is sent to a server.",
        },
        {
          lead: "Saved history:",
          text: "the last 10 results in localStorage, reopened with no API call. It stores results and a label, not the resume text.",
        },
        {
          lead: "UI:",
          text: "aligned layout, 44px mobile tap targets, and an accessible inline SVG icon set in place of emoji, with a test that fails if an emoji comes back.",
        },
      ],
    },
    {
      id: "learned",
      title: "What I learned",
      items: [
        { lead: "Prompt changes need measurement.", text: "My v3 prompt looked reasonable but did no better than v2, so I reverted it." },
        { lead: "Model names go stale.", text: "Production broke because a model was retired, which is why I added a fallback and logging." },
        { lead: "Secrets belong on the server.", text: "Anything in browser code is public." },
        { lead: "Free-tier limits are a design constraint.", text: "The main model allows about 20 requests a day, which shaped the fallback design." },
      ],
    },
    {
      id: "limitations",
      title: "Known limitations",
      items: [
        "Some rewrite suggestions can add details not in the resume. I measured this, and a stricter prompt did not fix it. A server-side check would be the next step.",
        "“Or” requirements (AWS or GCP or Azure) are counted as missing.",
        "OCR accuracy depends on image quality, and PDFs with 3+ columns aren’t perfectly cleaned.",
      ],
    },
  ],
  footnotes: [
    "The live demo runs on the free Gemini tier, so a response may be slow or use the fallback model.",
    "Built with AI-assisted development; I designed the prompts, ran the evaluation, and made the deployment decisions.",
  ],
  screenshots: [],
};

/** Experience entries. Only details Aaron provided. */
export const experience = [
  {
    role: "AI/ML Engineer Intern",
    company: "Apno AI",
    companyNote: "A Government of India registered MSME enterprise.",
    type: "Internship",
    start: { label: "October 1, 2026", iso: "2026-10-01" },
    /** Products built during this internship (featured under the card on Experience). */
    builtDuring: [aiCareerCopilot],
  },
];

/** Tech events and community meetups (plain text — no certificates shown). */
export const techEvents = [
  { title: "Build With AI: Davao", org: "GDG Davao" },
  { title: "AWS Community Day", org: "AWS User Group Davao" },
  { title: "Cyber Hygiene Training", org: "Holy Cross of Davao College · IAES" },
  { title: "DurianPy", org: "Davao Python User Group" },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/stack", label: "Stack" },
  { href: "/certificates", label: "Certificates" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

/**
 * /resources page. Links open in a new tab; keep URLs exactly as given.
 * Every URL here was fetched before publishing, and notes only state what the official page
 * says (no cost, dates or certificates unless the page confirms them).
 */
export type ResourceStatus = "learning" | "next" | "target" | "done";

export type ResourceLink = {
  title: string;
  url: string;
  /** Where I am with it. Shown as a tag and used by the page filter. Edit freely. */
  status?: ResourceStatus;
  /** One line on why it's on the list (keep it under ~90 characters). */
  why?: string;
  /** Short factual note, only what the official page states. */
  note?: string;
  /** Follow-on courses, shown nested under this one as a path (used for CS50). */
  next?: ResourceLink[];
};

export type ResourceGroup =
  | { id: string; label: string; title: string; kind: "links"; links: ResourceLink[] }
  | { id: string; label: string; title: string; kind: "path"; start: ResourceLink }
  | { id: string; label: string; title: string; kind: "tools"; tools: string[] };

export const resourceGroups: ResourceGroup[] = [
  {
    id: "where-i-started",
    label: "Journey",
    title: "Where I started my journey",
    kind: "path",
    start: {
      title: "CS50: Introduction to Computer Science (Harvard Online)",
      url: "https://pll.harvard.edu/course/cs50-introduction-computer-science",
      next: [
        { title: "Introduction to Programming with Python", url: "https://cs50.harvard.edu/python/" },
        { title: "Introduction to Artificial Intelligence", url: "https://cs50.harvard.edu/ai/" },
      ],
    },
  },
];


export const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
