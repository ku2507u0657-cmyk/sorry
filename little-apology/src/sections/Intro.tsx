import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { site } from "../config/site";
import { imageUrl } from "../lib/assets";
import { ease } from "../lib/motion";
import { SplitText } from "../components/ui/SplitText";
import { Button } from "../components/ui/Button";

interface IntroProps {
  onOpen: () => void;
}

export function Intro({ onOpen }: IntroProps) {
  const { headline, subline, cta, image } = site.intro;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.section
      className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] text-center"
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.9, ease } }}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
        {image && !imageFailed ? (
          <img
            src={imageUrl(image)}
            alt=""
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
          />
        ) : null}
      </div>

      <h1 className="font-display text-[clamp(4.75rem,20vw,11rem)] font-light leading-none tracking-tight text-burgundy">
        <SplitText text={headline} delay={0.3} />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 1.4 }}
        className="mt-8 max-w-[24ch] text-lg leading-relaxed text-ink/70 sm:max-w-md"
      >
        {subline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 2 }}
        className="mt-12"
      >
        <Button onClick={onOpen} icon={<ArrowRight size={18} aria-hidden="true" />}>
          {cta}
        </Button>
      </motion.div>
    </motion.section>
  );
}
