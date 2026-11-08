import { motion } from "motion/react";
import { site } from "../config/site";
import { smart } from "../lib/typography";
import { SplitText } from "../components/ui/SplitText";
import { ScrollWords } from "../components/ui/ScrollWords";

export function Apology() {
  const { heading, paragraphs } = site.apology;

  return (
    <section className="relative bg-wine text-ivory">
      <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(94,26,43,0.65),transparent_65%)]"
        />
        <h1 className="relative font-display text-[clamp(4rem,19vw,11rem)] font-normal italic leading-none tracking-tight">
          <SplitText text={smart(heading)} delay={0.7} stagger={0.07} />
        </h1>
        <div
          aria-hidden="true"
          className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 h-14 w-px -translate-x-1/2 overflow-hidden bg-ivory/20"
        >
          <motion.span
            className="block h-1/2 w-full bg-ivory/70"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-14 px-6 pb-[28vh] pt-[12vh] sm:px-8">
        {paragraphs.map((paragraph, i) => (
          <ScrollWords
            key={i}
            text={smart(paragraph)}
            className="font-display text-[clamp(1.65rem,4.8vw,2.35rem)] leading-[1.45]"
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="h-[40vh] bg-[linear-gradient(to_bottom,var(--color-wine),#6b2a38_35%,var(--color-blush)_80%,var(--color-ivory))]"
      />
    </section>
  );
}
