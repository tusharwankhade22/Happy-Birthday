import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { MUSIC_CONFIG } from '../config/birthdayConfig';

export default function MusicPlayer({ shouldStart = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const ytPlayerRef = useRef(null);
  const ytContainerRef = useRef(null);
  const hasAutoStartedRef = useRef(false);
  const pendingPlayRef = useRef(false);

  // Load YouTube IFrame API once
  useEffect(() => {
    const videoId = MUSIC_CONFIG.youtubeVideoId;
    if (!videoId) return;

    const initPlayer = () => {
      if (ytPlayerRef.current || !ytContainerRef.current) return;
      ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
        videoId,
        height: '1',
        width: '1',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          loop: 1,
          playlist: videoId,
          start: MUSIC_CONFIG.startSeconds || 60,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(MUSIC_CONFIG.defaultVolume ?? 35);
            setPlayerReady(true);
            if (pendingPlayRef.current) {
              pendingPlayRef.current = false;
              event.target.seekTo(MUSIC_CONFIG.startSeconds || 60, true);
              event.target.playVideo();
              setIsPlaying(true);
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(MUSIC_CONFIG.startSeconds || 60, true);
              event.target.playVideo();
            } else if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevReady?.();
        initPlayer();
      };
    }

    return () => {
      if (ytPlayerRef.current && ytPlayerRef.current.destroy) {
        ytPlayerRef.current.destroy();
        ytPlayerRef.current = null;
      }
    };
  }, []);

  const startMusic = useCallback(() => {
    if (ytPlayerRef.current && playerReady) {
      const currentTime = ytPlayerRef.current.getCurrentTime?.() || 0;
      if (currentTime < (MUSIC_CONFIG.startSeconds || 60)) {
        ytPlayerRef.current.seekTo(MUSIC_CONFIG.startSeconds || 60, true);
      }
      ytPlayerRef.current.setVolume(MUSIC_CONFIG.defaultVolume ?? 35);
      if (isMuted) {
        ytPlayerRef.current.mute();
      } else {
        ytPlayerRef.current.unMute();
      }
      ytPlayerRef.current.playVideo();
      setIsPlaying(true);
    } else {
      pendingPlayRef.current = true;
    }
  }, [isMuted, playerReady]);

  const pauseMusic = useCallback(() => {
    pendingPlayRef.current = false;
    if (ytPlayerRef.current && playerReady) {
      ytPlayerRef.current.pauseVideo();
    }
    setIsPlaying(false);
  }, [playerReady]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (ytPlayerRef.current && playerReady) {
      if (next) {
        ytPlayerRef.current.mute();
      } else {
        ytPlayerRef.current.unMute();
        ytPlayerRef.current.setVolume(MUSIC_CONFIG.defaultVolume ?? 35);
      }
    }
  };

  useEffect(() => {
    if (shouldStart && !hasAutoStartedRef.current) {
      hasAutoStartedRef.current = true;
      startMusic();
    }
  }, [shouldStart, startMusic]);

  return (
    <>
      {/* Hidden YouTube Player starting at 60s */}
      <div
        className="pointer-events-none fixed -left-[9999px] -top-[9999px] h-px w-px opacity-0"
        aria-hidden="true"
      >
        <div ref={ytContainerRef} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full border border-pink-200/50 bg-white/85 px-3 py-2 shadow-lg backdrop-blur-md"
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#F4A6C1] to-[#E879A9] text-white shadow-sm transition hover:scale-105 active:scale-95 focus:outline-none"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
        </button>

        <div className="hidden sm:flex flex-col pr-1 leading-tight">
          <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#E879A9]">
            <Music className="h-3 w-3" />
            {isPlaying ? 'Playing' : 'Music'}
          </span>
          <span className="text-xs font-medium text-[#493442]">
            {MUSIC_CONFIG.trackTitle}
          </span>
        </div>

        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-0.5 pr-1"
              aria-hidden="true"
            >
              {[0, 1, 2].map((bar) => (
                <motion.span
                  key={bar}
                  animate={{ height: ['4px', '14px', '6px', '12px', '4px'] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: bar * 0.2 }}
                  className="w-0.5 rounded-full bg-[#E879A9]"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#E879A9] transition hover:bg-pink-100/80 focus:outline-none"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </motion.div>
    </>
  );
}
