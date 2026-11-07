import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Share2, Check } from 'lucide-react';

/**
 * Polaroid / Photo Strip Component
 * Clean, reliable actions:
 * - Save Strip (Direct Download to Device)
 * - Share Strip (Native Mobile Share)
 * - Retake
 */
export default function Polaroid({
  imageUrl,
  photos = [],
  shotMode = 1,
  herName = "You",
  onRetake,
  onDownload,
  onShare,
  hasShared = false,
}) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col items-center w-full max-w-sm select-none">
      {/* PHOTO STRIP / POLAROID CONTAINER */}
      <motion.div
        className="relative bg-cream-50 p-3 sm:p-4 pb-5 rounded-2xl border-2 border-rose-300 shadow-polaroid-lg flex flex-col items-center w-full"
        initial={{ rotate: -2, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 1, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 18 }}
      >
        {/* Washi tape on top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 washi-tape rounded-sm -rotate-2 shadow-sm pointer-events-none" />

        {/* Photobooth Strip Header */}
        <div className="w-full flex items-center justify-between px-1 mb-2">
          <span className="font-script text-base sm:text-lg font-bold text-rose-600">
            {shotMode > 1 ? `PHOTOBOOTH • ${shotMode} CUTS` : 'PHOTOBOOTH'}
          </span>
          <span className="text-[10px] text-warmBrown/60 font-mono font-semibold">
            {currentDate}
          </span>
        </div>

        {/* Photos Grid / Strip / Baked Composite */}
        {imageUrl ? (
          <div className="w-full rounded-xl overflow-hidden border border-rose-200 shadow-sm bg-pink-100/30">
            <img
              src={imageUrl}
              alt="Photobooth Memory"
              className="w-full h-auto object-contain max-h-[60vh] mx-auto rounded-lg"
            />
          </div>
        ) : photos && photos.length > 1 ? (
          <div className="w-full flex flex-col gap-2">
            {photos.map((pic, idx) => (
              <div
                key={idx}
                className="w-full aspect-[4/3] bg-pink-100/50 rounded-xl overflow-hidden relative border border-rose-200 shadow-sm"
              >
                <img
                  src={pic}
                  alt={`Shot ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-2 text-[10px] font-bold text-white drop-shadow-md">
                  #{idx + 1}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full aspect-[4/3] bg-pink-100/50 rounded-xl overflow-hidden relative border border-rose-200 shadow-sm">
            <img
              src={photos && photos[0]}
              alt="Captured memory"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Photobooth Footer */}
        <div className="w-full mt-3 px-1 flex items-center justify-between border-t border-rose-200/60 pt-2">
          <div className="flex flex-col">
            <span className="font-script text-lg sm:text-xl font-bold text-warmBrown tracking-wide">
              For {herName} 🌸
            </span>
            <span className="font-sans text-[10px] text-rose-500 font-bold">
              Special Memory
            </span>
          </div>
          <span className="text-xl">✨</span>
        </div>
      </motion.div>

      {/* Shared / Saved Toast */}
      {hasShared && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-pink-100 px-4 py-2 rounded-2xl border border-rose-300"
        >
          <Check size={16} />
          <span>Saved na sa photos! 💖</span>
        </motion.div>
      )}

      {/* Action Buttons: Retake, Save Strip, Share */}
      <div className="flex items-center justify-center gap-2 mt-4 w-full">
        {/* Retake */}
        <button
          type="button"
          onClick={onRetake}
          className="flex-1 py-3 px-2 rounded-2xl bg-cream-100 hover:bg-cream-200 border border-rose-300 text-warmBrown text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <RotateCcw size={15} />
          <span>Retake</span>
        </button>

        {/* Save Strip (Direct Download) */}
        <button
          type="button"
          onClick={onDownload}
          className="flex-1 py-3 px-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md"
        >
          <Download size={15} />
          <span>Save Strip 📥</span>
        </button>

        {/* Share Strip (Mobile Native Share or Copy) */}
        {onShare && (
          <button
            type="button"
            onClick={onShare}
            className="flex-1 py-3 px-2 rounded-2xl bg-pink-100 hover:bg-pink-200 border border-rose-300 text-rose-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            <Share2 size={15} />
            <span>Share 📲</span>
          </button>
        )}
      </div>
    </div>
  );
}
