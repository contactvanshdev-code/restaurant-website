'use client';

import EmberParticles from '@/components/EmberParticles';
import MenuSection from '@/components/MenuSection';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

const ROTATING_WORDS = ['MEMORY', 'PASSION', 'CRAFT'];
const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];
const RESERVATION_TIMES = ['5:30 PM', '6:00 PM', '6:45 PM', '7:30 PM', '8:15 PM', '9:00 PM'];

function MagneticBookButton() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.2 });

  return (
    <motion.a
      href="#reservations"
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((event.clientX - centerX) * 0.22);
        y.set((event.clientY - centerY) * 0.22);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative inline-flex h-32 w-32 items-center justify-center rounded-full border border-orange-200/40 bg-gradient-to-br from-amber-500/75 to-orange-700/75 text-center text-xs uppercase tracking-[0.26em] text-orange-50 shadow-ember transition-transform duration-700 ease-cinematic hover:scale-105"
    >
      <span className="max-w-[6rem] leading-relaxed">Book a Table</span>
      <span className="absolute inset-2 rounded-full border border-orange-100/35" />
    </motion.a>
  );
}

function StorySection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} id="story" className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-[var(--font-accent)] text-sm uppercase tracking-[0.32em] text-orange-200/80">The Story</p>
          <h2 className="mt-3 text-4xl text-stone-50 sm:text-5xl">Built from provenance. Finished in flame.</h2>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-stone-300/85">
          Head Chef Elias Marrow sources from regenerative farms within 90 miles, then layers each plate with open-fire
          technique and old-world restraint.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div style={{ y: imageY }} className="space-y-8">
          <motion.figure
            className="relative h-[420px] overflow-hidden rounded-[1.8rem] border border-orange-200/30"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <Image
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=80"
              alt="Head chef finishing a dish over fire"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          </motion.figure>

          <motion.figure
            className="relative h-[280px] overflow-hidden rounded-[1.8rem] border border-orange-200/30"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.12 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1600&q=80"
              alt="Locally sourced root vegetables and herbs"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          </motion.figure>
        </motion.div>

        <motion.div style={{ y: textY }} className="glass-charcoal rounded-[1.8rem] p-6 sm:p-8">
          <h3 className="text-2xl text-stone-50">Ingredient Origin</h3>
          <ul className="mt-6 space-y-5 text-sm text-stone-200/85">
            <li>
              <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.22em] text-orange-200/80">Highland Ranch Cooperative</p>
              <p className="mt-1">Grass-fed beef, finished for deep marbling and clean mineral notes.</p>
            </li>
            <li>
              <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.22em] text-orange-200/80">Riverbend Market Garden</p>
              <p className="mt-1">Seasonal roots, bitter greens, and aromatic herbs harvested pre-dawn.</p>
            </li>
            <li>
              <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.22em] text-orange-200/80">Blackline Millworks</p>
              <p className="mt-1">Custom-aged oak and fruitwood blocks chosen for nuanced smoke profiles.</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function ReservationSection() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [guests, setGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const formattedDate = useMemo(() => {
    const parsed = new Date(`${date}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) {
      return 'Select a date';
    }
    return parsed.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }, [date]);

  return (
    <section id="reservations" className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-[var(--font-accent)] text-sm uppercase tracking-[0.32em] text-orange-200/80">Reservations</p>
          <h2 className="mt-3 text-4xl text-stone-50 sm:text-5xl">Claim your seat by the fire.</h2>
        </div>
        <p className="max-w-lg text-sm text-stone-300/85">
          Choose date, party size, and a service window. Confirmation prints instantly with your dining details.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="glass-charcoal rounded-[1.8rem] p-6 sm:p-8">
          <div className="space-y-8">
            <label className="block">
              <span className="font-[var(--font-accent)] text-xs uppercase tracking-[0.2em] text-orange-200/90">Date</span>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-3 w-full rounded-2xl border border-stone-100/20 bg-stone-950/50 px-4 py-3 text-stone-50 outline-none transition-all duration-700 ease-cinematic focus:border-orange-300/70"
              />
            </label>

            <div>
              <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.2em] text-orange-200/90">Guests</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((value) => {
                  const isActive = guests === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setGuests(value)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all duration-700 ease-cinematic ${
                        isActive
                          ? 'border-orange-300 bg-orange-500/25 text-orange-50'
                          : 'border-stone-100/20 bg-stone-950/40 text-stone-300 hover:border-orange-300/50 hover:text-orange-100'
                      }`}
                    >
                      {value} {value === 1 ? 'Guest' : 'Guests'}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.2em] text-orange-200/90">Select Time</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {RESERVATION_TIMES.map((slot) => {
                  const isActive = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`rounded-xl border px-3 py-3 text-sm transition-all duration-700 ease-cinematic ${
                        isActive
                          ? 'border-orange-300 bg-orange-500/25 text-orange-50'
                          : 'border-stone-100/20 bg-stone-950/40 text-stone-300 hover:border-orange-300/50 hover:text-orange-100'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <AnimatePresence mode="wait">
            {selectedTime ? (
              <motion.div
                key={selectedTime}
                className="w-full max-w-md rounded-[1.7rem] border border-orange-200/40 bg-gradient-to-b from-stone-900 to-stone-950 p-6 shadow-ember"
                initial={{ opacity: 0, y: -36, scaleY: 0.2, transformOrigin: 'top' }}
                animate={{ opacity: 1, y: 0, scaleY: 1, transformOrigin: 'top' }}
                exit={{ opacity: 0, y: 18, scaleY: 0.4, transformOrigin: 'top' }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.28em] text-orange-200/80">Reservation Ticket</p>
                <h3 className="mt-4 text-3xl text-orange-100">EMBER & OAK</h3>
                <div className="my-5 border-t border-dashed border-orange-100/30" />
                <dl className="space-y-3 text-sm text-stone-200/85">
                  <div className="flex items-center justify-between gap-3">
                    <dt>Date</dt>
                    <dd>{formattedDate}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt>Guests</dt>
                    <dd>{guests}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt>Time</dt>
                    <dd>{selectedTime}</dd>
                  </div>
                </dl>
                <div className="my-5 border-t border-dashed border-orange-100/30" />
                <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.24em] text-orange-200/75">
                  Confirmation complete. See you fireside.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="glass-charcoal w-full max-w-md rounded-[1.7rem] p-6"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <p className="text-sm text-stone-300/85">Select a time slot to generate your confirmation ticket.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function CulturePreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-[var(--font-accent)] text-sm uppercase tracking-[0.32em] text-orange-200/80">Beyond the Plate</p>
          <h2 className="mt-3 text-4xl text-stone-50 sm:text-5xl">Understand the food before you order it.</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-stone-300/85">
          Explore dedicated pages that explain ingredients, technique, dining rhythm, and the cultural influences that
          shape each chapter of the menu.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <article className="glass-charcoal overflow-hidden rounded-[1.8rem] border border-orange-200/30">
          <div className="relative h-56">
            <Image
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=80"
              alt="Chefs preparing dishes in an open kitchen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/45 to-transparent" />
          </div>
          <div className="p-6">
            <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.26em] text-orange-200/80">Food Guide</p>
            <h3 className="mt-2 text-2xl text-stone-50">How to read the menu and pair confidently</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-300/85">
              Learn flavor profiles, heat levels, dietary symbols, and pairing logic so ordering feels simple on any
              device.
            </p>
            <Link
              href="/food-guide"
              className="mt-5 inline-flex rounded-full border border-orange-300/60 bg-orange-500/20 px-5 py-2 text-xs uppercase tracking-[0.18em] text-orange-100 transition-all duration-700 ease-cinematic hover:bg-orange-500/30"
            >
              Open Food Guide
            </Link>
          </div>
        </article>

        <article className="glass-charcoal overflow-hidden rounded-[1.8rem] border border-orange-200/30">
          <div className="relative h-56">
            <Image
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1600&q=80"
              alt="Shared dishes on a warm communal table"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/45 to-transparent" />
          </div>
          <div className="p-6">
            <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.26em] text-orange-200/80">Food Culture</p>
            <h3 className="mt-2 text-2xl text-stone-50">The stories, rituals, and people behind the kitchen</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-300/85">
              See how sourcing, seasonality, and service traditions come together to create the Ember & Oak dining
              culture.
            </p>
            <Link
              href="/culture"
              className="mt-5 inline-flex rounded-full border border-orange-300/60 bg-orange-500/20 px-5 py-2 text-xs uppercase tracking-[0.18em] text-orange-100 transition-all duration-700 ease-cinematic hover:bg-orange-500/30"
            >
              Explore Culture
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % ROTATING_WORDS.length);
    }, 2600);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      lerp: 0.08,
      easing: (t: number) => 1 - Math.pow(1 - t, 4)
    });

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative overflow-x-clip bg-charcoal text-stone-100">
      <EmberParticles />
      <div className="pointer-events-none fixed inset-0 z-[2] fire-gradient opacity-95" />

      <div className="relative z-10">
        <section className="texture-noise relative flex min-h-screen items-end overflow-hidden px-6 pb-16 pt-32 sm:px-8">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            src="https://videos.pexels.com/video-files/5490404/5490404-hd_1920_1080_25fps.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/55 to-charcoal/95" />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-[var(--font-accent)] text-sm uppercase tracking-[0.35em] text-orange-200/85">Wood-Fired Kitchen</p>
              <h1 className="mt-5 text-5xl leading-[0.95] text-stone-50 sm:text-7xl lg:text-8xl">
                FIRE. FLAVOR.{' '}
                <span className="inline-flex min-w-[7ch] text-orange-300">
                  [
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROTATING_WORDS[wordIndex]}
                      className="inline-block"
                      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                      transition={{ duration: 0.9, ease: EASE }}
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                  ]
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-relaxed text-stone-200/85 sm:text-base">
                Ember & Oak is a sensory-first destination where every course is plated like theater: smoke, texture,
                and flame orchestrated into a warm, high-end dining ritual.
              </p>
            </div>

            <div className="flex lg:justify-end">
              <MagneticBookButton />
            </div>
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-[var(--font-accent)] text-sm uppercase tracking-[0.32em] text-orange-200/80">The Menu Experience</p>
              <h2 className="mt-3 text-4xl text-stone-50 sm:text-5xl">A full-service menu system, built for clarity.</h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-stone-300/85">
              Instead of compressing dishes into PDFs, this page turns your entire menu into a browsable live product:
              searchable, filterable, and detail-rich.
            </p>
          </div>

          <MenuSection />
        </section>

        <StorySection />
        <CulturePreviewSection />
        <ReservationSection />
      </div>
    </main>
  );
}
