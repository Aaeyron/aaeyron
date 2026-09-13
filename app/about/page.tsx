import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteNav from "../components/SiteNav";
import ScrollAnimations from "../components/ScrollAnimations";

const milestones = [
  {
    date: "May 2026",
    title: "Build With AI: Davao",
    organization: "Google Developer Groups Davao",
    detail: "Explored agentic AI, Google’s AI ecosystem, and practical ways developers can build AI-powered products.",
  },
  {
    date: "January 2026",
    title: "Cloud Catchup Session",
    organization: "AWS User Group Davao",
    detail: "Learned from local developers about AWS re:Invent updates, cloud services, and real-world deployment practices.",
  },
  {
    date: "January 2026",
    title: "Cyber Hygiene Training",
    organization: "Holy Cross of Davao College · IAES",
    detail: "Completed four days of training in threat awareness, data protection, safer systems, and incident response.",
  },
];

export default function About() {
  return (
    <div className="site-shell">
      <SiteNav />
      <ScrollAnimations />

      <main className="about-page">
        <section className="about-hero">
          <div className="about-heading" data-aos="fade-up">
            <p className="eyebrow">ABOUT / AARON SETH NAGTALON</p>
            <h1>
              A developer in progress,
              <span> building with intention.</span>
            </h1>
          </div>

          <div className="about-intro-grid">
            <div className="about-portrait-slot" data-aos="fade-right" data-aos-delay="80">
              <Image
                src="/images/About.jpg"
                alt="Aaron Seth Nagtalon"
                fill
                sizes="(max-width: 640px) 310px, (max-width: 900px) 32vw, 390px"
                className="about-portrait-image"
                priority
              />
            </div>

            <div className="about-story" data-aos="fade-left" data-aos-delay="140">
              <p className="about-lead">
                I’m Aaron, an Information Technology student who enjoys turning simple ideas into <span>useful digital products.</span>
              </p>
              <p>
                My work moves across web interfaces, mobile concepts, backend logic, and databases. I’m especially interested in how <span>thoughtful design and solid engineering</span> come together to make software easier to understand and use.
              </p>
              <p>
                <span>I learn by building.</span> Every project gives me a new problem to solve, a better question to ask, and another chance to improve how I work—from planning the experience to shipping the final result.
              </p>

              <div className="about-links">
                <Link href="/projects" className="button-primary">View selected work <ArrowUpRight size={18} /></Link>
                <a href="mailto:aaronseth.nagtalon@hcdc.edu.ph" className="button-secondary">Start a conversation</a>
              </div>
            </div>
          </div>
        </section>

        <section className="about-focus">
          <div className="about-focus-heading" data-aos="fade-right">
            <p className="eyebrow">RIGHT NOW</p>
            <h2>What I’m <span>focused on.</span></h2>
          </div>
          <div className="focus-list">
            <div data-aos="fade-up" data-aos-delay="60"><span>01</span><p>Building stronger full-stack projects with clearer structure and real-world use cases.</p></div>
            <div data-aos="fade-up" data-aos-delay="140"><span>02</span><p>Improving how I turn product ideas into responsive, accessible interfaces.</p></div>
            <div data-aos="fade-up" data-aos-delay="220"><span>03</span><p>Exploring AI-assisted development as a tool for learning, research, and iteration.</p></div>
          </div>
        </section>

        <section className="learning-section">
          <div className="section-heading learning-heading" data-aos="fade-up">
            <div>
              <p className="eyebrow">COMMUNITY & CONTINUOUS LEARNING</p>
              <h2>Showing up <span>to grow.</span></h2>
            </div>
            <Link href="/certificates" className="text-link">View certificates <ArrowUpRight size={18} /></Link>
          </div>

          <div className="milestone-list">
            {milestones.map((milestone, index) => (
              <article className="milestone-row" key={milestone.title} data-aos="fade-up" data-aos-delay={String(index * 90)}>
                <span className="milestone-index">0{index + 1}</span>
                <div>
                  <p className="milestone-date">{milestone.date}</p>
                  <h3>{milestone.title}</h3>
                  <p className="milestone-org">{milestone.organization}</p>
                </div>
                <p className="milestone-detail">{milestone.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-closing">
          <div data-aos="fade-up">
            <p className="eyebrow">THE SHORT VERSION</p>
            <p>I’m still learning, always building, and serious about becoming the kind of developer people can rely on.</p>
          </div>
        </section>
      </main>

    </div>
  );
}
