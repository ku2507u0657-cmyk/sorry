import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { site } from "../config/site";
import type { Photo, PhotoSize } from "../types";
import { ease } from "../lib/motion";
import { smart } from "../lib/typography";
import { useColumnCount } from "../hooks/useColumnCount";
import { SplitText } from "../components/ui/SplitText";
import { PhotoImage } from "../components/ui/PhotoImage";
import { Lightbox } from "../components/gallery/Lightbox";

const frameStyle: Record<PhotoSize, string> = {
  tall: "aspect-[3/4] rounded-[2.5rem]",
  square: "aspect-square rounded-2xl",
  wide: "aspect-[4/3] rounded-[1.25rem]",
};

const tilt = ["-rotate-1", "rotate-0", "rotate-[1.2deg]"];

interface GalleryPhotoProps {
  photo: Photo;
  index: number;
  onOpen: (index: number) => void;
}

function GalleryPhoto({ photo, index, onOpen }: GalleryPhotoProps) {
  const caption = smart(photo.caption);

  return (
    <figure className={`transition-transform duration-700 ease-soft hover:rotate-0 ${tilt[index % tilt.length]}`}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={caption ? `Open photo: ${caption}` : "Open photo"}
        className={`group relative isolate block w-full cursor-zoom-in overflow-hidden shadow-[0_24px_48px_-28px_rgba(94,26,43,0.55)] transition-shadow duration-700 ease-soft hover:shadow-[0_32px_60px_-26px_rgba(94,26,43,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy ${frameStyle[photo.size]}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.16 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 1.4, ease }}
          className="h-full w-full"
        >
          <PhotoImage
            file={photo.file}
            alt=""
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-105"
          />
        </motion.div>
      </button>
      {caption || photo.date ? (
        <figcaption className="mt-3 px-1">
          {caption ? <p className="font-display text-xl italic leading-snug text-burgundy">{caption}</p> : null}
          {photo.date ? <p className="mt-0.5 text-sm text-ink/55">{photo.date}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function Gallery() {
  const { heading, photos } = site.gallery;
  const columnCount = useColumnCount();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const shift = useTransform(scrollYProgress, [0, 1], [36, -36]);

  const columns = useMemo(() => {
    const result: { photo: Photo; index: number }[][] = Array.from({ length: columnCount }, () => []);
    photos.forEach((photo, index) => result[index % columnCount].push({ photo, index }));
    return result;
  }, [photos, columnCount]);

  const open = useCallback((index: number) => setActive(index), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <section ref={sectionRef} className="bg-ivory pb-32 pt-24 sm:pb-40 sm:pt-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-[16ch] font-display text-[clamp(2.75rem,8vw,5.5rem)] font-light leading-[1.02] tracking-tight text-burgundy">
          <SplitText text={smart(heading)} trigger="view" stagger={0.02} blur={false} />
        </h2>

        <div className="mt-14 flex items-start gap-4 sm:mt-20 sm:gap-8">
          {columns.map((column, c) => (
            <motion.div
              key={c}
              style={{ y: c % 2 === 1 && !reduced ? shift : 0 }}
              className={`flex min-w-0 flex-1 flex-col gap-8 sm:gap-12 ${c % 2 === 1 ? "pt-12 lg:pt-20" : ""}`}
            >
              {column.map(({ photo, index }) => (
                <GalleryPhoto key={`${photo.file}-${index}`} photo={photo} index={index} onOpen={open} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <Lightbox key="lightbox" photos={photos} index={active} onChange={setActive} onClose={close} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
