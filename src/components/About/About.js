"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    date: "Dec 2025 — Present",
    role: "UI/UX Developer Intern",
    company: "APPZIAC PVT LTD",
    desc: "Designed responsive UI/UX for web and mobile applications in Figma. Created wireframes, high-fidelity prototypes, and conducted user research to deliver user-centric digital experiences.",
  },
  {
    date: "Jul 2024 — Aug 2024",
    role: "Data Science with AI Intern",
    company: "EDU TANTR PVT LTD",
    desc: "Worked on AI-based image generation and captioning systems, gaining hands-on experience with machine learning pipelines and data processing workflows.",
  },
];

const EDUCATION = [
  {
    degree: "Master of Computer Application (MCA)",
    institution: "Acharya Institute of Graduate Studies, Bangalore",
    year: "2022 — 2024",
    grade: "CGPA: 8.34 / 10",
    icon: "🎓",
  },
  {
    degree: "Bachelor of Computer Application (BCA)",
    institution: "Kannur University, Kerala",
    year: "2019 — 2022",
    grade: "CGPA: 7.8 / 10",
    icon: "📚",
  },
];

const SKILLS = [
  {
    category: "Frontend",
    items: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "Next.js"],
  },
  {
    category: "UI/UX",
    items: [
      "Figma",
      "Wireframing",
      "Prototyping",
      "User Research",
      "Interaction Design",
    ],
  },
  {
    category: "Tools & Other",
    items: ["Git", "GitLab", "MySQL", "SEO", "Python"],
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      // --- Section header reveal ---
      gsap.from(".about__label", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".about__header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".about__title", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".about__header",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".about__intro", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".about__header",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // --- Decorative number parallax ---
      gsap.to(".about__deco-number", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // --- Timeline items stagger ---
      gsap.from(".timeline__item", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // --- Education cards ---
      gsap.from(".education__card", {
        opacity: 0,
        x: 40,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".about__grid",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // --- Skill badges stagger ---
      const badges = gsap.utils.toArray(".badge", section);

      // Ensure badges are visible by default, then animate in
      gsap.set(badges, { opacity: 1, y: 0, scale: 1 });

      gsap.from(badges, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".skills",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      {/* Decorative */}
      <div className="about__deco-number">02</div>
      <div className="about__deco-line-v" />

      <div className="about__container">
        {/* Header */}
        <div className="about__header">
          <div className="about__label">About</div>
          <h2 className="about__title">
            Education &<br />
            Experience
          </h2>
          <p className="about__intro">
            A passionate UI/UX Designer and Frontend Developer with a strong
            foundation in user-centric design principles, modern web
            technologies, and a keen eye for pixel-perfect interfaces.
          </p>
        </div>

        {/* Grid: Experience + Education */}
        <div className="about__grid">
          {/* Experience Timeline */}
          <div>
            <div className="timeline">
              <h3 className="timeline__heading">
                <span className="timeline__heading-dot" />
                Experience
              </h3>
              {EXPERIENCE.map((item, i) => (
                <div className="timeline__item" key={i}>
                  <div className="timeline__dot"></div>
                  <div className="timeline__date">{item.date}</div>
                  <div className="timeline__role">{item.role}</div>
                  <div className="timeline__company">{item.company}</div>
                  <p className="timeline__desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="timeline__heading">
              <span className="timeline__heading-dot" />
              Education
            </h3>
            {EDUCATION.map((item, i) => (
              <div className="education__card" key={i}>
                <div className="education__icon">{item.icon}</div>
                <div className="education__degree">{item.degree}</div>
                <div className="education__institution">
                  {item.institution}
                </div>
                <div className="education__meta">
                  <span className="education__year">{item.year}</span>
                  <span className="education__grade">{item.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="skills">
          <h3 className="skills__heading">Technical Skills</h3>
          <div className="skills__grid">
            {SKILLS.map((group, i) => (
              <div className="skills__category" key={i}>
                <div className="skills__category-label">{group.category}</div>
                <div className="skills__tags">
                  {group.items.map((skill) => (
                    <span className="badge" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
