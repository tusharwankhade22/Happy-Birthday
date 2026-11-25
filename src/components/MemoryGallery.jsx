import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { MEMORIES } from '../config/birthdayConfig';

export default function MemoryGallery({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [failedImages, setFailedImages] = useState({});

  const stars = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 19 + 5) % 95 + 2}%`,
      top: `${(i * 23 + 7) % 90 + 3}%`,
      size: 1.8 + (i % 3),
      delay: (i % 6) * 0.4,
    }));
  }, []);

  const currentMemory = MEMORIES[currentIndex];
  const nextMemory = MEMORIES[(currentIndex + 1) % MEMORIES.length];
  const isImgFailed = !!failedImages[currentMemory.id];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % MEMORIES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      id="scene-memories"
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

      <div className="relative z-20 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <h2 className="font-serif-elegant text-2xl font-bold text-white sm:text-3xl">
          A walk down memory lane
        </h2>
        <p className="mt-1 text-xs text-pink-200/75 sm:text-sm">
          swipe through 📸
        </p>

        {/* Stacked Polaroid Viewer */}
        <div className="relative mt-7 flex w-full items-center justify-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous memory"
            className="z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="relative h-[340px] w-[265px] sm:h-[370px] sm:w-[295px]">
            {/* Next Card Peeking Behind */}
            <div
              className="pointer-events-none absolute inset-0 translate-x-5 translate-y-2 rotate-6 rounded-sm bg-white/85 p-3 pb-10 opacity-75 shadow-xl"
              aria-hidden="true"
            >
              <div className="h-full w-full rounded-xs bg-pink-100" />
            </div>

            {/* Active Polaroid Card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentMemory.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60, rotate: direction * 6, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, rotate: -2, scale: 1 }}
                exit={{ opacity: 0, x: direction * -60, rotate: direction * -6, scale: 0.95 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) handleNext();
                  if (info.offset.x > 50) handlePrev();
                }}
                className="polaroid-paper relative z-20 flex h-full w-full cursor-grab flex-col rounded-sm p-3 pb-4 text-left shadow-[0_20px_50px_rgba(0,0,0,0.45)] active:cursor-grabbing"
              >
                <div className="relative flex-1 overflow-hidden rounded-xs bg-[#FFF0F5]">
                  {!isImgFailed ? (
                    <img
                      src={currentMemory.src}
                      alt={currentMemory.caption}
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [currentMemory.id]: true,
                        }))
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${currentMemory.gradient} p-5 text-center`}
                    >
                      <Camera className="mb-2 h-9 w-9 text-[#E879A9]" />
                      <span className="font-script text-2xl font-bold text-[#493442]">
                        Memory #{currentMemory.id}
                      </span>
                      <span className="mt-1 text-[11px] text-[#493442]/70">
                        public/images/memories/memory-{currentMemory.id}.jpg
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between px-1">
                  <p className="font-script text-xl leading-tight text-[#493442]">
                    {currentMemory.caption}
                  </p>
                  <Heart className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next memory"
            className="z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center gap-1.5">
          {MEMORIES.map((mem, idx) => (
            <button
              key={mem.id}
              type="button"
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Memory ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-5 bg-amber-300' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onNext}
          className="mt-6 rounded-full bg-gradient-to-r from-[#F472B6] to-[#FB923C] px-9 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:scale-105 focus:outline-none"
        >
          Keep going
        </button>
      </div>
    </section>
  );
}
