import React, { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import IntroAnimation from './components/IntroAnimation';
import BirthdayHero from './components/BirthdayHero';
import BirthdayCake from './components/BirthdayCake';
import BalloonSurprise from './components/BalloonSurprise';
import MemoryGallery from './components/MemoryGallery';
import FinalLoveLetter from './components/FinalLoveLetter';
import CatVideoSurprise from './components/CatVideoSurprise';
import FinalCelebration from './components/FinalCelebration';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [musicShouldStart, setMusicShouldStart] = useState(false);

  const goToScene = (idx) => {
    setSceneIndex(Math.max(0, Math.min(7, idx)));
  };

  const handleIntroComplete = () => {
    setMusicShouldStart(true);
    goToScene(1);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative h-screen w-full overflow-hidden bg-[#24112B]">
        {/* Top-Left Back Button (when past Scene 1, matching recording) */}
        {sceneIndex > 0 && (
          <button
            type="button"
            onClick={() => goToScene(sceneIndex - 1)}
            className="fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/55 focus:outline-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </button>
        )}

        {/* Background Music Control */}
        <MusicPlayer shouldStart={musicShouldStart} />

        {/* Single-Screen Movie Flow with Smooth Crossfade Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            {sceneIndex === 0 && <IntroAnimation onContinue={handleIntroComplete} />}
            {sceneIndex === 1 && <BirthdayHero onNext={() => goToScene(2)} />}
            {sceneIndex === 2 && <BirthdayCake onNext={() => goToScene(3)} />}
            {sceneIndex === 3 && <BalloonSurprise onNext={() => goToScene(4)} />}
            {sceneIndex === 4 && <MemoryGallery onNext={() => goToScene(5)} />}
            {sceneIndex === 5 && <FinalLoveLetter onNext={() => goToScene(6)} />}
            {sceneIndex === 6 && <CatVideoSurprise onNext={() => goToScene(7)} />}
            {sceneIndex === 7 && <FinalCelebration onBackToTop={() => goToScene(0)} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
