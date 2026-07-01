"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="main-nav">
      <div className="navbar__inner">
        <a
          className="navbar__logo"
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
        >
          AK<span>©2026</span>
        </a>

        {/* Desktop Links */}
        <div className="navbar__links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`navbar__link ${
                activeSection === item.href.slice(1) ? "active" : ""
              }`}
              onClick={(e) => handleLinkClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="navbar__mobile-link"
            onClick={(e) => handleLinkClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
