import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Calendar, Check, Clock, Users, ChevronDown, ShieldCheck, Sparkles,
} from "lucide-react";
import { getProgram, getCoach, PROGRAMS } from "@/lib/academy";
import { CoachAvailability } from "@/components/CoachAvailability";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/classes/$slug")({
  loader: ({ params }) => {
    const program = getProgram(params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Class not found — K&C Gymnastics" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.program;
    const title = `${p.title} Gymnastics Class (${p.age}) — K&C Gymnastics Academy`;
    const desc = `${p.short} Small-group ${p.title.toLowerCase()} gymnastics classes in Kensington & Chelsea. ${p.ratio}, ${p.duration}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: p.hero },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/classes/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.hero },
      ],
      links: [{ rel: "canonical", href: `/classes/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: `${p.title} Gymnastics`,
            description: p.overview,
            provider: {
              "@type": "SportsActivityLocation",
              name: "Kensington & Chelsea Gymnastics Academy",
              address: { "@type": "PostalAddress", addressLocality: "Kensington & Chelsea", addressRegion: "London", addressCountry: "GB" },
            },
            audience: { "@type": "PeopleAudience", suggestedMinAge: p.ageMin, suggestedMaxAge: p.ageMax },
            offers: { "@type": "Offer", price: p.price.replace(/[^0-9.]/g, ""), priceCurrency: "GBP" },
          }),
        },
      ],
    };
  },
  component: ClassDetailPage,
  notFoundComponent: ClassNotFound,
  errorComponent: ClassError,
});

function ClassDetailPage() {
  const { program } = Route.useLoaderData();
  const coach = getCoach(program.coachSlug);
  const booking = useBooking();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-white pb-24 text-brand-ink">
      {/* Hero */}
      <section className="relative overflow-hidden pt-8">
        <div className="container-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink/70 transition hover:text-brand"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
                <Sparkles size={12} /> {program.tag} · {program.age}
              </span>
              <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] sm:text-6xl">
                {program.title} <span className="text-gradient-brand">Gymnastics</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-ink/70 sm:text-lg">
                {program.overview}
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-4 rounded-3xl border border-brand-ink/5 bg-white p-5 shadow-sm">
                <Stat icon={Clock} label="Session" value={program.duration} />
                <Stat icon={Users} label="Group size" value={program.ratio} />
                <Stat icon={Calendar} label="Price" value={program.price} />
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="gradient-brand text-white shadow-lg shadow-brand/30 hover:scale-[1.02]"
                  onClick={() => booking.open({ programSlug: program.slug })}
                >
                  Book a free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#availability">See availability</a>
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl"
            >
              <img src={program.hero} alt={`${program.title} gymnastics class`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-ink/40 via-transparent to-transparent" />
              <div className="glass absolute bottom-6 left-6 right-6 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <ShieldCheck size={16} className="text-brand" />
                  British Gymnastics registered · DBS-checked coaches
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20">
        <div className="container-tight">
          <h2 className="font-display text-3xl font-black sm:text-4xl">
            What a session <span className="text-gradient-brand">looks like</span>
          </h2>
          <p className="mt-3 max-w-xl text-brand-ink/70">
            Every {program.title.toLowerCase()} class follows a proven structure — warm-up, skill blocks and a cool-down.
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {program.curriculum.map((c: { title: string; desc: string }, i: number) => (
              <li key={c.title} className="rounded-3xl border border-brand-ink/5 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full gradient-brand text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg font-bold">{c.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-brand-ink/70">{c.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Outcomes + coach availability */}
      <section id="availability" className="bg-gradient-to-b from-white to-brand/5 py-20">
        <div className="container-tight grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-3xl font-black sm:text-4xl">
              What your child will <span className="text-gradient-brand">take away</span>
            </h2>
            <ul className="mt-6 space-y-3">
              {program.outcomes.map((o: string) => (
                <li key={o} className="flex items-start gap-3 rounded-2xl border border-brand-ink/5 bg-white p-4 shadow-sm">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full gradient-brand text-white">
                    <Check size={12} />
                  </span>
                  <span className="text-sm text-brand-ink/80">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {coach && (
            <div>
              <h3 className="mb-4 font-display text-lg font-bold">Lead coach availability</h3>
              <CoachAvailability
                coach={coach}
                onSelect={() => booking.open({ programSlug: program.slug, coachSlug: coach.slug })}
              />
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container-tight max-w-3xl">
          <h2 className="font-display text-3xl font-black sm:text-4xl">Frequently asked</h2>
          <ul className="mt-8 space-y-3">
            {program.faqs.map((f: { q: string; a: string }, i: number) => {
              const open = openFaq === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl border border-brand-ink/5 bg-white px-5 py-4 text-left shadow-sm transition hover:border-brand/30"
                  >
                    <span className="font-semibold">{f.q}</span>
                    <ChevronDown size={18} className={`transition ${open ? "rotate-180 text-brand" : "text-brand-ink/40"}`} />
                  </button>
                  {open && <p className="px-5 py-4 text-sm leading-relaxed text-brand-ink/70">{f.a}</p>}
                </li>
              );
            })}
          </ul>

          <div className="mt-12 rounded-3xl gradient-brand p-8 text-white sm:p-10">
            <h3 className="font-display text-2xl font-black">Ready to give {program.title.toLowerCase()} a try?</h3>
            <p className="mt-2 text-white/85">
              Your child's first session is on us — no payment required to book.
            </p>
            <Button
              size="lg"
              className="mt-5 bg-white text-brand-ink hover:bg-brand-gold"
              onClick={() => booking.open({ programSlug: program.slug })}
            >
              Book a free trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ size?: number }>; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-ink/60">
        <Icon size={12} /> {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold">{value}</dd>
    </div>
  );
}

function ClassNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white p-6 text-center">
      <div>
        <h1 className="font-display text-4xl font-black">Class not found</h1>
        <p className="mt-3 text-muted-foreground">The class you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/" className="rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-white">Home</Link>
          <Link to="/classes" className="rounded-full border border-input px-5 py-2.5 text-sm font-semibold">All classes</Link>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {PROGRAMS.slice(0, 4).map((p) => (
            <Link key={p.slug} to="/classes/$slug" params={{ slug: p.slug }} className="rounded-full border border-input px-3 py-1.5 text-xs font-semibold hover:border-brand">
              {p.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

function ClassError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-white p-6 text-center">
      <div>
        <h1 className="font-display text-3xl font-black">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">This class page didn't load.</p>
        <button onClick={reset} className="mt-6 rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-white">
          Try again
        </button>
      </div>
    </main>
  );
}
