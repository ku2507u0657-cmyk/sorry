import { motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { ease } from "../../lib/motion";

interface MusicToggleProps {
  available: boolean;
  playing: boolean;
  onToggle: () => void;
}

export function MusicToggle({ available, playing, onToggle }: MusicToggleProps) {
  if (!available) return null;

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 2.4 }}
      className="fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-40 flex min-h-11 items-center gap-2.5 rounded-full border border-burgundy/20 bg-ivory/85 px-4 text-sm text-burgundy shadow-[0_8px_24px_-12px_rgba(46,14,23,0.55)] backdrop-blur-md transition-colors duration-300 hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
    >
      {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
      <span>{playing ? "Pause music" : "Play music"}</span>
    </motion.button>
  );
}
