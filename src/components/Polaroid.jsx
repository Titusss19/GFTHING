import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Share2, Check, Sparkles, Smartphone } from 'lucide-react';
import SaveModal from './SaveModal';

/**
 * Polaroid / Photo Strip Component
 * 100% Anti-stretch + Multi-device save support (iPhone, iPad, Android, PC)
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const activeImage = imageUrl || (photos && photos[0]);

  const handleSaveClick = () => {
    // Open the visual save modal on mobile devices or trigger download
    if (onDownload) {
      onDownload();
    }
    // Also open modal so mobile/iOS users can long-press or tap Save
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm">
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
          <div
            onClick={() => setIsModalOpen(true)}
            className="w-full rounded-xl overflow-hidden border border-rose-200 shadow-sm bg-pink-100/30 cursor-pointer group relative"
            title="Pindutin para i-save sa Photos"
          >
            <img
              src={imageUrl}
              alt="Photobooth Memory"
              className="w-full h-auto object-contain max-h-[60vh] mx-auto rounded-lg select-auto pointer-events-auto touch-manipulation group-hover:opacity-95 transition-opacity"
              style={{
                WebkitTouchCallout: 'default',
                WebkitUserSelect: 'auto',
                userSelect: 'auto',
              }}
            />
            {/* Tap to save hint pill */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-warmBrown-deep/80 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
              <Smartphone size={12} />
              <span>Tap to Save / View 📸</span>
            </div>
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

      {/* Helpful Mobile Instruction Callout */}
      <div className="mt-2.5 px-3 py-1.5 rounded-full bg-pink-100/80 border border-rose-200/80 text-[11px] font-bold text-rose-700 flex items-center gap-1.5 shadow-sm">
        <span>💡</span>
        <span>Phone/iPad: Pindutin ang picture para i-save sa Photos!</span>
      </div>

      {/* Shared / Saved Toast */}
      {hasShared && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-pink-100 px-4 py-2 rounded-2xl border border-rose-300"
        >
          <Check size={16} />
          <span>Saved na sa photos! 💖</span>
        </motion.div>
      )}

      {/* Action Buttons: Retake, Save Strip, Share */}
      <div className="flex items-center justify-center gap-2 mt-3 w-full">
        {/* Retake */}
        <button
          type="button"
          onClick={onRetake}
          className="flex-1 py-3 px-2 rounded-2xl bg-cream-100 hover:bg-cream-200 border border-rose-300 text-warmBrown text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <RotateCcw size={15} />
          <span>Retake</span>
        </button>

        {/* Save Strip (Direct Download + Mobile Share) */}
        <button
          type="button"
          onClick={handleSaveClick}
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

      {/* Full Resolution Save / Long-Press Modal */}
      <SaveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={activeImage}
        herName={herName}
      />
    </div>
  );
}
