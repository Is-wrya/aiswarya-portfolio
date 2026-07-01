"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".contact__label", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact__header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact__title", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".contact__header",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact__subtitle", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".contact__header",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Contact items
      gsap.from(".contact__item", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".contact__details",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // CTA side
      gsap.from(".contact__big-text", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact__cta",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact__resume-btn", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".contact__cta",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Floating deco
      gsap.to(".contact__deco-circle", {
        rotation: 360,
        duration: 80,
        repeat: -1,
        ease: "none",
      });

      // Socials
      gsap.from(".contact__social-link", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".contact__socials",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Footer
      gsap.from(".footer__inner", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".footer",
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate dots for decorative grid
  const dots = Array.from({ length: 25 });

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      {/* Decorative */}
      <div className="contact__deco-circle" />
      <div className="contact__deco-dots">
        {dots.map((_, i) => (
          <div className="contact__deco-dot" key={i} />
        ))}
      </div>

      <div className="contact__container">
        {/* Header */}
        <div className="contact__header">
          <div className="contact__label">Get In Touch</div>
          <h2 className="contact__title">
            Let&apos;s Work<br />
            Together
          </h2>
          <p className="contact__subtitle">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. Let&apos;s create something
            extraordinary.
          </p>
        </div>

        {/* Grid */}
        <div className="contact__grid">
          {/* Contact Details */}
          <div className="contact__details">
            <div className="contact__item">
              <span className="contact__item-label">Email</span>
              <a
                href="mailto:aiswaryarameshans@gmail.com"
                className="contact__item-value"
                id="contact-email"
              >
                aiswaryarameshans@gmail.com
              </a>
            </div>
            <div className="contact__item">
              <span className="contact__item-label">Phone</span>
              <a
                href="tel:+917736615580"
                className="contact__item-value"
                id="contact-phone"
              >
                (+91) 7736615580
              </a>
            </div>
            <div className="contact__item">
              <span className="contact__item-label">Location</span>
              <span className="contact__item-value">Kerala, Kannur</span>
            </div>

            {/* Social Links */}
            <div className="contact__socials">
              <a
                href="www.linkedin.com/in/aiswarya-kottiyal-5b7440234"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
                id="social-linkedin"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://gitlab.com/iswrya"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
                id="social-gitlab"
              >
                GitLab ↗
              </a>
            </div>
          </div>

          {/* CTA Side */}
          <div className="contact__cta">
            <div className="contact__big-text">
              Have a project<br />
              <em>in mind?</em>
            </div>

            {/* Resume Download */}
            <div className="contact__resume">
              <a
                href="/resume.pdf"
                download
                className="contact__resume-btn"
                id="resume-download"
              >
                <span>Download Resume</span>
                <span className="contact__resume-arrow">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__copyright">
            © 2026 Aiswarya Kottiyal. All rights reserved.
          </div>
          <div className="footer__credit">
            Designed & Developed with precision.
          </div>
          <button
            className="footer__back-top"
            onClick={scrollToTop}
            id="back-to-top"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
