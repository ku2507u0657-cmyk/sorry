import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "../../types";
import { imageUrl } from "../../lib/assets";
import { ease } from "../../lib/motion";
import { lockScroll, unlockScroll } from "../../lib/scroll";
import { smart } from "../../lib/typography";
import { PhotoImage } from "../ui/PhotoImage";

interface LightboxProps {
  photos: Photo[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

const slide = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 56 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -56 }),
};

const controlClass =
  "inline-flex size-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-300 hover:bg-ivory/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory";

export function Lightbox({ photos, index, onChange, onClose }: LightboxProps) {
  const [direction, setDirection] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const count = photos.length;
  const photo = photos[index];
  const caption = smart(photo.caption);

  const go = useCallback(
    (step: number) => {
      if (count < 2) return;
      setDirection(step);
      onChange((index + step + count) % count);
    },
    [count, index, onChange],
  );

  useEffect(() => {
    lockScroll();
    return unlockScroll;
  }, []);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    [index + 1, index - 1].forEach((i) => {
      const neighbour = photos[(i + count) % count];
      if (neighbour) {
        const image = new Image();
        image.src = imageUrl(neighbour.file);
      }
    });
  }, [index, photos, count]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        go(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        go(-1);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
      className="fixed inset-0 z-[60] flex flex-col overscroll-contain bg-wine/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] text-ivory backdrop-blur-md"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm tabular-nums text-ivory/70">
          {index + 1} / {count}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo viewer" className={controlClass}>
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative my-4 min-h-0 flex-1"
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (start === null) return;
          const delta = event.changedTouches[0].clientX - start;
          if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
        }}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease }}
            className="absolute inset-0"
          >
            <PhotoImage file={photo.file} alt={caption} priority className="h-full w-full object-contain" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mx-auto w-full max-w-xl text-center">
        <div aria-live="polite" className="min-h-14">
          {caption ? <p className="font-display text-2xl italic leading-snug">{caption}</p> : null}
          {photo.date ? <p className="mt-1 text-sm text-ivory/70">{photo.date}</p> : null}
        </div>
        {count > 1 ? (
          <div className="mt-4 flex items-center justify-center gap-6">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={controlClass}>
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={controlClass}>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
