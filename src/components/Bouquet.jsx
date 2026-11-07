import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Flower from './Sunflower';

/**
 * Bouquet Component (Scene 3 - Main Scene)
 * - Beautiful floral bouquet with Roses, Cherry Blossoms, Tulips, Daisies, and Sunflowers
 * - Wrapped in soft blush kraft paper with a satin ribbon
 * - Click/tap: scales up smoothly & reveals Cassette Tape (Left) & Instant Camera (Right)
 */
export default function Bouquet({
  isZoomed = false,
  onToggleZoom,
  onOpenCassette,
  onOpenCamera,
  herName = "You",
}) {
  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[560px] sm:min-h-[640px] px-2 sm:px-4 select-none">
      {/* Back Button when zoomed */}
      <AnimatePresence>
        {isZoomed && (
          <motion.button
            type="button"
            onClick={onToggleZoom}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            className="absolute top-1 sm:top-2 z-40 px-4 py-1.5 rounded-full bg-cream-50/95 hover:bg-cream-100 text-warmBrown border border-rose-300/40 shadow-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 backdrop-blur-sm transition-all active:scale-95"
          >
            <span>↺</span>
            <span>Put back</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Interactive Stage */}
      <div className="relative flex items-center justify-center w-full min-h-[440px] sm:min-h-[480px]">
        {/* ================= LEFT: VINTAGE CASSETTE TAPE ================= */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              className="absolute left-1 sm:left-4 md:-left-8 top-12 sm:top-1/2 sm:-translate-y-1/2 z-30 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.3, x: 40, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0, rotate: -6 }}
              exit={{ opacity: 0, scale: 0.4, x: 30, rotate: -20 }}
              transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 0.15 }}
            >
              {/* Floating idle animation wrapper */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-6, -4, -6] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCassette();
                }}
                className="cursor-pointer group relative flex flex-col items-center"
              >
                {/* Washi tape on cassette */}
                <div className="absolute -top-3 w-14 sm:w-16 h-4 sm:h-5 washi-tape rounded-sm -rotate-6 z-20 shadow-sm pointer-events-none" />

                {/* Cassette Tape Body */}
                <div className="w-32 h-22 sm:w-44 sm:h-28 rounded-xl bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border-2 border-rose-300 shadow-polaroid p-1.5 sm:p-2 flex flex-col justify-between group-hover:border-rose-400 transition-colors">
                  {/* Cassette Header Label */}
                  <div className="bg-rose-200/60 border border-rose-300/60 rounded px-1.5 py-0.5 flex items-center justify-between">
                    <span className="text-[8px] sm:text-[10px] font-bold text-warmBrown tracking-wider uppercase font-mono">
                      Mixtape Side A
                    </span>
                    <span className="text-[7px] sm:text-[8px] text-warmBrown/70 font-mono">
                      60 MIN
                    </span>
                  </div>

                  {/* Tape Spool Window */}
                  <div className="relative bg-warmBrown-deep/90 rounded-lg h-8 sm:h-11 border border-rose-200/40 flex items-center justify-around px-2 sm:px-3 overflow-hidden">
                    <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-dashed border-pink-200/80 bg-warmBrown-deep flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-100" />
                    </div>

                    <div className="h-3.5 sm:h-4 w-10 sm:w-16 bg-rose-900/80 rounded-sm border-t border-b border-rose-300/40 flex items-center justify-center">
                      <span className="text-[6px] sm:text-[7px] text-pink-200 font-mono tracking-widest">
                        PLAY
                      </span>
                    </div>

                    <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-dashed border-pink-200/80 bg-warmBrown-deep flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-100" />
                    </div>
                  </div>

                  {/* Cassette Title */}
                  <div className="text-center truncate px-1">
                    <span className="font-script text-[11px] sm:text-sm font-bold text-warmBrown">
                      Mixtape for You 🎵
                    </span>
                  </div>
                </div>

                {/* Tooltip Pill */}
                <motion.div
                  className="mt-2 px-2.5 sm:px-3 py-1 rounded-full bg-cream-50/95 border border-rose-300 shadow-md text-[10px] sm:text-xs font-bold text-warmBrown flex items-center gap-1 group-hover:bg-pink-100 transition-colors"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span>Play Music</span>
                  <span>📼</span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= CENTER: MULTI-FLOWER BOUQUET ================= */}
        <motion.div
          className="relative cursor-pointer z-20 flex flex-col items-center"
          onClick={onToggleZoom}
          whileHover={!isZoomed ? { scale: 1.04 } : {}}
          whileTap={{ scale: 0.98 }}
          animate={
            isZoomed
              ? { scale: [1, 1.1], y: 15 }
              : {
                  scale: 1,
                  y: [0, -6, 0],
                  rotate: [-1.5, 1.5, -1.5],
                }
          }
          transition={
            isZoomed
              ? { type: 'spring', damping: 18, stiffness: 100 }
              : {
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }
          }
        >
          {/* Bouquet Visual Composition */}
          <div className="relative w-68 h-[370px] sm:w-84 sm:h-[430px] flex items-center justify-center">
            {/* Soft Green & Pink Leaf Foliage */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex justify-between pointer-events-none -z-10">
              <motion.div
                className="w-12 h-22 sm:w-16 sm:h-28 rounded-full bg-emerald-700/60 -rotate-45 shadow-sm origin-bottom"
                animate={{ rotate: [-43, -47, -43] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="w-12 h-22 sm:w-16 sm:h-28 rounded-full bg-emerald-700/60 rotate-45 shadow-sm origin-bottom"
                animate={{ rotate: [47, 43, 47] }}
                transition={{ duration: 4.5, repeat: Infinity }}
              />
            </div>

            {/* Lush Floral Arrangement: Roses, Sakura, Daisies, Tulips, Sunflower */}
            {/* Top Center: Elegant Rose */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10">
              <Flower type="rose" size={125} sway={true} rotation={0} />
            </div>

            {/* Top Left: Cherry Blossom */}
            <div className="absolute top-8 left-2 sm:left-4 z-10">
              <Flower type="cherry" size={110} sway={true} rotation={-20} delay={0.3} />
            </div>

            {/* Top Right: Pink Tulip */}
            <div className="absolute top-8 right-2 sm:right-4 z-10">
              <Flower type="tulip" size={110} sway={true} rotation={22} delay={0.6} />
            </div>

            {/* Center: Golden Sunflower Accent */}
            <div className="absolute top-20 sm:top-22 left-1/2 -translate-x-1/2 z-15">
              <Flower type="sunflower" size={120} sway={true} rotation={5} delay={1.0} />
            </div>

            {/* Lower Left: Pink Daisy */}
            <div className="absolute top-24 sm:top-28 left-4 sm:left-6 z-12">
              <Flower type="daisy" size={90} sway={true} rotation={-30} delay={0.5} />
            </div>

            {/* Lower Right: Sweet Cherry Blossom */}
            <div className="absolute top-24 sm:top-28 right-4 sm:right-6 z-12">
              <Flower type="cherry" size={90} sway={true} rotation={30} delay={1.2} />
            </div>

            {/* SOFT BLUSH & KRAFT BOUQUET WRAP */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-52 sm:w-64 z-20 flex flex-col items-center">
              <svg viewBox="0 0 200 220" className="w-full drop-shadow-xl overflow-visible">
                <defs>
                  <linearGradient id="pinkWrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD1DC" />
                    <stop offset="40%" stopColor="#FFB6C1" />
                    <stop offset="75%" stopColor="#FFA6B8" />
                    <stop offset="100%" stopColor="#F48FB1" />
                  </linearGradient>

                  <linearGradient id="pinkFoldLeft" x1="0%" y1="0%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#FFE4EC" />
                    <stop offset="100%" stopColor="#FF9EAF" />
                  </linearGradient>

                  <linearGradient id="pinkFoldRight" x1="100%" y1="0%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor="#FFCCD7" />
                    <stop offset="100%" stopColor="#F0809C" />
                  </linearGradient>

                  <linearGradient id="satinRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D81B60" />
                    <stop offset="50%" stopColor="#E91E63" />
                    <stop offset="100%" stopColor="#C2185B" />
                  </linearGradient>
                </defs>

                <polygon points="20,10 180,10 120,215 80,215" fill="#E8546D" opacity="0.25" />
                <polygon points="10,20 100,50 115,215 85,215 5,50" fill="url(#pinkFoldLeft)" />
                <polygon points="190,20 95,50 85,215 115,215 195,50" fill="url(#pinkFoldRight)" />
                <polygon points="25,35 175,35 118,215 82,215" fill="url(#pinkWrapGrad)" opacity="0.95" />
                <line x1="60" y1="40" x2="90" y2="170" stroke="#C2185B" strokeWidth="1" opacity="0.3" />
                <line x1="140" y1="40" x2="110" y2="170" stroke="#C2185B" strokeWidth="1" opacity="0.3" />

                {/* Satin Ribbon */}
                <g transform="translate(0, 30)">
                  <ellipse cx="100" cy="115" rx="34" ry="10" fill="url(#satinRibbon)" />
                  <ellipse cx="100" cy="115" rx="32" ry="8" fill="#FF4081" />
                  <ellipse cx="88" cy="113" rx="12" ry="7" fill="#E91E63" transform="rotate(-25 88 113)" />
                  <ellipse cx="112" cy="113" rx="12" ry="7" fill="#E91E63" transform="rotate(25 112 113)" />
                  <circle cx="100" cy="114" r="5.5" fill="#C2185B" />
                  <path d="M 97 116 Q 90 140 85 155 Q 92 145 96 122 Z" fill="#E91E63" />
                  <path d="M 103 116 Q 110 140 115 155 Q 108 145 104 122 Z" fill="#C2185B" />
                </g>
              </svg>

              {/* Tag */}
              <motion.div
                className="absolute top-16 sm:top-20 bg-cream-50 border border-rose-300 shadow-md px-3 py-1 rounded-md rotate-2 text-center"
                animate={{ rotate: [1, 3, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mx-auto -mt-2 mb-1" />
                <p className="font-script text-xs sm:text-sm font-bold text-warmBrown tracking-wide">
                  For {herName} 🌸
                </p>
              </motion.div>
            </div>
          </div>

          {/* Helper caption below bouquet when NOT zoomed */}
          {!isZoomed && (
            <motion.div
              className="mt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cream-50/90 border border-rose-300/50 shadow-sm text-xs sm:text-sm font-medium text-warmBrown">
                <span>Tap the bouquet to open</span>
                <span className="text-rose-500">✨</span>
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* ================= RIGHT: VINTAGE INSTANT CAMERA ================= */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              className="absolute right-1 sm:right-4 md:-right-8 bottom-8 sm:top-1/2 sm:-translate-y-1/2 z-30 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.3, x: -40, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, rotate: 6 }}
              exit={{ opacity: 0, scale: 0.4, x: -30, rotate: 20 }}
              transition={{ type: 'spring', damping: 16, stiffness: 120, delay: 0.15 }}
            >
              {/* Floating idle animation wrapper */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [6, 4, 6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCamera();
                }}
                className="cursor-pointer group relative flex flex-col items-center"
              >
                {/* Washi tape on camera */}
                <div className="absolute -top-3 w-14 sm:w-16 h-4 sm:h-5 washi-tape rounded-sm rotate-6 z-20 shadow-sm pointer-events-none" />

                {/* Camera Body in pastel pink */}
                <div className="w-32 h-24 sm:w-44 sm:h-32 rounded-2xl bg-gradient-to-b from-pink-100 to-rose-200 border-2 border-rose-300 shadow-polaroid p-2 sm:p-2.5 flex flex-col items-center justify-between group-hover:border-rose-400 transition-colors">
                  {/* Top Bar */}
                  <div className="w-full flex items-center justify-between px-1">
                    <div className="w-4 h-3 sm:w-5 sm:h-4 rounded bg-warmBrown-deep border border-rose-200 flex items-center justify-center">
                      <div className="w-2 h-1.5 sm:w-2.5 sm:h-2 rounded-sm bg-pink-300/80" />
                    </div>

                    <div className="flex h-1.5 sm:h-2 w-9 sm:w-12 rounded overflow-hidden">
                      <div className="flex-1 bg-rose-400" />
                      <div className="flex-1 bg-pink-300" />
                      <div className="flex-1 bg-rose-200" />
                    </div>

                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-cream-50 border border-rose-300 shadow-inner flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rose-400 animate-pulse" />
                      </div>
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-rose-600 border border-rose-800 shadow-sm group-hover:bg-rose-500 transition-colors" />
                    </div>
                  </div>

                  {/* Lens */}
                  <div className="relative w-13 h-13 sm:w-18 sm:h-18 rounded-full bg-warmBrown-deep border-3 sm:border-4 border-rose-300 shadow-inner flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-warmBrown-deep via-gray-800 to-rose-950 border border-cream-100/30 flex items-center justify-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-cream-100/30 -mt-2 -ml-2 sm:-mt-3 sm:-ml-3" />
                      <span className="text-[9px] sm:text-[10px] text-pink-300 select-none">📸</span>
                    </div>
                  </div>

                  {/* Polaroid Slot */}
                  <div className="w-20 sm:w-24 h-1.5 sm:h-2 bg-warmBrown-dark rounded-full border border-rose-300/30 shadow-inner" />
                </div>

                {/* Tooltip Pill */}
                <motion.div
                  className="mt-2 px-2.5 sm:px-3 py-1 rounded-full bg-cream-50/95 border border-rose-300 shadow-md text-[10px] sm:text-xs font-bold text-warmBrown flex items-center gap-1 group-hover:bg-pink-100 transition-colors"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  <span>Photo Booth</span>
                  <span>📷</span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
