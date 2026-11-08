import { motion } from "motion/react";
import { site } from "../config/site";
import { ease } from "../lib/motion";
import { smart } from "../lib/typography";
import { SplitText } from "../components/ui/SplitText";

export function Ending() {
  const { heading, message } = site.ending;

  return (
    <section className="relative z-30 -mt-16 overflow-hidden rounded-t-[3rem] bg-wine text-center text-ivory sm:-mt-20 sm:rounded-t-[5rem]">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
      </div>

      <div className="relative mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-6 py-32">
        <h2 className="font-display text-[clamp(2.75rem,9vw,6rem)] font-light italic leading-[1.05] tracking-tight">
          <SplitText text={smart(heading)} trigger="view" stagger={0.035} />
        </h2>

        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 1.6 }}
          className="mt-12 block h-px w-20 bg-gold"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 2 }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-ivory/75"
        >
          {smart(message)}
        </motion.p>
      </div>
    </section>
  );
}
