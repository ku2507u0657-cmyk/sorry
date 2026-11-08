import { useCallback, useEffect, useRef, useState } from "react";

export function useMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(Boolean(src));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src) {
      setAvailable(false);
      return;
    }

    const audio = new Audio();
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0.6;
    audio.src = src;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      setPlaying(false);
      setAvailable(false);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    audioRef.current = audio;
    setAvailable(true);

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [src]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, []);

  return { available, playing, toggle };
}
