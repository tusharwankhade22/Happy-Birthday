import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EXPLOSION_COLORS = [
  '#E879A9',
  '#F4A6C1',
  '#FFD6E5',
  '#FB7185',
  '#FDE047',
  '#FFFFFF',
];

export default function IntroAnimation({ onContinue }) {
  // Phases: 'idle' | 'pulling' | 'shoot' | 'explode' | 'banner'
  const [phase, setPhase] = useState('idle');
  const [pullAmount, setPullAmount] = useState(0);
  const [flightTarget, setFlightTarget] = useState({ dx: 0, dy: 0, angleDeg: -45 });

  const heartRef = useRef(null);
  const arrowRef = useRef(null);
  const dragStartRef = useRef(null);
  const didDragRef = useRef(false);

  const particles = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => {
      const angle = (i / 48) * Math.PI * 2 + ((i % 5) - 2) * 0.08;
      const distance = 80 + (i % 6) * 38;
      return {
        id: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: 6 + (i % 4) * 4,
        color: EXPLOSION_COLORS[i % EXPLOSION_COLORS.length],
        isHeart: i % 2 === 0,
        delay: (i % 4) * 0.03,
        duration: 0.8 + (i % 4) * 0.15,
      };
    });
  }, []);

  const computeExactTarget = () => {
    if (!heartRef.current || !arrowRef.current) {
      return { dx: 220, dy: -260, angleDeg: -48 };
    }
    const heartRect = heartRef.current.getBoundingClientRect();
    const arrowRect = arrowRef.current.getBoundingClientRect();

    const dx = heartRect.left + heartRect.width / 2 - (arrowRect.left + arrowRect.width / 2);
    const dy = heartRect.top + heartRect.height / 2 - (arrowRect.top + arrowRect.height / 2);
    const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
    return { dx, dy, angleDeg };
  };

  const triggerShootSequence = () => {
    const target = computeExactTarget();
    setFlightTarget(target);
    setPhase('shoot');
    setTimeout(() => setPhase('explode'), 480);
    setTimeout(() => setPhase('banner'), 1100);
    setTimeout(() => onContinue?.(), 3100);
  };

  const handlePointerDown = (e) => {
    if (phase !== 'idle') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    didDragRef.current = false;
    setPhase('pulling');
    setPullAmount(0.18);
  };

  const handlePointerMove = (e) => {
    if (phase !== 'pulling' || !dragStartRef.current) return;
    const dx = dragStartRef.current.x - e.clientX;
    const dy = e.clientY - dragStartRef.current.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 8) didDragRef.current = true;
    setPullAmount(Math.min(1, Math.max(0.18, dist / 85)));
  };

  const handlePointerUp = () => {
    if (phase !== 'pulling') return;
    dragStartRef.current = null;

    if (!didDragRef.current || pullAmount < 0.35) {
      setPullAmount(1);
      setTimeout(() => {
        setPullAmount(0);
        triggerShootSequence();
      }, 220);
    } else {
      setPullAmount(0);
      triggerShootSequence();
    }
  };

  const showBow = phase === 'idle' || phase === 'pulling' || phase === 'shoot';
  const isExploded = phase === 'explode' || phase === 'banner';

  const stringPullX = 36 - pullAmount * 22;

  return (
    <section
      id="scene-intro"
      className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#FFFDFB] via-[#FFF0F5] to-[#FFE2EC] px-6 py-10 select-none"
    >
      {/* Soft pink radial halo behind heart */}
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[#F4A6C1]/45 blur-3xl sm:h-[420px] sm:w-[420px]"
        aria-hidden="true"
      />

      {/* TOP SECTION: "a little something, for you" + Glossy 3D Pink Heart */}
      <div className="relative z-20 mt-4 flex w-full max-w-4xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isExploded ? 0 : 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif-elegant text-lg font-medium italic tracking-wide text-[#9D5B72] sm:text-xl"
        >
          a little something, for you
        </motion.p>

        <div
          ref={heartRef}
          className="relative mt-5 flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48"
        >
          <AnimatePresence>
            {!isExploded && (
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                exit={{ scale: [1, 1.25, 0], opacity: 0 }}
                transition={{
                  scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                  opacity: { duration: 0.4 },
                }}
              >
                <svg
                  viewBox="0 0 120 120"
                  className="h-32 w-32 drop-shadow-[0_14px_28px_rgba(232,121,169,0.45)] sm:h-40 sm:w-40"
                >
                  <defs>
                    <radialGradient id="glossyHeartGrad" cx="35%" cy="28%" r="72%">
                      <stop offset="0%" stopColor="#FFC2D9" />
                      <stop offset="45%" stopColor="#F45B93" />
                      <stop offset="100%" stopColor="#D63376" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M60 102 C60 102 14 72 14 40 C14 22 28 12 43 12 C52 12 57.5 17 60 22 C62.5 17 68 12 77 12 C92 12 106 22 106 40 C106 72 60 102 60 102 Z"
                    fill="url(#glossyHeartGrad)"
                  />
                  <ellipse
                    cx="38"
                    cy="32"
                    rx="11"
                    ry="6.5"
                    transform="rotate(-22 38 32)"
                    fill="rgba(255,255,255,0.68)"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Heart Explosion */}
          {phase === 'explode' && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
                  animate={{
                    x: p.tx,
                    y: p.ty - 30,
                    scale: [0.5, 1.15, 0],
                    opacity: [1, 0.9, 0],
                  }}
                  transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
                  className="absolute"
                >
                  {p.isHeart ? (
                    <svg width={p.size + 4} height={p.size + 4} viewBox="0 0 24 24" fill={p.color}>
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <span
                      style={{ width: p.size, height: p.size, backgroundColor: p.color }}
                      className="block rounded-full"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM-LEFT: Interactive Wooden Bow & Arrow */}
      {showBow && (
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && phase === 'idle') {
              e.preventDefault();
              triggerShootSequence();
            }
          }}
          aria-label="Pull and release the bow to shoot the heart"
          className="absolute bottom-20 left-6 z-30 cursor-grab touch-none active:cursor-grabbing sm:bottom-24 sm:left-[18%] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E879A9] rounded-full"
        >
          <div className="relative h-36 w-36 sm:h-40 sm:w-40">
            {/* Unified Bow + Nocked Arrow SVG angled at -45deg toward the heart */}
            <svg
              viewBox="0 0 140 140"
              className="h-full w-full -rotate-45 overflow-visible drop-shadow-[0_10px_16px_rgba(73,52,66,0.16)]"
            >
              {/* Recurve Wooden Bow Limb */}
              <path
                d="M36 20 Q52 16 64 34 Q86 70 64 106 Q52 124 36 120"
                fill="none"
                stroke="#6D4334"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              {/* Bow Grip */}
              <rect x="70" y="60" width="9" height="20" rx="4" fill="#4A2C22" />

              {/* Taut Bowstring */}
              <path
                d={`M36 20 L${stringPullX} 70 L36 120`}
                fill="none"
                stroke="#8D6E63"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              {/* Nocked Arrow (hidden once flying as independent projectile) */}
              {phase !== 'shoot' && (
                <g transform={`translate(${stringPullX - 36}, 0)`}>
                  {/* Shaft */}
                  <line
                    x1="36"
                    y1="70"
                    x2="114"
                    y2="70"
                    stroke="#7D5446"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  {/* Pink Feather Fletching */}
                  <path d="M40 70 L30 63 L46 63 L50 70 Z" fill="#F45B93" />
                  <path d="M40 70 L30 77 L46 77 L50 70 Z" fill="#E879A9" />
                  {/* Golden Tip */}
                  <path
                    d="M112 70 L105 63.5 L127 70 L105 76.5 Z"
                    fill="#FBBF24"
                  />
                </g>
              )}
            </svg>

            {/* Flying Arrow Projectile (spawns at exact bow center when shot) */}
            <motion.div
              ref={arrowRef}
              initial={{ x: 0, y: 0, opacity: 0, rotate: -45 }}
              animate={
                phase === 'shoot'
                  ? {
                      x: flightTarget.dx,
                      y: flightTarget.dy,
                      rotate: flightTarget.angleDeg,
                      opacity: [1, 1, 0.9],
                    }
                  : { x: 0, y: 0, opacity: 0, rotate: -45 }
              }
              transition={{
                duration: 0.48,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
            >
              <svg width="90" height="24" viewBox="0 0 90 24" className="overflow-visible">
                <line
                  x1="6"
                  y1="12"
                  x2="74"
                  y2="12"
                  stroke="#7D5446"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                />
                <path d="M10 12 L0 5 L16 5 L20 12 Z" fill="#F45B93" />
                <path d="M10 12 L0 19 L16 19 L20 12 Z" fill="#E879A9" />
                <path d="M72 12 L65 5.5 L87 12 L65 18.5 Z" fill="#FBBF24" />
              </svg>
            </motion.div>
          </div>
        </div>
      )}

      {/* BOTTOM CENTER: "PULL & RELEASE" */}
      {showBow && (
        <div className="relative z-20 mb-2 flex flex-col items-center">
          <motion.p
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9D6B7E]"
          >
            PULL &amp; RELEASE
          </motion.p>
        </div>
      )}

      {/* FULL-SCREEN PINK "Happy Birthday" CINEMATIC FLASH (00:08 in recording) */}
      <AnimatePresence>
        {phase === 'banner' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={onContinue}
            className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-gradient-to-br from-[#F43F8E] via-[#EC4899] to-[#BE185D] px-6 text-center text-white"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="font-serif-elegant text-lg italic tracking-wide sm:text-xl"
            >
              make a wish...
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200, damping: 16 }}
              className="mt-2 text-6xl font-extrabold leading-none tracking-tight drop-shadow-lg sm:text-8xl"
            >
              Happy
              <br />
              Birthday
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="font-serif-elegant mt-4 text-lg italic sm:text-xl"
            >
              to someone worth celebrating
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
