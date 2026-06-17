import { motion } from "motion/react";
import { CanvasViewport } from "./CanvasViewport";

// ─── HERO CONTENT ─────────────────────────────────────────────────────────────
// Update name, title, tagline, and button links here.
const HERO = {
  name: "GUNEET SINGH",
  title: "SOFTWARE ENGINEER & DEVELOPER",
  tagline: "Building robust systems. Writing clean code. Solving real problems.",
  githubUrl: "https://github.com/guneetsingh-git",
  linkedinUrl: "https://www.linkedin.com/in/guneet-singh-85bba7365",
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,247,200,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,247,200,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow blob */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,247,200,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">
        {/* ── Left: Text ── */}
        <div className="flex flex-col gap-6">
          {/* System status indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7cf7c8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7cf7c8]" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#7cf7c8] uppercase">
              GUNEET.SYS / ENGINE_CORE
            </span>
          </motion.div>

          {/* Name */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-white"
              style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800 }}
            >
              {HERO.name}
            </motion.h1>
          </div>

          {/* Title */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="font-mono text-sm tracking-[0.2em] text-[#7cf7c8] uppercase"
          >
            {HERO.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-[#5a6478] max-w-md leading-relaxed text-base"
          >
            {HERO.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex flex-wrap gap-3 mt-2"
          >
            <a
              href={HERO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#7cf7c8] text-[#0a0b0e] text-sm font-semibold tracking-wide hover:bg-white transition-colors duration-200"
            >
              View Repositories
              <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
            <a
              href={HERO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white text-sm font-medium tracking-wide hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            >
              LinkedIn Profile ↗
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center gap-2 mt-4"
          >
            <div className="h-px w-8 bg-white/15" />
            <span className="font-mono text-[10px] text-[#5a6478] tracking-widest">SCROLL TO EXPLORE</span>
          </motion.div>
        </div>

        {/* ── Right: 3D Canvas ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="h-[420px] lg:h-[500px] w-full"
        >
          <CanvasViewport />
        </motion.div>
      </div>
    </section>
  );
}
