"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    number: "01",
    title: "PORTFOLIO\nWEBSITE",
    type: "Personal Project",
    tech: ["Next.js", "CSS", "Html"],
    image: "/images/portfolio.png",
    gitlab: "#",
  },
  {
    number: "02",
    title: "ALENSSO\nE-COMMERCE",
    type: "Client Project",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/images/alensso.png",
    website: "https://alensso.com/",
  },
  {
    number: "03",
    title: "E-COMMERCE\nWEB APP",
    type: "UI/UX Development",
    tech: ["Next.js", "Figma", "Prototyping"],
    image: "/images/ecommerce.png",
    gitlab: "https://elona-ecommerce-oqkq.vercel.app/",
  },
  {
    number: "04",
    title: "Travel\n APP",
    type: "UI/UX Design",
    tech: ["Next.js", "Figma", "Prototyping"],
    image: "/images/travel.png",
    figma: "https://www.figma.com/proto/OLZ0oKPSPbLqtxriryhITq/Untitled?node-id=3226-3623&t=ViNApXVlUgZomZ9A-0&scaling=min-zoom&content-scaling=fixed&page-id=868%3A349&starting-point-node-id=3226%3A3623&show-proto-sidebar=1&fuid=1580096542845480028",
    gitlab: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const horizontalRef = useRef(null);
  const progressRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const horizontal = horizontalRef.current;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".projects__label", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".projects__header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".projects__title", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".projects__header",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Horizontal scroll pinning
      const scrollWidth = horizontal.scrollWidth - window.innerWidth;

      gsap.to(horizontal, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Cards stagger reveal
      gsap.from(".project-card", {
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: simple reveal
  useEffect(() => {
    if (!isMobile) return;

    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
      <section className="projects" id="projects" ref={sectionRef}>
        <div className="projects__wrapper">
          {/* Header */}
          <div className="projects__header">
            <div className="projects__label">Selected Work</div>
            <h2 className="projects__title">Projects</h2>
          </div>

          {/* Horizontal Scroll Track */}
          <div className="projects__horizontal" ref={horizontalRef}>
            {PROJECTS.map((project, i) => (
              <article className="project-card" key={i} id={`project-${i + 1}`}>
                {/* Full-bleed image */}
                <div className="project-card__image-wrapper">
                  <img
                    className="project-card__image"
                    src={project.image}
                    alt={project.title.replace("\n", " ")}
                    loading="lazy"
                  />
                </div>

                {/* Gradient overlay */}
                <div className="project-card__overlay" />

                {/* Content — minimal */}
                <div className="project-card__content">
                  <div className="project-card__meta">
                    <span className="project-card__number">{project.number}</span>
                    <span className="project-card__type">{project.type}</span>
                  </div>
                  <h3 className="project-card__title">
                    {project.title.split("\n").map((line, li) => (
                      <span key={li}>
                        {line}
                        {li === 0 && <br />}
                      </span>
                    ))}
                  </h3>
                  <div className="project-card__actions">
                      <a
                        href={project.figma}
                        className="project-card__btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`figma-link-${i + 1}`}
                      >
                        <span>Figma</span>
                        <span className="project-card__btn-arrow">→</span>
                      </a>
                      <a
                        href={project.gitlab}
                        className="project-card__btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`gitlab-link-${i + 1}`}
                      >
                        <span>GitLab</span>
                        <span className="project-card__btn-arrow">→</span>
                      </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

        {/* Scroll Progress Bar */}
          <div className="projects__progress">
            <div className="projects__progress-bar">
              <div className="projects__progress-fill" ref={progressRef}></div>
            </div>
          </div>

        {/* Marquee Text */}
      <div className="projects__marquee">
        <div className="projects__marquee-track">
          <div className="projects__marquee-text">
            DESIGN · DEVELOP · <span>DELIVER</span> · DESIGN · DEVELOP ·{" "}
            <span>DELIVER</span> ·
          </div>
          <div className="projects__marquee-text">
            DESIGN · DEVELOP · <span>DELIVER</span> · DESIGN · DEVELOP ·{" "}
            <span>DELIVER</span> ·
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
