import { useEffect, useMemo, useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, ChevronLeft, ChevronRight, Loader2, PartyPopper } from "lucide-react";
import { PROGRAMS, COACHES } from "@/lib/academy";

type Step = 0 | 1 | 2 | 3;

const STEPS = ["Child", "Class", "Session", "Contact"] as const;

export type BookingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultProgramSlug?: string;
  defaultCoachSlug?: string;
};

export function BookingModal({
  open, onOpenChange, defaultProgramSlug, defaultCoachSlug,
}: BookingModalProps) {
  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    childName: "",
    childAge: "",
    experience: "none",
    programSlug: defaultProgramSlug ?? "",
    coachSlug: defaultCoachSlug ?? "",
    day: "",
    time: "",
    parentName: "",
    email: "",
    phone: "",
    notes: "",
    consent: false,
  });

  // Reset when opening
  useEffect(() => {
    if (open) {
      setStep(0);
      setDone(false);
      setForm((f) => ({
        ...f,
        programSlug: defaultProgramSlug ?? f.programSlug,
        coachSlug: defaultCoachSlug ?? f.coachSlug,
      }));
    }
  }, [open, defaultProgramSlug, defaultCoachSlug]);

  const program = useMemo(
    () => PROGRAMS.find((p) => p.slug === form.programSlug),
    [form.programSlug],
  );

  const canNext =
    (step === 0 && form.childName.trim() && form.childAge) ||
    (step === 1 && form.programSlug) ||
    (step === 2 && form.day && form.time) ||
    (step === 3 && form.parentName.trim() && form.email.trim() && form.consent);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] max-w-lg overflow-hidden p-0">
        {done ? (
          <div className="p-8 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full gradient-brand text-white">
              <PartyPopper />
            </div>
            <DialogHeader className="mt-4">
              <DialogTitle className="text-center font-display text-2xl">You're booked in!</DialogTitle>
              <DialogDescription className="text-center">
                We've reserved a free trial for {form.childName || "your child"} on{" "}
                <strong>{form.day} at {form.time}</strong>. A confirmation email is on the way to{" "}
                <strong>{form.email}</strong>.
              </DialogDescription>
            </DialogHeader>
            <Button className="mt-6 w-full" onClick={() => onOpenChange(false)}>Done</Button>
          </div>
        ) : (
          <>
            <div className="px-6 pt-6">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Book a free trial</DialogTitle>
                <DialogDescription>
                  Four quick steps — takes about a minute.
                </DialogDescription>
              </DialogHeader>
              <Stepper step={step} />
            </div>

            <div className="max-h-[52dvh] overflow-y-auto px-6 py-5">
              {step === 0 && (
                <fieldset className="space-y-4">
                  <legend className="sr-only">About your child</legend>
                  <Row label="Child's first name" htmlFor="childName" required>
                    <Input
                      id="childName"
                      required
                      autoFocus
                      value={form.childName}
                      onChange={(e) => set("childName", e.target.value)}
                    />
                  </Row>
                  <Row label="Child's age" htmlFor="childAge" required>
                    <Input
                      id="childAge"
                      type="number"
                      min={1}
                      max={16}
                      required
                      value={form.childAge}
                      onChange={(e) => set("childAge", e.target.value)}
                    />
                  </Row>
                  <fieldset>
                    <legend className="mb-2 text-sm font-semibold">Gymnastics experience</legend>
                    <RadioGroup
                      value={form.experience}
                      onValueChange={(v) => set("experience", v)}
                      className="grid grid-cols-3 gap-2"
                    >
                      {[
                        ["none", "Brand new"],
                        ["some", "A little"],
                        ["lots", "Experienced"],
                      ].map(([v, l]) => (
                        <label
                          key={v}
                          htmlFor={`exp-${v}`}
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-input p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                        >
                          <RadioGroupItem id={`exp-${v}`} value={v} />
                          {l}
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset className="space-y-3">
                  <legend className="mb-1 text-sm font-semibold">Choose a class</legend>
                  <RadioGroup
                    value={form.programSlug}
                    onValueChange={(v) => set("programSlug", v)}
                    className="space-y-2"
                  >
                    {PROGRAMS.map((p) => (
                      <label
                        key={p.slug}
                        htmlFor={`p-${p.slug}`}
                        className="flex cursor-pointer items-start gap-3 rounded-2xl border border-input p-3.5 transition has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem id={`p-${p.slug}`} value={p.slug} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold">{p.title}</span>
                            <span className="text-xs font-medium text-muted-foreground">{p.age}</span>
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">{p.short}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="space-y-3">
                  <legend className="mb-1 text-sm font-semibold">Pick a session</legend>
                  {program ? (
                    <RadioGroup
                      value={`${form.day}|${form.time}`}
                      onValueChange={(v) => {
                        const [d, t] = v.split("|");
                        set("day", d); set("time", t);
                      }}
                      className="space-y-2"
                    >
                      {program.schedule.map((s) => {
                        const val = `${s.day}|${s.time}`;
                        return (
                          <label
                            key={val}
                            htmlFor={`s-${val}`}
                            className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-input p-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem id={`s-${val}`} value={val} />
                              <div>
                                <div className="font-semibold">{s.day}</div>
                                <div className="text-xs text-muted-foreground">{s.time}</div>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-brand">{program.title}</span>
                          </label>
                        );
                      })}
                    </RadioGroup>
                  ) : (
                    <p className="text-sm text-muted-foreground">Please pick a class first.</p>
                  )}
                </fieldset>
              )}

              {step === 3 && (
                <fieldset className="space-y-4">
                  <legend className="sr-only">Contact details</legend>
                  <Row label="Parent / guardian name" htmlFor="parentName" required>
                    <Input id="parentName" required value={form.parentName} onChange={(e) => set("parentName", e.target.value)} />
                  </Row>
                  <Row label="Email" htmlFor="email" required>
                    <Input id="email" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </Row>
                  <Row label="Phone" htmlFor="phone">
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                  </Row>
                  <Row label="Anything we should know?" htmlFor="notes">
                    <Textarea id="notes" rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Medical notes, questions, preferred coach…" />
                  </Row>
                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      className="mt-0.5"
                      checked={form.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      required
                    />
                    I agree to be contacted about my free trial and consent to our privacy policy.
                  </label>
                </fieldset>
              )}
            </div>

            <DialogFooter className="flex-row items-center justify-between gap-2 border-t bg-muted/40 px-6 py-4 sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                disabled={step === 0 || submitting}
                onClick={() => setStep((s) => (s > 0 ? ((s - 1) as Step) : s))}
              >
                <ChevronLeft className="mr-1 h-4 w-4" /> Back
              </Button>
              {step < 3 ? (
                <Button
                  type="button"
                  disabled={!canNext}
                  onClick={() => setStep((s) => ((s + 1) as Step))}
                >
                  Continue <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" disabled={!canNext || submitting} onClick={handleSubmit}>
                  {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking…</> : <>Confirm trial <Check className="ml-1 h-4 w-4" /></>}
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Stepper({ step }: { step: Step }) {
  return (
    <ol className="mt-4 flex items-center gap-2" aria-label="Booking progress">
      {STEPS.map((label, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <li key={label} className="flex flex-1 items-center gap-2">
            <div
              aria-current={active ? "step" : undefined}
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                done ? "gradient-brand text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? <Check size={14} /> : i + 1}
            </div>
            <span className={`hidden text-xs font-medium sm:inline ${active ? "text-foreground" : "text-muted-foreground"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="h-px flex-1 bg-border" />}
          </li>
        );
      })}
    </ol>
  );
}

function Row({
  label, htmlFor, required, children,
}: { label: string; htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="mb-1.5 block text-sm">
        {label} {required && <span aria-hidden className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}
