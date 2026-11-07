import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * GiftBox component in a dreamy pastel pink & rose gold aesthetic
 */
export default function GiftBox({
  herName = "You",
  onOpen,
  isOpened = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);
    if (onOpen) {
      onOpen();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Box and Lid Wrapper with idle bobbing */}
      <motion.div
        className="relative cursor-pointer group p-4"
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileTap={{ scale: 0.96 }}
        animate={
          isOpening
            ? { scale: [1, 1.08, 0.95], transition: { duration: 0.5 } }
            : { y: [0, -9, 0] }
        }
        transition={
          isOpening
            ? {}
            : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Glow behind box */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blush-rose/50 blur-2xl -z-10 pointer-events-none"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            isOpening
              ? { opacity: [0, 1, 0.8], scale: [0.8, 2.2, 2.5] }
              : isHovered
              ? { opacity: 0.6, scale: 1.15 }
              : { opacity: 0.35, scale: 1 }
          }
          transition={{ duration: 0.7 }}
        />

        {/* Gift Box Container */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex flex-col items-center">
          {/* THE LID */}
          <motion.div
            className="absolute top-0 z-20 w-[108%] h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-300 to-pink-300 shadow-lg flex items-center justify-center border-b-2 border-rose-400/40"
            animate={
              isOpening
                ? {
                    y: -120,
                    rotate: -20,
                    opacity: 0,
                    scale: 1.1,
                    transition: { duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }
                  }
                : isHovered
                ? {
                    y: -14,
                    rotate: [-1, 2, -1, 1, 0],
                    transition: {
                      rotate: { repeat: Infinity, duration: 1.2 },
                      y: { duration: 0.2 }
                    }
                  }
                : { y: 0, rotate: 0 }
            }
          >
            {/* Satin Ribbon on lid */}
            <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-rose-500 to-pink-600 shadow-inner" />
            <div className="absolute inset-x-0 h-4 bg-gradient-to-b from-rose-500 to-pink-600 shadow-inner" />

            {/* Ribbon Bow on top */}
            <motion.div
              className="absolute -top-7 sm:-top-8 flex items-center justify-center"
              animate={isHovered ? { scale: [1, 1.12, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-4 border-rose-500 bg-rose-200/50 -rotate-45 shadow-sm" />
              <div className="w-5 h-5 rounded-full bg-rose-600 shadow-md z-10 -mx-2.5 flex items-center justify-center text-[10px] text-white">
                🌸
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-4 border-rose-500 bg-rose-200/50 rotate-45 shadow-sm" />
            </motion.div>

            {/* Sparkles on hover */}
            {isHovered && !isOpening && (
              <motion.span
                className="absolute -right-3 -top-2 text-xl pointer-events-none"
                animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ✨
              </motion.span>
            )}
          </motion.div>

          {/* THE BOX BODY */}
          <div className="absolute top-10 sm:top-12 w-full h-38 sm:h-44 rounded-b-3xl bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200 border-2 border-rose-300/60 shadow-box-shadow overflow-hidden flex items-center justify-center">
            {/* Subtle paper stripes pattern */}
            <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#E8546D,#E8546D_10px,#FFF0F5_10px,#FFF0F5_20px)]" />

            {/* Vertical ribbon on box */}
            <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-rose-500 to-pink-600 shadow-sm" />

            {/* Inner pink glow */}
            {isOpening && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-rose-400 via-pink-300 to-pink-100 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Hanging gift tag */}
            <motion.div
              className="absolute -bottom-2 right-4 bg-cream-50 border border-rose-300 shadow-md px-3 py-1.5 rounded-lg rotate-6 text-[12px] font-script text-warmBrown font-bold flex items-center gap-1 z-10"
              animate={{ rotate: [4, 8, 4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span>For:</span>
              <span className="text-rose-600 font-semibold truncate max-w-[100px]">
                {herName}
              </span>
              <span>🌸</span>
            </motion.div>
          </div>
        </div>

        {/* Ground shadow */}
        <motion.div
          className="w-40 sm:w-48 h-4 bg-rose-900/15 rounded-full blur-md mx-auto mt-2"
          animate={
            isOpening
              ? { scale: [1, 1.3, 0.8], opacity: [0.3, 0.5, 0.1] }
              : { scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.18, 0.3] }
          }
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Button under the box */}
      <motion.div
        className="mt-6 flex flex-col items-center text-center cursor-pointer"
        onClick={handleClick}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          type="button"
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cream-50/95 hover:bg-cream-100 text-warmBrown border border-rose-300/60 shadow-md transition-all active:scale-95"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xl group-hover:rotate-12 transition-transform duration-300">
            🌸
          </span>
          <span className="font-script text-2xl font-bold tracking-wide text-rose-700 group-hover:text-rose-800 transition-colors">
            Open Me 🌸
          </span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-xs"
          >
            ✨
          </motion.span>
        </motion.button>

        <p className="font-sans text-xs text-warmBrown/60 mt-2 tracking-wide">
          (tap to unwrap)
        </p>
      </motion.div>
    </div>
  );
}
