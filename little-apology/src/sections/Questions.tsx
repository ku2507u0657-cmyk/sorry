import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "../config/site";
import { ease } from "../lib/motion";
import { scrollToId } from "../lib/scroll";
import { smart } from "../lib/typography";
import { SplitText } from "../components/ui/SplitText";
import { Button, ButtonLink } from "../components/ui/Button";

type Answer = "talk" | "time" | null;

const totalSteps = 4;

const lead = (text: string) => 0.5 + Array.from(text).length * 0.022;

interface AppearProps {
  delay?: number;
  className?: string;
  children: ReactNode;
}

function Appear({ delay = 0, className, children }: AppearProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Prompt({ text }: { text: string }) {
  return (
    <h2 className="max-w-[22ch] font-display text-[clamp(2.4rem,7.5vw,4.5rem)] font-light leading-[1.1] text-ivory">
      <SplitText text={text} stagger={0.022} />
    </h2>
  );
}

function Reply({ text }: { text: string }) {
  return (
    <Appear className="mt-10 max-w-xl">
      <p className="font-display text-2xl italic leading-snug text-ivory/90 sm:text-3xl">{text}</p>
    </Appear>
  );
}

export function Questions() {
  const q = site.questions;
  const next = smart(q.next ?? "Continue");
  const skip = smart(q.skip ?? "Skip this part");

  const [step, setStep] = useState(0);
  const [shown, setShown] = useState(false);
  const [answer, setAnswer] = useState<Answer>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const stateKey = `${step}-${shown}-${answer}`;
  const lastKey = useRef(stateKey);

  useEffect(() => {
    if (lastKey.current === stateKey) return;
    lastKey.current = stateKey;
    stageRef.current?.focus({ preventScroll: true });
  }, [stateKey]);

  const advance = () => {
    setShown(false);
    setStep((value) => value + 1);
  };

  let panel: ReactNode;

  if (step === 0) {
    const prompt = smart(q.lane.prompt);
    panel = (
      <>
        <Prompt text={prompt} />
        <Appear delay={lead(prompt)} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {q.lane.options.map((option, i) => (
            <Button key={i} variant="light" onClick={advance}>
              {smart(option)}
            </Button>
          ))}
        </Appear>
      </>
    );
  } else if (step === 1 || step === 2) {
    const item = step === 1 ? q.remember : q.tell;
    const body = step === 1 ? q.remember.memory : q.tell.message;
    const prompt = smart(item.prompt);
    panel = (
      <>
        <Prompt text={prompt} />
        {shown ? (
          <>
            <Reply text={smart(body)} />
            <Appear delay={0.9} className="mt-12">
              <Button variant="light" onClick={advance}>
                {next}
              </Button>
            </Appear>
          </>
        ) : (
          <Appear delay={lead(prompt)} className="mt-12">
            <Button variant="light" onClick={() => setShown(true)}>
              {smart(item.action)}
            </Button>
          </Appear>
        )}
      </>
    );
  } else {
    const prompt = smart(q.better.prompt);
    panel = (
      <>
        <Prompt text={prompt} />
        {answer === null ? (
          <Appear delay={lead(prompt)} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Button variant="light" onClick={() => setAnswer("talk")}>
              {smart(q.better.talk)}
            </Button>
            <Button variant="light" onClick={() => setAnswer("time")}>
              {smart(q.better.time)}
            </Button>
          </Appear>
        ) : (
          <>
            <Reply text={smart(answer === "talk" ? q.better.talkReply : q.better.timeReply)} />
            {answer === "talk" && q.better.contactLink ? (
              <Appear delay={0.9} className="mt-12">
                <ButtonLink variant="light" href={q.better.contactLink}>
                  {smart(q.better.contactLabel)}
                </ButtonLink>
              </Appear>
            ) : null}
          </>
        )}
      </>
    );
  }

  return (
    <section className="relative z-10 -mt-16 overflow-hidden rounded-t-[3rem] bg-wine text-ivory sm:-mt-20 sm:rounded-t-[5rem]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(94,26,43,0.7),transparent_65%)]"
      />
      <div className="relative mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-6 pb-44 pt-32 text-center">
        <div aria-hidden="true" className="mb-12 flex justify-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <span
              key={i}
              className={`h-0.5 w-10 transition-colors duration-700 ${
                i < step ? "bg-ivory/55" : i === step ? "bg-ivory" : "bg-ivory/15"
              }`}
            />
          ))}
        </div>

        <div
          ref={stageRef}
          tabIndex={-1}
          className="flex min-h-[22rem] flex-col items-center justify-center outline-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-col items-center"
            >
              {panel}
            </motion.div>
          </AnimatePresence>
        </div>

        {answer === null ? (
          <button
            type="button"
            onClick={() => scrollToId("letter")}
            className="mt-10 min-h-11 px-4 text-sm text-ivory/65 transition-colors duration-300 hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
          >
            {skip}
          </button>
        ) : null}
      </div>
    </section>
  );
}
