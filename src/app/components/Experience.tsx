import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";

// ─── EXPERIENCE & PROJECTS DATA ───────────────────────────────────────────────
// To add a new project/experience card, copy one entry in this array and update
// the fields: title, category, period, tags, and points.
const EXPERIENCES = [
  {
    title: "Hackathon Participant & Team Leader",
    category: "Leadership",
    period: "2024",
    tags: ["Team Lead", "Problem Solving", "Architecture"],
    points: [
      "Participated in 2 university hackathons, collaborating on high-pressure problem-solving challenges.",
      "Led a development team, managing overall coordination and task distribution under strict deadlines.",
      "Developed teamwork, architectural leadership, and robust time management skills.",
    ],
  },
  {
    title: "Quiz Game Project",
    category: "Python Project",
    period: "2024",
    tags: ["Python", "OOP", "Logic Building"],
    points: [
      "Developed a modular, quiz-based software application using core object-oriented programming principles.",
      "Implemented rigorous logic building, state processing, and user interaction features.",
      "Strengthened Python proficiency and systematic, algorithmic problem-solving skills.",
    ],
  },
  {
    title: "Personal Portfolio Website",
    category: "Web Development",
    period: "2025",
    tags: ["React", "TypeScript", "CSS Grid"],
    points: [
      "Engineered a structured responsive personal portfolio website to showcase technical proficiency and software projects.",
      "Continuously optimizing build bundle performance, core web vitals responsiveness, and aesthetic layout design architecture.",
      "Gained a solid foundational knowledge of modular web asset development systems.",
    ],
  },
  {
    title: "Content Creator & Video Editor",
    category: "Digital Media",
    period: "2023 – Present",
    tags: ["DaVinci Resolve", "Filmora", "Analytics"],
    points: [
      "Built, launched, and managed a digital platform focused on narrative sports storytelling, structured writing presentation, and gaming assets.",
      "Edited high-retention short-form and long-form multimedia assets using industry advanced tools like DaVinci Resolve and Filmora.",
      "Gained insights into digital analytics strategy, execution parameters, and cross-platform retention systems.",
    ],
  },
  {
    title: "Sports Leadership Experience",
    category: "Leadership",
    period: "2022",
    tags: ["Captain", "Basketball", "Team Strategy"],
    points: [
      "Appointed School Basketball Team Captain (Class 11) for showcasing consistent strategic leadership.",
      "Commanded the athletic varsity team to a definitive victory in the regional inter-department tournament.",
      "Managed structural execution and group communication metrics under competitive pressure.",
    ],
  },
];

export function Experience() {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <section id="experience" className="py-28 relative">
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#7cf7c8] uppercase">02 / Experience</span>
            <h2
              className="text-white mt-2"
              style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)" }}
            >
              Projects & Experience
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#5a6478] hidden sm:block">
            {EXPERIENCES.length} entries
          </span>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.title} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index }: { exp: (typeof EXPERIENCES)[0]; index: number }) {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col gap-4 p-6 rounded-xl border border-white/7 bg-[#111318] hover:border-[#7cf7c8]/25 hover:bg-[#131620] transition-all duration-300"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(124,247,200,0.04) 0%, transparent 70%)" }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="font-mono text-[9px] tracking-widest text-[#7cf7c8]/60 uppercase">{exp.category}</span>
          <h3 className="text-white mt-1 leading-snug" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.95rem" }}>
            {exp.title}
          </h3>
        </div>
        <span className="font-mono text-[9px] text-[#5a6478] whitespace-nowrap mt-1 shrink-0">{exp.period}</span>
      </div>

      {/* Separator */}
      <div className="h-px bg-white/7" />

      {/* Bullet points */}
      <ul className="flex flex-col gap-2.5">
        {exp.points.map((pt, pi) => (
          <li key={pi} className="flex gap-2.5 text-[#a8b0c0] text-[0.8rem] leading-relaxed">
            <span className="text-[#7cf7c8]/40 shrink-0 mt-0.5">▸</span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
        {exp.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wide text-[#7cf7c8]/60 border border-[#7cf7c8]/15 bg-[#7cf7c8]/5">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
