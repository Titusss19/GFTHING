import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, X, Sparkles } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { photoFilters, photoFrames } from '../data/filters';
import FilterBar from './FilterBar';
import Polaroid from './Polaroid';
import { dataURLtoBlob } from './SaveModal';
import { CONFIG } from '../config';

export default function CameraBooth({
  isOpen,
  onClose,
  herName = CONFIG.herName,
}) {
  const [shotMode, setShotMode] = useState(4); // 1 | 3 | 4
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [compositeStripUrl, setCompositeStripUrl] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState(photoFilters[0]);
  const [selectedFrame, setSelectedFrame] = useState(photoFrames[0]);
  const [countdown, setCountdown] = useState(null);
  const [currentShotIndex, setCurrentShotIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isCapturingSeries, setIsCapturingSeries] = useState(false);
  const [hasShared, setHasShared] = useState(false);

  const canvasRef = useRef(null);
  const stripCanvasRef = useRef(null);

  const {
    videoRef,
    isReady,
    cameraError,
    isFrontCamera,
    toggleFacingMode,
    restartStream,
  } = useCamera(isOpen && capturedPhotos.length === 0);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setCapturedPhotos([]);
      setCompositeStripUrl(null);
      setCountdown(null);
      setIsFlashing(false);
      setIsCapturingSeries(false);
      setHasShared(false);
    }
  }, [isOpen]);

  // Anti-stretch: Draw image or video with perfect aspect-ratio center crop (object-cover)
  const drawCoverImage = (ctx, srcImg, dx, dy, dw, dh) => {
    const iw = srcImg.videoWidth || srcImg.naturalWidth || srcImg.width;
    const ih = srcImg.videoHeight || srcImg.naturalHeight || srcImg.height;
    if (!iw || !ih) return;

    const targetRatio = dw / dh;
    const sourceRatio = iw / ih;
    let sx = 0;
    let sy = 0;
    let sw = iw;
    let sh = ih;

    if (sourceRatio > targetRatio) {
      // Source is wider than target -> crop sides
      sw = Math.round(ih * targetRatio);
      sx = Math.round((iw - sw) / 2);
    } else {
      // Source is taller than target (e.g. portrait phone camera) -> crop top/bottom
      sh = Math.round(iw / targetRatio);
      sy = Math.round((ih - sh) / 2);
    }

    ctx.drawImage(srcImg, sx, sy, sw, sh, dx, dy, dw, dh);
  };

  // Take a single snapshot from video onto canvas (Exact 4:3 crop matching preview)
  const grabSingleFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);

    // Play subtle mechanical camera shutter sound using Web Audio API
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const actx = new AudioCtx();
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, actx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.25, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + 0.09);
      }
    } catch (e) { }

    // 4:3 high-definition resolution matching the viewfinder exactly
    const targetW = 960;
    const targetH = 720;

    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext('2d');
    ctx.save();

    // Mirror image if front camera is active
    if (isFrontCamera) {
      ctx.translate(targetW, 0);
      ctx.scale(-1, 1);
    }

    // Apply live filter
    if (selectedFilter.canvasFilter && selectedFilter.canvasFilter !== 'none') {
      ctx.filter = selectedFilter.canvasFilter;
    }

    // Draw video using exact 4:3 center crop (NO STRETCHING!)
    drawCoverImage(ctx, video, 0, 0, targetW, targetH);
    ctx.restore();

    // Baked overlay
    if (selectedFrame.id === 'sunflowers') {
      drawSunflowerBorder(ctx, targetW, targetH);
    } else if (selectedFrame.id === 'hearts') {
      drawHeartsOverlay(ctx, targetW, targetH);
    } else if (selectedFrame.id === 'sparkles') {
      drawSparklesOverlay(ctx, targetW, targetH);
    }

    return canvas.toDataURL('image/jpeg', 0.95);
  };

  // Automated Multi-Shot Photobooth Sequence
  const startPhotoboothSequence = async () => {
    if (!isReady || isCapturingSeries) return;
    setIsCapturingSeries(true);
    setCapturedPhotos([]);

    const total = shotMode;
    const taken = [];

    for (let i = 0; i < total; i++) {
      setCurrentShotIndex(i + 1);

      // 3-second countdown
      for (let c = 3; c > 0; c--) {
        setCountdown(c);
        await new Promise((r) => setTimeout(r, 1000));
      }

      setCountdown(null);
      const photoUrl = grabSingleFrame();
      if (photoUrl) {
        taken.push(photoUrl);
      }

      // If more shots remain, give 1.5s to change pose
      if (i < total - 1) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    setCapturedPhotos(taken);
    setIsCapturingSeries(false);

    // Generate composite photobooth strip
    generateCompositeStrip(taken, total);
  };

  // Generate full photobooth strip (Korean 4-cut / 3-cut / 1-cut style)
  const generateCompositeStrip = async (photosList, mode) => {
    if (!photosList || photosList.length === 0) return;
    const canvas = stripCanvasRef.current;
    if (!canvas) return;

    const stripWidth = 640;
    const pad = 32;
    const photoW = stripWidth - pad * 2; // 576px
    const photoH = Math.round(photoW * 0.75); // 432px (exact 4:3 aspect ratio)
    const headerH = 75;
    const footerH = 95;
    const gap = 20;

    const totalH = headerH + photosList.length * photoH + (photosList.length - 1) * gap + footerH;

    canvas.width = stripWidth;
    canvas.height = totalH;

    const ctx = canvas.getContext('2d');

    // Strip background: Pastel pink / cream
    ctx.fillStyle = '#FFF5F8';
    ctx.fillRect(0, 0, stripWidth, totalH);

    // Soft border
    ctx.strokeStyle = '#FFB6C1';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, stripWidth - 6, totalH - 6);

    // Header text
    ctx.fillStyle = '#C2185B';
    ctx.font = 'bold 26px "Dancing Script", cursive, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`PHOTOBOOTH • ${mode} CUTS 🌸`, stripWidth / 2, 48);

    // Load all images deterministically using Promise.all
    try {
      const loadPromises = photosList.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
          })
      );
      const loadedImgs = await Promise.all(loadPromises);

      loadedImgs.forEach((img, idx) => {
        if (!img) return;
        const yPos = headerH + idx * (photoH + gap);

        // Crisp white photo border
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(pad - 4, yPos - 4, photoW + 8, photoH + 8);

        // Draw image with anti-stretch cover crop
        drawCoverImage(ctx, img, pad, yPos, photoW, photoH);
      });

      // Footer
      const footerY = headerH + photosList.length * photoH + (photosList.length - 1) * gap + 42;
      ctx.fillStyle = '#7B435B';
      ctx.font = 'bold 28px "Dancing Script", cursive, sans-serif';
      ctx.fillText(`For ${herName} 💖`, stripWidth / 2, footerY);

      ctx.fillStyle = '#AD1457';
      ctx.font = 'bold 16px "Nunito", sans-serif';
      ctx.fillText(`Special Memory `, stripWidth / 2, footerY + 30);

      const fullStrip = canvas.toDataURL('image/jpeg', 0.95);
      setCompositeStripUrl(fullStrip);
    } catch (err) {
      console.warn("Error drawing strip:", err);
    }
  };

  // Canvas drawing helpers
  const drawSunflowerBorder = (ctx, w, h) => {
    ctx.save();
    ctx.strokeStyle = '#FF8DA1';
    ctx.lineWidth = Math.max(8, w * 0.02);
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.font = `${Math.floor(w * 0.05)}px sans-serif`;
    ctx.fillText("🌸", 20, 45);
    ctx.fillText("🌸", w - 55, 45);
    ctx.fillText("🌸", 20, h - 25);
    ctx.fillText("🌸", w - 55, h - 25);
    ctx.restore();
  };

  const drawHeartsOverlay = (ctx, w, h) => {
    ctx.save();
    ctx.font = `${Math.floor(w * 0.045)}px sans-serif`;
    ctx.fillText("💖", w * 0.1, h * 0.15);
    ctx.fillText("💕", w * 0.85, h * 0.2);
    ctx.fillText("💗", w * 0.15, h * 0.85);
    ctx.fillText("✨", w * 0.8, h * 0.82);
    ctx.restore();
  };

  const drawSparklesOverlay = (ctx, w, h) => {
    ctx.save();
    ctx.font = `${Math.floor(w * 0.045)}px sans-serif`;
    ctx.fillText("✨", w * 0.08, h * 0.2);
    ctx.fillText("⭐", w * 0.88, h * 0.15);
    ctx.fillText("🌟", w * 0.82, h * 0.85);
    ctx.fillText("✨", w * 0.12, h * 0.8);
    ctx.restore();
  };

  // Download or Save high-resolution photobooth strip
  const handleDownload = async () => {
    const target = compositeStripUrl || capturedPhotos[0];
    if (!target) return;

    const blob = dataURLtoBlob(target);
    const filename = `photobooth-strip-${Date.now()}.jpg`;

    // 1. Mobile Web Share API (Save Image on iOS / iPad)
    if (blob && navigator.canShare) {
      try {
        const file = new File([blob], filename, { type: 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Photobooth with JM 💖`,
            files: [file],
          });
          setHasShared(true);
          return;
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // 2. Direct Blob download (Desktop & Android)
    if (blob) {
      try {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
        setHasShared(true);
      } catch (e) {
        console.warn("Blob download error:", e);
      }
    }
  };

  // Mobile Native Share (Messenger, AirDrop, Save to Photos, etc.)
  const handleShare = async () => {
    const target = compositeStripUrl || capturedPhotos[0];
    if (!target) return;

    const blob = dataURLtoBlob(target);
    const filename = `photobooth-strip-${Date.now()}.jpg`;

    if (blob && navigator.canShare) {
      try {
        const file = new File([blob], filename, { type: 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Photobooth with JM 💖`,
            files: [file],
          });
          setHasShared(true);
          return;
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // Direct download fallback
    handleDownload();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-warmBrown-deep/65 backdrop-blur-sm">
        {/* Backdrop click to close */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-cream-50 rounded-3xl border-2 border-rose-300 shadow-polaroid-lg p-4 sm:p-5 flex flex-col items-center max-h-[92vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 140 }}
        >
          {/* Washi tape topper */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-blush rounded-sm -rotate-1 shadow-sm" />

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
          <div className="text-center mt-1 mb-2">
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest">
              Instant Photobooth
            </span>
            <h3 className="font-script text-2xl sm:text-3xl font-bold text-warmBrown">
              Snap a Memory 📸
            </h3>
          </div>

          {/* Photobooth Strip or Camera Preview */}
          {capturedPhotos.length > 0 ? (
            <Polaroid
              imageUrl={compositeStripUrl || capturedPhotos[0]}
              photos={capturedPhotos}
              shotMode={shotMode}
              herName={herName}
              onRetake={() => {
                setCapturedPhotos([]);
                setCompositeStripUrl(null);
                setHasShared(false);
              }}
              onDownload={handleDownload}
              onShare={handleShare}
              hasShared={hasShared}
            />
          ) : (
            <div className="w-full flex flex-col items-center">
              {/* Photobooth Cut / Shot Count Selector */}
              <div className="w-full mb-3 flex flex-col items-center">
                <span className="text-[11px] font-bold text-warmBrown/70 uppercase tracking-wider mb-1.5">
                  Choose Layout ✨
                </span>
                <div className="flex items-center gap-2 bg-pink-100/70 p-1 rounded-2xl border border-rose-200">
                  {[
                    { count: 1, label: '1 Shot' },
                    { count: 3, label: '3-Cut Strip' },
                    { count: 4, label: '4-Cut Korean' },
                  ].map((item) => (
                    <button
                      key={item.count}
                      type="button"
                      onClick={() => setShotMode(item.count)}
                      disabled={isCapturingSeries}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${shotMode === item.count
                          ? 'bg-rose-500 text-white shadow-sm scale-105'
                          : 'text-warmBrown/80 hover:bg-pink-200/50'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Camera Preview Screen */}
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-warmBrown-deep/90 border-2 border-rose-300 overflow-hidden shadow-inner flex items-center justify-center">
                {/* Flash effect overlay */}
                {isFlashing && (
                  <motion.div
                    className="absolute inset-0 bg-white z-40 pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                )}

                {/* Countdown overlay */}
                {countdown !== null && (
                  <motion.div
                    key={countdown}
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-rose-950/40 backdrop-blur-xs pointer-events-none"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="text-white text-xs font-bold uppercase tracking-widest mb-1">
                      Shot {currentShotIndex} of {shotMode}
                    </span>
                    <span className="font-script text-7xl font-bold text-pink-300 drop-shadow-lg">
                      {countdown}
                    </span>
                  </motion.div>
                )}

                {/* Series Progress Indicator */}
                {isCapturingSeries && countdown === null && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-rose-600/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                    Get ready for Shot {currentShotIndex} of {shotMode}! ✨
                  </div>
                )}

                {/* Live Video Element */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    filter: selectedFilter.cssFilter,
                    transform: isFrontCamera ? 'scaleX(-1)' : 'none',
                  }}
                  className="w-full h-full object-cover"
                />

                {/* Live Decorative Frame Overlays */}
                {selectedFrame.id === 'sunflowers' && (
                  <div className="absolute inset-0 pointer-events-none border-4 border-rose-400 rounded-2xl p-2 flex flex-col justify-between">
                    <div className="flex justify-between text-2xl">
                      <span>🌸</span>
                      <span>🌸</span>
                    </div>
                    <div className="flex justify-between text-2xl">
                      <span>🌸</span>
                      <span>🌸</span>
                    </div>
                  </div>
                )}

                {selectedFrame.id === 'hearts' && (
                  <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between text-2xl">
                    <div className="flex justify-between">
                      <span className="animate-bounce">💖</span>
                      <span className="animate-pulse">💕</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="animate-pulse">💗</span>
                      <span className="animate-bounce">✨</span>
                    </div>
                  </div>
                )}

                {selectedFrame.id === 'sparkles' && (
                  <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between text-2xl">
                    <div className="flex justify-between">
                      <span className="animate-spin" style={{ animationDuration: '6s' }}>✨</span>
                      <span>⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🌟</span>
                      <span className="animate-spin" style={{ animationDuration: '5s' }}>✨</span>
                    </div>
                  </div>
                )}

                {/* Camera Permission error */}
                {cameraError && (
                  <div className="absolute inset-0 p-5 bg-cream-50 flex flex-col items-center justify-center text-center z-20">
                    <span className="text-3xl mb-2">📷</span>
                    <p className="text-xs sm:text-sm text-warmBrown font-semibold mb-3">
                      {cameraError}
                    </p>
                    <button
                      type="button"
                      onClick={restartStream}
                      className="px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-sm"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* Flip Camera Button */}
                <button
                  type="button"
                  onClick={toggleFacingMode}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/85 hover:bg-white text-rose-700 shadow-md backdrop-blur-sm z-20 active:scale-95 transition-all"
                  aria-label="Flip camera"
                  title="Flip camera"
                >
                  <RefreshCw size={18} />
                </button>
              </div>

              {/* Filters and Frames Bar */}
              <FilterBar
                selectedFilter={selectedFilter}
                onSelectFilter={setSelectedFilter}
                selectedFrame={selectedFrame}
                onSelectFrame={setSelectedFrame}
              />

              {/* Capture Button */}
              <div className="mt-2 flex items-center justify-center">
                <motion.button
                  type="button"
                  onClick={startPhotoboothSequence}
                  disabled={!isReady || isCapturingSeries}
                  whileTap={{ scale: 0.92 }}
                  className="group relative flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm sm:text-base shadow-warm-glow transition-all disabled:opacity-60"
                >
                  <Camera size={20} className="group-hover:rotate-12 transition-transform" />
                  <span>
                    {isCapturingSeries
                      ? `Taking Shot ${currentShotIndex}/${shotMode}...`
                      : `Start Photobooth (${shotMode} ${shotMode > 1 ? 'Shots' : 'Shot'})`}
                  </span>
                  <Sparkles size={16} />
                </motion.button>
              </div>
            </div>
          )}

          {/* Hidden Canvas elements for baking snapshot & full strip */}
          <canvas ref={canvasRef} className="hidden" />
          <canvas ref={stripCanvasRef} className="hidden" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
