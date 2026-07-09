import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const bg = "#f0efeb";
const ink = "#111111";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div" as any,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: any;
}) {
  const MotionAs = motion(As);
  return (
    <MotionAs
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
    >
      {children}
    </MotionAs>
  );
}

function Nav() {
  const item =
    "font-display tracking-wider text-[15px] md:text-lg underline underline-offset-[6px] decoration-[1.5px] hover:opacity-60 transition-opacity";
  return (
    <nav className="w-full px-6 md:px-16 pt-8 pb-6">
      <ul className="grid grid-cols-5 items-center text-center">
        <li>
          <a href="#about" className={item}>ABOUT</a>
        </li>
        <li>
          <a href="#skills" className={item}>SKILLS</a>
        </li>
        <li className="flex justify-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-black" />
          <span className="w-2.5 h-2.5 rounded-full bg-black" />
          <span className="w-2.5 h-2.5 rounded-full bg-black" />
        </li>
        <li>
          <a href="#projects" className={item}>PROJECTS</a>
        </li>
        <li>
          <a href="#contact" className={item}>CONTACT</a>
        </li>
      </ul>
    </nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} className="relative px-4 md:px-10 pt-8 md:pt-16 pb-24">
      <motion.div style={{ y, opacity }} className="relative">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-black text-center leading-[0.85] whitespace-nowrap"
          style={{ fontSize: "13vw", letterSpacing: "-0.045em" }}
        >
          PORTFOLIO
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-script text-black text-center whitespace-nowrap"
          style={{ fontSize: "10vw", marginTop: "-6vw" }}
        >
          Maryna Kovalchuk
        </motion.p>
      </motion.div>


      <Reveal delay={1} className="flex justify-center mt-20">
        <span className="font-display text-sm tracking-widest border border-black rounded-full px-6 py-2">
          2026
        </span>
      </Reveal>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-6 md:px-16 py-24">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
        <Reveal>
          <div className="relative aspect-square rounded-full overflow-hidden max-w-md mx-auto shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]">
            <img
              src={portrait}
              alt="Maryna Kovalchuk portrait"
              className="w-full h-full object-cover"
              width={768}
              height={768}
              loading="lazy"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight">ABOUT ME</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-script text-4xl md:text-5xl mt-2 mb-8">Hi there, I'm Maryna!</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg leading-relaxed text-neutral-800 mb-4">
              As a business & economics student, I entered marketing through volunteering and
              personal projects, gaining hands-on experience in social media management and content
              creation.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-base md:text-lg leading-relaxed text-neutral-800 mb-8">
              Highly adaptable and quick to learn, I enjoy working both independently and in teams.
              My goal is to help purpose-driven and creative brands grow through authentic
              storytelling, visual coherence, and clear brand structure.
            </p>
          </Reveal>
          <Reveal delay={0.55}>
            <p className="font-display text-xl mb-2">LET'S CONNECT!</p>
            <p className="text-neutral-800">✉  m.kovilchk@gmail.com</p>
            <p className="text-neutral-800">📞  +43 677 6204 4110</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const certs = [
  { label: "SOCIAL MEDIA CERTIFICATION", by: "HubSpot", tag: "In progress" },
  { label: "CONTENT MARKETING CERTIFICATION", by: "HubSpot" },
  { label: "DIGITAL MARKETING CERTIFICATION", by: "HubSpot" },
];

const tools = ["Canva", "CapCut", "Edits", "Figma", "Adobe Lightroom", "Google Workspace", "Meta Business Suite", "PowerPoint", "Excel"];

function Skills() {
  return (
    <section id="skills" className="px-6 md:px-16 py-24 bg-white/40">
      <Reveal>
        <h2 className="font-display text-5xl md:text-7xl tracking-tight text-center leading-none">
          SKILLS &<br />CERTIFICATES
        </h2>
      </Reveal>

      <div className="max-w-5xl mx-auto mt-20 space-y-6">
        {certs.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.1}>
            <div className="flex items-center justify-between border-b border-black/20 pb-4">
              <div className="font-display tracking-wide text-sm md:text-base">
                {c.label} <span className="font-sans font-normal text-neutral-500">by {c.by}</span>
                {c.tag && (
                  <span className="ml-3 text-xs italic text-neutral-500">{c.tag}</span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-16 grid grid-cols-3 gap-4">
        {tools.map((t, i) => (
          <Reveal key={t} delay={i * 0.05}>
            <div className="bg-white rounded-2xl h-24 flex items-center justify-center text-center px-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-transform">
              <span className="font-display text-sm md:text-base tracking-wide">{t}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
      <path
        d="M10 30 Q10 20 20 20 L70 20 L85 35 L180 35 Q190 35 190 45 L190 140 Q190 150 180 150 L20 150 Q10 150 10 140 Z"
        fill="#ffffff"
        stroke="#111"
        strokeWidth="2"
      />
      <path d="M10 55 L190 55" stroke="#111" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

const projects = [
  { key: "unlimited", name: "UNLIMITED DEMOCRACY" },
  { key: "neformat", name: "NE.FORMAT" },
  { key: "bbe", name: "BBE FINANCE CLUB" },
];

function Projects() {
  return (
    <section id="projects" className="px-6 md:px-16 py-24">
      <Reveal>
        <h2 className="font-display text-5xl md:text-7xl tracking-tight text-center">PROJECTS</h2>
      </Reveal>
      <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-12">
        {projects.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.15}>
            <a href={`#${p.key}`} className="group block text-center">
              <div className="transition-transform duration-500 group-hover:-translate-y-3 group-hover:rotate-[-2deg]">
                <FolderIcon />
              </div>
              <p className="font-display tracking-wide mt-6 text-sm md:text-base">{p.name}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl md:text-6xl">{n}</div>
      <div className="text-xs md:text-sm text-neutral-500 mt-1">{l}</div>
    </div>
  );
}

function CaseStudy({
  id,
  title,
  client,
  industry,
  location,
  platforms,
  goal,
  approach,
  stats,
  color = bg,
}: {
  id: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  platforms: string;
  goal: string;
  approach: string;
  stats: { n: string; l: string }[];
  color?: string;
}) {
  return (
    <section id={id} className="px-6 md:px-16 py-24" style={{ backgroundColor: color }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h3 className="font-display text-4xl md:text-6xl tracking-tight leading-[0.95]">
            {title}
          </h3>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <Reveal>
            <div className="space-y-6 text-sm md:text-base leading-relaxed">
              <div>
                <p className="font-display tracking-wide mb-2">DETAILS:</p>
                <p><span className="font-semibold">Client:</span> {client}</p>
                <p><span className="font-semibold">Industry:</span> {industry}</p>
                <p><span className="font-semibold">Location:</span> {location}</p>
              </div>
              <div>
                <p className="font-display tracking-wide mb-2">PLATFORMS:</p>
                <p>{platforms}</p>
              </div>
              <div>
                <p className="font-display tracking-wide mb-2">GOAL:</p>
                <p className="text-neutral-800">{goal}</p>
              </div>
              <div>
                <p className="font-display tracking-wide mb-2">APPROACH:</p>
                <p className="text-neutral-800">{approach}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-3 gap-3">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotate: i % 2 ? 2 : -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="aspect-[9/16] rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-600 shadow-lg"
                  style={{
                    transform: `rotate(${(i % 3) - 1}deg)`,
                  }}
                />
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-black/15 pt-10">
            {stats.map((s) => (
              <Stat key={s.l} n={s.n} l={s.l} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 md:px-16 py-32 text-center">
      <Reveal>
        <div className="inline-block bg-white rounded-[3rem] px-10 md:px-20 py-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
          <h2
            className="font-display tracking-tight leading-none"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            GET IN TOUCH!
          </h2>
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="w-24 h-28 rounded-md overflow-hidden shadow-lg rotate-[-4deg]">
            <img src={portrait} alt="Maryna" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <p className="text-neutral-800">✉  m.kovilchk@gmail.com</p>
          <p className="text-neutral-800">📞  +43 677 6204 4110</p>
        </div>
      </Reveal>
      <Reveal delay={0.4}>
        <div className="mt-16 inline-block">
          <span className="font-display text-sm tracking-widest border border-black rounded-full px-6 py-2">
            2026
          </span>
        </div>
      </Reveal>
    </section>
  );
}

function Index() {
  return (
    <main
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ backgroundColor: bg, color: ink }}
    >
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CaseStudy
        id="unlimited"
        title={"UNLIMITED\nDEMOCRACY"}
        client="Unlimited Democracy"
        industry="Non-Profit, Civic Engagement"
        location="Vienna, Austria"
        platforms="Instagram, TikTok"
        goal="Increase audience engagement, encourage participation in the organization's events and community life, build a sense of involvement and belonging."
        approach="Warming-up the audience with pre-event campaigns; coverage of events through short reports, interviews, and memes; consistent and active storytelling in Stories."
        stats={[
          { n: "88K+", l: "organic views" },
          { n: "1.7K+", l: "interactions" },
          { n: "150+", l: "event attendees" },
        ]}
      />
      <CaseStudy
        id="neformat"
        title="NE.FORMAT"
        client="ne.format | Book & Literature Club"
        industry="Culture, Literature"
        location="Vienna, Austria"
        platforms="Instagram, WhatsApp"
        goal="Launch a brand from scratch, build an engaged audience organically, create an active community."
        approach="Creating a recognizable dark academia–inspired visual identity; development of a poetic, reflective tone of voice; implementing storytelling-driven content, redirecting from Instagram to a closed WhatsApp community to foster deeper connections."
        stats={[
          { n: "11.7K+", l: "organic views" },
          { n: "280+", l: "interactions" },
          { n: "89", l: "members" },
        ]}
        color="#eae7de"
      />
      <CaseStudy
        id="bbe"
        title="BBE FINANCE CLUB"
        client="BBE Finance Club"
        industry="Education, Finance"
        location="Vienna, Austria"
        platforms="Instagram, LinkedIn"
        goal="Position the club as a professional yet student-driven finance community; communicate clear value to current and prospective club members; highlight club's growth."
        approach="Event-based storytelling; educational and insight-driven content; clear, structured visual communication."
        stats={[
          { n: "5.4K+", l: "impressions" },
          { n: "320+", l: "interactions" },
          { n: "60+", l: "new members" },
        ]}
      />
      <Contact />
      <footer className="text-center py-8 text-xs text-neutral-500">
        © 2026 Maryna Kovalchuk
      </footer>
    </main>
  );
}
