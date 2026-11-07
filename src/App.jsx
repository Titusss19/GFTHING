import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, RotateCcw, User } from 'lucide-react';
import NameScreen from './components/NameScreen';
import GiftBox from './components/GiftBox';
import SunflowerBurst from './components/SunflowerBurst';
import Bouquet from './components/Bouquet';
import CassettePlayer from './components/CassettePlayer';
import CameraBooth from './components/CameraBooth';
import ChasingBears from './components/ChasingBears';
import { useYouTubePlayer } from './hooks/useYouTubePlayer';
import { CONFIG } from './config';

export default function App() {
  // Recipient Name State (stored in memory/localStorage)
  const [herName, setHerName] = useState(() => {
    return localStorage.getItem('recipient_name') || '';
  });

  // Scene State Machine: 'name' -> 'box' -> 'bloom' -> 'bouquet'
  const [scene, setScene] = useState(() => {
    const saved = localStorage.getItem('recipient_name');
    return saved ? 'box' : 'name';
  });

  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const [isBurstActive, setIsBurstActive] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isPartingFlowers, setIsPartingFlowers] = useState(false);

  // Bouquet Zoom & Modal Overlays
  const [isBouquetZoomed, setIsBouquetZoomed] = useState(false);
  const [isCassetteOpen, setIsCassetteOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Global YouTube Player Hook (plays streaming audio client-side)
  const audioState = useYouTubePlayer();

  // Handler: When recipient submits their name on NameScreen
  const handleNameSubmit = (enteredName) => {
    setHerName(enteredName);
    localStorage.setItem('recipient_name', enteredName);
    setScene('box');
  };

  // Handler: When user clicks/taps the gift box in Scene 1
  const handleOpenBox = () => {
    setIsBoxOpened(true);

    // After lid lifts, trigger multi-flower burst
    setTimeout(() => {
      setScene('bloom');
      setIsBurstActive(true);

      // Show message once screen is covered
      setTimeout(() => {
        setIsMessageVisible(true);

        // Part the flowers and transition to bouquet
        setTimeout(() => {
          setIsMessageVisible(false);
          setIsPartingFlowers(true);

          setTimeout(() => {
            setScene('bouquet');
            setIsBurstActive(false);
            setIsPartingFlowers(false);
          }, 1100);
        }, 3000);
      }, 1500);
    }, 400);
  };

  // Reset / Replay experience
  const handleReplay = () => {
    setIsCameraOpen(false);
    setIsCassetteOpen(false);
    setIsBouquetZoomed(false);
    setIsPartingFlowers(false);
    setIsMessageVisible(false);
    setIsBurstActive(false);
    setIsBoxOpened(false);
    setScene('box');
  };

  // Change name
  const handleChangeName = () => {
    localStorage.removeItem('recipient_name');
    setHerName('');
    setIsCameraOpen(false);
    setIsCassetteOpen(false);
    setIsBouquetZoomed(false);
    setIsPartingFlowers(false);
    setIsMessageVisible(false);
    setIsBurstActive(false);
    setIsBoxOpened(false);
    setScene('name');
  };

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden flex flex-col justify-between bg-[#FFF0F5] text-warmBrown select-none">
      {/* Hidden YouTube IFrame Player element (streams audio in background) */}
      <div
        id="youtube-audio-player"
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          width: 200,
          height: 200,
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -999,
        }}
      />

      {/* Top Header */}
      <header className="relative z-20 w-full pt-4 pb-2 px-4 flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌸</span>
          <span className="font-script text-xl sm:text-2xl font-bold tracking-wide text-rose-700">
            {herName ? `For ${herName}` : 'A Special Gift'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Change Name Button */}
          {herName && scene !== 'name' && (
            <button
              type="button"
              onClick={handleChangeName}
              className="p-1.5 rounded-full bg-cream-50/90 hover:bg-cream-100 text-warmBrown border border-rose-200 shadow-sm text-xs transition-all active:scale-95"
              title="Change name"
            >
              <User size={14} />
            </button>
          )}

          {/* Replay Button */}
          {scene !== 'name' && scene !== 'box' && (
            <motion.button
              type="button"
              onClick={handleReplay}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-3 py-1.5 rounded-full bg-cream-50/90 hover:bg-cream-100 text-warmBrown border border-rose-200 shadow-sm text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all"
              title="Replay from box"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Replay</span>
            </motion.button>
          )}

          {/* Floating Music Indicator Pill */}
          {audioState.isPlaying && !isCassetteOpen && (
            <motion.button
              type="button"
              onClick={() => setIsCassetteOpen(true)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1.5 rounded-full bg-rose-400 text-white border border-rose-500 shadow-md text-xs font-bold flex items-center gap-1.5 animate-pulse active:scale-95 transition-all"
            >
              <Volume2 size={14} />
              <span className="truncate max-w-[100px] hidden xs:inline">
                {audioState.currentTrack.title || "Music"}
              </span>
            </motion.button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-3 sm:p-6 w-full max-w-5xl mx-auto">
        {/* SCENE 0: ENTER NAME FIRST */}
        {scene === 'name' && (
          <NameScreen onSubmit={handleNameSubmit} />
        )}

        {/* SCENE 1: GIFT BOX */}
        {scene === 'box' && (
          <motion.div
            key="scene-box"
            className="flex flex-col items-center justify-center my-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-6">
              <span className="font-sans text-xs font-bold text-rose-500 uppercase tracking-widest block mb-1">
                A Gift For You
              </span>
              <h1 className="font-script text-3xl sm:text-5xl font-bold text-warmBrown drop-shadow-sm">
                Hey {herName || "there"} 🌸
              </h1>
            </div>

            <GiftBox
              herName={herName || "You"}
              onOpen={handleOpenBox}
              isOpened={isBoxOpened}
            />
          </motion.div>
        )}

        {/* SCENE 2: MULTI-FLOWER BURST & TRANSITION MESSAGE */}
        <SunflowerBurst
          isActive={isBurstActive}
          messageVisible={isMessageVisible}
          partFlowers={isPartingFlowers}
          herName={herName || "You"}
        />

        {/* SCENE 3: BOUQUET (MAIN SCENE) */}
        {scene === 'bouquet' && (
          <motion.div
            key="scene-bouquet"
            className="flex flex-col items-center justify-center w-full"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-center mb-1 sm:mb-3">
              <h2 className="font-script text-3xl sm:text-5xl font-bold text-rose-800">
                Flowers for {herName} 🌸
              </h2>
              <p className="font-sans text-xs sm:text-sm text-warmBrown/75 font-medium max-w-md mx-auto mt-1">
                Tap the bouquet to explore 💖
              </p>
            </div>

            {/* Interactive Bouquet */}
            <Bouquet
              isZoomed={isBouquetZoomed}
              onToggleZoom={() => setIsBouquetZoomed((prev) => !prev)}
              onOpenCassette={() => setIsCassetteOpen(true)}
              onOpenCamera={() => setIsCameraOpen(true)}
              herName={herName || "You"}
            />
          </motion.div>
        )}
      </div>

      {/* Running Chasing Teddy Bears in the Background */}
      <ChasingBears />

      {/* Footer */}
      <footer className="relative z-10 w-full py-3 px-4 text-center text-xs font-medium text-warmBrown/60 border-t border-rose-200/40 bg-pink-100/40">
        <p className="font-sans">
          From <span className="text-rose-700 font-bold">{CONFIG.senderName}</span> 💖
        </p>
      </footer>

      {/* SCENE 4: CASSETTE TAPE MUSIC PLAYER OVERLAY (YOUTUBE STREAM) */}
      <CassettePlayer
        isOpen={isCassetteOpen}
        onClose={() => setIsCassetteOpen(false)}
        audioState={audioState}
      />

      {/* SCENE 5: INSTANT CAMERA PHOTO BOOTH OVERLAY */}
      <CameraBooth
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        herName={herName || "You"}
      />
    </main>
  );
}
