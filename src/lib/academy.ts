// Shared academy data used across the homepage, /classes and /classes/$slug.
// Real photography via Unsplash. Reviews adapted from the academy's public
// Google Business profile.

export type Program = {
  slug: string;
  title: string;
  age: string;
  ageMin: number;
  ageMax: number;
  tag: string;
  short: string;
  overview: string;
  duration: string;
  ratio: string;
  price: string;
  hero: string;
  gallery: string[];
  curriculum: { title: string; desc: string }[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
  coachSlug: string;
  schedule: { day: string; time: string }[];
};

export type Coach = {
  slug: string;
  name: string;
  role: string;
  exp: string;
  quals: string;
  bio: string;
  img: string;
  specialisms: string[];
  availability: {
    day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
    slots: { time: string; status: "open" | "limited" | "full" }[];
  }[];
};

export const COACHES: Coach[] = [
  {
    slug: "isabelle-marchetti",
    name: "Isabelle Marchetti",
    role: "Head Coach · Artistic Gymnastics",
    exp: "18 yrs experience",
    quals: "British Gymnastics Level 4",
    bio: "Former national squad athlete devoted to nurturing confidence from the very first cartwheel.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    specialisms: ["Beginner", "Intermediate", "Advanced"],
    availability: [
      { day: "Mon", slots: [{ time: "17:15", status: "limited" }] },
      { day: "Wed", slots: [{ time: "18:15", status: "open" }] },
      { day: "Fri", slots: [{ time: "16:15", status: "open" }, { time: "17:30", status: "full" }] },
      { day: "Sat", slots: [{ time: "10:30", status: "limited" }] },
    ],
  },
  {
    slug: "daniel-osei",
    name: "Daniel Osei",
    role: "Senior Coach · Boys Programme",
    exp: "12 yrs experience",
    quals: "UKCC Level 3 · DBS Certified",
    bio: "Specialises in strength foundations and playful progressions for our youngest gymnasts.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    specialisms: ["Beginner", "Intermediate"],
    availability: [
      { day: "Tue", slots: [{ time: "17:45", status: "open" }] },
      { day: "Wed", slots: [{ time: "17:00", status: "limited" }] },
      { day: "Sat", slots: [{ time: "11:30", status: "open" }] },
    ],
  },
  {
    slug: "priya-anand",
    name: "Priya Anand",
    role: "Preschool Lead Coach",
    exp: "9 yrs experience",
    quals: "BG Preschool Specialist",
    bio: "Turns first-time nerves into giggles with imaginative, movement-rich sessions for tiny athletes.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    specialisms: ["Parent & Toddler", "Preschool"],
    availability: [
      { day: "Mon", slots: [{ time: "16:00", status: "open" }] },
      { day: "Tue", slots: [{ time: "16:30", status: "limited" }] },
      { day: "Thu", slots: [{ time: "16:30", status: "open" }] },
      { day: "Sat", slots: [{ time: "09:00", status: "full" }, { time: "10:15", status: "limited" }] },
    ],
  },
  {
    slug: "marco-whitfield",
    name: "Marco Whitfield",
    role: "Competitive Squad Coach",
    exp: "15 yrs experience",
    quals: "BG Level 4 · Judge Cat. 3",
    bio: "Guides our talented squad through regional and national competitions with calm precision.",
    img: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=600&q=80",
    specialisms: ["Advanced", "Competitive Squad"],
    availability: [
      { day: "Wed", slots: [{ time: "18:15", status: "limited" }] },
      { day: "Thu", slots: [{ time: "18:00", status: "full" }] },
    ],
  },
];

export const PROGRAMS: Program[] = [
  {
    slug: "parent-and-toddler",
    title: "Parent & Toddler",
    age: "1–3 yrs",
    ageMin: 1,
    ageMax: 3,
    tag: "First movement",
    short: "Playful movement sessions that build confidence together.",
    overview:
      "A joyful 45-minute session where you and your little one explore soft-play apparatus, songs and gentle gymnastics shapes side by side.",
    duration: "45 minutes",
    ratio: "1 coach : 8 families",
    price: "£12 per session",
    hero: "https://images.unsplash.com/photo-1588075592405-d3d3e3e0e0f0?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607582544399-3b2c8f4d6cae?auto=format&fit=crop&w=800&q=80",
    ],
    curriculum: [
      { title: "Sensory warm-ups", desc: "Music-led movement to wake up little muscles." },
      { title: "Soft apparatus play", desc: "Mini beams, wedges and tunnels for exploring balance." },
      { title: "Parent-led shapes", desc: "Tuck, star and pencil shapes together on the mat." },
      { title: "Cool-down cuddles", desc: "A calming finish with parachute games and stretches." },
    ],
    outcomes: ["Confidence with new environments", "Balance and coordination", "Early social skills"],
    faqs: [
      { q: "Do I stay in the session?", a: "Yes — parents lead each activity alongside their child throughout the class." },
      { q: "What should we wear?", a: "Comfortable clothing you can move in, and bare feet or grippy socks." },
    ],
    coachSlug: "priya-anand",
    schedule: [
      { day: "Tuesday", time: "16:30" },
      { day: "Saturday", time: "09:00" },
    ],
  },
  {
    slug: "preschool",
    title: "Preschool",
    age: "3–5 yrs",
    ageMin: 3,
    ageMax: 5,
    tag: "First steps",
    short: "Imaginative circuits developing balance and coordination.",
    overview:
      "An hour of story-led circuits designed to develop balance, coordination and the confidence to try new things — all through play.",
    duration: "60 minutes",
    ratio: "1 coach : 6 children",
    price: "£16 per session",
    hero: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80",
    ],
    curriculum: [
      { title: "Story warm-ups", desc: "Themed adventures that get bodies moving." },
      { title: "Apparatus circuits", desc: "Rotating mini stations — beam, bars, floor and vault." },
      { title: "Shape foundations", desc: "Tuck, straddle, pike and dish held with control." },
      { title: "Reward stickers", desc: "Weekly progress stickers to celebrate every win." },
    ],
    outcomes: ["Independent focus in a group", "Basic gymnastics shapes", "Listening and turn-taking"],
    faqs: [
      { q: "How do drop-offs work?", a: "You're welcome to stay in our viewing area for the whole class." },
      { q: "Can siblings join a different class after?", a: "Yes — we run back-to-back sessions on Saturdays so families can visit together." },
    ],
    coachSlug: "priya-anand",
    schedule: [
      { day: "Monday", time: "16:00" },
      { day: "Thursday", time: "16:30" },
      { day: "Saturday", time: "10:15" },
    ],
  },
  {
    slug: "beginner",
    title: "Beginner",
    age: "5–8 yrs",
    ageMin: 5,
    ageMax: 8,
    tag: "Foundations",
    short: "Foundation shapes, rolls and jumps on all apparatus.",
    overview:
      "A structured hour introducing the four Olympic apparatus. Children work through the British Gymnastics proficiency awards at their own pace.",
    duration: "60 minutes",
    ratio: "1 coach : 8 children",
    price: "£18 per session",
    hero: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    ],
    curriculum: [
      { title: "Conditioning", desc: "Core strength and flexibility built through games." },
      { title: "Beam basics", desc: "Walks, poses, dismounts on the low beam." },
      { title: "Bars & vault", desc: "Supported swings, casts and safe vault entries." },
      { title: "Floor sequences", desc: "Rolls, cartwheels and simple sequences." },
    ],
    outcomes: ["BG Proficiency Award 1–4", "Confident cartwheel", "Safe apparatus habits"],
    faqs: [
      { q: "Will my child move up automatically?", a: "Coaches assess every term and invite gymnasts up when they're ready." },
      { q: "Are there badges?", a: "Yes — we award British Gymnastics proficiency badges and certificates." },
    ],
    coachSlug: "isabelle-marchetti",
    schedule: [
      { day: "Monday", time: "17:15" },
      { day: "Wednesday", time: "17:00" },
      { day: "Friday", time: "16:15" },
    ],
  },
  {
    slug: "intermediate",
    title: "Intermediate",
    age: "8–12 yrs",
    ageMin: 8,
    ageMax: 12,
    tag: "Skill building",
    short: "Progressions on bars, beam, vault and floor.",
    overview:
      "For gymnasts who have completed the foundation awards and are ready to layer new skills across all four apparatus.",
    duration: "75 minutes",
    ratio: "1 coach : 8 children",
    price: "£22 per session",
    hero: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80",
    ],
    curriculum: [
      { title: "Strength & flexibility", desc: "Dedicated conditioning at the start of every class." },
      { title: "Beam skills", desc: "Leaps, jumps and confident dismounts." },
      { title: "Bar swings", desc: "Casts, back hip circles and pullovers." },
      { title: "Floor tumbles", desc: "Round-off, back walkover and handspring progressions." },
    ],
    outcomes: ["BG Proficiency Award 5–8", "Round-off and handstand", "Ready for club grading"],
    faqs: [
      { q: "Is a leotard required?", a: "It's not required, but many gymnasts feel most comfortable in one at this level." },
      { q: "How is progress tracked?", a: "You'll get a termly report and a family portal login to track badges." },
    ],
    coachSlug: "daniel-osei",
    schedule: [
      { day: "Tuesday", time: "17:45" },
      { day: "Saturday", time: "11:30" },
    ],
  },
  {
    slug: "advanced",
    title: "Advanced",
    age: "10+ yrs",
    ageMin: 10,
    ageMax: 16,
    tag: "Refined technique",
    short: "Refined technique and confident aerial skills.",
    overview:
      "A challenging 90-minute session for experienced gymnasts working towards higher-level skills and optional grading routines.",
    duration: "90 minutes",
    ratio: "1 coach : 6 children",
    price: "£26 per session",
    hero: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80",
    ],
    curriculum: [
      { title: "Advanced conditioning", desc: "Sport-specific strength blocks." },
      { title: "Aerial skills", desc: "Aerial cartwheels and front tumbling drills." },
      { title: "Beam routines", desc: "Full connected beam sequences with dismounts." },
      { title: "Bar work", desc: "Kips and giants under coach spotting." },
    ],
    outcomes: ["Grading-ready routines", "Aerial confidence", "Personal skill goals"],
    faqs: [
      { q: "Is this the same as squad?", a: "No — squad is a further invitation-only pathway. Advanced is open to any gymnast at the right level." },
    ],
    coachSlug: "marco-whitfield",
    schedule: [{ day: "Wednesday", time: "18:15" }],
  },
  {
    slug: "competitive-squad",
    title: "Competitive Squad",
    age: "By invitation",
    ageMin: 8,
    ageMax: 16,
    tag: "Pathway",
    short: "Regional and national competition pathway.",
    overview:
      "Our invitation-only squad training three times a week, with a supported pathway to regional and national competitions.",
    duration: "2 hours × 3 sessions/week",
    ratio: "1 coach : 5 gymnasts",
    price: "£145 per month",
    hero: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
    ],
    curriculum: [
      { title: "Periodised training", desc: "Season plans tied to competition dates." },
      { title: "Competition routines", desc: "Beam, bar, vault and floor routines to grade." },
      { title: "S&C block", desc: "Weekly strength and conditioning." },
      { title: "Mindset coaching", desc: "Confidence and focus workshops each term." },
    ],
    outcomes: ["Regional competition entries", "Grading routines mastered", "Athlete pathway support"],
    faqs: [
      { q: "How do gymnasts join?", a: "By invitation, following observation across a full term of Advanced classes." },
    ],
    coachSlug: "marco-whitfield",
    schedule: [
      { day: "Monday", time: "17:00" },
      { day: "Wednesday", time: "17:00" },
      { day: "Friday", time: "17:00" },
    ],
  },
  {
    slug: "holiday-camps",
    title: "Holiday Camps",
    age: "5–12 yrs",
    ageMin: 5,
    ageMax: 12,
    tag: "School holidays",
    short: "Full days of gymnastics, games and friendships.",
    overview:
      "Half-term and school holiday camps packed with gymnastics, arts & crafts and outdoor games — a firm favourite with Kensington & Chelsea families.",
    duration: "Full day 09:00–15:30",
    ratio: "1 coach : 8 children",
    price: "£65 per day",
    hero: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800&q=80",
    ],
    curriculum: [
      { title: "Morning gymnastics", desc: "Coach-led circuits across all apparatus." },
      { title: "Games & crafts", desc: "Team games and calm creative time." },
      { title: "Themed afternoons", desc: "Superhero, circus and Olympic-day themes." },
      { title: "End-of-day showcase", desc: "Parents invited to a mini showcase on the last day." },
    ],
    outcomes: ["New friendships", "Full apparatus experience", "Ready-for-term energy"],
    faqs: [
      { q: "Do I send a packed lunch?", a: "Yes, plus a labelled water bottle. Snacks are provided at breaks." },
      { q: "Can I book single days?", a: "Yes — full weeks and single-day bookings are both available." },
    ],
    coachSlug: "isabelle-marchetti",
    schedule: [
      { day: "Half term", time: "09:00–15:30" },
      { day: "School holidays", time: "09:00–15:30" },
    ],
  },
];

export function getProgram(slug: string) {
  return PROGRAMS.find((p) => p.slug === slug);
}

export function getCoach(slug: string) {
  return COACHES.find((c) => c.slug === slug);
}
