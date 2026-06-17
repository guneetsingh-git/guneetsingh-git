// ═══════════════════════════════════════════════════════════════════════════════
// GUNEET SINGH — DEVELOPER PORTFOLIO
// ═══════════════════════════════════════════════════════════════════════════════
//
// QUICK UPDATE GUIDE:
// ──────────────────
// • Change personal info / links       → components/Navbar.tsx    (NAVBAR section)
//                                        components/Hero.tsx       (HERO section)
//                                        components/Contact.tsx    (CONTACT section)
// • Add / edit experience or projects  → components/Experience.tsx (EXPERIENCES array)
// • Add / edit education records       → components/Education.tsx  (EDUCATION array)
// • Add / edit skills                  → components/Skills.tsx     (SKILL_CATEGORIES array)
// • Add / edit awards / certifications → components/Awards.tsx     (AWARDS array)
// • Change colors / theme              → styles/theme.css          (CSS custom properties)
// • Change fonts                       → styles/fonts.css          (Google Fonts import)
//
// ═══════════════════════════════════════════════════════════════════════════════

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Skills } from "./components/Skills";
import { Awards } from "./components/Awards";
import { Contact } from "./components/Contact";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    // The entire portfolio is rendered on a single dark page.
    // The bg-background class maps to --background in theme.css (#0a0b0e)
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Fixed navigation bar */}
      <Navbar />

      {/* ── Page Sections ────────────────────────────────────────────── */}
      <main>
        {/* 1. Hero + 3D Canvas Viewport */}
        <Hero />

        {/* 2. About & Summary */}
        <About />

        {/* 3. Experience & Projects Timeline */}
        <Experience />

        {/* 4. Education Academic Grid */}
        <Education />

        {/* 5. Technical Skills & Competencies */}
        <Skills />
        {/* Note: Professional Development Panel is embedded inside <Skills /> */}

        {/* 6. Awards & Certifications */}
        <Awards />

        {/* 7. Contact & Footer */}
        <Contact />
      </main>

      {/* Floating scroll-to-top button (appears after scrolling 500px) */}
      <ScrollToTop />
    </div>
  );
}
