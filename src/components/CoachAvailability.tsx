import { useState } from "react";
import { Clock } from "lucide-react";
import type { Coach } from "@/lib/academy";

const STATUS_STYLES: Record<string, string> = {
  open: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 hover:bg-emerald-500/20",
  limited: "bg-amber-500/10 text-amber-700 border-amber-500/30 hover:bg-amber-500/20",
  full: "bg-muted text-muted-foreground border-muted line-through cursor-not-allowed",
};

const STATUS_LABEL: Record<string, string> = {
  open: "Spaces open",
  limited: "Nearly full",
  full: "Fully booked",
};

export type CoachAvailabilityProps = {
  coach: Coach;
  onSelect?: (day: string, time: string) => void;
  compact?: boolean;
};

export function CoachAvailability({ coach, onSelect, compact }: CoachAvailabilityProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section
      aria-label={`Availability for ${coach.name}`}
      className={`rounded-3xl border border-brand-ink/5 bg-white shadow-sm ${compact ? "p-4" : "p-6"}`}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={coach.img} alt="" className="h-11 w-11 rounded-full object-cover" />
          <div>
            <h3 className="font-display text-base font-bold leading-tight">{coach.name}</h3>
            <p className="text-xs text-muted-foreground">{coach.role}</p>
          </div>
        </div>
        <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand">
          This week
        </span>
      </header>

      <div className="mt-5 space-y-3">
        {coach.availability.map((row) => (
          <div key={row.day} className="grid grid-cols-[56px_1fr] items-center gap-3">
            <div className="text-xs font-bold uppercase tracking-widest text-brand-ink/60">
              {row.day}
            </div>
            <div className="flex flex-wrap gap-2">
              {row.slots.map((slot) => {
                const id = `${coach.slug}-${row.day}-${slot.time}`;
                const isSelected = selected === id;
                const disabled = slot.status === "full";
                return (
                  <button
                    key={id}
                    type="button"
                    disabled={disabled}
                    aria-pressed={isSelected}
                    aria-label={`${row.day} at ${slot.time} — ${STATUS_LABEL[slot.status]}`}
                    onClick={() => {
                      if (disabled) return;
                      setSelected(id);
                      onSelect?.(row.day, slot.time);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      STATUS_STYLES[slot.status]
                    } ${isSelected ? "ring-2 ring-offset-1 ring-brand" : ""}`}
                  >
                    <Clock size={11} aria-hidden />
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-5 flex flex-wrap gap-4 border-t border-brand-ink/5 pt-3 text-[11px] text-muted-foreground">
        <Legend swatch="bg-emerald-500" label="Open" />
        <Legend swatch="bg-amber-500" label="Limited" />
        <Legend swatch="bg-muted-foreground/40" label="Full" />
      </footer>
    </section>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden className={`h-2 w-2 rounded-full ${swatch}`} /> {label}
    </span>
  );
}
