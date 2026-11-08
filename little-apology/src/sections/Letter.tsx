import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Heart } from "lucide-react";
import { site } from "../config/site";
import { ease } from "../lib/motion";
import { smart } from "../lib/typography";
import { SplitText } from "../components/ui/SplitText";

type Stage = "closed" | "opening" | "open";

interface EnvelopeProps {
  opening: boolean;
  flapBack: boolean;
  hint: string;
  onOpen: () => void;
}

function Envelope({ opening, flapBack, hint, onOpen }: EnvelopeProps) {
  return (
    <motion.div
      exit={{ opacity: 0, y: 24, scale: 0.96, transition: { duration: 0.6, ease } }}
      className="mx-auto w-[min(88vw,26rem)] pt-16"
    >
      <button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Open the letter"
        className="group relative isolate block aspect-[3/2] w-full rounded-md [perspective:1400px] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-burgundy"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-md bg-[#c4958a] shadow-[0_40px_70px_-35px_rgba(94,26,43,0.7)]"
        />
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ y: opening ? "-190%" : "0%" }}
          transition={{ duration: 1.1, ease, delay: opening ? 0.9 : 0 }}
          style={{ zIndex: 10 }}
          className="absolute inset-x-[7%] bottom-[7%] top-[58%] bg-[#fffcf5] shadow-[0_6px_16px_-8px_rgba(43,27,30,0.5)]"
        />
        <span
          aria-hidden="true"
          style={{ zIndex: 20 }}
          className="absolute inset-0 rounded-md bg-[#d8aea2] [clip-path:polygon(0_0,50%_55%,100%_0,100%_100%,0_100%)]"
        />
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ rotateX: opening ? 180 : 0 }}
          transition={{ duration: 0.9, ease }}
          style={{ zIndex: flapBack ? 5 : 30 }}
          className="absolute inset-x-0 top-0 h-[55%] origin-top bg-[#cfa094] [clip-path:polygon(0_0,100%_0,50%_100%)]"
        />
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.6 : 1 }}
          transition={{ duration: 0.35, ease }}
          style={{ zIndex: 40 }}
          className="absolute left-1/2 top-[55%] grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-burgundy text-ivory shadow-[0_8px_18px_-8px_rgba(46,14,23,0.8)] transition-transform duration-500 ease-soft group-hover:scale-110"
        >
          <Heart size={18} aria-hidden="true" />
        </motion.span>
      </button>
      <p className="mt-10 text-center text-sm text-burgundy/60">{hint}</p>
    </motion.div>
  );
}

export function Letter() {
  const { heading, hint, greeting, body, signoff } = site.letter;
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<Stage>("closed");
  const [flapBack, setFlapBack] = useState(false);
  const paperRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (stage !== "opening") return;
    const flap = window.setTimeout(() => setFlapBack(true), 450);
    const done = window.setTimeout(() => setStage("open"), 2300);
    return () => {
      window.clearTimeout(flap);
      window.clearTimeout(done);
    };
  }, [stage]);

  useEffect(() => {
    if (stage === "open") paperRef.current?.focus({ preventScroll: true });
  }, [stage]);

  const open = () => setStage(reduced ? "open" : "opening");

  return (
    <section
      id="letter"
      className="relative z-20 -mt-16 rounded-t-[3rem] bg-champagne px-5 pb-44 pt-32 sm:-mt-20 sm:rounded-t-[5rem] sm:px-8 sm:pt-40"
    >
      <h2 className="text-center font-display text-[clamp(2.75rem,8vw,5rem)] font-light italic leading-[1.05] tracking-tight text-burgundy">
        <SplitText text={smart(heading)} trigger="view" stagger={0.04} blur={false} />
      </h2>

      <div className="mt-12 sm:mt-16">
        <AnimatePresence mode="wait">
          {stage !== "open" ? (
            <Envelope
              key="envelope"
              opening={stage === "opening"}
              flapBack={flapBack}
              hint={smart(hint ?? "Tap the envelope to open it")}
              onOpen={open}
            />
          ) : (
            <motion.article
              key="paper"
              ref={paperRef}
              tabIndex={-1}
              initial={{ opacity: 0, y: 28, clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.5, ease }}
              className="letter-lines relative mx-auto w-full max-w-2xl -rotate-[0.4deg] bg-[#fffcf5] px-7 text-burgundy shadow-[0_40px_80px_-40px_rgba(94,26,43,0.6)] outline-none sm:px-14"
            >
              <p className="font-hand text-[2.3rem] leading-[var(--rule)]">{smart(greeting)}</p>
              {body.map((paragraph, i) => (
                <p key={i} className="mt-[var(--rule)] font-hand text-[1.7rem] leading-[var(--rule)] text-ink/85">
                  {smart(paragraph)}
                </p>
              ))}
              <p className="mt-[var(--rule)] font-hand text-[2.3rem] leading-[var(--rule)]">{smart(signoff)}</p>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
