export type PhotoSize = "square" | "tall" | "wide";

export interface Photo {
  file: string;
  caption: string;
  date?: string;
  size: PhotoSize;
}

export interface Reason {
  title: string;
  message: string;
}

export interface Memory {
  date: string;
  title: string;
  description: string;
  photo?: string;
}

export interface SiteConfig {
  pageTitle: string;
  names: { her: string; me: string };
  music: { file: string };
  intro: { headline: string; subline: string; cta: string; image: string };
  apology: { heading: string; paragraphs: string[] };
  gallery: { heading: string; photos: Photo[] };
  reasons: { heading: string; items: Reason[] };
  timeline: { heading: string; items: Memory[] };
  questions: {
    next?: string;
    skip?: string;
    lane: { prompt: string; options: [string, string] };
    remember: { prompt: string; action: string; memory: string };
    tell: { prompt: string; action: string; message: string };
    better: {
      prompt: string;
      talk: string;
      time: string;
      talkReply: string;
      timeReply: string;
      contactLabel: string;
      contactLink: string;
    };
  };
  letter: {
    heading: string;
    hint?: string;
    greeting: string;
    body: string[];
    signoff: string;
  };
  ending: { heading: string; message: string };
}
