import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ease } from "../lib/motion";
import { Apology } from "./Apology";
import { Gallery } from "./Gallery";
import { Reasons } from "./Reasons";
import { Timeline } from "./Timeline";
import { Questions } from "./Questions";
import { Letter } from "./Letter";
import { Ending } from "./Ending";

export function Story() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.main
      ref={ref}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease }}
      className="outline-none"
    >
      <Apology />
      <Gallery />
      <Reasons />
      <Timeline />
      <Questions />
      <Letter />
      <Ending />
    </motion.main>
  );
}
