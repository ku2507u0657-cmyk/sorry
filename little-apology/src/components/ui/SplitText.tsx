import { Fragment } from "react";
import { motion } from "motion/react";
import { ease } from "../../lib/motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "view";
  blur?: boolean;
}

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  trigger = "mount",
  blur = true,
}: SplitTextProps) {
  const words = text.split(" ");
  const starts = words.reduce<number[]>((acc, _word, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + Array.from(words[i - 1]).length);
    return acc;
  }, []);

  const play =
    trigger === "view"
      ? { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } }
      : { animate: "shown" };

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden="true" initial="hidden" variants={{ hidden: {}, shown: {} }} {...play}>
        {words.map((word, w) => (
          <Fragment key={w}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, c) => (
                <motion.span
                  key={c}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: "0.3em", ...(blur ? { filter: "blur(8px)" } : {}) },
                    shown: {
                      opacity: 1,
                      y: 0,
                      ...(blur ? { filter: "blur(0px)" } : {}),
                      transition: { duration: 1.1, ease, delay: delay + (starts[w] + c) * stagger },
                    },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {w < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </span>
  );
}
