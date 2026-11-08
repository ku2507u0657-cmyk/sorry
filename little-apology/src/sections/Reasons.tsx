import { site } from "../config/site";
import { smart } from "../lib/typography";
import { SplitText } from "../components/ui/SplitText";
import { ReasonCard } from "../components/reasons/ReasonCard";

export function Reasons() {
  const { heading, items } = site.reasons;

  return (
    <section className="bg-champagne/35 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="mx-auto max-w-[18ch] text-center font-display text-[clamp(2.5rem,7vw,5rem)] font-light leading-[1.05] tracking-tight text-burgundy">
          <SplitText text={smart(heading)} trigger="view" stagger={0.02} blur={false} />
        </h2>

        <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:mt-20 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-14 md:overflow-visible md:px-0 md:[&>li:nth-child(3n+2)]:mt-14 [&::-webkit-scrollbar]:hidden">
          {items.map((reason, i) => (
            <li key={i} className="w-[78vw] max-w-[20rem] shrink-0 snap-center md:w-auto md:max-w-none">
              <ReasonCard reason={reason} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
