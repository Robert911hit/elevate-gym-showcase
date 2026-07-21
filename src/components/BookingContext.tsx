import { createContext, useContext, useState, type ReactNode } from "react";
import { BookingModal } from "./BookingModal";

type BookingCtx = {
  open: (opts?: { programSlug?: string; coachSlug?: string }) => void;
};

const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaults, setDefaults] = useState<{ programSlug?: string; coachSlug?: string }>({});

  return (
    <Ctx.Provider
      value={{
        open: (opts) => {
          setDefaults(opts ?? {});
          setIsOpen(true);
        },
      }}
    >
      {children}
      <BookingModal
        open={isOpen}
        onOpenChange={setIsOpen}
        defaultProgramSlug={defaults.programSlug}
        defaultCoachSlug={defaults.coachSlug}
      />
    </Ctx.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
