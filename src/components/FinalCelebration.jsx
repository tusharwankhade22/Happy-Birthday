import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { BIRTHDAY_PERSON } from '../config/birthdayConfig';

const CONFETTI_COLORS = ['#F472B6', '#FBBF24', '#60A5FA', '#34D399', '#A78BFA', '#FFFFFF'];

export default function FinalCelebration({ onBackToTop }) {
  const confetti = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => ({
      id: i,
      left: `${(i * 7.3 + (i % 3) * 4) % 96 + 2}%`,
      size: 6 + (i % 4) * 3,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: (i % 8) * 0.22,
      duration: 3.8 + (i % 5) * 0.6,
      sway: (i % 2 === 0 ? 1 : -1) * (18 + (i % 3) * 12),
    }));
  }, []);

  return (
    <section
      id="scene-celebration"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#24112B] via-[#3A173B] to-[#200E26] px-6 py-12 text-center text-white"
    >
      {/* Falling Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: ['0vh', '105vh'],
              x: [0, c.sway, -c.sway * 0.5, 0],
              opacity: [0, 0.95, 0.9, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: c.left,
              width: c.size,
              height: c.size * 0.65,
              backgroundColor: c.color,
            }}
            className="absolute top-0 rounded-xs"
          />
        ))}
      </div>

      {/* Center Celebration Typography (Matching 01:12 in recording) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 flex max-w-xl flex-col items-center"
      >
        <h2 className="text-5xl font-extrabold leading-none tracking-tight text-white drop-shadow-md sm:text-6xl">
          HAPPY
          <br />
          BIRTHDAY
        </h2>

        <p className="font-script mt-1 text-5xl font-bold text-[#F59E0B] drop-shadow-md sm:text-6xl">
          {BIRTHDAY_PERSON.name}!
        </p>

        {/* Cute Birthday Cat Celebration Badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-6 flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-4xl ring-1 ring-white/20 backdrop-blur-sm"
        >
          <span>🌷</span>
          <span>🐱</span>
          <span>🎂</span>
        </motion.div>

        <p className="font-serif-elegant mt-6 text-base italic text-pink-100/90 sm:text-lg">
          Keep smiling, keep shining, and keep being YOU!
        </p>

        <p className="mt-4 text-xs font-medium tracking-wide text-pink-200/80 sm:text-sm">
          Made with love, just for you —{' '}
          <span className="font-semibold text-amber-300">{BIRTHDAY_PERSON.from} 💛</span>
        </p>

        <button
          type="button"
          onClick={onBackToTop}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-2.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/25 focus:outline-none"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Replay Story</span>
        </button>
      </motion.div>
    </section>
  );
}
