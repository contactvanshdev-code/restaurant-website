'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type NavLink = {
  href: string;
  label: string;
  caption: string;
};

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

const PRIMARY_LINKS: NavLink[] = [
  { href: '/', label: 'Home', caption: 'Landing and highlights' },
  { href: '/food-guide', label: 'Food Guide', caption: 'How to read and pair dishes' },
  { href: '/culture', label: 'Food Culture', caption: 'Traditions and dining rituals' }
];

const QUICK_LINKS: NavLink[] = [
  { href: '/#menu', label: 'Menu Atlas', caption: 'Browse all categories' },
  { href: '/#story', label: 'Story', caption: 'Sourcing and kitchen values' },
  { href: '/#reservations', label: 'Reserve', caption: 'Book your table fast' }
];

function isActiveLink(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return pathname === '/';
  return pathname === href;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[95]">
        <div className="mx-auto max-w-7xl px-4 pb-3 pt-3 sm:px-6 sm:pt-4">
          <div className="rounded-2xl border border-orange-200/30 bg-stone-950/70 px-3 py-2 backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.38)] sm:px-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-orange-500/10"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-orange-200/40 bg-gradient-to-br from-amber-500/35 to-orange-600/35 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-100">
                  EO
                </span>
                <span>
                  <span className="block font-[var(--font-accent)] text-xs uppercase tracking-[0.23em] text-orange-200/85">
                    Ember & Oak
                  </span>
                  <span className="block text-[11px] text-stone-300/80">Wood-fired kitchen</span>
                </span>
              </Link>

              <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex lg:gap-2" aria-label="Primary">
                {PRIMARY_LINKS.map((link) => {
                  const active = isActiveLink(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-xl border px-3 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-500 ease-cinematic lg:px-4 ${
                        active
                          ? 'border-orange-300/65 bg-orange-500/20 text-orange-100'
                          : 'border-transparent text-stone-300 hover:border-orange-300/40 hover:bg-orange-500/10 hover:text-orange-100'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="hidden items-center gap-2 lg:flex" aria-label="Section shortcuts">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-stone-100/15 bg-stone-900/45 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.15em] text-stone-300 transition-all duration-500 ease-cinematic hover:border-orange-300/40 hover:text-orange-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <button
                type="button"
                className="ml-auto inline-flex items-center gap-2 rounded-xl border border-orange-200/35 bg-orange-500/15 px-3 py-2 text-xs uppercase tracking-[0.18em] text-orange-100 md:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen((current) => !current)}
              >
                {menuOpen ? 'Close' : 'Menu'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[92] bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
            />

            <motion.aside
              id="mobile-navigation"
              className="fixed inset-y-0 right-0 z-[93] w-full max-w-sm p-3"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.55, ease: EASE }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex h-full flex-col rounded-3xl border border-orange-200/35 bg-gradient-to-b from-stone-900 to-stone-950 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
                <div className="flex items-center justify-between border-b border-stone-100/10 px-4 py-4">
                  <p className="font-[var(--font-accent)] text-xs uppercase tracking-[0.24em] text-orange-200/85">
                    Navigation Deck
                  </p>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-orange-200/40 bg-orange-500/20 px-3 text-sm uppercase tracking-[0.16em] text-orange-100"
                  >
                    X
                  </button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto p-4">
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400/85">Main pages</p>
                    {PRIMARY_LINKS.map((link) => {
                      const active = isActiveLink(pathname, link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block rounded-2xl border px-4 py-3 transition-all duration-500 ease-cinematic ${
                            active
                              ? 'border-orange-300/65 bg-gradient-to-r from-orange-500/25 to-amber-400/15 text-orange-100'
                              : 'border-stone-100/15 bg-stone-950/55 text-stone-200 hover:border-orange-300/40'
                          }`}
                        >
                          <span className="block text-sm uppercase tracking-[0.16em]">{link.label}</span>
                          <span className="mt-1 block text-xs text-stone-300/85">{link.caption}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400/85">Quick section jumps</p>
                    {QUICK_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-2xl border border-stone-100/15 bg-stone-950/55 px-4 py-3 text-stone-200 transition-all duration-500 ease-cinematic hover:border-orange-300/40"
                      >
                        <span className="block text-sm uppercase tracking-[0.16em]">{link.label}</span>
                        <span className="mt-1 block text-xs text-stone-300/85">{link.caption}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-stone-100/10 p-4">
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-2xl border border-orange-200/45 bg-gradient-to-r from-orange-500/30 to-amber-400/25 px-4 py-3 text-xs uppercase tracking-[0.2em] text-orange-100"
                  >
                    Close Menu
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
