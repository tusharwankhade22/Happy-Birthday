import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BALLOON_MESSAGES } from '../config/birthdayConfig';

const BALLOON_STYLE = [
  { color: '#F472B6', highlight: '#FBCFE8', shadow: '#DB2777' },
  { color: '#FDE047', highlight: '#FEF9C3', shadow: '#EAB308' },
  { color: '#C084FC', highlight: '#E9D5FF', shadow: '#9333EA' },
  { color: '#5EEAD4', highlight: '#CCFBF1', shadow: '#0D9488' },
  { color: '#FB923C', highlight: '#FFEDD5', shadow: '#EA580C' },
];

export default function BalloonSurprise({ onNext }) {
  const [poppedIds, setPoppedIds] = useState([]);

  const stars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${(i * 19 + 5) % 95 + 2}%`,
      top: `${(i * 23 + 7) % 90 + 3}%`,
      size: 1.8 + (i % 3),
      delay: (i % 6) * 0.4,
    }));
  }, []);

  const handlePop = (id) => {
    if (poppedIds.includes(id)) return;
    setPoppedIds((prev) => [...prev, id]);
  };

  const allPopped = poppedIds.length === BALLOON_MESSAGES.length;
  const poppedReasons = poppedIds.map((id) =>
    BALLOON_MESSAGES.find((b) => b.id === id)
  );

  return (
    <section
      id="scene-balloons"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#24112B] via-[#3A173B] to-[#200E26] px-4 py-12 text-white"
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

      <div className="relative z-20 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <h2 className="font-serif-elegant text-2xl font-bold text-white sm:text-3xl">
          Pop the balloons
        </h2>
        <p className="mt-1.5 text-xs text-pink-200/80 sm:text-sm">
          5 balloons. Each one holds a reason you&apos;re loved. Pop them all 🎈
        </p>

        {/* Floating Balloons Row */}
        {!allPopped && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {BALLOON_MESSAGES.map((balloon, idx) => {
              const isPopped = poppedIds.includes(balloon.id);
              const style = BALLOON_STYLE[idx % BALLOON_STYLE.length];

              if (isPopped) return null;

              return (
                <motion.button
                  key={balloon.id}
                  type="button"
                  onClick={() => handlePop(balloon.id)}
                  aria-label={`Pop balloon ${idx + 1}`}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, idx % 2 === 0 ? 3 : -3, 0],
                  }}
                  transition={{
                    duration: 3 + idx * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.88 }}
                  className="cursor-pointer focus:outline-none"
                >
                  <svg width="74" height="114" viewBox="0 0 110 168" className="drop-shadow-lg">
                    <defs>
                      <radialGradient id={`dark-b-${balloon.id}`} cx="35%" cy="30%" r="65%">
                        <stop offset="0%" stopColor={style.highlight} />
                        <stop offset="55%" stopColor={style.color} />
                        <stop offset="100%" stopColor={style.shadow} />
                      </radialGradient>
                    </defs>
                    <path
                      d="M55 8 C84 8, 102 32, 102 62 C102 94, 78 116, 55 122 C32 116, 8 94, 8 62 C8 32, 26 8, 55 8 Z"
                      fill={`url(#dark-b-${balloon.id})`}
                    />
                    <ellipse
                      cx="34"
                      cy="38"
                      rx="11"
                      ry="20"
                      transform="rotate(-22 34 38)"
                      fill="rgba(255,255,255,0.45)"
                    />
                    <path d="M49 121 L61 121 L55 128 Z" fill={style.shadow} />
                    <path
                      d="M55 128 Q47 144 56 154 T53 168"
                      fill="none"
                      stroke="rgba(255,255,255,0.45)"
                      strokeWidth="1.8"
                    />
                  </svg>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Stacked Reason Cards (Matching 00:33-00:39 in recording) */}
        <div className="mt-6 flex w-full flex-col gap-3">
          <AnimatePresence>
            {poppedReasons.map((reason, idx) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 18, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="flex items-center justify-between rounded-xl border border-amber-300/30 bg-[#2E1436]/85 px-5 py-3.5 text-left shadow-lg backdrop-blur-sm"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                    Reason No. {idx + 1} 🎈
                  </span>
                  <p className="mt-0.5 text-sm font-medium text-white sm:text-base">
                    {reason.message}
                  </p>
                </div>
                <span className="text-lg">✨</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* All Popped CTA */}
        <AnimatePresence>
          {allPopped && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 flex flex-col items-center gap-4"
            >
              <p className="font-serif-elegant text-base italic text-amber-200/90">
                ...and a thousand more reasons ❤️
              </p>
              <button
                type="button"
                onClick={onNext}
                className="rounded-full bg-gradient-to-r from-[#F472B6] to-[#FB923C] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105 focus:outline-none"
              >
                Keep going 💛
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
