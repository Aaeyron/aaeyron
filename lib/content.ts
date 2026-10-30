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
  /** Profile photo, shared by the home About section and /experience "About me". */
  photo: "/images/MeAgain.jpeg",
};

/** About text in Aaron's own wording: /experience "About me" section. */
export const aboutMe = {
  heading: "Hi, I’m Aaron.",
  paragraphs: [
    "I’m a 4th-year Information Technology student at Holy Cross of Davao College in Davao City, Philippines. I like building websites and apps that solve real problems.",
    "I work on web apps, mobile apps, backends, and databases. I care about making software that is simple and easy to use.",
    "I learn best by building. Every project teaches me something new, and I try to do better on the next one.",
  ],
};

/** Home "Focus" section: work and direction only (personal details stay on /experience). */
export const homeFocus = {
  heading: "What I’m working toward.",
  text: "I’m building my skills as a software and AI/ML engineer through real projects, from full-stack web apps to an AI-assisted accessibility app for my capstone. I focus on making software that is simple, useful, and easy to use.",
};

/** /experience "Profile" box: two capability areas side by side (icons are picked in the page by id). */
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

// Certifications shown on the site (home + /experience), in display order.
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
    type: "Internship",
    start: { label: "October 1, 2026", iso: "2026-10-01" },
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
    id: "learn-ai-ml",
    label: "AI / ML",
    title: "Learn AI/ML",
    kind: "links",
    links: [
      { title: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
      { title: "Hugging Face LLM Course", url: "https://huggingface.co/learn/llm-course/chapter1/1" },
      { title: "DeepLearning.AI Courses", url: "https://www.deeplearning.ai/courses" },
      { title: "Kaggle Learn", url: "https://www.kaggle.com/learn" },
    ],
  },
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
  {
    id: "prompt-engineering",
    label: "Prompting",
    title: "Prompt engineering",
    kind: "links",
    links: [
      {
        title: "Prompt engineering with Claude",
        url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
      },
      {
        title: "OpenAI prompt engineering",
        url: "https://developers.openai.com/api/docs/guides/prompt-engineering?api-mode=responses",
      },
    ],
  },
  {
    id: "math-fundamentals",
    label: "Math",
    title: "Math and fundamentals",
    kind: "links",
    links: [
      {
        title: "3Blue1Brown: Essence of Linear Algebra",
        url: "https://www.3blue1brown.com/topics/linear-algebra",
        status: "next",
        why: "The math behind the models.",
      },
      {
        title: "3Blue1Brown: Neural Networks",
        url: "https://www.3blue1brown.com/topics/neural-networks",
        status: "next",
        why: "The math behind the models.",
      },
      {
        title: "Mathematics for Machine Learning",
        url: "https://mml-book.github.io/",
        status: "next",
        why: "The math behind the models.",
        note: "Book PDF kept freely available by the authors.",
      },
      {
        title: "Khan Academy Math",
        url: "https://www.khanacademy.org/math",
        status: "next",
        why: "The math behind the models.",
      },
    ],
  },
  {
    id: "mlops-data",
    label: "MLOps",
    title: "MLOps, DevOps and data engineering",
    kind: "links",
    links: [
      {
        title: "MLOps Zoomcamp",
        url: "https://datatalks.club/blog/mlops-zoomcamp.html",
        status: "learning",
        why: "Tracking, pipelines, deployment and monitoring.",
        note: "Live cohort or self-paced; materials on GitHub.",
      },
      {
        title: "Machine Learning Zoomcamp",
        url: "https://datatalks.club/blog/machine-learning-zoomcamp.html",
        status: "learning",
        why: "ML models plus Docker and Kubernetes deployment.",
        note: "Live cohort or self-paced; materials on GitHub.",
      },
      {
        title: "Data Engineering Zoomcamp",
        url: "https://datatalks.club/blog/data-engineering-zoomcamp.html",
        status: "next",
        why: "Pipelines, warehouses, dbt, Spark, Kafka.",
        note: "Materials available to follow at your own pace.",
      },
      { title: "Made With ML", url: "https://madewithml.com/", status: "next", why: "Production ML practice." },
      {
        title: "Full Stack Deep Learning",
        url: "https://fullstackdeeplearning.com/",
        status: "next",
        why: "Production ML practice.",
      },
    ],
  },
  {
    id: "llms-agents-mcp",
    label: "LLMs",
    title: "LLMs, agents and MCP",
    kind: "links",
    links: [
      {
        title: "LLM Zoomcamp",
        url: "https://datatalks.club/blog/llm-zoomcamp.html",
        status: "learning",
        why: "RAG, vector search, evaluation, agent patterns.",
        note: "Live cohort or self-paced; materials on GitHub.",
      },
      {
        title: "Hugging Face MCP Course",
        url: "https://huggingface.co/learn/mcp-course/unit0/introduction",
        status: "learning",
        why: "Connecting models to tools with the Model Context Protocol.",
      },
      {
        title: "Hugging Face Agents Course",
        url: "https://huggingface.co/learn/agents-course/",
        status: "next",
        why: "Building and evaluating AI agents.",
      },
      {
        title: "AI Dev Tools Zoomcamp",
        url: "https://datatalks.club/blog/ai-dev-tools-zoomcamp.html",
        status: "next",
        why: "Coding agents, MCP, AI for DevOps.",
        note: "Live cohort started August 31, 2026; self-paced anytime.",
      },
    ],
  },
  {
    id: "deep-learning",
    label: "Deep learning",
    title: "Deep learning depth",
    kind: "links",
    links: [
      { title: "fast.ai Practical Deep Learning", url: "https://course.fast.ai/", status: "next" },
      { title: "Andrej Karpathy: Neural Networks: Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html", status: "next" },
      { title: "Stanford CS224n: NLP with Deep Learning", url: "https://web.stanford.edu/class/cs224n/", status: "next" },
    ],
  },
  {
    id: "stretch-goals",
    label: "Stretch",
    title: "Stretch goals",
    kind: "links",
    links: [
      {
        title: "Stanford CS336: Language Modeling from Scratch",
        url: "https://cs336.stanford.edu",
        status: "target",
        why: "How LLMs are really built.",
        note: "Lecture recordings on a YouTube playlist.",
      },
      {
        title: "Google Summer of Code",
        url: "https://developers.google.com/open-source/gsoc/timeline",
        status: "target",
        why: "Goal: GSoC 2027.",
        note: "Contributor applications usually open in March.",
      },
      {
        title: "Kaggle competitions",
        url: "https://www.kaggle.com/competitions",
        status: "target",
        why: "Public notebooks as proof of work.",
      },
    ],
  },
  {
    id: "communities",
    label: "Community",
    title: "Communities and workshops",
    kind: "links",
    links: [
      {
        title: "Cohere Labs Community",
        url: "https://labscommunity.cohere.com/community-programs",
        status: "next",
        why: "BIRDS for research beginners, plus Regional Asia, ML Math, NLP and ML Agents groups.",
        note: "Groups meet on Discord.",
      },
      {
        title: "DataTalks.Club community",
        url: "https://datatalks.club/slack.html",
        why: "The Slack community behind the Zoomcamps.",
      },
      {
        title: "DurianPy",
        url: "https://www.durianpy.org/",
        why: "Davao’s Python community: monthly meetups and workshops.",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    title: "Tools I use",
    kind: "tools",
    tools: ["Claude Code", "Codex", "Antigravity", "Copilot", "Gemini"],
  },
];


export const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
