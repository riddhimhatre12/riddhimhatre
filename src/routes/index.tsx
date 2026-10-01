import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import portraitCutout from "@/assets/portrait_clean.jpg";
import contactPortrait from "@/assets/contact_portrait.jpg";
import awardBadge from "@/assets/award_badge.png";
import meterReading from "@/assets/meter_reading.png";
import ecommerce from "@/assets/ecommerce.png";
import dashboard from "@/assets/dashboard.png";
import totebagCampaign from "@/assets/totebag_campaign.png";
import unlimitedPhone from "@/assets/unlimited_phone.png";
import unlimitedScreenFlat from "@/assets/unlimited_screen_flat.png";
import retailWarehouseSales from "@/assets/retail_warehouse_sales.png";
import healthcareAnalytics from "@/assets/healthcare_analytics.png";
import consumerShoppingTrends from "@/assets/consumer_shopping_trends.png";
import biztechCertificate from "@/assets/biztech_certificate.png";
import exercoachgym from "@/assets/exercoachgym.png";
import exercoachMobileScreen1 from "@/assets/exercoach_mobile_screen1.png";
import exercoachMobileScreen2 from "@/assets/exercoach_mobile_screen2.png";
import exercoachMobileScreen3 from "@/assets/exercoach_mobile_screen3.png";
import exercoachAdminDashboard from "@/assets/exercoach_admin_dashboard.png";
import exercoachAdminMenu from "@/assets/exercoach_admin_menu.png";
import exercoachAdminLeads from "@/assets/exercoach_admin_leads.png";
import exercoachAdminGallery from "@/assets/exercoach_admin_gallery.png";
import {
  getPortfolioData,
  ProjectItem,
  CaseStudyItem,
  ExperienceItem,
  EducationItem,
} from "@/lib/portfolio";

export const Route = createFileRoute("/")({
  loader: async () => {
    return await getPortfolioData();
  },
  component: Index,
});

const IMAGES: Record<string, string> = {
  portrait,
  portraitCutout,
  contactPortrait,
  meterReading,
  ecommerce,
  dashboard,
  retailWarehouseSales,
  healthcareAnalytics,
  consumerShoppingTrends,
  exercoachgym,
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
      viewport={{ once: false, amount: 0.1 }}
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 px-6 md:px-16 py-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between md:block">
        {/* Mobile Header Brand */}
        <div className="flex md:hidden items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
          <span className="font-display tracking-widest text-xs text-black uppercase font-bold">
            Riddhi M.
          </span>
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
              <a href="#about" onClick={() => setIsOpen(false)} className={mobileItem}>
                ABOUT
              </a>
              <a href="#skills" onClick={() => setIsOpen(false)} className={mobileItem}>
                SKILLS
              </a>
              <a href="#projects" onClick={() => setIsOpen(false)} className={mobileItem}>
                PROJECTS
              </a>
              <a href="#contact" onClick={() => setIsOpen(false)} className={mobileItem}>
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
    <section
      ref={ref}
      className="relative px-4 md:px-8 pt-12 md:pt-20 pb-16 bg-gradient-to-b from-[#f7f6f2] via-[#faf9f6] to-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden"
    >
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

      <Reveal delay={1} className="flex justify-center mt-20 mb-8">
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
    <section
      id="about"
      className="px-6 md:px-16 py-6 lg:py-8 min-h-screen lg:h-screen flex flex-col justify-center scroll-mt-0 bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto w-full">
        <div className="w-full relative pt-2 md:pt-4">
          <div className="relative aspect-square max-w-lg md:max-w-xl lg:max-w-2xl mx-auto flex items-end justify-center md:-ml-8 lg:-ml-12">
            {/* Lighter Soft Dome Arch Backdrop Shape */}
            <div className="absolute top-[20%] bottom-0 -left-16 sm:-left-24 lg:-left-32 right-0 bg-[#efeee9] rounded-t-[250px] sm:rounded-t-[350px] rounded-b-none z-0 pointer-events-none" />

            {/* Transparent Cutout Portrait with Slide-in from Left Animation */}
            <motion.img
              initial={{ x: -150, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
              src={IMAGES[about.portraitCutout] || about.portraitCutout || portraitCutout}
              alt="Riddhi Mhatre portrait"
              className="relative z-10 max-h-[118%] max-w-[118%] w-auto object-contain select-none pointer-events-none origin-bottom object-bottom mix-blend-darken"
              width={768}
              height={768}
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center h-full">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-neutral-900 leading-none">
              {about.title || "ABOUT ME"}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-script text-3xl md:text-4xl lg:text-5xl mt-1 mb-3 text-neutral-800">
              {about.subtitle || "Hi there, I'm Riddhi!"}
            </p>
          </Reveal>

          <div className="space-y-2.5 text-xs sm:text-sm md:text-base leading-relaxed text-neutral-700 font-sans">
            {(about.bioParagraphs || []).map((p: string, idx: number) => (
              <Reveal key={idx} delay={0.3 + idx * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5} className="mt-4 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
              <div className="space-y-1.5">
                <p className="font-display text-base sm:text-lg lg:text-xl tracking-tighter text-black uppercase font-bold">
                  LET'S CONNECT!
                </p>

                {contact.email && (
                  <div className="flex items-center gap-2.5 text-neutral-800 transition-colors">
                    <MailIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-xs sm:text-sm md:text-base font-medium hover:text-neutral-500 transition-colors break-all sm:break-normal"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}

                {contact.phone && (
                  <div className="flex items-center gap-2.5 text-neutral-800 transition-colors">
                    <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-xs sm:text-sm md:text-base font-medium hover:text-neutral-500 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-start sm:justify-end gap-3 pt-1 sm:pt-0">
                {contact.github && (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <GithubIcon />
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

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 text-black transition-transform hover:scale-110 duration-200"
      fill="currentColor"
    >
      <rect width="24" height="24" rx="6" fill="black" />
      <path
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        fill="white"
        transform="scale(0.75) translate(4, 4)"
      />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.65a6.34 6.34 0 0 0-5.11 6.22 6.34 6.34 0 0 0 10.85 4.48 6.33 6.33 0 0 0 1.86-4.48V8.88a8.18 8.18 0 0 0 4.71 1.49V6.9a4.85 4.85 0 0 1-2.2-.21z" />
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
      <g
        transform="scale(0.8) translate(3, 3)"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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

function AwardIcon() {
  return (
    <div className="w-9 h-9 overflow-hidden relative flex-shrink-0">
      <img
        src={awardBadge}
        alt="Award"
        className="absolute top-0 left-[50%] -translate-x-1/2 w-[115%] h-[320%] max-w-none object-cover object-top mix-blend-darken"
      />
    </div>
  );
}
function CertificateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] bg-white rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simple Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-neutral-100 flex-shrink-0">
          <h3 className="font-sans font-extrabold text-base sm:text-lg text-neutral-900 leading-tight">
            Certificate of Internship — BizTech IT Solutions
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold transition-colors flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Clean Light Background for Certificate - Full Uncropped View */}
        <div className="p-3 sm:p-6 bg-[#f4f4f4] overflow-y-auto flex-1 flex flex-col items-center justify-start">
          <img
            src={biztechCertificate}
            alt="BizTech IT Solutions Data Analytics Internship Certificate - Riddhi Mhatre"
            className="w-full h-auto max-w-4xl rounded-lg shadow-md border border-neutral-200 object-top"
          />
        </div>

        {/* Simple Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 bg-white border-t border-neutral-100 flex-shrink-0">
          <a
            href="/biztech_certificate.png"
            download="Riddhi_Mhatre_Data_Analytics_Certificate_BizTech.png"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-neutral-900 text-white font-sans text-xs font-semibold rounded-lg hover:bg-black transition-colors"
          >
            Download PNG
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-100 text-neutral-700 font-sans text-xs font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Skills() {
  const data = Route.useLoaderData();
  const [showCertModal, setShowCertModal] = useState(false);

  const certs = [
    {
      title: "Data Analytics Internship",
      provider: "BizTech IT Solutions",
      status: "Completed",
      hasCertificate: true,
      certId: "#PC-F16833",
    },
    {
      title: "BSc in Information Technology",
      provider: "Mumbai University",
      status: "Graduated",
    },
    {
      title: "Manual Testing Certification",
      provider: "QSpiders",
      status: "Completed",
    },
  ];

  const tools = [
    {
      name: "CSS3",
      icon: (
        <svg viewBox="0 0 128 128" className="w-9 h-9 flex-shrink-0">
          <path
            fill="#1572B6"
            d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"
          />
          <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z" />
          <path
            fill="#fff"
            d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"
          />
          <path
            fill="#EBEBEB"
            d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"
          />
          <path
            fill="#fff"
            d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"
          />
          <path
            fill="#EBEBEB"
            d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"
          />
        </svg>
      ),
    },
    {
      name: "HTML5",
      icon: (
        <svg viewBox="0 0 128 128" className="w-9 h-9 flex-shrink-0">
          <path
            fill="#E44D26"
            d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"
          />
          <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z" />
          <path
            fill="#EBEBEB"
            d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"
          />
          <path
            fill="#fff"
            d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"
          />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      icon: (
        <svg viewBox="0 0 128 128" className="w-9 h-9 flex-shrink-0">
          <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
          <path
            fill="#323330"
            d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
          />
        </svg>
      ),
    },
    {
      name: "Java",
      icon: (
        <svg viewBox="0 0 128 128" className="w-9 h-9 flex-shrink-0">
          <path
            fill="#0074BD"
            d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"
          />
          <path
            fill="#EA2D2E"
            d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"
          />
          <path
            fill="#0074BD"
            d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"
          />
          <path
            fill="#EA2D2E"
            d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"
          />
          <path
            fill="#0074BD"
            d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"
          />
        </svg>
      ),
    },
    {
      name: "SQL DB",
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9 flex-shrink-0" fill="currentColor">
          <path
            d="M12 0C5.373 0 0 1.79 0 4v3.5c0 2.21 5.373 4 12 4s12-1.79 12-4V4c0-2.21-5.373-4-12-4zm0 13.5c-6.627 0-12-1.79-12-4V13c0 2.21 5.373 4 12 4s12-1.79 12-4v-3.5c0 2.21-5.373 4-12 4zm0 6.5c-6.627 0-12-1.79-12-4V20c0 2.21 5.373 4 12 4s12-1.79 12-4v-3.5c0 2.21-5.373 4-12 4z"
            fill="#4479A1"
          />
        </svg>
      ),
    },
    {
      name: "Bootstrap",
      icon: (
        <svg viewBox="0 0 16 16" className="w-9 h-9 flex-shrink-0">
          <path
            fill="#7952B3"
            d="M2.5 14.14V1.86A.86.86 0 0 1 3.36 1h9.28a.86.86 0 0 1 .86.86v12.28a.86.86 0 0 1-.86.86H3.36a.86.86 0 0 1-.86-.86z"
          />
          <path
            fill="#FFF"
            d="M4.96 11.2h3.36c1.65 0 2.65-.92 2.65-2.27 0-1.12-.73-1.84-1.74-2.02v-.07c.8-.18 1.4-.92 1.4-1.92 0-1.25-.96-2.11-2.48-2.11H4.96v8.39zm2.59-5.85h1.22c.86 0 1.25.43 1.25 1.11 0 .73-.41 1.12-1.2 1.12h-1.27v-2.23zm.1 4.93v-2.17h1.34c.95 0 1.39.46 1.39 1.16 0 .75-.46 1.15-1.32 1.15H7.65z"
          />
        </svg>
      ),
    },
    {
      name: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9 flex-shrink-0" fill="currentColor">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="#181717"
          />
        </svg>
      ),
    },
    {
      name: "MS Excel",
      icon: (
        <svg viewBox="0 0 32 32" className="w-9 h-9 flex-shrink-0">
          <defs>
            <linearGradient
              id="SVGSuUii0pt"
              x1="4.494"
              x2="13.832"
              y1="-2092.086"
              y2="-2075.914"
              gradientTransform="translate(0 2100)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#18884f" />
              <stop offset=".5" stopColor="#117e43" />
              <stop offset="1" stopColor="#0b6631" />
            </linearGradient>
          </defs>
          <path
            fill="#185c37"
            d="M19.581 15.35L8.512 13.4v14.409A1.19 1.19 0 0 0 9.705 29h19.1A1.19 1.19 0 0 0 30 27.809V22.5Z"
          />
          <path
            fill="#21a366"
            d="M19.581 3H9.705a1.19 1.19 0 0 0-1.193 1.191V9.5L19.581 16l5.861 1.95L30 16V9.5Z"
          />
          <path fill="#107c41" d="M8.512 9.5h11.069V16H8.512Z" />
          <path
            d="M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 0 0 1.194-1.191V9.391A1.2 1.2 0 0 0 16.434 8.2"
            opacity=".1"
          />
          <path
            d="M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
            opacity=".2"
          />
          <path
            d="M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
            opacity=".2"
          />
          <path
            d="M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191"
            opacity=".2"
          />
          <path
            fill="url(#SVGSuUii0pt)"
            d="M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.19 1.19 0 0 1 2 21.959V10.041A1.19 1.19 0 0 1 3.194 8.85"
          />
          <path
            fill="#fff"
            d="m5.7 19.873l2.511-3.884l-2.3-3.862h1.847L9.013 14.6c.116.234.2.408.238.524h.017q.123-.281.26-.546l1.342-2.447h1.7l-2.359 3.84l2.419 3.905h-1.809l-1.45-2.711A2.4 2.4 0 0 1 9.2 16.8h-.024a1.7 1.7 0 0 1-.168.351l-1.493 2.722Z"
          />
          <path fill="#33c481" d="M28.806 3h-9.225v6.5H30V4.191A1.19 1.19 0 0 0 28.806 3" />
          <path fill="#107c41" d="M19.581 16H30v6.5H19.581Z" />
        </svg>
      ),
    },
    {
      name: "Power BI",
      icon: (
        <svg viewBox="0 0 24 24" className="w-9 h-9 flex-shrink-0">
          <path d="M4 14h4v10H4z" fill="#E6AD10" />
          <path d="M10 7h4v17h-4z" fill="#F2C811" />
          <path d="M16 0h4v24h-4z" fill="#F9E589" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="skills"
      className="px-6 md:px-16 py-6 lg:py-10 min-h-screen lg:h-screen flex flex-col justify-center scroll-mt-0 bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden"
    >
      <CertificateModal isOpen={showCertModal} onClose={() => setShowCertModal(false)} />
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-center">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-8 lg:mb-12 text-black font-extrabold leading-none">
            SKILLS &<br />
            CERTIFICATES
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Certifications */}
          <div className="md:col-span-5 space-y-6 md:space-y-8 flex flex-col justify-center">
            {certs.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 0.1}>
                <div
                  className={`flex gap-4 sm:gap-5 items-center ${"hasCertificate" in cert ? "cursor-pointer group" : ""}`}
                  onClick={() => "hasCertificate" in cert && setShowCertModal(true)}
                >
                  <AwardIcon />
                  <h4 className="font-sans flex flex-col gap-0.5">
                    <span className="font-black uppercase text-black tracking-tight text-lg sm:text-xl lg:text-2xl leading-tight">
                      {cert.title}
                    </span>
                    <span className="font-medium text-neutral-600 text-sm sm:text-base flex items-center gap-2 flex-wrap">
                      <span>by {cert.provider}</span>
                      {"hasCertificate" in cert && (
                        <span className="text-xs font-normal normal-case text-neutral-500 underline underline-offset-4 group-hover:text-black transition-colors whitespace-nowrap">
                          (View Certificate)
                        </span>
                      )}
                    </span>
                  </h4>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right Column: Tools Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mt-6 md:mt-0">
            {tools.map((tool, i) => (
              <Reveal key={tool.name} delay={i * 0.05}>
                <div className="bg-[#f4f5f5] hover:bg-[#ebebeb] hover:scale-[1.04] transition-all py-4 px-3.5 sm:py-5 sm:px-4 rounded-2xl flex items-center justify-center gap-3 cursor-default select-none shadow-sm min-h-[68px] sm:min-h-[76px]">
                  {tool.icon}
                  <span className="font-sans font-extrabold text-sm sm:text-base md:text-lg text-neutral-900 leading-none tracking-tight">
                    {tool.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FolderIcon() {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-sm"
    >
      {/* Back Flap */}
      <path
        d="M 0 40 Q 0 20 20 20 H 70 Q 80 20 85 25 L 100 40 Q 105 45 115 45 H 220 Q 240 45 240 65 V 160 Q 240 180 220 180 H 20 Q 0 180 0 160 Z"
        fill="#dcdcdc"
      />
      {/* Front Flap */}
      <path
        d="M 0 75 Q 0 55 20 55 H 220 Q 240 55 240 75 V 160 Q 240 180 220 180 H 20 Q 0 180 0 160 Z"
        fill="#f2f2f2"
      />
    </svg>
  );
}

function Projects() {
  const data = Route.useLoaderData();
  const projectsList = data.projects || [];

  return (
    <section
      id="projects"
      className="px-6 md:px-16 py-16 md:py-24 min-h-screen flex flex-col justify-center bg-white scroll-mt-6 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden"
    >
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
            Klick on the
            <br />
            folder
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6 md:gap-12 justify-center">
          {projectsList.map((p: ProjectItem, i: number) => (
            <Reveal key={p.key} delay={i * 0.15}>
              <a href={`#${p.key}`} className="group block text-center">
                <motion.div
                  whileHover={{ y: -15, rotate: -3, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className="max-w-[280px] mx-auto"
                >
                  <FolderIcon />
                </motion.div>
                <p className="font-sans font-black tracking-tighter mt-5 text-base md:text-lg text-black transition-colors duration-300 group-hover:text-neutral-600 uppercase">
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
    <section
      id={id}
      className="px-6 md:px-12 py-10 lg:py-16 min-h-screen flex flex-col justify-center scroll-mt-6"
      style={{ backgroundColor: color || "#f0efeb" }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <Reveal className="text-center mb-6 lg:mb-8">
          <h3 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black uppercase leading-none">
            {title}
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: DETAILS & GOAL */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
            <Reveal delay={0.1}>
              <div className="bg-white p-5 lg:p-6 rounded-[2rem] shadow-sm border border-black/5">
                <h4 className="font-display font-black text-base lg:text-lg tracking-wider text-black uppercase mb-2">
                  DETAILS:
                </h4>
                <div className="space-y-1 text-xs sm:text-sm lg:text-base text-neutral-700 font-sans">
                  <p>
                    <span className="font-semibold text-black">Client:</span> {client}
                  </p>
                  <p>
                    <span className="font-semibold text-black">Industry:</span> {industry}
                  </p>
                  <p>
                    <span className="font-semibold text-black">Location:</span> {location}
                  </p>
                  <p>
                    <span className="font-semibold text-black">Platforms:</span> {platforms}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white p-5 lg:p-6 rounded-[2rem] shadow-sm border border-black/5">
                <h4 className="font-display font-black text-base lg:text-lg tracking-wider text-black uppercase mb-2">
                  GOAL:
                </h4>
                <p className="font-sans text-neutral-700 text-xs sm:text-sm lg:text-base leading-relaxed">
                  {goal}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Center Column: Broad Cream Laptop Screen Mockup */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center my-3 lg:my-0">
            <Reveal delay={0.15} className="w-full flex flex-col items-center">
              <div className="relative w-full max-w-[380px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[520px] flex flex-col items-center group hover:scale-[1.02] transition-transform duration-500">
                <div className="relative w-full bg-[#FAF8F5] p-2 sm:p-3 rounded-t-[1.4rem] lg:rounded-t-[1.8rem] shadow-[0_15px_40px_rgba(0,0,0,0.1)] border-[5px] lg:border-[6px] border-[#E8E3DA] z-10">
                  <div className="flex justify-center mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a3a3a] ring-1 ring-black/10" />
                  </div>
                  <div className="relative overflow-hidden rounded-[0.8rem] lg:rounded-[1rem] bg-black border border-neutral-300/40 flex flex-col aspect-[16/9.5]">
                    <div className="bg-[#F4F0E8] px-3 py-1 flex items-center justify-between text-[10px] text-neutral-600 font-mono border-b border-neutral-300/50">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                      </div>
                      <span className="text-[9.5px] text-neutral-700 font-bold uppercase truncate max-w-[180px]">
                        {title}
                      </span>
                      <div className="w-3" />
                    </div>
                    <div className="relative w-full flex-1 overflow-hidden">
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-600 flex items-center justify-center text-white text-xs font-mono">
                          {title}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-[104%] h-3 lg:h-3.5 bg-gradient-to-b from-[#F2EEE7] via-[#E6E0D5] to-[#D8D2C4] rounded-b-xl border-t border-[#D0C9BB] shadow-xl relative z-20 flex justify-center items-start -mt-0.5">
                  <div className="w-12 h-1 bg-[#C8C1B2] rounded-b-sm mt-0.5" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: APPROACH & STATS */}
          <div className="lg:col-span-4 flex">
            <Reveal delay={0.3} className="w-full flex">
              <div className="bg-white p-5 lg:p-6 rounded-[2rem] shadow-sm border border-black/5 w-full flex flex-col justify-center">
                <h4 className="font-display font-black text-base lg:text-lg tracking-wider text-black uppercase mb-2">
                  APPROACH:
                </h4>
                <p className="font-sans text-neutral-700 text-xs sm:text-sm lg:text-base leading-relaxed mb-4">
                  {approach}
                </p>

                {stats && stats.length > 0 && (
                  <div className="border-t border-black/10 pt-3 grid grid-cols-3 gap-2 text-center">
                    {stats.map((s) => (
                      <div key={s.l}>
                        <div className="font-display text-base sm:text-lg lg:text-xl font-bold text-black">
                          {s.n}
                        </div>
                        <div className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 leading-tight">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const data = Route.useLoaderData();
  const about = data.about;
  const contact = about.contact;

  return (
    <section
      id="contact"
      className="relative w-full py-6 lg:py-8 min-h-screen lg:h-screen flex flex-col justify-between items-center bg-[#f2f1ed] font-sans scroll-mt-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
    >
      {/* Top Social Icons Bar (GitHub, Instagram, LinkedIn - Exact Match to Screenshot) */}
      <Reveal>
        <div className="flex items-center justify-center gap-3.5 md:gap-5 mt-2 mb-4">
          {/* GitHub Icon */}
          <a
            href={contact.github || "https://github.com/riddhimhatre12"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="bg-black text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-[14px] md:rounded-[16px] hover:scale-110 transition-transform shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="currentColor">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1.0.07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
            </svg>
          </a>

          {/* Instagram Icon */}
          <a
            href={
              contact.instagram ||
              "https://www.instagram.com/riddhi_mhatre12?igsh=MXI4eW1rdjI0a3BzMw=="
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="bg-black text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-[14px] md:rounded-[16px] hover:scale-110 transition-transform shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* LinkedIn Icon */}
          <a
            href={contact.linkedin || "https://www.linkedin.com/in/riddhi-mhatre-909529342/"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="bg-black text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-[14px] md:rounded-[16px] hover:scale-110 transition-transform shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>
        </div>
      </Reveal>

      {/* Main White Pill Banner + Polaroid Stack Container */}
      <Reveal delay={0.1} className="w-full flex justify-center px-4 sm:px-6 my-auto">
        <div className="w-[96%] max-w-[1060px] relative">
          <div className="w-full flex justify-center items-center relative">
            {/* Main White Pill Banner (Grand & Bold Box) */}
            <div className="relative z-10 bg-white rounded-[100px] md:rounded-[140px] w-full py-8 sm:py-12 md:py-16 px-8 sm:px-16 md:px-24 flex items-center justify-center shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-gray-100/50">
              <h2
                className="font-display font-black tracking-tighter leading-none text-[#1b1b1b] text-center w-full uppercase select-none"
                style={{ fontSize: "clamp(30px, 6.8vw, 92px)", letterSpacing: "-0.03em" }}
              >
                GET IN TOUCH!
              </h2>
            </div>

            {/* Polaroids Stack - Animated Slide-in FROM LEFT SIDE on Scroll */}
            <motion.div
              initial={{ x: -140, opacity: 0, rotate: -20 }}
              whileInView={{ x: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 65, damping: 14, delay: 0.25 }}
              className="absolute -left-5 sm:-left-7 md:-left-10 lg:-left-12 top-[95%] sm:top-[90%] md:top-[85%] lg:top-[80%] z-20 pointer-events-none drop-shadow-2xl w-[110px] sm:w-[145px] md:w-[175px] lg:w-[200px]"
            >
              <div className="relative w-full aspect-[4/4.6]">
                {/* Back Polaroid Card */}
                <div className="absolute inset-0 bg-[#fdfdfd] p-2 md:p-3 shadow-md border border-gray-200/80 transform rotate-[7deg] translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-3.5 rounded-sm flex flex-col">
                  <div className="w-full flex-1 bg-gray-200/90 border border-gray-200/60" />
                  <div className="h-4 md:h-8 bg-[#fdfdfd]" />
                </div>

                {/* Front Polaroid Card */}
                <div className="absolute inset-0 bg-[#fdfdfd] p-2 md:p-3 shadow-2xl border border-gray-100 transform rotate-[-9deg] rounded-sm flex flex-col">
                  {/* Realistic Metallic Paperclip (Clasping perfectly over top-right corner of polaroid photo frame) */}
                  <svg
                    className="absolute -top-4 right-3 sm:-top-5 sm:right-4 md:-top-6 md:right-5 z-30 w-6 sm:w-7.5 md:w-9 h-13 sm:h-16 md:h-20 text-[#7d695b] drop-shadow-md rotate-[14deg] pointer-events-none"
                    viewBox="0 0 24 54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 16V38C7 42.4 10.6 46 15 46C19.4 46 23 42.4 23 38V12C23 6.5 18.5 2 13 2C7.5 2 3 6.5 3 12V42" />
                  </svg>

                  <div className="w-full flex-1 bg-gray-200 overflow-hidden relative border border-gray-200/80 shadow-inner">
                    <img
                      src={contactPortrait}
                      alt="Riddhi Mhatre Portrait"
                      className="w-full h-full object-cover object-[50%_30%]"
                    />
                  </div>
                  {/* Polaroid White Margin at Bottom */}
                  <div className="h-4 md:h-8 bg-[#fdfdfd]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Reveal>

      {/* Contact Info Details (Email & Phone) */}
      <Reveal delay={0.2}>
        <div className="mt-6 md:mt-10 flex flex-col items-center gap-2 md:gap-2.5 z-10 relative">
          {contact.email && (
            <div className="flex items-center gap-3">
              <MailIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1b1b1b]" />
              <a
                href={`mailto:${contact.email}`}
                className="font-sans text-[15px] md:text-[19px] font-medium text-[#1b1b1b] tracking-wide hover:opacity-75 transition-opacity"
              >
                {contact.email}
              </a>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1b1b1b]" />
              <a
                href={`tel:${contact.phone}`}
                className="font-sans text-[15px] md:text-[19px] font-medium text-[#1b1b1b] tracking-wide hover:opacity-75 transition-opacity"
              >
                {contact.phone}
              </a>
            </div>
          )}
        </div>
      </Reveal>

      {/* Bottom Year Badge & Copyright Footer */}
      <Reveal delay={0.3}>
        <div className="mt-4 sm:mt-6 mb-2 flex flex-col items-center gap-1.5 z-10 relative">
          <span className="px-8 py-1.5 md:px-11 md:py-2 rounded-full border-[2.5px] border-black font-sans font-bold text-sm md:text-[17px] text-black bg-transparent tracking-widest shadow-sm">
            {data.hero.year || "2026"}
          </span>
          <p className="text-[11px] font-sans text-neutral-500 font-medium tracking-wide">
            © {data.hero.year || "2026"} {data.hero.name || "Riddhi Mhatre"}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function ExperienceAndEducation() {
  const data = Route.useLoaderData();
  const experiences = data.experience || [];
  const education = data.education || [];
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <section
      id="experience"
      className="px-5 md:px-12 py-6 lg:py-10 min-h-screen lg:h-screen flex flex-col justify-center bg-[#FAF9F6] font-sans scroll-mt-0 overflow-hidden relative rounded-[2rem] md:rounded-[2.5rem]"
    >
      <CertificateModal isOpen={showCertModal} onClose={() => setShowCertModal(false)} />

      {/* Decorative Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e3dc_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Main Section Header */}
        <Reveal className="text-center mb-6 lg:mb-8">
          <span className="inline-block text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-neutral-500 uppercase bg-neutral-200/70 px-3.5 py-1 rounded-full mb-2.5 border border-neutral-300/40">
            CAREER & ACADEMIC ARCHITECTURE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight text-[#111111] font-black uppercase leading-none select-none">
            {data.experienceTitle || "EXPERIENCE & EDUCATION"}
          </h2>
        </Reveal>

        {/* Interactive Luxury Tab Switcher */}
        <Reveal delay={0.1} className="mb-8 sm:mb-10">
          <div className="bg-neutral-200/70 p-1.5 rounded-full border border-neutral-300/50 flex items-center gap-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab("experience")}
              className={`relative px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-display text-xs sm:text-sm font-black tracking-widest uppercase transition-colors duration-300 z-10 flex items-center gap-2 ${
                activeTab === "experience" ? "text-white" : "text-neutral-700 hover:text-black"
              }`}
            >
              {activeTab === "experience" && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-black rounded-full z-[-1] shadow-md"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>EXPERIENCE & COURSES</span>
              <span className="text-[10px] font-mono opacity-75">({experiences.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("education")}
              className={`relative px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-display text-xs sm:text-sm font-black tracking-widest uppercase transition-colors duration-300 z-10 flex items-center gap-2 ${
                activeTab === "education" ? "text-white" : "text-neutral-700 hover:text-black"
              }`}
            >
              {activeTab === "education" && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-black rounded-full z-[-1] shadow-md"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span>🎓 EDUCATION</span>
              <span className="text-[10px] font-mono opacity-75">({education.length})</span>
            </button>
          </div>
        </Reveal>

        {/* Tab Content Display */}
        <div className="w-full max-w-4xl min-h-[340px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {/* TAB 1: EXPERIENCE & COURSES */}
            {activeTab === "experience" && (
              <motion.div
                key="tab-experience"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid md:grid-cols-2 gap-5 lg:gap-6 items-stretch w-full"
              >
                {experiences.map((exp: ExperienceItem, i: number) => {
                  const isBizTech = exp.company?.includes("BizTech");

                  return isBizTech ? (
                    /* Featured Verified Internship Light Card */
                    <motion.div
                      key={i}
                      whileHover={{ y: -5, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      className="bg-white text-black p-6 sm:p-7 rounded-[24px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-neutral-200/90 hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>VERIFIED INTERNSHIP</span>
                          </span>
                          {exp.period && (
                            <span className="text-[11px] font-mono font-bold text-neutral-700 bg-[#F4F2ED] px-3 py-0.5 rounded-full border border-neutral-200">
                              {exp.period}
                            </span>
                          )}
                        </div>

                        <h4 className="font-sans text-xl sm:text-2xl font-black mt-4 text-[#111111] tracking-tight leading-snug">
                          {exp.title}
                        </h4>
                        <p className="text-neutral-700 font-bold text-sm mt-1">{exp.company}</p>

                        {exp.description && (
                          <p className="text-neutral-600 text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                            {exp.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-neutral-200/80 flex items-center justify-between gap-2 flex-wrap">
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setShowCertModal(true)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-800 font-sans text-xs font-extrabold transition-all duration-200 shadow-md hover:shadow-lg group/btn"
                        >
                          <span>View Official Certificate</span>
                          <span className="text-[12px] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">
                            ↗
                          </span>
                        </motion.button>
                        <span className="text-[10.5px] font-mono font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg border border-neutral-200">
                          #PC-F16833
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    /* Crisp Cream Classic Card */
                    <motion.div
                      key={i}
                      whileHover={{ y: -5, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      className="bg-white text-black p-6 sm:p-7 rounded-[24px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-neutral-200/90 hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="inline-block text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-200/60">
                            {exp.type || "1 YEAR COURSE"}
                          </span>
                          {exp.period && (
                            <span className="text-[11px] font-mono font-bold text-neutral-700 bg-[#F4F2ED] px-3 py-0.5 rounded-full border border-neutral-200">
                              {exp.period}
                            </span>
                          )}
                        </div>

                        <h4 className="font-sans text-xl font-black mt-4 text-[#111111] tracking-tight leading-snug">
                          {exp.title}
                        </h4>
                        <p className="text-neutral-700 font-bold text-sm mt-1">{exp.company}</p>

                        {exp.description && (
                          <p className="text-neutral-600 text-xs sm:text-sm mt-3 leading-relaxed font-sans">
                            {exp.description}
                          </p>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-neutral-150 flex items-center gap-1.5 flex-wrap">
                        {["STLC", "Bug Reporting", "Test Cases", "Quality Assurance"].map(
                          (skill, skIdx) => (
                            <span
                              key={skIdx}
                              className="text-[10px] font-mono font-bold bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md border border-neutral-200/60"
                            >
                              {skill}
                            </span>
                          ),
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* TAB 2: ACADEMIC EDUCATION */}
            {activeTab === "education" && (
              <motion.div
                key="tab-education"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch w-full"
              >
                {education.map((edu: EducationItem, i: number) => {
                  const isDegree = i === 0;

                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5, scale: 1.015 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      className="bg-white text-black p-5 sm:p-6 rounded-[22px] shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-neutral-200/90 hover:border-black/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1.5 flex-wrap">
                          <span
                            className={`inline-block text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              isDegree
                                ? "bg-black text-white"
                                : "bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                            }`}
                          >
                            {isDegree ? "Bachelor Degree" : "Schooling"}
                          </span>
                          {edu.period && (
                            <span className="text-[10px] font-mono font-bold text-neutral-700 bg-[#F4F2ED] px-2 py-0.5 rounded-full border border-neutral-200">
                              {edu.period}
                            </span>
                          )}
                        </div>

                        <h4 className="font-sans text-base sm:text-lg lg:text-xl font-black mt-3 text-[#111111] tracking-tight leading-snug">
                          {edu.title}
                        </h4>
                        <p className="text-neutral-700 font-bold text-xs sm:text-sm mt-0.5">
                          {edu.school}
                        </p>

                        {edu.description && (
                          <p className="text-neutral-600 text-xs sm:text-xs lg:text-[13px] mt-2 leading-relaxed font-sans">
                            {edu.description}
                          </p>
                        )}
                      </div>

                      {edu.highlights && edu.highlights.length > 0 && (
                        <div className="mt-3.5 pt-2.5 border-t border-neutral-150 flex items-center gap-1.5 flex-wrap">
                          {edu.highlights.map((tag: string, tagIdx: number) => (
                            <span
                              key={tagIdx}
                              className="text-[9.5px] font-mono font-extrabold bg-neutral-100 text-[#111111] px-2 py-0.5 rounded border border-neutral-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ExerCoachProject() {
  return (
    <section
      id="exercoach"
      className="px-6 md:px-12 py-10 lg:py-16 min-h-screen flex flex-col justify-center bg-white font-sans border-t border-black/5 rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm my-6 md:my-10 scroll-mt-6"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Title & Subtitle */}
        <Reveal className="text-center mb-6 lg:mb-8">
          <h2 className="font-display font-black tracking-tight text-3xl sm:text-4xl lg:text-5xl text-[#111111] uppercase leading-none">
            EXERCOACH GYM
          </h2>
          <p className="font-script text-xl sm:text-2xl lg:text-3xl text-neutral-800 mt-1 italic">
            (freelance live project)
          </p>
        </Reveal>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column (OBJECTIVE + DETAILS) */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
            {/* OBJECTIVE Card */}
            <Reveal delay={0.1}>
              <div className="bg-white p-5 lg:p-6 rounded-[2rem] shadow-sm border border-black/5">
                <h3 className="font-display font-black text-base lg:text-lg tracking-wider text-black uppercase mb-2">
                  OBJECTIVE:
                </h3>
                <p className="font-sans text-neutral-700 text-xs sm:text-sm lg:text-base leading-relaxed">
                  Develop a high-impact, modern, and fully responsive website to establish the gym's
                  online presence, showcase training programs, and drive membership registrations.
                </p>
              </div>
            </Reveal>

            {/* DETAILS Card */}
            <Reveal delay={0.2}>
              <div className="bg-white p-5 lg:p-6 rounded-[2rem] shadow-sm border border-black/5">
                <h3 className="font-display font-black text-base lg:text-lg tracking-wider text-black uppercase mb-2">
                  DETAILS:
                </h3>
                <p className="font-sans text-neutral-700 text-xs sm:text-sm lg:text-base leading-relaxed">
                  Designed and developed the live website{" "}
                  <span className="font-semibold text-black">exercoachgym.com</span> from scratch as
                  a freelance developer. Structured class directories, contact integrations, and
                  coach rosters with a performance-first approach.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Center Column (Broad Classic White/Cream Laptop Mockup) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center my-3 lg:my-0">
            <Reveal delay={0.15} className="w-full flex flex-col items-center">
              {/* Broad Laptop Outer Group */}
              <div className="relative w-full max-w-[380px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[520px] flex flex-col items-center group hover:scale-[1.02] transition-transform duration-500">
                {/* Cream/White Laptop Screen Frame */}
                <div className="relative w-full bg-[#FAF8F5] p-2 sm:p-3 rounded-t-[1.4rem] lg:rounded-t-[1.8rem] shadow-[0_15px_40px_rgba(0,0,0,0.1)] border-[5px] lg:border-[6px] border-[#E8E3DA] z-10">
                  {/* Top Webcam Dot */}
                  <div className="flex justify-center mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a3a3a] ring-1 ring-black/10" />
                  </div>

                  {/* Inner Screen Display */}
                  <div className="relative overflow-hidden rounded-[0.8rem] lg:rounded-[1rem] bg-black border border-neutral-300/40 flex flex-col aspect-[16/9.5]">
                    {/* Cream Browser Navigation Bar */}
                    <div className="bg-[#F4F0E8] px-3 py-1 flex items-center justify-between text-[10px] text-neutral-600 font-mono border-b border-neutral-300/50">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex items-center gap-1 bg-[#FAF8F5] px-2.5 py-0.5 rounded-md text-[9.5px] text-neutral-700 border border-neutral-300/50 shadow-inner">
                        <svg
                          className="w-2 h-2 text-emerald-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                        </svg>
                        exercoachgym.com
                      </div>
                      <div className="w-3" />
                    </div>

                    {/* ExerCoach Website Screen Animated Video/Scroll Preview */}
                    <div className="relative w-full flex-1 overflow-hidden bg-[#111111]">
                      <motion.div
                        className="w-full"
                        animate={{ y: ["0%", "-58%", "-58%", "0%", "0%"] }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: [0.45, 0, 0.55, 1],
                          times: [0, 0.42, 0.5, 0.92, 1],
                        }}
                      >
                        <img
                          src={exercoachgym}
                          alt="ExerCoach Gym Live Website Animated Preview"
                          className="w-full h-auto block select-none pointer-events-none"
                        />
                      </motion.div>
                      {/* Subtle Screen Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-10" />
                      {/* Live Auto-Scroll Tag */}
                      <div className="absolute bottom-2 right-2 bg-black/85 backdrop-blur-sm px-2 py-0.5 rounded-full text-[8.5px] font-mono text-white/90 border border-white/15 z-20 flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE PREVIEW</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop Hinge & Base Lip */}
                <div className="w-[104%] h-3 lg:h-3.5 bg-gradient-to-b from-[#F2EEE7] via-[#E6E0D5] to-[#D8D2C4] rounded-b-xl border-t border-[#D0C9BB] shadow-xl relative z-20 flex justify-center items-start -mt-0.5">
                  <div className="w-12 h-1 bg-[#C8C1B2] rounded-b-sm mt-0.5" />
                </div>
              </div>

              {/* Live Status Badge Below Laptop */}
              <a
                href="https://exercoachgym.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-flex items-center gap-2 bg-black text-white font-mono text-[11px] lg:text-xs px-3.5 py-1.5 rounded-full hover:bg-neutral-800 transition-colors shadow-md border border-white/10 group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE • exercoachgym.com</span>
                <svg
                  className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </Reveal>
          </div>

          {/* Right Column (MY ROLE) */}
          <div className="lg:col-span-4 flex">
            <Reveal delay={0.3} className="w-full flex">
              <div className="bg-white p-5 lg:p-6 rounded-[2rem] shadow-sm border border-black/5 w-full flex flex-col justify-center">
                <h3 className="font-display font-black text-base lg:text-lg tracking-wider text-black uppercase mb-3">
                  MY ROLE:
                </h3>
                <ul className="space-y-2.5 font-sans text-neutral-700 text-xs sm:text-sm lg:text-base leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-black font-bold text-base leading-none mt-1">•</span>
                    <span>Designed & built custom UI/UX layouts from scratch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black font-bold text-base leading-none mt-1">•</span>
                    <span>Implemented 100% mobile-first responsive web design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black font-bold text-base leading-none mt-1">•</span>
                    <span>Optimized page performance and image asset loads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black font-bold text-base leading-none mt-1">•</span>
                    <span>Integrated member inquiry & booking call-to-actions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black font-bold text-base leading-none mt-1">•</span>
                    <span>Deployed & managed live domain & hosting configurations</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function UnlimitedDemocracy() {
  return (
    <section
      id="exercoach-mobile"
      className="px-6 md:px-12 py-10 lg:py-16 min-h-screen flex flex-col justify-center bg-white font-sans border-t border-black/5 rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm my-6 md:my-10 scroll-mt-6"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Title */}
        <Reveal className="mb-4 lg:mb-6">
          <h2 className="font-display font-black tracking-tighter text-4xl sm:text-5xl lg:text-6xl text-[#111111] uppercase leading-none">
            EXERCOACH
            <br />
            GYM
          </h2>
        </Reveal>

        {/* 3-Column Grid (Shifted up with tight gap) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column (Details/Goal/Approach Card - Shifted Up, Logo Removed) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* DETAILS, PLANFORMS, GOAL, APPROACH Card */}
            <Reveal delay={0.1}>
              <div className="bg-[#f0efeb] p-5 lg:p-6 rounded-[2rem] shadow-sm border border-black/5 flex flex-col gap-3.5">
                {/* DETAILS */}
                <div>
                  <h3 className="font-display font-black text-sm lg:text-base tracking-wider text-black uppercase mb-1">
                    DETAILS:
                  </h3>
                  <div className="space-y-0.5 text-xs sm:text-sm text-neutral-700 font-sans">
                    <p>
                      <span className="font-semibold text-black">Client:</span> Freelance Client
                    </p>
                    <p>
                      <span className="font-semibold text-black">Industry:</span> Fitness & Personal
                      Coaching
                    </p>
                    <p>
                      <span className="font-semibold text-black">Location:</span> Remote
                    </p>
                  </div>
                </div>

                {/* PLANFORMS */}
                <div>
                  <h3 className="font-display font-black text-sm lg:text-base tracking-wider text-black uppercase mb-1">
                    PLATFORMS:
                  </h3>
                  <p className="font-sans text-neutral-700 text-xs sm:text-sm">
                    Web Technology, HTML5, CSS3, JavaScript, Live Website
                  </p>
                </div>

                {/* GOAL */}
                <div>
                  <h3 className="font-display font-black text-sm lg:text-base tracking-wider text-black uppercase mb-1">
                    GOAL:
                  </h3>
                  <p className="font-sans text-neutral-700 text-xs sm:text-sm leading-relaxed">
                    Develop a high-impact, modern, and fully responsive website to establish the
                    gym's online presence, showcase training programs, and drive membership
                    registrations.
                  </p>
                </div>

                {/* APPROACH */}
                <div>
                  <h3 className="font-display font-black text-sm lg:text-base tracking-wider text-black uppercase mb-1">
                    APPROACH:
                  </h3>
                  <p className="font-sans text-neutral-700 text-xs sm:text-sm leading-relaxed">
                    Designed and developed the live website exercoachgym.com from scratch as a
                    freelance developer. Structured class directories, contact integrations, and
                    coach rosters with a performance-first approach.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Center Column (Single Sleek iPhone 16 Pro Screen Mockup) */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center my-3 lg:my-0">
            <Reveal delay={0.15} className="w-full flex flex-col items-center">
              {/* Sleek iPhone Outer Container */}
              <div className="relative w-full max-w-[240px] sm:max-w-[260px] md:max-w-[275px] group hover:scale-[1.02] transition-transform duration-500">
                {/* Titanium Phone Body Frame */}
                <div className="relative w-full bg-[#1c1c1e] p-[8px] sm:p-[9px] rounded-[2.8rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.22)] border-[2px] border-[#3a3a3c] ring-1 ring-black/50">
                  {/* Outer Buttons (Volume & Power) */}
                  <div className="absolute -left-[3px] top-16 w-[3px] h-6 bg-[#2c2c2e] rounded-l-sm" />
                  <div className="absolute -left-[3px] top-24 w-[3px] h-6 bg-[#2c2c2e] rounded-l-sm" />
                  <div className="absolute -right-[3px] top-20 w-[3px] h-9 bg-[#2c2c2e] rounded-r-sm" />

                  {/* Inner Screen Display */}
                  <div className="relative overflow-hidden rounded-[2.3rem] sm:rounded-[2.5rem] bg-black aspect-[9/19.2] border border-neutral-800">
                    {/* Status Bar / Dynamic Island */}
                    <div className="absolute top-0 inset-x-0 h-7 z-30 flex items-center justify-between px-5 pt-1 text-white font-mono text-[9px] pointer-events-none select-none">
                      <span className="font-semibold text-white/90">9:41</span>
                      {/* Dynamic Island */}
                      <div className="w-16 h-3.5 bg-black rounded-full flex items-center justify-end px-1.5 gap-1 ring-1 ring-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0c1524] ring-1 ring-blue-500/50" />
                      </div>
                      <div className="flex items-center gap-1 text-white/90">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.2 19.54 10.55 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
                        </svg>
                        <span className="w-2.5 h-1.5 bg-current rounded-xs" />
                      </div>
                    </div>

                    {/* ExerCoach Mobile Website Screen Animated Image */}
                    <div className="w-full h-full overflow-hidden bg-black">
                      <motion.div
                        className="w-full flex flex-col"
                        animate={{ y: ["0%", "-66.6%", "-66.6%", "0%", "0%"] }}
                        transition={{
                          duration: 16,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: [0.45, 0, 0.55, 1],
                          times: [0, 0.45, 0.5, 0.95, 1],
                        }}
                      >
                        <img
                          src={exercoachMobileScreen1}
                          alt="ExerCoach Gym Mobile Screen 1 - Hero & Trial"
                          className="w-full h-auto block select-none pointer-events-none"
                        />
                        <img
                          src={exercoachMobileScreen2}
                          alt="ExerCoach Gym Mobile Screen 2 - Contact"
                          className="w-full h-auto block select-none pointer-events-none"
                        />
                        <img
                          src={exercoachMobileScreen3}
                          alt="ExerCoach Gym Mobile Screen 3 - Plans"
                          className="w-full h-auto block select-none pointer-events-none"
                        />
                      </motion.div>
                    </div>

                    {/* Glass Reflection Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />

                    {/* iPhone Home Indicator Bar */}
                    <div className="absolute bottom-1 inset-x-0 flex justify-center z-30 pointer-events-none">
                      <span className="w-24 h-1 bg-white/40 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Status Badge Below Phone */}
              <a
                href="https://exercoachgym.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3.5 inline-flex items-center gap-2 bg-black text-white font-mono text-[11px] lg:text-xs px-3.5 py-1.5 rounded-full hover:bg-neutral-800 transition-colors shadow-md border border-white/10 group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE • exercoachgym.com</span>
              </a>
            </Reveal>
          </div>

          {/* Right Column (ExerCoach Gym Website & Admin Portal Showcase) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Reveal delay={0.25} className="w-full">
              {/* Section 1: Client Website Mobile Screens */}
              <div>
                <h4 className="font-display font-black text-xs uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>PUBLIC WEBSITE (MOBILE)</span>
                </h4>
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full items-start">
                  {/* Phone 1: Hero & Trial */}
                  <div className="bg-[#1c1c1e] p-1.5 rounded-[1.4rem] shadow-sm border border-[#3a3a3c] flex flex-col items-center group hover:scale-[1.03] transition-transform duration-300">
                    <div className="w-full overflow-hidden rounded-[1.1rem] bg-black aspect-[9/19] relative border border-neutral-800">
                      <img
                        src={exercoachMobileScreen1}
                        alt="ExerCoach Mobile Screen 1 - Hero & Free Trial Session"
                        className="w-full h-full object-cover object-top select-none"
                      />
                    </div>
                    <span className="text-[9px] font-mono font-medium text-neutral-500 mt-1.5 tracking-tight">
                      Hero & Trial
                    </span>
                  </div>

                  {/* Phone 2: Contact & Info */}
                  <div className="bg-[#1c1c1e] p-1.5 rounded-[1.4rem] shadow-sm border border-[#3a3a3c] flex flex-col items-center group hover:scale-[1.03] transition-transform duration-300">
                    <div className="w-full overflow-hidden rounded-[1.1rem] bg-black aspect-[9/19] relative border border-neutral-800">
                      <img
                        src={exercoachMobileScreen2}
                        alt="ExerCoach Mobile Screen 2 - Get in Touch & Contact"
                        className="w-full h-full object-cover object-top select-none"
                      />
                    </div>
                    <span className="text-[9px] font-mono font-medium text-neutral-500 mt-1.5 tracking-tight">
                      Contact & Info
                    </span>
                  </div>

                  {/* Phone 3: Membership Plans */}
                  <div className="bg-[#1c1c1e] p-1.5 rounded-[1.4rem] shadow-sm border border-[#3a3a3c] flex flex-col items-center group hover:scale-[1.03] transition-transform duration-300">
                    <div className="w-full overflow-hidden rounded-[1.1rem] bg-black aspect-[9/19] relative border border-neutral-800">
                      <img
                        src={exercoachMobileScreen3}
                        alt="ExerCoach Mobile Screen 3 - Membership Plans"
                        className="w-full h-full object-cover object-top select-none"
                      />
                    </div>
                    <span className="text-[9px] font-mono font-medium text-neutral-500 mt-1.5 tracking-tight">
                      Plans & Rates
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Admin Dashboard & Portal Screens */}
              <div className="mt-4 pt-4 border-t border-black/10">
                <h4 className="font-display font-black text-xs uppercase tracking-wider text-black mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>ADMIN DASHBOARD & CMS PORTAL</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 w-full items-start">
                  {/* Admin Phone 1: Dashboard */}
                  <div className="bg-[#1c1c1e] p-1.5 rounded-[1.3rem] shadow-sm border border-[#3a3a3c] flex flex-col items-center group hover:scale-[1.03] transition-transform duration-300">
                    <div className="w-full overflow-hidden rounded-[1rem] bg-black aspect-[9/19] relative border border-neutral-800">
                      <img
                        src={exercoachAdminDashboard}
                        alt="ExerCoach Admin Dashboard Overview"
                        className="w-full h-full object-cover object-top select-none"
                      />
                    </div>
                    <span className="text-[8.5px] font-mono font-medium text-neutral-500 mt-1.5 tracking-tight">
                      Dashboard
                    </span>
                  </div>

                  {/* Admin Phone 2: Navigation Menu */}
                  <div className="bg-[#1c1c1e] p-1.5 rounded-[1.3rem] shadow-sm border border-[#3a3a3c] flex flex-col items-center group hover:scale-[1.03] transition-transform duration-300">
                    <div className="w-full overflow-hidden rounded-[1rem] bg-black aspect-[9/19] relative border border-neutral-800">
                      <img
                        src={exercoachAdminMenu}
                        alt="ExerCoach Admin Navigation Menu"
                        className="w-full h-full object-cover object-top select-none"
                      />
                    </div>
                    <span className="text-[8.5px] font-mono font-medium text-neutral-500 mt-1.5 tracking-tight">
                      Nav Menu
                    </span>
                  </div>

                  {/* Admin Phone 3: Leads Portal */}
                  <div className="bg-[#1c1c1e] p-1.5 rounded-[1.3rem] shadow-sm border border-[#3a3a3c] flex flex-col items-center group hover:scale-[1.03] transition-transform duration-300">
                    <div className="w-full overflow-hidden rounded-[1rem] bg-black aspect-[9/19] relative border border-neutral-800">
                      <img
                        src={exercoachAdminLeads}
                        alt="ExerCoach Customer Leads Management"
                        className="w-full h-full object-cover object-top select-none"
                      />
                    </div>
                    <span className="text-[8.5px] font-mono font-medium text-neutral-500 mt-1.5 tracking-tight">
                      Leads CMS
                    </span>
                  </div>

                  {/* Admin Phone 4: Gallery Management */}
                  <div className="bg-[#1c1c1e] p-1.5 rounded-[1.3rem] shadow-sm border border-[#3a3a3c] flex flex-col items-center group hover:scale-[1.03] transition-transform duration-300">
                    <div className="w-full overflow-hidden rounded-[1rem] bg-black aspect-[9/19] relative border border-neutral-800">
                      <img
                        src={exercoachAdminGallery}
                        alt="ExerCoach Gallery Media Management"
                        className="w-full h-full object-cover object-top select-none"
                      />
                    </div>
                    <span className="text-[8.5px] font-mono font-medium text-neutral-500 mt-1.5 tracking-tight">
                      Gallery CMS
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const data = Route.useLoaderData();
  const caseStudies = (data.caseStudies || []).filter((cs: CaseStudyItem) => cs.id !== "exercoach");

  return (
    <div className="min-h-screen bg-[#f0efeb] text-[#111111] font-sans overflow-x-hidden flex flex-col relative">
      <div className="relative z-10">
        <Nav />
      </div>
      <main className="flex-1 bg-[#f0efeb] animate-fade-in flex flex-col relative z-10 space-y-6 md:space-y-10 py-4 px-2 sm:px-4 md:px-6">
        <Hero />
        <About />
        <Skills />
        <ExperienceAndEducation />
        <Projects />
        <ExerCoachProject />
        <UnlimitedDemocracy />
        {caseStudies.map((cs: CaseStudyItem) => (
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
      </main>
    </div>
  );
}
