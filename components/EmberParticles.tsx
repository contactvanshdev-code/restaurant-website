'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Ember = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

export default function EmberParticles() {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    setEmbers(
      Array.from({ length: 30 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 18 + 14,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 60,
        opacity: Math.random() * 0.45 + 0.2
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {embers.map((ember) => (
        <motion.span
          key={ember.id}
          className="absolute rounded-full bg-gradient-to-b from-amber-300/80 to-orange-500/60 blur-[1px]"
          style={{
            left: `${ember.left}%`,
            width: ember.size,
            height: ember.size,
            bottom: '-12%'
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, ember.drift, ember.drift * -0.35],
            opacity: [0, ember.opacity, ember.opacity * 0.9, 0],
            scale: [0.6, 1.2, 0.7]
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}
