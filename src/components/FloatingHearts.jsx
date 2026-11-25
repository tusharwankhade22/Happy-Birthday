import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const HEART_COLORS = ['#FF8FAB', '#FB6F92', '#FFC2D1', '#E0AAFF', '#F9A8D4'];

export default function FloatingHearts({ count = 16, active = true }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 6.3 + (i % 3) * 4) % 96 + 2}%`,
      size: 10 + (i % 4) * 5,
      duration: 11 + (i % 5) * 3.2,
      delay: (i % 7) * 1.4,
      color: HEART_COLORS[i % HEART_COLORS.length],
      sway: (i % 2 === 0 ? 1 : -1) * (16 + (i % 4) * 8),
      isSparkle: i % 4 === 0,
    }));
  }, [count]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '108vh', x: 0, opacity: 0, scale: 0.7 }}
          animate={{
            y: '-12vh',
            x: [0, p.sway, -p.sway * 0.6, 0],
            opacity: [0, 0.55, 0.55, 0],
            rotate: p.isSparkle ? [0, 180, 360] : [-8, 8, -6],
            scale: [0.7, 1, 0.9, 0.7],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: p.left }}
          className="absolute bottom-0"
        >
          {p.isSparkle ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              className="opacity-70"
            >
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          ) : (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              className="opacity-55 drop-shadow-sm"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
