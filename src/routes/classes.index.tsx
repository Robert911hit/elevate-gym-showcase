import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PROGRAMS } from "@/lib/academy";

export const Route = createFileRoute("/classes/")({
  head: () => ({
    meta: [
      { title: "Gymnastics Classes in Kensington & Chelsea — K&C Gymnastics" },
      { name: "description", content: "Explore every gymnastics class we run in Kensington & Chelsea — from parent-and-toddler through to competitive squad. Small groups, qualified coaches, free trial." },
      { property: "og:title", content: "Gymnastics Classes in Kensington & Chelsea" },
      { property: "og:description", content: "Small-group gymnastics classes for children of every age and ability. Book a free trial today." },
      { property: "og:url", content: "/classes" },
    ],
    links: [{ rel: "canonical", href: "/classes" }],
  }),
  component: ClassesIndex,
});

function ClassesIndex() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-16 text-brand-ink">
      <div className="container-tight">
        <Link to="/" className="text-sm font-semibold text-brand-ink/70 hover:text-brand">← Back to home</Link>
        <h1 className="mt-6 font-display text-4xl font-black sm:text-6xl">
          Our <span className="text-gradient-brand">gymnastics classes</span>
        </h1>
        <p className="mt-4 max-w-2xl text-brand-ink/70">
          A pathway for every child in Kensington & Chelsea — tap any class to see what a session looks like,
          view coach availability and book a free trial.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <Link
              key={p.slug}
              to="/classes/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-3xl border border-brand-ink/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img src={p.hero} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {p.age}
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl font-bold">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{p.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand transition group-hover:gap-2">
                  View class <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
