import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, ExternalLink, Check, Sparkles, Smartphone } from 'lucide-react';

/**
 * Robust helper to convert base64 dataURL to Blob
 */
export const dataURLtoBlob = (dataurl) => {
  try {
    const parts = dataurl.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    console.error('Blob error:', e);
    return null;
  }
};

/**
 * Dedicated Save to Photos Modal
 * Designed specifically for iOS (iPhone/iPad), Android, and Desktop
 */
export default function SaveModal({ isOpen, onClose, imageUrl, herName = "You" }) {
  const [savedStatus, setSavedStatus] = useState(false);

  if (!isOpen || !imageUrl) return null;

  // Handle native iOS / Mobile Share
  const handleNativeShare = async () => {
    const blob = dataURLtoBlob(imageUrl);
    if (!blob) return;

    const filename = `photobooth-jm-${Date.now()}.jpg`;

    if (navigator.canShare) {
      try {
        const file = new File([blob], filename, { type: 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Photobooth with JM 💖`,
            text: `Our special Photobooth memory! 🌸`,
            files: [file],
          });
          setSavedStatus(true);
          return;
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: Open in new tab or trigger download
    handleDirectDownload();
  };

  // Direct Blob download (Desktop & Android)
  const handleDirectDownload = () => {
    const blob = dataURLtoBlob(imageUrl);
    if (!blob) return;

    try {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `photobooth-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
      setSavedStatus(true);
    } catch (e) {
      console.warn("Direct download error:", e);
    }
  };

  // Open Full Resolution in New Tab (Safari iOS native support)
  const handleOpenInNewTab = () => {
    const blob = dataURLtoBlob(imageUrl);
    if (!blob) {
      window.open(imageUrl, '_blank');
      return;
    }
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          className="relative bg-cream-50 w-full max-w-md rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-rose-300 max-h-[92vh] overflow-y-auto flex flex-col items-center z-10"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-warmBrown transition-colors active:scale-95"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="text-center mt-1 mb-3">
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest flex items-center justify-center gap-1">
              <Sparkles size={12} /> Save Photobooth Memory <Sparkles size={12} />
            </span>
            <h3 className="font-script text-2xl sm:text-3xl font-bold text-warmBrown">
              I-save sa Photos 📸
            </h3>
          </div>

          {/* iOS / Mobile Tip Banner */}
          <div className="w-full bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 border border-rose-300 rounded-2xl p-3 mb-3 text-left">
            <div className="flex items-center gap-2 mb-1">
              <Smartphone size={16} className="text-rose-600 shrink-0" />
              <span className="text-xs font-bold text-rose-800">
                Para sa iPhone & iPad:
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-warmBrown/90 leading-relaxed font-semibold">
              👉 <strong className="text-rose-700">Pindutin at diinan (Long Press)</strong> ang picture sa ibaba, tapos piliin ang <strong className="text-rose-700">"Save to Photos"</strong> o <strong className="text-rose-700">"Add to Photos"</strong> 💕
            </p>
          </div>

          {/* The Image Preview with Touch Callout enabled */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden border-2 border-rose-300 shadow-md bg-white my-1">
            <img
              src={imageUrl}
              alt="Photobooth Strip"
              className="w-full h-auto object-contain mx-auto select-auto pointer-events-auto touch-manipulation"
              style={{
                WebkitTouchCallout: 'default',
                WebkitUserSelect: 'auto',
                userSelect: 'auto',
              }}
            />
          </div>

          {/* Saved feedback */}
          {savedStatus && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs font-bold text-rose-700 bg-pink-100 px-3 py-1.5 rounded-full flex items-center gap-1 border border-rose-300"
            >
              <Check size={14} />
              <span>Naka-save na! Tingnan sa Photos / Downloads 💖</span>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 w-full mt-3">
            {/* iOS Native Share Sheet (Save Image button) */}
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <Share2 size={16} />
              <span>Save / Share via iOS 📲</span>
            </button>

            <div className="flex items-center gap-2 w-full">
              {/* Direct Download */}
              <button
                type="button"
                onClick={handleDirectDownload}
                className="flex-1 py-2.5 px-2 rounded-2xl bg-pink-100 hover:bg-pink-200 border border-rose-300 text-rose-800 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <Download size={14} />
                <span>Download File 📥</span>
              </button>

              {/* Open in New Tab */}
              <button
                type="button"
                onClick={handleOpenInNewTab}
                className="flex-1 py-2.5 px-2 rounded-2xl bg-cream-100 hover:bg-cream-200 border border-rose-300 text-warmBrown font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <ExternalLink size={14} />
                <span>Buksan sa New Tab ↗️</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
