import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVE_LETTER, BIRTHDAY_PERSON } from '../config/birthdayConfig';

export default function FinalLoveLetter({ onNext }) {
  // 'closed' -> 'opening' -> 'open'
  const [stage, setStage] = useState('closed');

  const stars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${(i * 19 + 5) % 95 + 2}%`,
      top: `${(i * 23 + 7) % 90 + 3}%`,
      size: 1.8 + (i % 3),
      delay: (i % 6) * 0.4,
    }));
  }, []);

  const handleOpen = () => {
    if (stage !== 'closed') return;
    setStage('opening');
    setTimeout(() => setStage('open'), 950);
  };

  return (
    <section
      id="scene-letter"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#24112B] via-[#3A173B] to-[#200E26] px-4 py-10 text-white"
    >
      {/* Twinkling Stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.25, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: s.delay }}
            style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            className="absolute rounded-full bg-amber-100/80"
          />
        ))}
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {stage !== 'open' ? (
            <motion.div
              key="envelope-stage"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.55 }}
              className="flex flex-col items-center"
            >
              <h2 className="font-serif-elegant text-2xl font-bold text-white sm:text-3xl">
                One last thing, {BIRTHDAY_PERSON.name}...
              </h2>
              <p className="mt-1.5 text-xs text-pink-200/75 sm:text-sm">
                {BIRTHDAY_PERSON.from} wrote you a letter.
              </p>

              {/* Golden Amber Envelope with 'G' Wax Seal */}
              <motion.div
                animate={stage === 'closed' ? { y: [0, -8, 0] } : { y: 0 }}
                transition={{
                  duration: 3.2,
                  repeat: stage === 'closed' ? Infinity : 0,
                  ease: 'easeInOut',
                }}
                onClick={handleOpen}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpen();
                  }
                }}
                aria-label="Tap to open your letter"
                className="group relative mt-10 cursor-pointer select-none focus:outline-none"
                style={{ perspective: 1000 }}
              >
                <div className="relative h-48 w-72 sm:h-52 sm:w-80">
                  {/* Envelope Back */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#D99B26] to-[#B47B14] shadow-[0_20px_50px_rgba(0,0,0,0.45)]" />

                  {/* Letter sliding out */}
                  <motion.div
                    initial={{ y: 10 }}
                    animate={stage === 'opening' ? { y: -105 } : { y: 10 }}
                    transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
                    className="letter-paper absolute inset-x-4 top-3 bottom-3 z-10 rounded-lg p-4 shadow-md"
                  >
                    <p className="font-script text-xl text-[#493442]">
                      {LOVE_LETTER.salutation}
                    </p>
                    <div className="mt-2 h-1.5 w-3/4 rounded-full bg-amber-200/70" />
                    <div className="mt-2 h-1.5 w-2/3 rounded-full bg-amber-200/70" />
                  </motion.div>

                  {/* Envelope Front Pocket */}
                  <svg
                    viewBox="0 0 320 208"
                    className="pointer-events-none absolute inset-0 z-20 h-full w-full rounded-xl"
                    preserveAspectRatio="none"
                  >
                    <polygon points="0,0 160,115 0,208" fill="#E5A93B" />
                    <polygon points="320,0 160,115 320,208" fill="#D59627" />
                    <polygon points="0,208 160,100 320,208" fill="#C98A1B" />
                  </svg>

                  {/* Top Flap */}
                  <motion.div
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: stage === 'opening' ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                    className="pointer-events-none absolute inset-x-0 top-0 z-30 h-28"
                  >
                    <svg viewBox="0 0 320 112" className="h-full w-full" preserveAspectRatio="none">
                      <polygon points="0,0 320,0 160,110" fill="#F2BA49" />
                    </svg>
                  </motion.div>

                  {/* Glowing 'G' Wax Seal */}
                  <motion.div
                    animate={
                      stage === 'opening'
                        ? { scale: 1.4, opacity: 0 }
                        : { scale: [1, 1.08, 1], opacity: 1 }
                    }
                    transition={
                      stage === 'opening'
                        ? { duration: 0.3 }
                        : { duration: 1.8, repeat: Infinity }
                    }
                    className="absolute left-1/2 top-[50%] z-40 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#FBBF24] to-[#D97706] font-serif-elegant text-lg font-bold text-white shadow-lg ring-4 ring-amber-200/60"
                  >
                    G
                  </motion.div>
                </div>
              </motion.div>

              <p className="mt-8 text-xs font-medium tracking-wider text-pink-200/75">
                Tap to open your letter
              </p>
            </motion.div>
          ) : (
            /* Lined Cream Paper Letter */
            <motion.div
              key="letter-open"
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-col items-center"
            >
              <div
                className="relative w-full rounded-2xl bg-[#FFFDF7] p-6 text-left text-[#493442] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-9"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(transparent, transparent 27px, rgba(232, 121, 169, 0.14) 28px)',
                }}
              >
                <p className="font-script text-3xl font-bold text-[#493442]">
                  {LOVE_LETTER.salutation}
                </p>

                <div className="mt-4 max-h-[48vh] space-y-3 overflow-y-auto pr-1 text-sm leading-7 text-[#493442]/90 sm:text-base">
                  {LOVE_LETTER.paragraphs.map((para, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + idx * 0.22, duration: 0.5 }}
                      className="font-sans-soft"
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + LOVE_LETTER.paragraphs.length * 0.22 }}
                  className="mt-5 text-right"
                >
                  <p className="font-serif-elegant text-xs italic text-[#7D5163]">
                    {LOVE_LETTER.closing}
                  </p>
                  <p className="font-script text-2xl font-bold text-[#D9468F]">
                    — {LOVE_LETTER.signature}
                  </p>
                </motion.div>
              </div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                type="button"
                onClick={onNext}
                className="mt-6 rounded-full bg-gradient-to-r from-[#F472B6] to-[#FB923C] px-10 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105 focus:outline-none"
              >
                Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
