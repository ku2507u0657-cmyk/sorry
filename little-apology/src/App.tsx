import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "motion/react";
import { site } from "./config/site";
import { audioUrl } from "./lib/assets";
import { useMusic } from "./hooks/useMusic";
import { Grain } from "./components/ui/Grain";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { MusicToggle } from "./components/layout/MusicToggle";
import { Intro } from "./sections/Intro";
import { Story } from "./sections/Story";

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useMusic(site.music.file ? audioUrl(site.music.file) : "");

  useEffect(() => {
    document.title = site.pageTitle;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll locked={!opened} />
      <Grain />
      <MusicToggle available={music.available} playing={music.playing} onToggle={music.toggle} />
      <AnimatePresence mode="wait">
        {opened ? <Story key="story" /> : <Intro key="intro" onOpen={() => setOpened(true)} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
