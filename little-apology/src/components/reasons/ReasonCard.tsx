import { useState } from "react";
import { motion } from "motion/react";
import { Plus, X } from "lucide-react";
import type { Reason } from "../../types";
import { ease } from "../../lib/motion";
import { smart } from "../../lib/typography";

const shapes = [
  "rounded-t-[999px] rounded-b-[2rem]",
  "rounded-tl-[5rem] rounded-br-[5rem] rounded-tr-2xl rounded-bl-2xl",
  "rounded-[3rem_6rem_3rem_6rem]",
];

const tilts = ["-rotate-[1.5deg]", "rotate-0", "rotate-[1.2deg]"];

const tones = [
  { face: "bg-[#fffcf5] text-burgundy", layer: "bg-burgundy text-ivory", ring: "border-gold/45" },
  { face: "bg-champagne text-wine", layer: "bg-wine text-ivory", ring: "border-wine/20" },
  { face: "bg-blush text-burgundy", layer: "bg-burgundy text-ivory", ring: "border-burgundy/20" },
  { face: "bg-burgundy text-ivory", layer: "bg-champagne text-wine", ring: "border-ivory/25" },
];

interface ReasonCardProps {
  reason: Reason;
  index: number;
}

export function ReasonCard({ reason, index }: ReasonCardProps) {
  const [open, setOpen] = useState(false);
  const tone = tones[index % tones.length];
  const shape = shapes[index % shapes.length];
  const tilt = tilts[index % tilts.length];
  const title = smart(reason.title);
  const message = smart(reason.message);

  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(-20% -20% -20% -20%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease, delay: (index % 3) * 0.12 }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`group relative isolate block h-[26rem] w-full overflow-hidden text-center shadow-[0_28px_50px_-30px_rgba(94,26,43,0.6)] transition-[translate,rotate,scale,box-shadow] duration-700 ease-soft hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_40px_60px_-30px_rgba(94,26,43,0.65)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy ${shape} ${tone.face} ${tilt}`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-3 rounded-[inherit] border ${tone.ring}`}
        />
        <span className="flex h-full items-center justify-center px-9 pb-12 font-display text-[2.1rem] leading-tight">
          {title}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-7 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-current/30 transition-transform duration-500 ease-soft group-hover:rotate-90"
        >
          <Plus size={16} />
        </span>

        <motion.span
          aria-hidden={!open}
          initial={false}
          animate={{ clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          transition={{ duration: 0.8, ease }}
          className={`absolute inset-0 flex overflow-y-auto ${tone.layer}`}
        >
          <span className="m-auto px-9 pb-16 pt-12 font-display text-[1.6rem] leading-snug">{message}</span>
          <span
            aria-hidden="true"
            className="absolute bottom-7 left-1/2 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-current/30"
          >
            <X size={16} />
          </span>
        </motion.span>
      </button>
    </motion.div>
  );
}
