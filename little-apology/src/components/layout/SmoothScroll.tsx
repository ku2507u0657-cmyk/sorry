import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import Lenis from "lenis";
import { lockScroll, registerLenis, unlockScroll } from "../../lib/scroll";

interface SmoothScrollProps {
  locked: boolean;
}

export function SmoothScroll({ locked }: SmoothScrollProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.09 });
    registerLenis(lenis);

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(frame);
      registerLenis(null);
      lenis.destroy();
    };
  }, [reduced]);

  useEffect(() => {
    if (!locked) return;
    lockScroll();
    return unlockScroll;
  }, [locked]);

  return null;
}
