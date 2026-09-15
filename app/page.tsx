"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Code2, Layers3, Smartphone } from "lucide-react";
import SiteNav from "./components/SiteNav";
import ScrollAnimations from "./components/ScrollAnimations";

const projects = [
  {
    number: "01",
    title: "Library Management System",
    description: "A role-based library platform connecting a React interface to a Django REST backend.",
    image: "/images/LMS1.png",
    tags: ["React", "Django", "REST API"],
  },
  {
    number: "02",
    title: "Jana’s Boutique",
    description: "A storefront and inventory experience built for a local clothing business in Davao.",
    image: "/images/Boutique1.png",
    tags: ["Next.js", "PHP", "MySQL"],
  },
  {
    number: "03",
    title: "FlashMind",
    description: "A focused flashcard experience designed around active recall and better study habits.",
    image: "/images/FlashMind Display.png",
    tags: ["React", "UI/UX", "Learning Tool"],
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <SiteNav />
      <ScrollAnimations />

      <main>
        <section className="hero-section">
          <div className="hero-kicker" data-aos="fade-down">
            <span className="status-dot" />
            Open to opportunities
          </div>

          <div className="hero-grid">
            <div className="hero-copy" data-aos="fade-up">
              <p className="eyebrow">FULL-STACK DEVELOPER / AI/ML LEARNER</p>
              <h1>
                I build ideas into
                <span> useful software.</span>
              </h1>
              <p className="hero-summary">
                I’m Aaron Seth—an aspiring Full-Stack Developer and AI/ML Learner seeking{" "}
                <span>internship opportunities and mentorship.</span>
              </p>

              <div className="hero-actions">
                <Link href="/projects" className="button-primary">
                  Explore my work <ArrowDownRight size={19} />
                </Link>
                <Link href="/about" className="button-secondary">More about me</Link>
              </div>
            </div>

            <div className="portrait-wrap" aria-label="Portrait of Aaron Seth" data-aos="fade-left" data-aos-delay="140">
              <div className="portrait-frame">
                <Image src="/images/MeAgain.jpeg" alt="Aaron Seth Nagtalon" fill priority sizes="(max-width: 768px) 82vw, 36vw" className="portrait-image" />
              </div>
              <div className="portrait-note">BUILDING · LEARNING · ITERATING</div>
              <div className="portrait-index">001</div>
            </div>
          </div>

        </section>

        <section className="work-section">
          <div className="section-heading" data-aos="fade-up">
            <div>
              <p className="eyebrow">SELECTED WORK / 2025—2026</p>
              <h2>Projects with a <span>purpose.</span></h2>
            </div>
            <Link href="/projects" className="text-link">See all projects <ArrowUpRight size={18} /></Link>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <Link href="/projects" className="project-row" key={project.title} data-aos="fade-up" data-aos-delay={String(index * 90)}>
                <div className="project-number">{project.number}</div>
                <div className="project-image-wrap">
                  <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 768px) 100vw, 42vw" className="project-image" />
                </div>
                <div className="project-copy">
                  <div className="project-title-line">
                    <h3>{project.title}</h3>
                    <ArrowUpRight size={24} />
                  </div>
                  <p>{project.description}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="capabilities-section">
          <div className="capabilities-intro" data-aos="fade-up">
            <p className="eyebrow">HOW I LIKE TO WORK</p>
            <h2>Curious by default. <span>Practical by design.</span></h2>
            <p>I care about the whole journey—from understanding the problem to shipping an interface that feels <span>clear, responsive, and genuinely useful.</span></p>
          </div>

          <div className="capability-grid">
            <article data-aos="fade-up">
              <Code2 /><span>01</span><h3>Web experiences</h3>
              <p>Responsive interfaces with React, Next.js, TypeScript, and modern CSS.</p>
            </article>
            <article data-aos="fade-up" data-aos-delay="90">
              <Smartphone /><span>02</span><h3>Mobile thinking</h3>
              <p>Cross-platform concepts designed for real screens, real hands, and real constraints.</p>
            </article>
            <article data-aos="fade-up" data-aos-delay="180">
              <Layers3 /><span>03</span><h3>Connected systems</h3>
              <p>Backend logic, databases, and APIs that make the visible product work reliably.</p>
            </article>
          </div>
        </section>

        <section className="home-about-section">
          <div className="home-about-index" data-aos="fade-right">ABOUT / 004</div>
          <div className="home-about-copy" data-aos="fade-up" data-aos-delay="100">
            <p className="eyebrow">A SHORT INTRO</p>
            <h2>Developer, student, and <span>thoughtful problem solver.</span></h2>
            <p>
              I’m Aaron Seth Nagtalon. I enjoy turning practical ideas into <span>clear digital experiences</span>, learning new tools along the way, and improving every project through careful iteration.
            </p>
            <div className="home-about-links">
              <Link href="/about">Read more about me <ArrowUpRight size={21} /></Link>
              <Link href="/contact">Start a conversation <ArrowUpRight size={21} /></Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
