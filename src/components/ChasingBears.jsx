import React from 'react';
import { motion } from 'framer-motion';

/**
 * Chasing Teddy Bears running across the screen in the background!
 * Bear 1 runs in front holding a flower/heart, Bear 2 playfully chases behind!
 */
export default function ChasingBears() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-28 pointer-events-none z-15 overflow-hidden select-none">
      {/* Container running across the screen from left to right */}
      <motion.div
        className="absolute bottom-2 flex items-end gap-6 pointer-events-auto cursor-pointer"
        initial={{ x: '-30vw' }}
        animate={{ x: '115vw' }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 1.5,
        }}
        whileTap={{ scale: 1.2, y: -15 }}
      >
        {/* BEAR 1 (Running in front with flower) */}
        <motion.div
          className="relative flex flex-col items-center"
          animate={{
            y: [0, -8, 0],
            rotate: [2, -4, 2],
          }}
          transition={{
            duration: 0.35,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Heart popping up as it runs */}
          <motion.span
            className="absolute -top-5 text-sm"
            animate={{
              opacity: [0, 1, 0],
              y: [-2, -14],
              scale: [0.6, 1.2, 0.8],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            💖
          </motion.span>

          {/* Bear 1 SVG */}
          <svg viewBox="0 0 80 80" width="58" height="58" className="drop-shadow-md">
            {/* Ears */}
            <circle cx="24" cy="22" r="10" fill="#B07050" />
            <circle cx="24" cy="22" r="5" fill="#FFCCD5" />
            <circle cx="56" cy="22" r="10" fill="#B07050" />
            <circle cx="56" cy="22" r="5" fill="#FFCCD5" />

            {/* Head */}
            <ellipse cx="40" cy="34" rx="22" ry="18" fill="#C88560" />

            {/* Cheeks blush */}
            <circle cx="28" cy="38" r="4" fill="#FF8FA3" opacity="0.6" />
            <circle cx="52" cy="38" r="4" fill="#FF8FA3" opacity="0.6" />

            {/* Eyes */}
            <ellipse cx="32" cy="32" rx="2.5" ry="3.5" fill="#2B1508" />
            <ellipse cx="48" cy="32" rx="2.5" ry="3.5" fill="#2B1508" />
            <circle cx="33" cy="31" r="1" fill="#FFFFFF" />
            <circle cx="49" cy="31" r="1" fill="#FFFFFF" />

            {/* Muzzle */}
            <ellipse cx="40" cy="40" rx="9" ry="6.5" fill="#FFE0D0" />
            <ellipse cx="40" cy="37" rx="3" ry="2" fill="#5A2E10" />
            <path d="M 38 41 Q 40 44 42 41" stroke="#5A2E10" strokeWidth="1.2" fill="none" strokeLinecap="round" />

            {/* Body */}
            <ellipse cx="40" cy="56" rx="16" ry="14" fill="#C88560" />
            <ellipse cx="40" cy="56" rx="9" ry="8" fill="#FFE0D0" />

            {/* Arms (holding a little flower) */}
            <ellipse cx="26" cy="50" rx="5" ry="8" fill="#B07050" transform="rotate(-30 26 50)" />
            <ellipse cx="54" cy="50" rx="5" ry="8" fill="#B07050" transform="rotate(30 54 50)" />

            {/* Flower held in paws */}
            <text x="35" y="55" fontSize="13">🌸</text>

            {/* Running Feet */}
            <ellipse cx="30" cy="69" rx="6" ry="4" fill="#9E5F40" />
            <ellipse cx="50" cy="68" rx="6" ry="4" fill="#9E5F40" />
          </svg>
        </motion.div>

        {/* Playful speed trails between bears */}
        <div className="flex flex-col gap-1 pb-4 opacity-50">
          <motion.div
            className="w-4 h-1 bg-pink-400 rounded-full"
            animate={{ scaleX: [0.5, 1.2, 0.5] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
          <motion.div
            className="w-6 h-1 bg-rose-400 rounded-full -ml-1"
            animate={{ scaleX: [1, 0.4, 1] }}
            transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
          />
        </div>

        {/* BEAR 2 (Chasing behind with cute bow) */}
        <motion.div
          className="relative flex flex-col items-center"
          animate={{
            y: [0, -9, 0],
            rotate: [-4, 3, -4],
          }}
          transition={{
            duration: 0.32,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.1,
          }}
        >
          {/* Thought bubble "Wait for me! 💕" */}
          <motion.span
            className="absolute -top-5 text-sm"
            animate={{
              opacity: [0, 1, 0],
              y: [-1, -12],
              scale: [0.7, 1.1, 0.7],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.3,
            }}
          >
            ✨
          </motion.span>

          {/* Bear 2 SVG (Cream / Pastel Pink Bear with Bow) */}
          <svg viewBox="0 0 80 80" width="56" height="56" className="drop-shadow-md">
            {/* Ears */}
            <circle cx="24" cy="22" r="10" fill="#E8B0C0" />
            <circle cx="24" cy="22" r="5" fill="#FFE4EC" />
            <circle cx="56" cy="22" r="10" fill="#E8B0C0" />
            <circle cx="56" cy="22" r="5" fill="#FFE4EC" />

            {/* Cute pink bow on left ear */}
            <path d="M 20 18 Q 16 14 20 12 Q 22 16 20 18" fill="#FF4081" />
            <path d="M 22 18 Q 26 14 22 12 Q 20 16 22 18" fill="#FF4081" />
            <circle cx="21" cy="15" r="2" fill="#D81B60" />

            {/* Head */}
            <ellipse cx="40" cy="34" rx="22" ry="18" fill="#F7C8D8" />

            {/* Cheeks blush */}
            <circle cx="27" cy="38" r="4" fill="#FF6584" opacity="0.65" />
            <circle cx="53" cy="38" r="4" fill="#FF6584" opacity="0.65" />

            {/* Eyes (happy running squint or cute eyes) */}
            <ellipse cx="32" cy="32" rx="2.5" ry="3.5" fill="#3D1C2E" />
            <ellipse cx="48" cy="32" rx="2.5" ry="3.5" fill="#3D1C2E" />
            <circle cx="33" cy="31" r="1" fill="#FFFFFF" />
            <circle cx="49" cy="31" r="1" fill="#FFFFFF" />

            {/* Muzzle */}
            <ellipse cx="40" cy="40" rx="9" ry="6.5" fill="#FFF0F5" />
            <ellipse cx="40" cy="37" rx="3" ry="2" fill="#AD1457" />
            <path d="M 38 41 Q 40 44 42 41" stroke="#AD1457" strokeWidth="1.2" fill="none" strokeLinecap="round" />

            {/* Body */}
            <ellipse cx="40" cy="56" rx="16" ry="14" fill="#F7C8D8" />
            <ellipse cx="40" cy="56" rx="9" ry="8" fill="#FFF0F5" />

            {/* Outstretched arms (running chase) */}
            <ellipse cx="50" cy="48" rx="7" ry="4" fill="#E8B0C0" transform="rotate(-15 50 48)" />
            <ellipse cx="28" cy="52" rx="5" ry="8" fill="#E8B0C0" transform="rotate(-35 28 52)" />

            {/* Running Feet */}
            <ellipse cx="32" cy="69" rx="6" ry="4" fill="#D494A8" />
            <ellipse cx="48" cy="67" rx="6" ry="4" fill="#D494A8" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
