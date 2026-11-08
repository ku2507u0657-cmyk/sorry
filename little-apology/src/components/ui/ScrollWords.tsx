import { Fragment, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  still: boolean;
}

function Word({ word, progress, start, end, still }: WordProps) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return <motion.span style={still ? undefined : { opacity }}>{word}</motion.span>;
}

interface ScrollWordsProps {
  text: string;
  className?: string;
}

export function ScrollWords({ text, className }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <Word
            word={word}
            progress={scrollYProgress}
            start={i / words.length}
            end={Math.min(1, (i + 1.5) / words.length)}
            still={Boolean(reduced)}
          />
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
