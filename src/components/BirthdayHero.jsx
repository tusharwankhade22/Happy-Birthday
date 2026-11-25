import React from 'react';
import { motion } from 'framer-motion';
import AnimatedHeartTree from './AnimatedHeartTree';
import { BIRTHDAY_PERSON } from '../config/birthdayConfig';

export default function BirthdayHero({ onNext }) {
  return (
    <section
      id="scene-hero"
      onClick={onNext}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNext?.();
        }
      }}
      className="relative flex h-screen w-full cursor-pointer flex-col justify-center overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FFE9EE] to-[#FFD6E5]/65 px-6 py-10 sm:px-12 lg:px-20 focus:outline-none"
    >
      {/* Warm radial glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-[#FFE4B5]/40 blur-3xl" />
        <div className="absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-[#FFD6E5]/55 blur-3xl" />
      </div>

      <div className="relative z-20 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-12">
        {/* Left Side: Exact typography from recording */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-5"
        >
          <p className="font-serif-elegant text-lg italic text-[#7D5163] sm:text-xl">
            it&apos;s officially your day
          </p>

          <h2 className="font-script mt-1 text-5xl font-bold leading-[1.08] text-[#D9468F] text-glow-pink sm:text-7xl">
            Happy
            <br />
            Birthday,
            <br />
            {BIRTHDAY_PERSON.name}
          </h2>

          <p className="font-serif-elegant mt-4 text-base italic text-[#7D5163] sm:text-lg">
            and just like that, you&apos;re turning {BIRTHDAY_PERSON.age} ✨
          </p>
        </motion.div>

        {/* Right Side: Giant Heart-Shaped Tree */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="order-1 lg:order-2 lg:col-span-7"
        >
          <AnimatedHeartTree />
        </motion.div>
      </div>

      {/* Bottom Center: "tap anywhere to continue" */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.45, 0.9, 0.45] }}
        transition={{ delay: 1.5, duration: 2.2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs font-medium tracking-wider text-[#9D6B7E]"
      >
        tap anywhere to continue
      </motion.p>
    </section>
  );
}
