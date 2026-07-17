import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import portraitCutout from "@/assets/portrait_riddhi_cutout.png";
import exercoachgym from "@/assets/exercoachgym.png";
import meterReading from "@/assets/meter_reading.png";
import ecommerce from "@/assets/ecommerce.png";
import { getPortfolioData } from "@/lib/portfolio";

export const Route = createFileRoute("/")({
  loader: async () => {
    return await getPortfolioData();
  },
  component: Index,
});

const IMAGES: Record<string, string> = {
  portrait,
  portraitCutout,
  exercoachgym,
  meterReading,
  ecommerce,
};

function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
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
  const [isOpen, setIsOpen] = useState(false);
  const item =
    "font-display tracking-widest text-[15px] md:text-[17px] text-black hover:text-neutral-500 transition-colors py-1 block underline underline-offset-[10px] decoration-[2.5px] font-black";
  const mobileItem =
    "font-display tracking-widest text-lg text-black hover:text-neutral-500 py-3 block border-b border-black/5 text-center underline underline-offset-4 decoration-2";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-black/5 px-6 md:px-16 py-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between md:block">
        {/* Mobile Header Brand */}
        <div className="flex md:hidden items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
          <span className="font-display tracking-widest text-xs text-black uppercase font-bold">Riddhi M.</span>
        </div>

        {/* Desktop navigation */}
        <ul className="hidden md:grid md:grid-cols-5 items-center justify-center text-center gap-x-12 max-w-4xl mx-auto">
          <li>
            <a href="#about" className={item}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="#skills" className={item}>
              SKILLS
            </a>
          </li>
          <li className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black" />
              <span className="w-2.5 h-2.5 rounded-full bg-black" />
              <span className="w-2.5 h-2.5 rounded-full bg-black" />
            </div>
          </li>
          <li>
            <a href="#projects" className={item}>
              PROJECTS
            </a>
          </li>
          <li>
            <a href="#contact" className={item}>
              CONTACT
            </a>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden items-center justify-center p-2 text-black hover:text-neutral-500 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden mt-2 bg-white/95 rounded-b-xl"
          >
            <nav className="flex flex-col py-2">
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className={mobileItem}
              >
                ABOUT
              </a>
              <a
                href="#skills"
                onClick={() => setIsOpen(false)}
                className={mobileItem}
              >
                SKILLS
              </a>
              <a
                href="#projects"
                onClick={() => setIsOpen(false)}
                className={mobileItem}
              >
                PROJECTS
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className={mobileItem}
              >
                CONTACT
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const data = Route.useLoaderData();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section ref={ref} className="relative px-4 md:px-8 pt-12 md:pt-20 pb-24">
      <motion.div style={{ y, opacity }} className="relative w-full flex flex-col items-center">
        <div className="relative w-full">
          <motion.svg
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            viewBox="0 0 1000 220"
            className="w-full h-auto block"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="500"
              y="185"
              textAnchor="middle"
              textLength="980"
              lengthAdjust="spacingAndGlyphs"
              style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "220px" }}
              fill="#111"
            >
              PORTFOLIO
            </text>
          </motion.svg>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 bottom-[-2.5vw] font-script text-black text-center whitespace-nowrap leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(2.5rem, 9.5vw, 7.5rem)" }}
          >
            {data.hero.name || "Riddhi Mhatre"}
          </motion.p>
        </div>
      </motion.div>

      <Reveal delay={1} className="flex justify-center mt-24">
        <span className="font-display text-sm tracking-widest border border-black rounded-full px-6 py-2">
          {data.hero.year || "2026"}
        </span>
      </Reveal>
    </section>
  );
}

function About() {
  const data = Route.useLoaderData();
  const about = data.about;
  const contact = about.contact;

  return (
    <section id="about" className="px-6 md:px-16 py-24 bg-inherit">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-6xl mx-auto">
        <div className="w-full relative">
          <div className="relative aspect-square max-w-md mx-auto flex items-end justify-center overflow-visible">
            {/* Soft White Circle Backdrop - solid white as in the screenshot */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[88%] h-[88%] rounded-full bg-white shadow-sm" />
            {/* Transparent Cutout Portrait with Slide-in from Left Animation */}
            <motion.img
              initial={{ x: -150, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
              src={IMAGES[about.portraitCutout] || about.portraitCutout || portraitCutout}
              alt="Riddhi Mhatre portrait"
              className="relative z-10 w-[95%] h-auto object-cover select-none pointer-events-none origin-bottom"
              width={768}
              height={768}
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center h-full">
          <Reveal>
            <h2 className="font-display text-5xl md:text-6xl tracking-tight text-neutral-900 leading-none">
              {about.title || "ABOUT ME"}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-script text-4xl md:text-5xl mt-2 mb-6 text-neutral-800">
              {about.subtitle || "Hi there, I'm Riddhi!"}
            </p>
          </Reveal>
          
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-neutral-700 font-sans">
            {(about.bioParagraphs || []).map((p: string, idx: number) => (
              <Reveal key={idx} delay={0.3 + idx * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5} className="mt-8 pt-6 border-t border-black/5">
            <div className="grid md:grid-cols-2 gap-6 items-end">
              <div className="space-y-3">
                <p className="font-display text-lg tracking-wider text-black uppercase font-bold">
                  LET'S CONNECT!
                </p>
                
                {contact.email && (
                  <div className="flex items-center gap-3 text-neutral-800 transition-colors">
                    <MailIcon className="w-5 h-5 flex-shrink-0" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-base md:text-lg font-medium hover:text-neutral-500 transition-colors break-all sm:break-normal"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
                
                {contact.phone && (
                  <div className="flex items-center gap-3 text-neutral-800 transition-colors">
                    <PhoneIcon className="w-5 h-5 flex-shrink-0" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-base md:text-lg font-medium hover:text-neutral-500 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-start md:justify-end gap-3.5 pt-4 md:pt-0">
                {contact.tiktok && (
                  <a
                    href={contact.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <TikTokIcon />
                  </a>
                )}
                {contact.instagram && (
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {contact.linkedin && (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <LinkedInIcon />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CodeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-white"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-white"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-white"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-white"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ErpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-white"
    >
      <circle cx="12" cy="7" r="3" />
      <circle cx="7" cy="16" r="3" />
      <circle cx="17" cy="16" r="3" />
      <line x1="12" y1="10" x2="8.5" y2="13.5" />
      <line x1="12" y1="10" x2="15.5" y2="13.5" />
      <line x1="10" y1="16" x2="14" y2="16" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
      <path d="M12 15a3 3 0 1 0-3-3v1a2 2 0 0 0 4 0v-1a4 4 0 1 0-7 2.5" strokeWidth="1.5" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 2a9 9 0 0 1 8 8" strokeWidth="1.5" />
      <path d="M14.05 5.5a5.5 5.5 0 0 1 4.5 4.5" strokeWidth="1.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 text-black transition-transform hover:scale-110 duration-200"
      fill="currentColor"
    >
      <rect width="24" height="24" rx="6" fill="black" />
      <path
        d="M16.5 9h-1.5v4.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5c.17 0 .33.03.48.08v-1.63c-.15-.03-.31-.05-.48-.05-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5V11c.7.47 1.53.75 2.43.78v-1.78c-.78-.05-1.48-.48-1.93-1.1v-.9z"
        fill="white"
        transform="scale(0.85) translate(1.8, 1.8)"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 text-black transition-transform hover:scale-110 duration-200"
      fill="currentColor"
    >
      <rect width="24" height="24" rx="6" fill="black" />
      <g transform="scale(0.8) translate(3, 3)" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </g>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 text-black transition-transform hover:scale-110 duration-200"
      fill="currentColor"
    >
      <rect width="24" height="24" rx="6" fill="black" />
      <path
        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
        fill="white"
        transform="scale(0.8) translate(3, 3)"
      />
    </svg>
  );
}

function Skills() {
  const data = Route.useLoaderData();
  const skillsList = data.skills || [];

  const ICONS: Record<string, React.ReactNode> = {
    CodeIcon: <CodeIcon />,
    ServerIcon: <ServerIcon />,
    DatabaseIcon: <DatabaseIcon />,
    WrenchIcon: <WrenchIcon />,
    ErpIcon: <ErpIcon />,
  };

  return (
    <section id="skills" className="px-6 md:px-16 py-24 md:py-32 bg-inherit">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-8">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.1] text-neutral-900">
                {data.skillsTitle || "A toolkit for building reliable software."}
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4">
            <Reveal delay={0.15}>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
                {data.skillsSubtitle || "Foundation in web technology, SQL databases, Java programming, and manual testing methodologies."}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          {skillsList.map((group: any, i: number) => (
            <Reveal key={group.title} delay={i * 0.1} className={group.span}>
              <motion.div
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-black/5 flex flex-col justify-between h-full hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center shadow-md">
                      {ICONS[group.icon] || <CodeIcon />}
                    </div>
                    <span className="font-sans text-neutral-400 text-sm font-semibold tracking-wider">
                      {group.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-semibold mt-8 mb-6 text-neutral-900">
                    {group.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(group.skills || []).map((skill: string) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 450, damping: 15 }}
                      className="bg-neutral-50 hover:bg-neutral-100 hover:text-black cursor-default transition-colors text-neutral-800 rounded-full px-4 py-2 text-sm border border-neutral-200/60 font-sans font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FolderIcon() {
  return (
    <svg
      viewBox="0 0 220 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {/* Back Flap */}
      <path
        d="M20 20 h50 q10 0 15 15 h115 q10 0 10 10 v95 q0 10 -10 10 h-180 q-10 0 -10 -10 v-110 q0 -10 10 -10 z"
        fill="#dcdcdc"
      />
      {/* Front Flap */}
      <path
        d="M20 45 h180 q10 0 10 10 v85 q0 10 -10 10 h-180 q-10 0 -10 -10 v-85 q0 -10 10 -10 z"
        fill="#eeeeee"
      />
    </svg>
  );
}

function Projects() {
  const data = Route.useLoaderData();
  const projectsList = data.projects || [];

  return (
    <section id="projects" className="px-6 md:px-16 py-24 bg-white">
      <Reveal>
        <h2 className="font-display text-5xl md:text-7xl tracking-tight text-center text-black font-extrabold">
          {data.projectsTitle || "PROJECTS"}
        </h2>
      </Reveal>
      <div className="max-w-6xl mx-auto mt-20 relative">
        {/* Floating cursor click indicator */}
        <div className="absolute -top-20 right-[5%] sm:right-[10%] md:right-[5%] lg:right-[8%] hidden sm:flex flex-col items-center select-none pointer-events-none animate-bounce">
          <svg
            viewBox="0 0 24 24"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="w-7 h-7 transform -rotate-[20deg]"
          >
            <path d="M5.5 3v14.5l4-4 5 5 1.5-1.5-5-5 5.5-1z" />
          </svg>
          <span className="text-[10px] font-bold text-black tracking-tight mt-1 text-center leading-tight">
            Klick on the<br />folder
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 md:gap-12 justify-center">
          {projectsList.map((p: any, i: number) => (
            <Reveal key={p.key} delay={i * 0.15}>
              <a href={`#${p.key}`} className="group block text-center">
                <motion.div
                  whileHover={{ y: -15, rotate: -3, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className="max-w-[220px] mx-auto"
                >
                  <FolderIcon />
                </motion.div>
                <p className="font-sans font-black tracking-tighter mt-5 text-base md:text-lg text-black transition-colors duration-300 group-hover:text-neutral-600">
                  {p.name}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
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
  color,
  image,
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
  image?: string;
}) {
  return (
    <section id={id} className="px-6 md:px-16 py-24" style={{ backgroundColor: color || "#f0efeb" }}>
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
                <p>
                  <span className="font-semibold">Client:</span> {client}
                </p>
                <p>
                  <span className="font-semibold">Industry:</span> {industry}
                </p>
                <p>
                  <span className="font-semibold">Location:</span> {location}
                </p>
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
            {image ? (
              <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-black/10">
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
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
            )}
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-black/15 pt-10">
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
  const data = Route.useLoaderData();
  const about = data.about;
  const contact = about.contact;

  return (
    <section id="contact" className="px-4 sm:px-6 md:px-16 py-24 md:py-32 text-center bg-[#f0efeb]">
      <Reveal>
        <div className="inline-block bg-white rounded-[2rem] sm:rounded-[3rem] px-6 sm:px-12 md:px-20 py-6 md:py-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] max-w-full">
          <h2
            className="font-display tracking-tight leading-none break-words"
            style={{ fontSize: "clamp(2rem, 8vw, 6.5rem)" }}
          >
            GET IN TOUCH!
          </h2>
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="w-24 h-28 rounded-md overflow-hidden shadow-lg rotate-[-4deg]">
            <img
              src={IMAGES[about.portrait] || about.portrait || portrait}
              alt="Riddhi"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {contact.email && <p className="text-neutral-800">✉ {contact.email}</p>}
          {contact.phone && <p className="text-neutral-800">📞 {contact.phone}</p>}
          {contact.linkedin && (
            <p className="text-neutral-800">
              🔗{" "}
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-75"
              >
                {contact.linkedin.replace("https://www.", "").replace("https://", "")}
              </a>
            </p>
          )}
        </div>
      </Reveal>
      <Reveal delay={0.4}>
        <div className="mt-16 inline-block">
          <span className="font-display text-sm tracking-widest border border-black rounded-full px-6 py-2">
            {data.hero.year || "2026"}
          </span>
        </div>
      </Reveal>
    </section>
  );
}

function ExperienceAndEducation() {
  const data = Route.useLoaderData();
  const experiences = data.experience || [];
  const education = data.education || [];

  return (
    <section id="experience" className="px-6 md:px-16 py-24 bg-white/40">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-serif text-5xl md:text-7xl tracking-tight text-center mb-20">
            {data.experienceTitle || "EXPERIENCE & EDUCATION"}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Experience Column */}
          <div>
            <Reveal>
              <h3 className="font-display tracking-widest text-lg border-b border-black pb-3 mb-8">
                {data.experienceSub || "EXPERIENCE & COURSES"}
              </h3>
            </Reveal>

            <div className="space-y-12">
              {experiences.map((exp: any, i: number) => (
                <Reveal key={i} delay={0.1 * (i + 1)}>
                  <div className={`relative pl-6 border-l-2 ${i === experiences.length - 1 ? 'border-l-transparent' : 'border-black/20'}`}>
                    <div className={`absolute w-3 h-3 rounded-full ${i === experiences.length - 1 ? 'bg-neutral-400 -left-[5px]' : 'bg-black -left-[7px]'} top-1.5`} />
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${exp.type.toLowerCase() === 'internship' ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-800'}`}>
                      {exp.type}
                    </span>
                    <h4 className="font-serif text-2xl font-bold mt-3">{exp.title}</h4>
                    <p className="text-neutral-500 font-medium text-sm mt-1">
                      {exp.company} {exp.period ? `| ${exp.period}` : ""}
                    </p>
                    {exp.description && (
                      <p className="text-neutral-700 text-sm mt-3 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <Reveal>
              <h3 className="font-display tracking-widest text-lg border-b border-black pb-3 mb-8">
                {data.educationSub || "EDUCATION"}
              </h3>
            </Reveal>

            <div className="space-y-12">
              {education.map((edu: any, i: number) => (
                <Reveal key={i} delay={0.1 * (i + 1)}>
                  <div className={`relative pl-6 border-l-2 ${i === education.length - 1 ? 'border-l-transparent' : 'border-black/20'}`}>
                    <div className={`absolute w-3 h-3 rounded-full ${i === education.length - 1 ? 'bg-neutral-400 -left-[5px]' : 'bg-black -left-[7px]'} top-1.5`} />
                    <h4 className="font-serif text-2xl font-bold">{edu.title}</h4>
                    <p className="text-neutral-500 font-medium text-sm mt-1">
                      {edu.school} {edu.period ? `| ${edu.period}` : ""}
                    </p>
                    {edu.description && (
                      <p className="text-neutral-700 text-sm mt-2 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const data = Route.useLoaderData();
  const caseStudies = data.caseStudies || [];

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans overflow-x-hidden">
      <Nav />
      <main className="bg-[#f0efeb] rounded-t-[2.5rem] md:rounded-t-[3.5rem] overflow-hidden animate-fade-in">
        <Hero />
        <About />
        <Skills />
        <ExperienceAndEducation />
        <Projects />
        {caseStudies.map((cs: any) => (
          <CaseStudy
            key={cs.id}
            id={cs.id}
            title={cs.title}
            client={cs.client}
            industry={cs.industry}
            location={cs.location}
            platforms={cs.platforms}
            goal={cs.goal}
            approach={cs.approach}
            stats={cs.stats}
            color={cs.color}
            image={IMAGES[cs.image] || cs.image}
          />
        ))}
        <Contact />
        <footer className="text-center py-8 text-xs text-neutral-500 bg-[#f0efeb]">
          © {data.hero.year || "2026"} {data.hero.name || "Riddhi Mhatre"}
        </footer>
      </main>
    </div>
  );
}
