import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { site } from "../config/site";
import { smart } from "../lib/typography";
import { SplitText } from "../components/ui/SplitText";
import { MemoryPage } from "../components/timeline/MemoryPage";

export function Timeline() {
  const { heading, items } = site.timeline;
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.6"] });

  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <h2 className="mx-auto max-w-[18ch] text-center font-display text-[clamp(2.5rem,7vw,5rem)] font-light leading-[1.05] tracking-tight text-burgundy">
          <SplitText text={smart(heading)} trigger="view" stagger={0.03} blur={false} />
        </h2>

        <div className="relative mt-16 sm:mt-24">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[1.125rem] top-0 w-px bg-champagne md:left-1/2"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduced ? 1 : scrollYProgress }}
            className="absolute bottom-0 left-[1.125rem] top-0 w-px origin-top bg-gold md:left-1/2"
          />
          <ol ref={listRef} className="relative space-y-16 md:space-y-28">
            {items.map((memory, i) => (
              <MemoryPage key={i} memory={memory} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
