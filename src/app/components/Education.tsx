import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";

// ─── EDUCATION DATA ───────────────────────────────────────────────────────────
// To update education records or add new ones, edit this array.
const EDUCATION = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    stream: "Computer Science Engineering",
    institution: "Guru Nanak Dev University",
    period: "2024 — 2028",
    status: "Currently Enrolled · 2nd Year",
    grade: "In Progress",
    type: "University",
    active: true,
  },
  {
    degree: "Class 12 — Non-Medical Track",
    stream: "Science (Physics · Chemistry · Mathematics)",
    institution: "Gian Jyoti Global School",
    period: "Completed 2024",
    status: "Rank 3rd in Academics",
    grade: "82.4%",
    type: "Senior Secondary",
    active: false,
  },
  {
    degree: "Class 10 Matriculation",
    stream: "All Subjects",
    institution: "Gian Jyoti Global School",
    period: "Completed 2022",
    status: "Passed with Distinction",
    grade: "87%",
    type: "Secondary",
    active: false,
  },
];

export function Education() {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <section id="education" className="py-28 relative">
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
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#7cf7c8] uppercase">03 / Education</span>
          <h2
            className="text-white mt-2"
            style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)" }}
          >
            Academic Background
          </h2>
        </motion.div>

        {/* Education cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EDUCATION.map((edu, i) => (
            <EduCard key={edu.degree} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EduCard({ edu, index }: { edu: (typeof EDUCATION)[0]; index: number }) {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col gap-4 p-6 rounded-xl border bg-[#111318] transition-all duration-300 ${
        edu.active
          ? "border-[#7cf7c8]/30 shadow-[0_0_30px_rgba(124,247,200,0.07)]"
          : "border-white/7"
      }`}
    >
      {/* Active badge */}
      {edu.active && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7cf7c8] animate-pulse" />
          <span className="font-mono text-[9px] text-[#7cf7c8] tracking-widest">ACTIVE</span>
        </div>
      )}

      {/* Type label */}
      <span className="font-mono text-[9px] tracking-widest text-[#5a6478] uppercase">{edu.type}</span>

      {/* Degree */}
      <div>
        <h3 className="text-white leading-snug" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>
          {edu.degree}
        </h3>
        <p className="text-[#7cf7c8]/70 text-xs mt-1 font-mono">{edu.stream}</p>
      </div>

      <div className="h-px bg-white/7" />

      {/* Institution */}
      <p className="text-[#a8b0c0] text-sm font-medium">{edu.institution}</p>
      <p className="font-mono text-[10px] text-[#5a6478] tracking-wide">{edu.period}</p>

      {/* Grade pill */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-[#5a6478] text-xs">{edu.status}</span>
        <span
          className={`font-mono text-sm font-semibold px-3 py-1 rounded-full border ${
            edu.active
              ? "border-[#7cf7c8]/30 text-[#7cf7c8] bg-[#7cf7c8]/10"
              : "border-white/10 text-white bg-white/5"
          }`}
        >
          {edu.grade}
        </span>
      </div>
    </motion.div>
  );
}
