import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
// To add or remove skills, edit the items arrays in each category.
// To add a new category, add a new object to SKILL_CATEGORIES.
const SKILL_CATEGORIES = [
  {
    label: "Languages & Core Systems",
    icon: "⬡",
    accentColor: "#7cf7c8",
    items: ["Python", "ASP.NET", "C++ (Basics)", "SQL", "Data Structures & Algorithms (Basic)"],
  },
  {
    label: "Web & Enterprise Frameworks",
    icon: "⬡",
    accentColor: "#64b4ff",
    items: ["HTML5", "CSS3", "ASP.NET Core Architecture Engine"],
  },
  {
    label: "Production Tools & Version Pipelines",
    icon: "⬡",
    accentColor: "#c896ff",
    items: ["DaVinci Resolve", "Filmora", "CapCut", "KineMaster", "Vita", "Git / GitHub"],
  },
  {
    label: "Core Operational Competencies",
    icon: "⬡",
    accentColor: "#ffc864",
    items: [
      "Algorithmic Problem Solving",
      "Structured Teamwork Coordination",
      "Leadership & Group Distribution Management",
      "Time Management & Pipeline Discipline",
    ],
  },
];

export function Skills() {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <section id="skills" className="py-28 relative">
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#7cf7c8] uppercase">04 / Skills</span>
          <h2
            className="text-white mt-2"
            style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)" }}
          >
            Technical Stack
          </h2>
        </motion.div>

        {/* Skill categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCategory key={cat.label} cat={cat} index={i} />
          ))}
        </div>

        {/* Professional Development Panel */}
        <ProfDevPanel />
      </div>
    </section>
  );
}

function SkillCategory({ cat, index }: { cat: (typeof SKILL_CATEGORIES)[0]; index: number }) {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-6 rounded-xl border border-white/7 bg-[#111318] hover:border-white/12 transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: cat.accentColor }} className="text-xs">⬡</span>
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: cat.accentColor }}>
          {cat.label}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {cat.items.map((item) => (
          <span
            key={item}
            className="px-3 py-1.5 rounded-full text-xs font-medium text-white border transition-all duration-200 hover:scale-105 cursor-default"
            style={{
              borderColor: cat.accentColor + "30",
              backgroundColor: cat.accentColor + "08",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── PROFESSIONAL DEVELOPMENT PANEL ──────────────────────────────────────────
// Update this section to reflect your current learning / coursework.
function ProfDevPanel() {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mt-6 relative p-8 rounded-2xl border border-[#7cf7c8]/20 bg-[#111318] overflow-hidden"
    >
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,247,200,0.08) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(100,180,255,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#7cf7c8] uppercase">05 / Growth</span>
            <h3
              className="text-white mt-2"
              style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "1.25rem" }}
            >
              Continuous Professional Development
            </h3>
            <p className="text-[#7cf7c8]/70 text-sm font-mono mt-1">
              Full-Stack Engineering & Modern Framework Specialization
            </p>
          </div>
          <span className="px-3 py-1 rounded-full border border-[#7cf7c8]/30 text-[#7cf7c8] font-mono text-[9px] tracking-widest">
            IN PROGRESS
          </span>
        </div>

        <div className="h-px bg-white/7 my-5" />

        <p className="text-[#a8b0c0] leading-relaxed text-sm max-w-3xl">
          Currently enrolled in advanced systemic track coursework focusing on advanced database relationship schema
          mapping, enterprise component lifecycles, full-stack deployment hooks, and distributed system architectures.
        </p>

        {/* Learning progress pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {["Full-Stack Development", "Database Architecture", "System Design", "API Engineering", "Deployment Pipelines"].map((topic) => (
            <span key={topic} className="px-3 py-1 rounded-full text-[10px] font-mono text-[#7cf7c8]/60 border border-[#7cf7c8]/15 bg-[#7cf7c8]/5">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
