import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';
import { CAT_VIDEO_CONFIG } from '../config/birthdayConfig';

const BUNTING_COLORS = ['#FBBF24', '#F472B6', '#38BDF8', '#A78BFA', '#FB7185', '#34D399', '#FBBF24', '#F472B6'];

function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function CatVideoSurprise({ onNext }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoMissing, setVideoMissing] = useState(false);

  const youtubeId = extractYouTubeId(CAT_VIDEO_CONFIG.youtubeUrl);

  const stars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${(i * 19 + 5) % 95 + 2}%`,
      top: `${(i * 23 + 7) % 90 + 3}%`,
      size: 2 + (i % 3),
      delay: (i % 6) * 0.4,
    }));
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  return (
    <section
      id="scene-cat-video"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#24112B] via-[#34183C] to-[#200E26] px-4 py-14 text-white"
    >
      {/* Twinkling stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            animate={{ opacity: [0.25, 0.95, 0.25], scale: [0.8, 1.25, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: s.delay }}
            style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            className="absolute rounded-full bg-pink-200/80"
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script mb-5 text-2xl text-[#FFD6E5] sm:text-3xl"
        >
          {CAT_VIDEO_CONFIG.title}
        </motion.p>

        {/* Vertical Video Card with Bunting & Balloons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="relative"
        >
          {/* Party Bunting Flags across the top */}
          <div
            className="pointer-events-none absolute -top-2 left-2 right-2 z-30 flex justify-between"
            aria-hidden="true"
          >
            {BUNTING_COLORS.map((color, idx) => (
              <div
                key={idx}
                style={{ borderTopColor: color }}
                className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[18px] border-l-transparent border-r-transparent drop-shadow-sm"
              />
            ))}
          </div>

          {/* Video Frame */}
          <div className="relative aspect-[9/15] w-[265px] overflow-hidden rounded-2xl border-2 border-white/90 bg-[#180B1D] shadow-[0_24px_60px_rgba(0,0,0,0.55)] sm:w-[300px]">
            {youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&loop=1&playlist=${youtubeId}`}
                title="Cat Birthday Surprise Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : !videoMissing ? (
              <video
                ref={videoRef}
                src={CAT_VIDEO_CONFIG.videoSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onEnded={onNext}
                onError={() => setVideoMissing(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#3B1B45] to-[#230F2A] p-6 text-center">
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-4 text-6xl"
                >
                  🐱🎸
                </motion.div>
                <p className="font-script text-2xl text-[#FFD6E5]">
                  Cat Birthday Video!
                </p>
                <p className="mt-2 text-xs leading-relaxed text-pink-100/75">
                  Drop your cat video at{' '}
                  <code className="rounded bg-white/15 px-1.5 py-0.5 text-pink-200">
                    public/video/birthday-cat.mp4
                  </code>{' '}
                  and it will play right here!
                </p>
              </div>
            )}

            {/* Local MP4 Controls Overlay */}
            {!youtubeId && !videoMissing && (
              <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 focus:outline-none"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 focus:outline-none"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>

          {/* Left Pink Balloon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -bottom-5 -left-6 z-30"
            aria-hidden="true"
          >
            <svg width="46" height="68" viewBox="0 0 46 68">
              <ellipse cx="23" cy="24" rx="18" ry="22" fill="#F4A6C1" />
              <ellipse cx="17" cy="16" rx="4" ry="7" transform="rotate(-20 17 16)" fill="rgba(255,255,255,0.45)" />
              <path d="M23 46 Q20 56 24 66" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" />
            </svg>
          </motion.div>

          {/* Right Mint Balloon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="pointer-events-none absolute bottom-10 -right-6 z-30"
            aria-hidden="true"
          >
            <svg width="44" height="66" viewBox="0 0 44 66">
              <ellipse cx="22" cy="23" rx="17" ry="21" fill="#5EEAD4" />
              <ellipse cx="16" cy="15" rx="4" ry="7" transform="rotate(-20 16 15)" fill="rgba(255,255,255,0.45)" />
              <path d="M22 44 Q25 54 21 64" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Skip / Continue Buttons */}
        <div className="mt-7 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F4A6C1] to-[#E879A9] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#E879A9]/40 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD6E5]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Continue to Final Wish ✨</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            className="text-xs font-medium tracking-wide text-pink-200/75 underline underline-offset-4 transition hover:text-white focus:outline-none"
          >
            Skip ›
          </button>
        </div>
      </div>
    </section>
  );
}
