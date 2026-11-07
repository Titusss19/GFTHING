import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

/**
 * Welcome / Name Input Screen
 * Asks for the recipient's name before anything else.
 */
export default function NameScreen({ onSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError(true);
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <motion.div
      className="relative z-20 flex flex-col items-center justify-center min-h-[75vh] px-4 select-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
    >
      {/* Decorative floating flower icons */}
      <motion.div
        className="absolute -top-6 text-4xl"
        animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌸
      </motion.div>

      {/* Scrapbook card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-cream-50/95 backdrop-blur-md rounded-3xl p-7 sm:p-9 border-2 border-blush-rose/40 shadow-polaroid-lg flex flex-col items-center text-center">
        {/* Washi tape topper */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape rounded-sm -rotate-1 shadow-sm pointer-events-none" />

        {/* Header */}
        <span className="text-[11px] font-bold text-sage-dark uppercase tracking-widest block mb-1">
          A Little Surprise ✨
        </span>
        <h1 className="font-script text-3xl sm:text-4xl font-bold text-warmBrown mb-2">
          Who is this for?
        </h1>
        <p className="font-sans text-xs sm:text-sm text-warmBrown/70 mb-6">
          Enter your name to unlock your gift
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-3">
          <div className="w-full relative">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Your name..."
              maxLength={24}
              autoFocus
              className={`w-full px-5 py-3.5 rounded-2xl bg-cream-100 border-2 ${
                error ? 'border-red-400' : 'border-blush-rose/50 focus:border-sunflower-dark'
              } text-warmBrown placeholder-warmBrown/40 text-center font-script text-2xl font-bold outline-none transition-all shadow-inner`}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-500 font-semibold"
            >
              Please enter your name first 🌸
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sunflower via-sunflower-dark to-sunflower text-white font-bold text-base shadow-warm-glow flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles size={18} />
            <span>Open My Gift</span>
            <ArrowRight size={18} />
          </motion.button>
        </form>

        {/* From tag */}
        <div className="mt-5 text-[11px] text-warmBrown/50 font-medium">
          Sent with 💖 from <span className="font-bold text-warmBrown">JM</span>
        </div>
      </div>
    </motion.div>
  );
}

