import type Lenis from "lenis";

let instance: Lenis | null = null;
let locks = 0;

function apply() {
  document.documentElement.classList.toggle("is-locked", locks > 0);
  if (!instance) return;
  if (locks > 0) {
    instance.stop();
  } else {
    instance.start();
  }
}

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
  apply();
}

export function lockScroll() {
  locks += 1;
  apply();
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  apply();
}

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (instance) {
    instance.scrollTo(target);
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
