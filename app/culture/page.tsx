import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Food Culture | EMBER & OAK',
  description: 'Learn about sourcing culture, service rituals, and regional influences behind the Ember & Oak menu.'
};

const CULTURE_PILLARS = [
  {
    title: 'Seasonal Sourcing',
    detail: 'The kitchen rotates ingredients weekly based on harvest windows from nearby growers and fisheries.'
  },
  {
    title: 'Open-Fire Craft',
    detail: 'Heat is layered in stages: smoke for aroma, ember for texture, and rest for flavor concentration.'
  },
  {
    title: 'Shared Table Ritual',
    detail: 'Courses are paced for conversation, with sides and pairings designed for communal tasting.'
  }
];

const DINING_FLOW = [
  {
    step: '01',
    title: 'Arrival Pour',
    detail: 'Guests start with a welcome sip chosen for season and climate.'
  },
  {
    step: '02',
    title: 'Warm Starter',
    detail: 'Vegetable-forward plates open the palate before heavier fire cuts.'
  },
  {
    step: '03',
    title: 'Fire Chapter',
    detail: 'Core protein course is synchronized with cellar pairings and hearth sides.'
  },
  {
    step: '04',
    title: 'Sweet Finish',
    detail: 'Dessert and digestif service close the experience with lighter aromatic notes.'
  }
];

const COMMUNITY_NIGHTS = [
  {
    title: 'Producer Thursday',
    detail: 'Farm and fishery partners join service for ingredient storytelling at table side.'
  },
  {
    title: 'Regional Sunday Supper',
    detail: 'A weekly menu inspired by one food region and its cooking traditions.'
  },
  {
    title: 'Zero-Waste Lab',
    detail: 'Monthly dinner that highlights full-ingredient use and preservation methods.'
  }
];

export default function CulturePage() {
  return (
    <main className="relative overflow-x-clip bg-charcoal pb-24 pt-28 text-stone-100 sm:pt-32">
      <div className="pointer-events-none fixed inset-0 z-[2] fire-gradient opacity-95" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-6 sm:px-8">
        <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <article className="glass-charcoal rounded-[1.8rem] border border-orange-200/25 p-6 sm:p-8">
            <p className="font-[var(--font-accent)] text-sm uppercase tracking-[0.3em] text-orange-200/80">Food Culture</p>
            <h1 className="mt-3 text-4xl text-stone-50 sm:text-6xl">A kitchen culture built on fire, place, and people.</h1>
            <p className="mt-5 text-sm leading-relaxed text-stone-300/90 sm:text-base">
              Ember & Oak treats culture as part of the menu. Every dish reflects sourcing relationships, regional
              influence, and service rituals that make the dining experience easier to understand for new guests.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#story"
                className="rounded-full border border-orange-300/60 bg-orange-500/20 px-5 py-2 text-xs uppercase tracking-[0.18em] text-orange-100 transition-all duration-700 ease-cinematic hover:bg-orange-500/30"
              >
                View Story Section
              </Link>
              <Link
                href="/food-guide"
                className="rounded-full border border-stone-100/20 bg-stone-950/45 px-5 py-2 text-xs uppercase tracking-[0.18em] text-stone-100 transition-all duration-700 ease-cinematic hover:border-orange-300/40 hover:text-orange-100"
              >
                Read Food Guide
              </Link>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[1.8rem] border border-orange-200/25">
            <div className="relative h-full min-h-[280px]">
              <Image
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80"
                alt="Chef working with open flame in a modern kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-stone-950/15" />
            </div>
          </article>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {CULTURE_PILLARS.map((pillar) => (
            <article key={pillar.title} className="glass-charcoal rounded-[1.5rem] border border-orange-200/25 p-6">
              <h2 className="text-xl text-stone-50">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-300/90">{pillar.detail}</p>
            </article>
          ))}
        </section>

        <section className="glass-charcoal rounded-[1.8rem] border border-orange-200/25 p-6 sm:p-8">
          <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.24em] text-orange-200/80">Dining Rhythm</p>
          <h2 className="mt-3 text-3xl text-stone-50">How a typical evening flows</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DINING_FLOW.map((item) => (
              <article key={item.step} className="rounded-2xl border border-stone-100/15 bg-stone-950/45 p-4">
                <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.22em] text-orange-200/80">Step {item.step}</p>
                <h3 className="mt-2 text-lg text-stone-50">{item.title}</h3>
                <p className="mt-2 text-sm text-stone-300/90">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="glass-charcoal rounded-[1.8rem] border border-orange-200/25 p-6 sm:p-8">
            <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.24em] text-orange-200/80">Community Events</p>
            <h2 className="mt-3 text-3xl text-stone-50">Culture nights guests can join</h2>
            <ul className="mt-5 space-y-3">
              {COMMUNITY_NIGHTS.map((night) => (
                <li key={night.title} className="rounded-2xl border border-stone-100/15 bg-stone-950/45 p-4">
                  <h3 className="text-lg text-amber-100">{night.title}</h3>
                  <p className="mt-2 text-sm text-stone-300/90">{night.detail}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="relative overflow-hidden rounded-[1.8rem] border border-orange-200/25">
            <div className="relative h-full min-h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
                alt="Guests sharing dishes around a dining table"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-transparent" />
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
