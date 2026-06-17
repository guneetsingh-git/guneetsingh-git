import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";

// ─── ABOUT CONTENT ────────────────────────────────────────────────────────────
// Update the summary paragraph and stats here.
const ABOUT_TEXT =
  "Passionate and driven Computer Science Engineering student (3rd year, expected graduation 2028) with an intense fascination for software architecture and full-stack ecosystems. Beyond my academic track, I am deeply immersed in mastering modern web and mobile frameworks, constantly transforming conceptual logic into interactive user experiences. Highly proficient in Python and actively building strong algorithmic foundations in Data Structures and Algorithms. I thrive on solving complex technical puzzles and am aggressively seeking an immersive software engineering or backend development internship to build high-performance tools alongside an industry engineering team.";

// Quick stat badges shown alongside the summary
const STATS = [
  { label: "University", value: "Guru Nanak Dev University" },
  { label: "Batch", value: "2024–28" },
  { label: "Year", value: "3rd Year" },
  { label: "Status", value: "Open to Work" },
];

export function About() {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="about" className="py-28 relative">
      {/* Decorative line */}
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Section label */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#7cf7c8] uppercase">01 / About</span>
            <h2
              className="text-white leading-tight"
              style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)" }}
            >
              ABOUT<br />ME
            </h2>
          </div>

          {/* Summary block */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            <p className="text-[#a8b0c0] leading-[1.9] text-lg max-w-3xl">
              {ABOUT_TEXT}
            </p>

            {/* Stat badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1 px-4 py-3 rounded-lg border border-white/7 bg-[#111318]"
                >
                  <span className="font-mono text-[9px] tracking-widest text-[#5a6478] uppercase">{s.label}</span>
                  <span className="text-white text-sm font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
