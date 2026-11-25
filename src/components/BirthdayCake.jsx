import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_PERSON } from '../config/birthdayConfig';

const CONFETTI_COLORS = ['#F472B6', '#FBBF24', '#60A5FA', '#34D399', '#A78BFA', '#FB7185'];

export default function BirthdayCake({ onNext }) {
  // Build steps: 0 -> 1 (layer1) -> 2 (layer2) -> 3 (layer3) -> 4 (frosting) -> 5 (candle)
  const [step, setStep] = useState(0);
  const [wished, setWished] = useState(false);

  const stars = useMemo(() => {
    return Array.from({ length: 34 }, (_, i) => ({
      id: i,
      left: `${(i * 17 + 7) % 95 + 2}%`,
      top: `${(i * 23 + 9) % 90 + 3}%`,
      size: 1.8 + (i % 3),
      delay: (i % 6) * 0.35,
    }));
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 250),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1150),
      setTimeout(() => setStep(4), 1600),
      setTimeout(() => setStep(5), 2050),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleMakeWish = (e) => {
    e.stopPropagation();
    if (step < 5 || wished) return;
    setWished(true);
  };

  return (
    <section
      id="scene-cake"
      onClick={wished ? onNext : undefined}
      className={`relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#24112B] via-[#3A173B] to-[#200E26] px-4 py-10 text-white ${
        wished ? 'cursor-pointer' : ''
      }`}
    >
      {/* Twinkling Night Sky Stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            animate={{ opacity: [0.2, 0.95, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: s.delay }}
            style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            className="absolute rounded-full bg-amber-100/80"
          />
        ))}
      </div>

      {/* Top Heading */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-serif-elegant relative z-20 mb-8 text-lg font-medium text-pink-100/90 sm:text-xl"
      >
        First things first 🎂
      </motion.p>

      {/* Cake Stage */}
      <div className="relative z-20 flex h-[240px] w-full max-w-[320px] flex-col items-center justify-end">
        {/* Confetti Burst on Wish */}
        <AnimatePresence>
          {wished && (
            <div className="pointer-events-none absolute top-4 left-1/2 z-30 -translate-x-1/2">
              {Array.from({ length: 28 }, (_, i) => {
                const angle = (i / 28) * Math.PI * 2;
                const dist = 60 + (i % 4) * 30;
                return (
                  <motion.span
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist - 20,
                      scale: [0.6, 1.2, 0],
                      opacity: [1, 0.95, 0],
                      rotate: [0, 180],
                    }}
                    transition={{ duration: 1.0, ease: 'easeOut' }}
                    style={{ backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }}
                    className="absolute h-2.5 w-2.5 rounded-xs"
                  />
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Single Tall Candle (Step 5) */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ y: -35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 16 }}
              className="relative z-20 mb-[-2px] flex flex-col items-center"
            >
              {/* Lit Flame */}
              {wished && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="animate-flame absolute -top-8 left-1/2 -translate-x-1/2"
                >
                  <div className="absolute -inset-3 rounded-full bg-amber-300/50 blur-md" />
                  <svg width="16" height="26" viewBox="0 0 16 26">
                    <path
                      d="M8 1 C12 8, 15 13, 14 19 C13 23, 10.5 25, 8 25 C5.5 25, 3 23, 2 19 C1 13, 4 8, 8 1 Z"
                      fill="#F97316"
                    />
                    <path
                      d="M8 7 C10.5 11, 12 15, 11.5 18.5 C11 21, 9.5 22.5, 8 22.5 C6.5 22.5, 5 21, 4.5 18.5 C4 15, 5.5 11, 8 7 Z"
                      fill="#FDE047"
                    />
                  </svg>
                </motion.div>
              )}
              <div className="h-2 w-0.5 bg-amber-100/80" />
              <div className="h-10 w-2.5 rounded-t-sm bg-gradient-to-b from-amber-200 to-amber-400 shadow-sm" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Tier (Step 3) */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ y: -45, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="relative z-10 h-11 w-36 rounded-t-xl bg-gradient-to-b from-[#F9A8D4] to-[#F472B6] shadow-md"
            >
              {step >= 4 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.35 }}
                  className="flex origin-top justify-around"
                >
                  {[12, 18, 11, 20, 13, 16].map((h, i) => (
                    <div key={i} style={{ height: h }} className="w-5 rounded-b-full bg-[#FFFDF9]" />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle Tier (Step 2) */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ y: -35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 210, damping: 18 }}
              className="relative z-10 -mt-1 h-12 w-48 rounded-t-lg bg-gradient-to-b from-[#FBCFE8] to-[#F9A8D4] shadow-md"
            />
          )}
        </AnimatePresence>

        {/* Bottom Tier (Step 1) */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="relative z-10 -mt-1 h-14 w-60 rounded-t-lg bg-gradient-to-b from-[#F472B6] to-[#EC4899] shadow-lg"
            />
          )}
        </AnimatePresence>

        {/* Cake Plate */}
        <div className="h-2.5 w-72 rounded-full bg-white/90 shadow-[0_6px_20px_rgba(255,255,255,0.2)]" />
      </div>

      {/* Bottom Interactive Area */}
      <div className="relative z-20 mt-8 flex min-h-[100px] flex-col items-center text-center">
        {step < 5 ? (
          <p className="text-sm font-medium italic text-pink-200/75">
            Baking something sweet...
          </p>
        ) : !wished ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            type="button"
            onClick={handleMakeWish}
            className="rounded-full bg-white/15 px-7 py-3 text-sm font-semibold text-amber-200 ring-1 ring-amber-300/50 backdrop-blur-sm transition hover:scale-105 hover:bg-white/25 focus:outline-none"
          >
            Make a wish 🕯️
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <h3 className="font-script text-4xl font-bold text-amber-300 drop-shadow-md sm:text-5xl">
              Happy Birthday, {BIRTHDAY_PERSON.name}!
            </h3>
            <motion.p
              animate={{ opacity: [0.5, 0.95, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs font-medium tracking-wider text-pink-200/75"
            >
              tap anywhere to continue
            </motion.p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
