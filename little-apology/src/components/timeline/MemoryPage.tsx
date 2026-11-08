import { motion } from "motion/react";
import type { Memory } from "../../types";
import { ease } from "../../lib/motion";
import { smart } from "../../lib/typography";
import { PhotoImage } from "../ui/PhotoImage";

interface MemoryPageProps {
  memory: Memory;
  index: number;
}

export function MemoryPage({ memory, index }: MemoryPageProps) {
  const left = index % 2 === 0;
  const date = smart(memory.date);
  const title = smart(memory.title);
  const description = smart(memory.description);

  return (
    <li
      className={`relative pl-12 md:w-1/2 md:pl-0 ${left ? "md:pr-14" : "md:ml-auto md:pl-14"}`}
    >
      <motion.span
        aria-hidden="true"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 0.6, ease }}
        className={`absolute left-[1.125rem] top-9 size-3 -translate-x-1/2 rounded-full bg-burgundy ring-4 ring-ivory ${
          left ? "md:left-auto md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
        }`}
      />

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1, ease }}
        className={`relative rounded-[1.25rem] border border-champagne bg-[#fffcf5] p-6 shadow-[0_28px_60px_-36px_rgba(94,26,43,0.55)] sm:p-8 ${
          left ? "md:-rotate-[0.8deg]" : "md:rotate-[0.8deg]"
        }`}
      >
        {memory.photo ? (
          <div className="relative mb-7 -rotate-2 bg-white p-2 pb-8 shadow-[0_14px_30px_-18px_rgba(43,27,30,0.6)]">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-3 bg-champagne/80"
            />
            <PhotoImage file={memory.photo} alt={title} className="aspect-[4/5] w-full object-cover" />
          </div>
        ) : null}
        {date ? <p className="font-hand text-[1.7rem] leading-none text-burgundy/80">{date}</p> : null}
        <h3 className="mt-3 font-display text-[1.9rem] leading-tight text-burgundy">{title}</h3>
        <p className="mt-3 text-base leading-relaxed text-ink/80">{description}</p>
      </motion.article>
    </li>
  );
}
