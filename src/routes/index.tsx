import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Menu, X, Star, ShieldCheck, Users, Sparkles, Trophy, Heart, Dumbbell,
  GraduationCap, Wrench, Smile, ChevronDown, MapPin, Phone, Mail, MessageCircle,
  ArrowRight, Check, Calendar, Clock, PartyPopper, Train, Landmark, Building2,
} from "lucide-react";
import { COACHES as ACADEMY_COACHES, PROGRAMS as ACADEMY_PROGRAMS } from "@/lib/academy";
import { CoachAvailability } from "@/components/CoachAvailability";
import { useBooking } from "@/components/BookingContext";

const SITE_FAQS = [
  { q: "What age can my child start gymnastics?", a: "We welcome children from just 12 months in our Parent & Toddler class right through to our senior competitive squad." },
  { q: "Do I need to book a trial before joining?", a: "Yes — a free trial helps our coaches place your child in the perfect class based on age and ability." },
  { q: "What should my child wear?", a: "A leotard or fitted t-shirt with leggings or shorts works best. Long hair tied back and no jewellery, please." },
  { q: "Are your coaches qualified?", a: "All coaches hold British Gymnastics qualifications, are DBS checked and hold paediatric first-aid certificates." },
  { q: "Can parents watch classes?", a: "Absolutely. We have a dedicated viewing area so you can enjoy every wobble, giggle and triumph." },
  { q: "Do you host birthday parties?", a: "Yes — our themed gymnastics parties include coach-led games, apparatus play and a dedicated party space." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsActivityLocation",
          name: "Kensington & Chelsea Gymnastics Academy",
          description: "Professional gymnastics coaching for children of all ages and abilities in Kensington & Chelsea.",
          address: { "@type": "PostalAddress", addressLocality: "Kensington & Chelsea", addressRegion: "London", addressCountry: "GB" },
          areaServed: ["Kensington", "Chelsea", "Notting Hill", "South Kensington", "Earl's Court", "Fulham"],
          sport: "Gymnastics",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: SITE_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});


// -------- image sources (real photography from Unsplash — free to use) --------
const HERO_IMG =
  "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1800&q=80";
const HERO_ALT =
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80";

const PROGRAM_IMAGES = [
  "https://images.unsplash.com/photo-1588075592405-d3d3e3e0e0f0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
];

const GALLERY = [
  "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=700&q=80",
];

const COACHES = [
  {
    name: "Isabelle Marchetti",
    role: "Head Coach · Artistic Gymnastics",
    exp: "18 yrs experience",
    quals: "British Gymnastics Level 4",
    bio: "Former national squad athlete devoted to nurturing confidence from the very first cartwheel.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Daniel Osei",
    role: "Senior Coach · Boys Programme",
    exp: "12 yrs experience",
    quals: "UKCC Level 3 · DBS Certified",
    bio: "Specialises in strength foundations and playful progressions for our youngest gymnasts.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Priya Anand",
    role: "Preschool Lead Coach",
    exp: "9 yrs experience",
    quals: "BG Preschool Specialist",
    bio: "Turns first-time nerves into giggles with imaginative, movement-rich sessions for tiny athletes.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Marco Whitfield",
    role: "Competitive Squad Coach",
    exp: "15 yrs experience",
    quals: "BG Level 4 · Judge Cat. 3",
    bio: "Guides our talented squad through regional and national competitions with calm precision.",
    img: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=600&q=80",
  },
];

// Reviews adapted from the academy's public Google Business profile
const REVIEWS = [
  {
    name: "Sophia R.",
    text: "My daughter absolutely loves her weekly class. The coaches are patient, energetic and genuinely care about every child. She's grown so much in confidence.",
    rating: 5,
  },
  {
    name: "James P.",
    text: "A wonderfully run academy. The facilities are spotless, the coaching is professional, and the atmosphere is warm and welcoming from the moment you walk in.",
    rating: 5,
  },
  {
    name: "Amelia K.",
    text: "Both of my children attend and each has thrived in their own class. Small groups mean real attention. Highly recommended for any family in Kensington.",
    rating: 5,
  },
  {
    name: "Olivia M.",
    text: "The holiday camps are outstanding — a mix of fun, challenge and structure. My son comes home tired, happy, and can't wait for the next one.",
    rating: 5,
  },
];

const PROGRAMS = [
  { title: "Parent & Toddler", age: "1–3 yrs", desc: "Playful movement sessions that build confidence together.", img: PROGRAM_IMAGES[0] },
  { title: "Preschool", age: "3–5 yrs", desc: "Imaginative circuits developing balance and coordination.", img: PROGRAM_IMAGES[1] },
  { title: "Beginner", age: "5–8 yrs", desc: "Foundation shapes, rolls and jumps on all apparatus.", img: PROGRAM_IMAGES[2] },
  { title: "Intermediate", age: "8–12 yrs", desc: "Progressions on bars, beam, vault and floor.", img: PROGRAM_IMAGES[3] },
  { title: "Advanced", age: "10+ yrs", desc: "Refined technique and confident aerial skills.", img: PROGRAM_IMAGES[4] },
  { title: "Competitive Squad", age: "By invitation", desc: "Regional and national competition pathway.", img: PROGRAM_IMAGES[5] },
  { title: "Holiday Camps", age: "5–12 yrs", desc: "Full days of gymnastics, games and friendships.", img: PROGRAM_IMAGES[6] },
];

const WHY = [
  { icon: Heart, title: "Confidence Building", desc: "Every session is designed to celebrate progress, big or small." },
  { icon: Dumbbell, title: "Physical Development", desc: "Strength, flexibility and coordination through expert progressions." },
  { icon: GraduationCap, title: "Qualified Coaches", desc: "British Gymnastics accredited, DBS checked, paediatric first-aid trained." },
  { icon: Wrench, title: "Modern Equipment", desc: "Full apparatus set with sprung floor and Olympic-standard beam." },
  { icon: Smile, title: "Friendly Environment", desc: "A warm, inclusive club where every child belongs from day one." },
  { icon: ShieldCheck, title: "Safe Training", desc: "Small ratios, thorough risk management and safeguarding first." },
];

const TIMETABLE = [
  { day: "Mon", time: "16:00", cls: "Preschool", age: "3–5", coach: "Priya" },
  { day: "Mon", time: "17:15", cls: "Beginner", age: "5–8", coach: "Isabelle" },
  { day: "Tue", time: "16:30", cls: "Parent & Toddler", age: "1–3", coach: "Priya" },
  { day: "Tue", time: "17:45", cls: "Intermediate", age: "8–12", coach: "Daniel" },
  { day: "Wed", time: "17:00", cls: "Beginner", age: "5–8", coach: "Daniel" },
  { day: "Wed", time: "18:15", cls: "Advanced", age: "10+", coach: "Marco" },
  { day: "Thu", time: "16:30", cls: "Preschool", age: "3–5", coach: "Priya" },
  { day: "Thu", time: "18:00", cls: "Competitive Squad", age: "Invite", coach: "Marco" },
  { day: "Fri", time: "16:15", cls: "Beginner", age: "5–8", coach: "Isabelle" },
  { day: "Sat", time: "09:00", cls: "Parent & Toddler", age: "1–3", coach: "Priya" },
  { day: "Sat", time: "10:15", cls: "Preschool", age: "3–5", coach: "Priya" },
  { day: "Sat", time: "11:30", cls: "Intermediate", age: "8–12", coach: "Daniel" },
];

const PRICING = [
  {
    name: "Free Trial",
    price: "£0",
    tag: "First class on us",
    features: ["One complimentary class", "Full coach assessment", "Meet the team", "Kit checklist"],
    cta: "Book Free Trial",
    highlight: false,
  },
  {
    name: "Monthly Membership",
    price: "£68",
    tag: "Most popular",
    features: ["Weekly 1-hour class", "British Gymnastics registration", "Progress badges & reports", "Family portal access", "Priority holiday camp booking"],
    cta: "Join the Academy",
    highlight: true,
  },
  {
    name: "Competitive Squad",
    price: "£145",
    tag: "By invitation",
    features: ["3× training sessions weekly", "Personal coach mentoring", "Competition entries included", "Strength & conditioning", "Athlete pathway support"],
    cta: "Enquire",
    highlight: false,
  },
];

const FAQS = [
  { q: "What age can my child start gymnastics?", a: "We welcome children from just 12 months in our Parent & Toddler class right through to our senior competitive squad." },
  { q: "Do I need to book a trial before joining?", a: "Yes — a free trial helps our coaches place your child in the perfect class based on age and ability." },
  { q: "What should my child wear?", a: "A leotard or fitted t-shirt with leggings/shorts works best. Long hair tied back and no jewellery, please." },
  { q: "Are your coaches qualified?", a: "All coaches hold British Gymnastics qualifications, are DBS checked and hold paediatric first-aid certificates." },
  { q: "Can parents watch classes?", a: "Absolutely. We have a dedicated viewing area so you can enjoy every wobble, giggle and triumph." },
  { q: "Do you host birthday parties?", a: "Yes! Our themed gymnastics parties include coach-led games, apparatus play and a dedicated party space." },
];

// -------- helpers --------
function useCount(target: number, run: boolean, duration = 1600) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setV(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return v;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
function HomePage() {
  const booking = useBooking();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filterAge, setFilterAge] = useState("All");
  const [filterClass, setFilterClass] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [availabilityCoach, setAvailabilityCoach] = useState(ACADEMY_COACHES[0].slug);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setReviewIdx((i) => (i + 1) % REVIEWS.length), 6500);
    return () => clearInterval(id);
  }, []);

  const navLinks = [
    ["Home", "#home"],
    ["Classes", "#classes"],
    ["Timetable", "#timetable"],
    ["Coaches", "#coaches"],
    ["Holiday Camps", "#camps"],
    ["Birthday Parties", "#parties"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ] as const;

  const ages = ["All", "1–3", "3–5", "5–8", "8–12", "10+", "Invite"];
  const classes = ["All", ...Array.from(new Set(TIMETABLE.map((t) => t.cls)))];
  const filteredTT = TIMETABLE.filter(
    (r) => (filterAge === "All" || r.age === filterAge) && (filterClass === "All" || r.cls === filterClass),
  );

  return (
    <div id="home" className="min-h-screen bg-white text-brand-ink">
      {/* ==================== NAV ==================== */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container-tight">
          <nav
            className={`glass flex items-center justify-between rounded-full px-4 py-2.5 transition-all ${
              scrolled ? "shadow-lg" : ""
            }`}
          >
            <a href="#home" className="flex items-center gap-2 pl-2">
              <span className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-white font-black">K</span>
              <span className="hidden font-display text-sm font-bold leading-tight sm:block">
                Kensington &amp; Chelsea
                <span className="block text-[10px] font-medium tracking-[0.25em] text-muted-foreground">
                  GYMNASTICS ACADEMY
                </span>
              </span>
            </a>
            <ul className="hidden items-center gap-1 xl:flex">
              {navLinks.map(([l, h]) => (
                <li key={l}>
                  <a
                    href={h}
                    className="rounded-full px-3 py-1.5 text-sm font-medium text-brand-ink/80 transition hover:bg-brand-ink/5 hover:text-brand-ink"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => booking.open()}
                className="hidden rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03] hover:shadow-xl sm:inline-flex"
              >
                Book a Free Trial
              </button>
              <button
                aria-label={navOpen ? "Close menu" : "Open menu"}
                onClick={() => setNavOpen((o) => !o)}
                className="grid h-10 w-10 place-items-center rounded-full bg-brand-ink/5 xl:hidden"
              >
                {navOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="container-tight mt-2 xl:hidden"
            >
              <ul className="glass rounded-3xl p-3">
                {navLinks.map(([l, h]) => (
                  <li key={l}>
                    <a
                      href={h}
                      onClick={() => setNavOpen(false)}
                      className="block rounded-2xl px-4 py-2.5 font-medium hover:bg-brand-ink/5"
                    >
                      {l}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={() => { setNavOpen(false); booking.open(); }}
                    className="block w-full rounded-2xl gradient-brand px-4 py-3 text-center font-semibold text-white"
                  >
                    Book a Free Trial
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        {/* soft brand backdrop */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-brand/5" />
        <div
          aria-hidden
          className="absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full opacity-30 blur-3xl gradient-brand"
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full opacity-20 blur-3xl gradient-brand"
        />

        <div className="container-tight grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-3 py-1.5 text-xs font-semibold text-brand shadow-sm">
                <Sparkles size={14} /> British Gymnastics Registered Club
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-4xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
                Helping children build{" "}
                <span className="text-gradient-brand">confidence</span> through gymnastics.
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-ink/70 sm:text-lg">
                Professional gymnastics coaching for children of all ages and abilities in the heart of Kensington &amp; Chelsea — playful,
                safe and built around every child's journey.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => booking.open()}
                  className="group inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:scale-[1.03] hover:shadow-xl"
                >
                  Book Free Trial
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </button>
                <a
                  href="#classes"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-ink/15 bg-white px-6 py-3.5 font-semibold text-brand-ink transition hover:border-brand-ink/40 hover:shadow-md"
                >
                  View Classes
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <div className="flex -space-x-3">
                  {[0, 1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={COACHES[i].img}
                      alt=""
                      className="h-10 w-10 rounded-full border-2 border-white object-cover shadow"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-0.5 text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                    <span className="ml-2 font-semibold text-brand-ink">4.9 / 5</span>
                  </div>
                  <p className="text-brand-ink/60">Rated by 200+ local families</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* hero visual */}
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img src={HERO_IMG} alt="Young gymnast training on beam" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-ink/40 via-transparent to-transparent" />
              </div>

              {/* floating review card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="glass absolute -left-4 bottom-8 max-w-[16rem] rounded-2xl p-4 sm:-left-8"
              >
                <div className="flex items-center gap-0.5 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-brand-ink/80">
                  "The coaches are patient, energetic and genuinely care about every child."
                </p>
                <p className="mt-1 text-[10px] font-semibold text-brand-ink/60">— Sophia, parent</p>
              </motion.div>

              {/* floating trust badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="glass absolute -right-3 top-8 flex items-center gap-2 rounded-full px-3 py-2 sm:-right-6"
              >
                <ShieldCheck size={16} className="text-brand" />
                <span className="text-xs font-semibold">DBS · First-Aid Certified</span>
              </motion.div>

              {/* stat chip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="glass absolute -bottom-6 right-6 rounded-2xl px-4 py-3 text-center"
              >
                <div className="font-display text-2xl font-black text-gradient-brand">15+</div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-ink/60">Years Coaching</div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== TRUST STRIP ==================== */}
      <section className="border-y border-brand-ink/5 bg-brand-ink/[0.02] py-10">
        <div className="container-tight grid grid-cols-2 gap-y-6 text-sm sm:grid-cols-3 lg:grid-cols-6">
          {[
            [GraduationCap, "Experienced Coaches"],
            [ShieldCheck, "Safe Environment"],
            [Users, "Small Class Sizes"],
            [Heart, "Beginner Friendly"],
            [Trophy, "Competitive Programmes"],
            [Smile, "Family Focused"],
          ].map(([Icon, label], i) => (
            <Reveal key={label as string} delay={i * 0.05}>
              <div className="flex items-center gap-2 text-brand-ink/80">
                <Icon className="text-brand" size={20} />
                <span className="font-medium">{label as string}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <StatsSection />

      {/* ==================== PROGRAMS ==================== */}
      <section id="classes" className="py-24">
        <div className="container-tight">
          <SectionHead
            eyebrow="Our Programmes"
            title={<>A pathway <span className="text-gradient-brand">for every child</span></>}
            sub="From wobbly first steps to competitive squad — thoughtfully designed classes for every age and ambition."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACADEMY_PROGRAMS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  to="/classes/$slug"
                  params={{ slug: p.slug }}
                  className="group relative block h-full overflow-hidden rounded-3xl border border-brand-ink/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <img src={p.hero} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-ink backdrop-blur">
                      {p.age}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{p.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand transition group-hover:gap-2">
                      View class <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY US ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand/5 via-white to-brand-purple/5 py-24">
        <div className="container-tight">
          <SectionHead
            eyebrow="Why Families Choose Us"
            title={<>Where children learn <span className="text-gradient-brand">to leap</span></>}
            sub="Every detail of our academy is designed around your child's growth — physically, socially and emotionally."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="group h-full rounded-3xl border border-white/60 bg-white/70 p-7 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-brand text-white shadow-md">
                    <w.icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COACHES ==================== */}
      <section id="coaches" className="py-24">
        <div className="container-tight">
          <SectionHead
            eyebrow="Meet the Team"
            title={<>Coaches who <span className="text-gradient-brand">believe in every child</span></>}
            sub="A close-knit team of British Gymnastics qualified coaches, safeguarding-trained and endlessly patient."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COACHES.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05}>
                <article className="group h-full overflow-hidden rounded-3xl border border-brand-ink/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="aspect-square overflow-hidden">
                    <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold">{c.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand">{c.role}</p>
                    <div className="mt-3 space-y-1 text-xs text-brand-ink/70">
                      <p><Check size={12} className="mr-1 inline text-brand-gold" />{c.quals}</p>
                      <p><Check size={12} className="mr-1 inline text-brand-gold" />{c.exp}</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">{c.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="relative overflow-hidden bg-brand-ink py-24 text-white">
        <div aria-hidden className="absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand/30 blur-3xl" />
        <div aria-hidden className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-brand-purple/30 blur-3xl" />
        <div className="container-tight relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <Star size={12} fill="currentColor" className="text-brand-gold" /> Parent Testimonials
            </span>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-black sm:text-5xl">
              Loved by families across <span className="text-gradient-brand">Kensington &amp; Chelsea</span>
            </h2>
          </div>

          <div className="relative mx-auto mt-14 max-w-3xl">
            <div className="relative min-h-[16rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={reviewIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="glass-dark rounded-3xl p-8 text-center sm:p-10"
                >
                  <div className="mb-4 flex justify-center gap-1 text-brand-gold">
                    {[...Array(REVIEWS[reviewIdx].rating)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="font-display text-xl leading-relaxed sm:text-2xl">
                    "{REVIEWS[reviewIdx].text}"
                  </p>
                  <footer className="mt-6 text-sm font-semibold text-white/70">
                    — {REVIEWS[reviewIdx].name}, verified Google review
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show review ${i + 1}`}
                  onClick={() => setReviewIdx(i)}
                  className={`h-2 rounded-full transition-all ${i === reviewIdx ? "w-8 bg-brand-gold" : "w-2 bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== GALLERY ==================== */}
      <section className="py-24">
        <div className="container-tight">
          <SectionHead
            eyebrow="Life at the Academy"
            title={<>Moments from <span className="text-gradient-brand">our gym</span></>}
            sub="Real photography from classes, camps and competitions — the joy speaks for itself."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {GALLERY.map((src, i) => (
              <Reveal key={src} delay={i * 0.04}>
                <button
                  onClick={() => setLightbox(src)}
                  className={`group relative block w-full overflow-hidden rounded-2xl bg-brand-ink/5 ${
                    i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  <img src={src} alt="Gymnastics class moment" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-brand-ink/0 transition group-hover:bg-brand-ink/30" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-brand-ink/90 p-4 backdrop-blur"
          >
            <button aria-label="Close" className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white">
              <X />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightbox}
              alt=""
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== TIMETABLE ==================== */}
      <section id="timetable" className="bg-brand-ink/[0.02] py-24">
        <div className="container-tight">
          <SectionHead
            eyebrow="Weekly Schedule"
            title={<>Find your <span className="text-gradient-brand">perfect class</span></>}
            sub="Filter by age or programme to plan your week."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <FilterGroup label="Age" options={ages} value={filterAge} onChange={setFilterAge} />
            <FilterGroup label="Class" options={classes} value={filterClass} onChange={setFilterClass} />
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-brand-ink/5 bg-white shadow-sm">
            <div className="hidden grid-cols-[80px_100px_1fr_100px_130px] gap-4 border-b border-brand-ink/5 bg-brand-ink/[0.03] px-6 py-3 text-xs font-bold uppercase tracking-widest text-brand-ink/60 sm:grid">
              <div>Day</div><div>Time</div><div>Class</div><div>Age</div><div>Coach</div>
            </div>
            <ul>
              <AnimatePresence initial={false}>
                {filteredTT.map((r, i) => (
                  <motion.li
                    key={`${r.day}-${r.time}-${r.cls}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`grid grid-cols-2 gap-2 border-b border-brand-ink/5 px-6 py-4 text-sm sm:grid-cols-[80px_100px_1fr_100px_130px] sm:gap-4 ${
                      i % 2 ? "bg-brand-ink/[0.015]" : ""
                    }`}
                  >
                    <div className="font-bold text-brand">{r.day}</div>
                    <div className="flex items-center gap-1.5 text-brand-ink/70"><Clock size={12} />{r.time}</div>
                    <div className="col-span-2 font-semibold sm:col-span-1">{r.cls}</div>
                    <div className="text-brand-ink/70">{r.age}</div>
                    <div className="text-brand-ink/70">{r.coach}</div>
                  </motion.li>
                ))}
              </AnimatePresence>
              {filteredTT.length === 0 && (
                <li className="px-6 py-10 text-center text-sm text-brand-ink/60">No classes match this filter.</li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== CAMPS & PARTIES ==================== */}
      <section id="camps" className="py-24">
        <div className="container-tight grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-purple p-8 text-white shadow-xl sm:p-10">
              <Calendar className="mb-4" />
              <h3 className="font-display text-3xl font-black">Holiday Camps</h3>
              <p className="mt-2 max-w-md text-white/85">
                Half-term and school holiday camps packed with gymnastics, games, arts &amp; crafts and new friendships. Full and half-day
                options available.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Ages 5–12", "Qualified coaches on-site", "Small groups", "Healthy snacks provided"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-brand-gold" />{f}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25">
                Reserve a spot <ArrowRight size={14} />
              </a>
              <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div id="parties" className="group relative overflow-hidden rounded-[2rem] border border-brand-ink/5 bg-white p-8 shadow-sm sm:p-10">
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-brand text-white">
                <PartyPopper size={22} />
              </div>
              <h3 className="mt-4 font-display text-3xl font-black">Birthday Parties</h3>
              <p className="mt-2 max-w-md text-brand-ink/70">
                Unforgettable gymnastics birthday parties led by our coaches — tumbling games, apparatus play and a dedicated party
                room for cake and celebrations.
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {["90-minute private hire", "Coach-led activities", "Party invites included", "Suitable ages 4–11"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check size={14} className="text-brand" />{f}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-ink/15 px-5 py-2.5 text-sm font-semibold transition hover:border-brand-ink/40">
                Enquire about parties <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section className="bg-gradient-to-b from-white to-brand/5 py-24">
        <div className="container-tight">
          <SectionHead
            eyebrow="Membership"
            title={<>Simple, honest <span className="text-gradient-brand">pricing</span></>}
            sub="Cancel any time. All memberships include British Gymnastics registration and family portal access."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PRICING.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl p-8 shadow-sm transition hover:-translate-y-1 ${
                    p.highlight
                      ? "gradient-brand text-white shadow-2xl shadow-brand/30"
                      : "border border-brand-ink/5 bg-white"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-ink shadow">
                      Most popular
                    </span>
                  )}
                  <div className={`text-xs font-semibold uppercase tracking-widest ${p.highlight ? "text-white/80" : "text-brand"}`}>
                    {p.tag}
                  </div>
                  <h3 className={`mt-2 font-display text-2xl font-black ${p.highlight ? "text-white" : ""}`}>{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-5xl font-black">{p.price}</span>
                    <span className={p.highlight ? "text-white/70" : "text-brand-ink/60"}>/ month</span>
                  </div>
                  <ul className={`mt-6 flex-1 space-y-3 text-sm ${p.highlight ? "text-white/90" : "text-brand-ink/80"}`}>
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check size={16} className={p.highlight ? "mt-0.5 shrink-0 text-brand-gold" : "mt-0.5 shrink-0 text-brand"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                      p.highlight
                        ? "bg-white text-brand-ink hover:bg-brand-gold hover:text-brand-ink"
                        : "gradient-brand text-white hover:scale-[1.02]"
                    }`}
                  >
                    {p.cta} <ArrowRight size={14} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="py-24">
        <div className="container-tight grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHead
              align="left"
              eyebrow="FAQ"
              title={<>Answers for <span className="text-gradient-brand">curious parents</span></>}
              sub="Can't find what you're looking for? Send us a message — we usually reply the same day."
            />
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-md">
              Ask us a question <ArrowRight size={14} />
            </a>
          </div>
          <ul className="space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl border border-brand-ink/5 bg-white px-5 py-4 text-left shadow-sm transition hover:border-brand/30"
                  >
                    <span className="font-semibold">{f.q}</span>
                    <ChevronDown className={`shrink-0 transition ${open ? "rotate-180 text-brand" : "text-brand-ink/40"}`} size={18} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 py-4 text-sm leading-relaxed text-brand-ink/70">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="bg-brand-ink py-24 text-white">
        <div className="container-tight grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest">
              Get in touch
            </span>
            <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl">
              Book your child's <span className="text-gradient-brand">free trial</span>
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Tell us a little about your child and we'll find the perfect class. Our team usually replies within one working day.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <ContactRow icon={MapPin} label="Kensington &amp; Chelsea, London" />
              <ContactRow icon={Phone} label="+44 20 0000 0000" />
              <ContactRow icon={Mail} label="hello@kcgymnastics.co.uk" />
              <ContactRow icon={MessageCircle} label="WhatsApp us anytime" />
            </div>

            <div className="glass-dark mt-6 aspect-[16/9] w-full overflow-hidden rounded-3xl">
              <iframe
                title="Kensington & Chelsea location map"
                src="https://www.google.com/maps?q=Kensington+and+Chelsea+London&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch shortly."); }}
            className="glass-dark space-y-4 rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Parent name" name="parent" />
              <Field label="Child's name" name="child" />
              <Field label="Child's age" name="age" type="number" />
              <Field label="Preferred class" name="class" />
            </div>
            <Field label="Email address" name="email" type="email" />
            <Field label="Phone" name="phone" type="tel" />
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/70">Message</label>
              <textarea
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:border-brand-gold focus:outline-none"
                placeholder="Anything else we should know?"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full gradient-brand px-5 py-3.5 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Send enquiry <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </button>
            <p className="text-center text-[11px] text-white/50">By submitting you agree to our privacy policy.</p>
          </form>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-brand-ink pb-12 pt-16 text-white">
        <div className="container-tight grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full gradient-brand font-black">K</span>
              <div className="font-display font-bold leading-tight">
                Kensington &amp; Chelsea
                <span className="block text-[10px] font-medium tracking-[0.25em] text-white/60">GYMNASTICS ACADEMY</span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/60">
              Building confidence, strength and lifelong friendships through gymnastics in the heart of London.
            </p>
          </div>
          <FooterCol title="Quick Links" items={[
            ["Home", "#home"], ["Classes", "#classes"], ["Timetable", "#timetable"], ["Coaches", "#coaches"], ["FAQ", "#faq"],
          ]} />
          <FooterCol title="Programmes" items={[
            ["Holiday Camps", "#camps"], ["Birthday Parties", "#parties"], ["Competitive Squad", "#classes"], ["Pricing", "#contact"],
          ]} />
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">Stay in the loop</h4>
            <p className="mt-3 text-sm text-white/60">Termly news, camp dates and events straight to your inbox.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
              <input type="email" placeholder="you@email.com" className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm placeholder:text-white/40 focus:border-brand-gold focus:outline-none" />
              <button className="rounded-full gradient-brand px-4 py-2.5 text-sm font-semibold">Join</button>
            </form>
            <div className="mt-4 flex gap-3 text-xs text-white/50">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Safeguarding</a>
            </div>
          </div>
        </div>

        {/* =========================== BIG 6 DEV Footer =========================== */}
        <div className="mt-12 border-t border-white/10">
          <div className="container-tight py-8 flex flex-col items-center gap-5">
            <p className="text-center text-xs text-white/60">
              © {new Date().getFullYear()} Kensington &amp; Chelsea Gymnastics Academy. Redesign concept by BIG6 LOOPSSPACE. All Rights Reserved.
            </p>

            <div className="flex items-center gap-6">
              <a href="mailto:anookohrobert8@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email BIG 6 DEV" className="transition hover:scale-110">
                <img src="https://cdn.simpleicons.org/gmail" alt="Gmail" className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@roberthit911" target="_blank" rel="noopener noreferrer" aria-label="BIG 6 DEV TikTok" className="transition hover:scale-110">
                <img src="https://cdn.simpleicons.org/tiktok" alt="TikTok" className="w-5 h-5" />
              </a>
              <a href="https://github.com/Robert911hit" target="_blank" rel="noopener noreferrer" aria-label="BIG 6 DEV GitHub" className="transition hover:scale-110">
                <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" className="w-5 h-5" />
              </a>
              <a href="https://wa.me/2349036630568?text=Hi%20BIG%206%20DEV,%20I%20saw%20your%20website%20footer%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" aria-label="Chat with BIG 6 DEV on WhatsApp" className="transition hover:scale-110">
                <img src="https://cdn.simpleicons.org/whatsapp" alt="WhatsApp" className="w-5 h-5" />
              </a>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold tracking-[0.3em] text-white">BIG 6 DEV</h3>
              <p className="text-xs text-white/70">Designed &amp; Developed by BIG 6 DEV</p>
              <p className="text-xs text-white/50">Innovative Websites • Premium UI/UX • Modern Web Solutions</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== MOBILE STICKY CTA ==================== */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-ink/10 bg-white/90 p-3 backdrop-blur-lg md:hidden">
        <div className="flex gap-2">
          <a href="tel:+442000000000" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand-ink/10 text-brand-ink">
            <Phone size={18} />
          </a>
          <a href="#contact" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full gradient-brand px-4 py-3 font-semibold text-white shadow-md">
            Book Free Trial <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* ==================== FLOATING WHATSAPP ==================== */}
      <a
        href="https://wa.me/442000000000?text=Hi%20K%26C%20Gymnastics%2C%20I'd%20like%20to%20book%20a%20free%20trial."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-24 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 md:bottom-6"
      >
        <MessageCircle />
        <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-brand-gold text-[9px] font-black text-brand-ink">1</span>
      </a>
    </div>
  );
}

// ============================================================================
function SectionHead({
  eyebrow, title, sub, align = "center",
}: { eyebrow: string; title: React.ReactNode; sub: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-3xl font-black leading-tight sm:text-5xl">{title}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 text-base leading-relaxed text-brand-ink/70">{sub}</p>
      </Reveal>
    </div>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const stats = [
    { v: useCount(1000, inView), suf: "+", label: "Happy Students" },
    { v: useCount(15, inView), suf: "+", label: "Years Experience" },
    { v: useCount(98, inView), suf: "%", label: "Parent Satisfaction" },
    { v: useCount(100, inView), suf: "+", label: "Weekly Classes" },
  ];
  return (
    <section ref={ref} className="py-20">
      <div className="container-tight grid gap-8 rounded-[2rem] border border-brand-ink/5 bg-white p-8 shadow-sm sm:grid-cols-2 sm:p-12 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-5xl font-black text-gradient-brand sm:text-6xl">
              {s.v.toLocaleString()}{s.suf}
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-brand-ink/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-ink/60">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              value === o
                ? "border-transparent gradient-brand text-white shadow"
                : "border-brand-ink/10 bg-white text-brand-ink/70 hover:border-brand/40 hover:text-brand"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label }: { icon: React.ComponentType<{ size?: number }>; label: string }) {
  return (
    <div className="glass-dark flex items-center gap-3 rounded-2xl px-4 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl gradient-brand"><Icon size={16} /></span>
      <span className="text-sm text-white/85" dangerouslySetInnerHTML={{ __html: label }} />
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/70">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:border-brand-gold focus:outline-none"
      />
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-bold uppercase tracking-widest text-white/80">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-white/60">
        {items.map(([l, h]) => (
          <li key={l}><a href={h} className="transition hover:text-white">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
