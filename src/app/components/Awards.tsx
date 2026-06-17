import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";

// ─── AWARDS & CERTIFICATIONS DATA ─────────────────────────────────────────────
// To add a new award or certification, add an entry to this array.
const AWARDS = [
  {
    icon: "◆",
    iconColor: "#7cf7c8",
    title: "Hackathon Engineering Verification",
    subtitle: "Certificates of Entry (2 Engineering Challenges)",
    year: "2024",
  },
  {
    icon: "★",
    iconColor: "#ffc864",
    title: "Academic Excellence Distinction",
    subtitle: "3rd Ranking Tier — Class 12 Senior Boards",
    year: "2024",
  },
  {
    icon: "▲",
    iconColor: "#c896ff",
    title: "Inter-Department Champion Captain",
    subtitle: "Varsity Athletic Basketball Championship League",
    year: "2022",
  },
];

export function Awards() {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <section id="awards" className="py-28 relative">
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
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#7cf7c8] uppercase">06 / Recognition</span>
          <h2
            className="text-white mt-2"
            style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)" }}
          >
            Awards & Certifications
          </h2>
        </motion.div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {AWARDS.map((award, i) => (
            <AwardCard key={award.title} award={award} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardCard({ award, index }: { award: (typeof AWARDS)[0]; index: number }) {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col gap-4 p-6 rounded-xl border border-white/7 bg-[#111318] hover:border-white/15 transition-all duration-300"
    >
      {/* Icon */}
      <div className="flex items-center justify-between">
        <span className="text-3xl" style={{ color: award.iconColor }}>
          {award.icon}
        </span>
        <span className="font-mono text-[9px] text-[#5a6478] tracking-widest">{award.year}</span>
      </div>

      <div className="h-px bg-white/7" />

      <div>
        <h3 className="text-white leading-snug" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>
          {award.title}
        </h3>
        <p className="text-[#5a6478] text-xs mt-1.5 leading-relaxed">{award.subtitle}</p>
      </div>
    </motion.div>
  );
}
