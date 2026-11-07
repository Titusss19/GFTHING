import React from 'react';
import { motion } from 'framer-motion';

/**
 * Big, cute chasing teddy bears running across the screen in the background!
 * Much larger size (95px-110px), vivid colors, bouncy running paws, hearts, and speed lines!
 */
export default function ChasingBears() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-36 sm:h-44 pointer-events-none z-20 overflow-hidden select-none">
      {/* Container running across the screen from left to right */}
      <motion.div
        className="absolute bottom-2 flex items-end gap-8 pointer-events-auto cursor-pointer"
        initial={{ x: '-35vw' }}
        animate={{ x: '115vw' }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 1,
        }}
        whileTap={{ scale: 1.15, y: -20 }}
      >
        {/* BEAR 1 (Brown Teddy running in front holding flower & heart) */}
        <motion.div
          className="relative flex flex-col items-center"
          animate={{
            y: [0, -14, 0],
            rotate: [3, -5, 3],
          }}
          transition={{
            duration: 0.38,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Hearts floating above while running */}
          <motion.div
            className="absolute -top-7 flex gap-1"
            animate={{
              opacity: [0, 1, 0],
              y: [-2, -20],
              scale: [0.7, 1.3, 0.9],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            <span className="text-xl">💖</span>
          </motion.div>

          {/* Large Bear 1 SVG (Approx 95px - 105px) */}
          <svg viewBox="0 0 100 100" width="95" height="95" className="drop-shadow-lg overflow-visible">
            {/* Left Ear */}
            <circle cx="28" cy="24" r="13" fill="#9E5D3B" />
            <circle cx="28" cy="24" r="7" fill="#FFB6C1" />

            {/* Right Ear */}
            <circle cx="72" cy="24" r="13" fill="#9E5D3B" />
            <circle cx="72" cy="24" r="7" fill="#FFB6C1" />

            {/* Head */}
            <ellipse cx="50" cy="40" rx="28" ry="23" fill="#BA754C" />

            {/* Blush cheeks */}
            <circle cx="34" cy="46" r="6" fill="#FF6584" opacity="0.65" />
            <circle cx="66" cy="46" r="6" fill="#FF6584" opacity="0.65" />

            {/* Big cute eyes */}
            <ellipse cx="38" cy="38" rx="3.5" ry="5" fill="#241208" />
            <ellipse cx="62" cy="38" rx="3.5" ry="5" fill="#241208" />
            <circle cx="39.5" cy="36" r="1.5" fill="#FFFFFF" />
            <circle cx="63.5" cy="36" r="1.5" fill="#FFFFFF" />

            {/* Muzzle */}
            <ellipse cx="50" cy="49" rx="12" ry="9" fill="#FFE8DC" />
            <ellipse cx="50" cy="45" rx="4.5" ry="3" fill="#42200C" />
            <path d="M 47 50 Q 50 54 53 50" stroke="#42200C" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Body */}
            <ellipse cx="50" cy="70" rx="21" ry="18" fill="#BA754C" />
            <ellipse cx="50" cy="70" rx="12" ry="11" fill="#FFE8DC" />

            {/* Arms holding a flower */}
            <ellipse cx="32" cy="62" rx="7" ry="11" fill="#9E5D3B" transform="rotate(-30 32 62)" />
            <ellipse cx="68" cy="62" rx="7" ry="11" fill="#9E5D3B" transform="rotate(30 68 62)" />

            {/* Flower in hands */}
            <text x="41" y="69" fontSize="20">🌸</text>

            {/* Running Feet */}
            <ellipse cx="36" cy="86" rx="8" ry="6" fill="#8C4E2D" />
            <ellipse cx="64" cy="85" rx="8" ry="6" fill="#8C4E2D" />
          </svg>
        </motion.div>

        {/* Speed Wind Trails between them */}
        <div className="flex flex-col gap-1.5 pb-6 opacity-60">
          <motion.div
            className="w-6 h-1.5 bg-rose-400 rounded-full"
            animate={{ scaleX: [0.4, 1.3, 0.4] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          />
          <motion.div
            className="w-9 h-1.5 bg-pink-400 rounded-full -ml-2"
            animate={{ scaleX: [1.2, 0.4, 1.2] }}
            transition={{ duration: 0.35, repeat: Infinity, delay: 0.1 }}
          />
        </div>

        {/* BEAR 2 (Pastel Pink Teddy with bow playfully chasing behind) */}
        <motion.div
          className="relative flex flex-col items-center"
          animate={{
            y: [0, -15, 0],
            rotate: [-6, 4, -6],
          }}
          transition={{
            duration: 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.12,
          }}
        >
          {/* Sparkles / thought above bear 2 */}
          <motion.div
            className="absolute -top-7 flex gap-1"
            animate={{
              opacity: [0, 1, 0],
              y: [-1, -18],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.25,
            }}
          >
            <span className="text-xl">✨</span>
          </motion.div>

          {/* Large Bear 2 SVG (Approx 95px - 105px) */}
          <svg viewBox="0 0 100 100" width="95" height="95" className="drop-shadow-lg overflow-visible">
            {/* Left Ear */}
            <circle cx="28" cy="24" r="13" fill="#E89EB5" />
            <circle cx="28" cy="24" r="7" fill="#FFE4EC" />

            {/* Right Ear */}
            <circle cx="72" cy="24" r="13" fill="#E89EB5" />
            <circle cx="72" cy="24" r="7" fill="#FFE4EC" />

            {/* Cute satin bow on left ear */}
            <path d="M 23 20 Q 17 14 22 10 Q 26 16 23 20" fill="#FF2A6D" />
            <path d="M 26 20 Q 32 14 27 10 Q 23 16 26 20" fill="#FF2A6D" />
            <circle cx="24.5" cy="15" r="3" fill="#D81B60" />

            {/* Head */}
            <ellipse cx="50" cy="40" rx="28" ry="23" fill="#F7B2C7" />

            {/* Blush cheeks */}
            <circle cx="34" cy="46" r="6" fill="#FF4081" opacity="0.65" />
            <circle cx="66" cy="46" r="6" fill="#FF4081" opacity="0.65" />

            {/* Happy eyes */}
            <ellipse cx="38" cy="38" rx="3.5" ry="5" fill="#3D1C2E" />
            <ellipse cx="62" cy="38" rx="3.5" ry="5" fill="#3D1C2E" />
            <circle cx="39.5" cy="36" r="1.5" fill="#FFFFFF" />
            <circle cx="63.5" cy="36" r="1.5" fill="#FFFFFF" />

            {/* Muzzle */}
            <ellipse cx="50" cy="49" rx="12" ry="9" fill="#FFF0F5" />
            <ellipse cx="50" cy="45" rx="4.5" ry="3" fill="#880E4F" />
            <path d="M 47 50 Q 50 54 53 50" stroke="#880E4F" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Body */}
            <ellipse cx="50" cy="70" rx="21" ry="18" fill="#F7B2C7" />
            <ellipse cx="50" cy="70" rx="12" ry="11" fill="#FFF0F5" />

            {/* Outstretched chasing arms */}
            <ellipse cx="65" cy="58" rx="9" ry="6" fill="#E89EB5" transform="rotate(-15 65 58)" />
            <ellipse cx="33" cy="64" rx="6" ry="10" fill="#E89EB5" transform="rotate(-35 33 64)" />

            {/* Running Feet */}
            <ellipse cx="38" cy="86" rx="8" ry="6" fill="#D4829E" />
            <ellipse cx="62" cy="84" rx="8" ry="6" fill="#D4829E" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
