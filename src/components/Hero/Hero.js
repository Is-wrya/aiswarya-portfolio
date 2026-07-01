"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

/* Two rows of images that scroll in opposite directions */
const TRAIN_ROW_1 = [
  { src: "/images/hero-1.png", label: "Wireframing" },
  { src: "/images/project-realestate.png", label: "Real Estate" },
  { src: "/images/hero-2.png", label: "Design" },
  { src: "/images/project-alensso.png", label: "Alensso" },
  { src: "/images/hero-3.png", label: "UI/UX" },
  { src: "/images/project-ecommerce.png", label: "E-Commerce" },
];

const TRAIN_ROW_2 = [
  { src: "/images/hero-3.png", label: "UI/UX" },
  { src: "/images/project-ecommerce.png", label: "E-Commerce" },
  { src: "/images/hero-1.png", label: "Wireframing" },
  { src: "/images/project-realestate.png", label: "Real Estate" },
  { src: "/images/hero-2.png", label: "Design" },
  { src: "/images/project-alensso.png", label: "Alensso" },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      // --- Hero text reveal ---
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero__label", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
      })
        .from(
          ".hero__name-line span",
          {
            y: "110%",
            duration: 1.2,
            stagger: 0.15,
          },
          "-=0.6"
        )
        .from(
          ".hero__separator span",
          {
            y: "110%",
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero__role span",
          {
            y: "110%",
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          ".hero__stat",
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .from(
          ".hero__scroll-indicator",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.4"
        );

      // --- Image train cards fade in ---
      tl.to(
        ".train__card",
        {
          opacity: 1,
          duration: 1.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=1.2"
      );

      // --- Decorative elements ---
      gsap.to(".hero__deco-circle-1", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero__deco-circle-2", {
        y: -30,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });

      // --- Scroll-based parallax: move rows slightly ---
      gsap.to(row1Ref.current, {
        x: "-=80",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(row2Ref.current, {
        x: "+=80",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, section);

    // --- Mouse parallax on entire train ---
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (clientY / window.innerHeight - 0.5) * 2;

      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          x: xPercent * -20,
          y: yPercent * 8,
          duration: 1.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      if (row2Ref.current) {
        gsap.to(row2Ref.current, {
          x: xPercent * 15,
          y: yPercent * -6,
          duration: 1.8,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" id="home" ref={sectionRef}>
      {/* Decorative elements */}
      <div className="hero__deco-circle-1" />
      <div className="hero__deco-circle-2" />
      <div className="hero__deco-grid" />
      <div className="hero__deco-line" />

      {/* Moving Image Train (background) */}
      <div className="hero__image-train">
        {/* Row 1 — moves left continuously */}
        <div className="train__row train__row--1">
          <div className="train__track" ref={row1Ref}>
            {/* Duplicate for seamless infinite scroll */}
            {[...TRAIN_ROW_1, ...TRAIN_ROW_1].map((card, i) => (
              <div key={i} className="train__card">
                <img src={card.src} alt={card.label} loading="eager" />
                <div className="train__card-overlay" />
                <span className="train__card-label">{card.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — moves right continuously */}
        <div className="train__row train__row--2">
          <div className="train__track train__track--reverse" ref={row2Ref}>
            {[...TRAIN_ROW_2, ...TRAIN_ROW_2].map((card, i) => (
              <div key={i} className="train__card">
                <img src={card.src} alt={card.label} loading="eager" />
                <div className="train__card-overlay" />
                <span className="train__card-label">{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Text (centered over images) */}
      <div className="hero__content">
        <div className="hero__label">Portfolio 2026</div>

        <h1 className="hero__name">
          <span className="hero__name-line">
            <span>AISWARYA</span>
          </span>
          <span className="hero__name-line">
            <span>KOTTIYAL</span>
          </span>
        </h1>

        <div className="hero__separator">
          <span>//</span>
        </div>

        <div className="hero__role">
          <span>UI/UX Designer & UI Developer</span>
        </div>

        {/* Stats */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">3+</span>
            <span className="hero__stat-label">Projects</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">6+</span>
            <span className="hero__stat-label">Months Exp</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-number">10+</span>
            <span className="hero__stat-label">Skills</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line"></div>
        <span>Scroll to explore</span>
      </div> */}
    </section>
  );
}
