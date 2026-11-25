import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const CANOPY_COLORS = [
  '#E879A9',
  '#F4A6C1',
  '#FFD6E5',
  '#FB7185',
  '#FDA4AF',
  '#FBBF24',
  '#FDBA74',
];

// Generate a lush heart-shaped canopy of glossy heart leaves
function generateHeartCanopy() {
  const leaves = [];
  // Outer heart boundary + inner concentric rings for a full, rich heart canopy
  const rings = [
    { scale: 1.0, count: 32 },
    { scale: 0.74, count: 24 },
    { scale: 0.48, count: 16 },
    { scale: 0.24, count: 8 },
  ];

  let idx = 0;
  rings.forEach((ring, rIdx) => {
    for (let i = 0; i < ring.count; i++) {
      const t = (i / ring.count) * Math.PI * 2;
      // Parametric heart curve
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );

      // Slight organic jitter so it feels hand-illustrated
      const jitterX = ((idx * 7) % 5) - 2;
      const jitterY = ((idx * 11) % 5) - 2;

      const x = 190 + hx * 7.6 * ring.scale + jitterX;
      const y = 148 + hy * 7.2 * ring.scale + jitterY;

      leaves.push({
        id: idx,
        x: Math.round(x),
        y: Math.round(y),
        s: 0.85 + ((idx + rIdx) % 4) * 0.16,
        r: ((idx * 17) % 36) - 18,
        c: CANOPY_COLORS[idx % CANOPY_COLORS.length],
      });
      idx += 1;
    }
  });

  // Center heart
  leaves.push({ id: idx, x: 190, y: 150, s: 1.2, r: 0, c: '#E879A9' });
  return leaves;
}

export default function AnimatedHeartTree() {
  const heartLeaves = useMemo(() => generateHeartCanopy(), []);

  const floatingHearts = useMemo(
    () => [
      { id: 1, x: '16%', y: '32%', delay: 0.2, dur: 4.5, size: 15, color: '#F4A6C1' },
      { id: 2, x: '84%', y: '26%', delay: 1.0, dur: 5.2, size: 16, color: '#E879A9' },
      { id: 3, x: '48%', y: '10%', delay: 0.7, dur: 4.8, size: 13, color: '#FDBA74' },
      { id: 4, x: '12%', y: '62%', delay: 1.6, dur: 5.4, size: 14, color: '#FFD6E5' },
      { id: 5, x: '86%', y: '58%', delay: 2.1, dur: 4.9, size: 15, color: '#E879A9' },
      { id: 6, x: '68%', y: '14%', delay: 1.3, dur: 5.6, size: 12, color: '#F4A6C1' },
    ],
    []
  );

  return (
    <div className="relative mx-auto flex w-full max-w-[440px] items-center justify-center">
      {/* Warm soft radial glow behind the heart-shaped tree */}
      <div className="pointer-events-none absolute top-4 h-72 w-72 rounded-full bg-[#FFD6E5]/55 blur-3xl" />

      {/* Floating hearts around the tree */}
      {floatingHearts.map((fh) => (
        <motion.div
          key={fh.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{
            opacity: [0, 0.85, 0],
            y: [10, -34, -64],
            x: [0, fh.id % 2 === 0 ? 10 : -10, 0],
          }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: fh.dur,
            delay: fh.delay + 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ left: fh.x, top: fh.y }}
          className="pointer-events-none absolute z-20"
          aria-hidden="true"
        >
          <svg width={fh.size} height={fh.size} viewBox="0 0 24 24" fill={fh.color}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      <svg
        viewBox="0 0 380 410"
        className="relative z-10 h-auto w-full drop-shadow-[0_14px_28px_rgba(73,52,66,0.12)]"
        role="img"
        aria-label="Magical heart-shaped tree blooming with pink and coral hearts"
      >
        {/* Ground shadow */}
        <motion.ellipse
          cx="190"
          cy="388"
          rx="82"
          ry="11"
          fill="rgba(232, 121, 169, 0.16)"
          initial={{ scaleX: 0.3, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        />

        {/* Graceful Tree Trunk */}
        <motion.path
          d="M180 386 C183 326, 185 275, 187 220 C188 192, 189 170, 190 152"
          fill="none"
          stroke="#5C3A45"
          strokeWidth="15"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
        <motion.path
          d="M198 386 C195 326, 193 275, 192 220 C191 195, 190 172, 190 154"
          fill="none"
          stroke="#493442"
          strokeWidth="11"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />

        {/* Inner Branches supporting the heart canopy */}
        {[
          { d: 'M189 235 C160 205, 130 185, 108 155', w: 7, delay: 0.5 },
          { d: 'M191 235 C220 205, 250 185, 272 155', w: 7, delay: 0.54 },
          { d: 'M189 195 C165 162, 145 130, 132 102', w: 5.5, delay: 0.62 },
          { d: 'M191 195 C215 162, 235 130, 248 102', w: 5.5, delay: 0.66 },
          { d: 'M190 175 C190 148, 190 128, 190 112', w: 5, delay: 0.7 },
        ].map((branch, idx) => (
          <motion.path
            key={idx}
            d={branch.d}
            fill="none"
            stroke="#5C3A45"
            strokeWidth={branch.w}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: branch.delay, ease: 'easeOut' }}
          />
        ))}

        {/* Lush Heart-Shaped Canopy of Growing Hearts */}
        {heartLeaves.map((leaf, idx) => (
          <motion.g
            key={leaf.id}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: leaf.s, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: 0.78 + idx * 0.022,
              type: 'spring',
              stiffness: 260,
              damping: 16,
            }}
            style={{
              transformOrigin: `${leaf.x}px ${leaf.y}px`,
            }}
          >
            <g transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.r})`}>
              <path
                d="M0 7 C0 7 -11 -1 -11 -7 C-11 -11 -7.5 -14 -4 -14 C-1.8 -14 -0.4 -12.5 0 -11 C0.4 -12.5 1.8 -14 4 -14 C7.5 -14 11 -11 11 -7 C11 -1 0 7 0 7 Z"
                fill={leaf.c}
              />
              <ellipse
                cx="-4.5"
                cy="-8.5"
                rx="2.2"
                ry="1.2"
                transform="rotate(-25 -4.5 -8.5)"
                fill="rgba(255,255,255,0.42)"
              />
            </g>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
