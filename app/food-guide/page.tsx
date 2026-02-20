import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Food Guide | EMBER & OAK',
  description: 'Understand heat levels, dietary tags, and pairing logic before you browse the menu.'
};

const MENU_SIGNALS = [
  {
    title: 'Heat Labels',
    detail: 'Mild, Warm, and Bold labels help guests quickly find comfort or intensity before opening a dish card.'
  },
  {
    title: 'Dietary Tags',
    detail: 'Vegetarian, Vegan, Gluten Free, and Signature badges stay visible on every card and in plate details.'
  },
  {
    title: 'Pairing Hint',
    detail: 'Each dish includes a pairing recommendation to reduce guesswork and improve first-time ordering confidence.'
  }
];

const PAIRING_RULES = [
  {
    title: 'Earth + Mineral Whites',
    detail: 'Roasted vegetables and herb-driven plates pair well with bright whites that keep smoky sweetness in balance.'
  },
  {
    title: 'Fire + Structured Reds',
    detail: 'Bold proteins need tannin and body. Cabernet and Syrah match oakfire texture without muting spice.'
  },
  {
    title: 'Sea + Citrus Lift',
    detail: 'Use high-acid wines and clean cocktails to cut richness in butter and charred shellfish dishes.'
  },
  {
    title: 'Sweet + Aged Fortified',
    detail: 'Late-harvest and tawny profiles echo caramelized notes while preserving contrast in desserts.'
  }
];

const DIETARY_KEYS = [
  {
    tag: 'Vegetarian',
    meaning: 'No meat or fish. May include dairy or egg.'
  },
  {
    tag: 'Vegan',
    meaning: 'No animal products. Great for plant-forward courses.'
  },
  {
    tag: 'Gluten Free',
    meaning: 'Prepared without gluten-containing ingredients.'
  },
  {
    tag: 'Signature',
    meaning: 'Chef-defining dish and ideal first pick for new guests.'
  }
];

export default function FoodGuidePage() {
  return (
    <main className="relative overflow-x-clip bg-charcoal pb-24 pt-28 text-stone-100 sm:pt-32">
      <div className="pointer-events-none fixed inset-0 z-[2] fire-gradient opacity-95" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-6 sm:px-8">
        <section className="texture-noise overflow-hidden rounded-[2rem] border border-orange-200/30">
          <div className="relative h-[320px] sm:h-[380px]">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
              alt="Guests dining in a warm restaurant setting"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-stone-950/20" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="font-[var(--font-accent)] text-sm uppercase tracking-[0.3em] text-orange-200/80">Food Guide</p>
              <h1 className="mt-3 max-w-3xl text-4xl leading-tight text-stone-50 sm:text-6xl">
                A practical guide to flavor, tags, and pairings.
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-stone-200/90 sm:text-base">
                This page helps users understand the live menu quickly, especially on mobile screens where speed and
                clarity matter.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {MENU_SIGNALS.map((signal) => (
            <article key={signal.title} className="glass-charcoal rounded-[1.5rem] border border-orange-200/25 p-6">
              <h2 className="text-xl text-stone-50">{signal.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-300/85">{signal.detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-charcoal rounded-[1.6rem] border border-orange-200/25 p-6 sm:p-8">
            <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.26em] text-orange-200/80">Pairing Framework</p>
            <h2 className="mt-3 text-3xl text-stone-50">Choose drinks in four quick moves</h2>
            <div className="mt-6 space-y-4">
              {PAIRING_RULES.map((rule) => (
                <div key={rule.title} className="rounded-2xl border border-stone-100/15 bg-stone-950/45 p-4">
                  <h3 className="text-lg text-amber-100">{rule.title}</h3>
                  <p className="mt-2 text-sm text-stone-300/90">{rule.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="glass-charcoal rounded-[1.6rem] border border-orange-200/25 p-6 sm:p-8">
            <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.26em] text-orange-200/80">Dietary Legend</p>
            <h2 className="mt-3 text-3xl text-stone-50">Tag meanings</h2>
            <ul className="mt-6 space-y-3">
              {DIETARY_KEYS.map((keyItem) => (
                <li key={keyItem.tag} className="rounded-2xl border border-stone-100/15 bg-stone-950/45 p-4">
                  <p className="text-sm uppercase tracking-[0.16em] text-orange-100">{keyItem.tag}</p>
                  <p className="mt-2 text-sm text-stone-300/90">{keyItem.meaning}</p>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="glass-charcoal rounded-[1.6rem] border border-orange-200/25 p-6 text-center sm:p-8">
          <p className="text-sm leading-relaxed text-stone-300/90">
            Ready to apply this guide? Open the live menu atlas and browse dishes with confidence.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/#menu"
              className="rounded-full border border-orange-300/60 bg-orange-500/20 px-5 py-2 text-xs uppercase tracking-[0.18em] text-orange-100 transition-all duration-700 ease-cinematic hover:bg-orange-500/30"
            >
              Open Menu Atlas
            </Link>
            <Link
              href="/culture"
              className="rounded-full border border-stone-100/20 bg-stone-950/45 px-5 py-2 text-xs uppercase tracking-[0.18em] text-stone-100 transition-all duration-700 ease-cinematic hover:border-orange-300/40 hover:text-orange-100"
            >
              Explore Culture
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
