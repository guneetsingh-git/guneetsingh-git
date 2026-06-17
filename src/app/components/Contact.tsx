import { motion } from "motion/react";
import { useScrollReveal } from "./useScrollReveal";
import { Mail, Github, Linkedin } from "lucide-react";

// ─── CONTACT DATA ─────────────────────────────────────────────────────────────
// Update email, LinkedIn URL, and GitHub URL here.
const CONTACT = {
  email: "guneet0206@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/guneet-singh-85bba7365",
  githubUrl: "https://github.com/guneetsingh-git",
  linkedinHandle: "guneet-singh-85bba7365",
  githubHandle: "guneetsingh-git",
};

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: CONTACT.linkedinHandle,
    href: CONTACT.linkedinUrl,
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: CONTACT.githubHandle,
    href: CONTACT.githubUrl,
    external: true,
  },
];

export function Contact() {
  const { ref, inView } = useScrollReveal(0.1);

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 w-[500px] h-[300px]"
        style={{
          background: "radial-gradient(ellipse, rgba(124,247,200,0.05) 0%, transparent 70%)",
          transform: "translateX(-50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#7cf7c8] uppercase">07 / Contact</span>
          <h2
            className="text-white mt-4"
            style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.5rem)" }}
          >
            Let's build something together.
          </h2>
          <p className="text-[#5a6478] mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Available for software engineering and web development internships.
            Responses are processed within standard 12-hour operational windows.
          </p>
        </motion.div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {CONTACT_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="group flex flex-col gap-3 p-5 rounded-xl border border-white/7 bg-[#111318] hover:border-[#7cf7c8]/30 hover:bg-[#131620] transition-all duration-300 text-left"
              >
                <div className="flex items-center justify-between">
                  <Icon size={16} className="text-[#7cf7c8] group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-mono text-[9px] text-[#5a6478] tracking-widest uppercase">{item.label}</span>
                </div>
                <span className="text-[#a8b0c0] text-xs font-mono group-hover:text-white transition-colors duration-200 truncate">
                  {item.value}
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20 pt-8 border-t border-white/7 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <span className="font-mono text-[10px] text-[#5a6478] tracking-widest">
            © 2026 Guneet Singh. All rights reserved.
          </span>
          <span className="font-mono text-[10px] text-[#5a6478] tracking-widest text-center">
            Architecture: React · TypeScript · CSS Grid Matrix
          </span>
        </motion.div>
      </div>
    </section>
  );
}
