import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X, Plus, Trash2, Radio } from 'lucide-react';

function formatTime(secs) {
  if (isNaN(secs) || secs === Infinity) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function CassettePlayer({
  isOpen,
  onClose,
  audioState,
}) {
  const {
    playlist,
    currentIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    audioError,
    togglePlay,
    playSongAtIndex,
    nextTrack,
    prevTrack,
    seek,
    changeVolume,
    addYouTubeSong,
    removeSong,
  } = audioState;

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [addError, setAddError] = useState(false);

  if (!isOpen) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newUrl.trim()) {
      setAddError(true);
      return;
    }
    const success = addYouTubeSong(newTitle, newArtist, newUrl);
    if (success) {
      setNewTitle('');
      setNewArtist('');
      setNewUrl('');
      setAddError(false);
      setShowAddForm(false);
    } else {
      setAddError(true);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-warmBrown-deep/65 backdrop-blur-sm select-none">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-cream-50 rounded-3xl border-2 border-rose-300 shadow-polaroid-lg p-5 sm:p-6 flex flex-col items-center max-h-[92vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 140 }}
        >
          {/* Washi tape topper */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape-blush rounded-sm rotate-1 shadow-sm" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-warmBrown transition-colors active:scale-95"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Player Header */}
          <div className="text-center mt-2 mb-3">
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest flex items-center justify-center gap-1">
              <svg className="w-3.5 h-3.5 fill-red-500" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube Audio Stream</span>
            </span>
            <h3 className="font-script text-2xl sm:text-3xl font-bold text-warmBrown">
              Mixtape 📼
            </h3>
          </div>

          {/* Cassette Graphic with spinning reels */}
          <div className="w-full h-44 sm:h-48 rounded-2xl bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border-2 border-rose-300 shadow-inner p-3 flex flex-col justify-between relative overflow-hidden">
            {/* Top label */}
            <div className="bg-rose-200/60 border border-rose-300/60 rounded px-3 py-1 flex items-center justify-between">
              <span className="text-xs font-bold text-warmBrown tracking-wider uppercase font-mono flex items-center gap-1">
                <span>SIDE A</span>
                <span className="text-red-500">●</span>
                <span>YT LIVE</span>
              </span>
              <span className="text-[10px] text-warmBrown/70 font-mono font-bold">
                {currentTrack.duration || "HD AUDIO"}
              </span>
            </div>

            {/* Cassette Reels Window */}
            <div className="relative bg-warmBrown-deep/90 rounded-xl h-20 sm:h-22 border-2 border-rose-200/50 flex items-center justify-around px-6 overflow-hidden">
              {/* Left Reel */}
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-dashed border-pink-200/90 bg-warmBrown-deep flex items-center justify-center shadow-md"
                animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
                transition={isPlaying ? { repeat: Infinity, duration: 3.5, ease: 'linear' } : { duration: 0.3 }}
              >
                <div className="w-4 h-4 rounded-full bg-pink-100 border-2 border-rose-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                </div>
              </motion.div>

              {/* Tape Center */}
              <div className="w-26 h-8 bg-rose-950/90 rounded-md border border-rose-300/40 flex flex-col items-center justify-center px-1">
                <span className="text-[9px] text-pink-300 font-mono font-bold tracking-wider">
                  {isPlaying ? "STREAMING" : "PAUSED"}
                </span>
                <span className="text-[8px] text-pink-100/80 truncate max-w-[95px]">
                  {currentTrack.title}
                </span>
              </div>

              {/* Right Reel */}
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-dashed border-pink-200/90 bg-warmBrown-deep flex items-center justify-center shadow-md"
                animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
                transition={isPlaying ? { repeat: Infinity, duration: 3.5, ease: 'linear' } : { duration: 0.3 }}
              >
                <div className="w-4 h-4 rounded-full bg-pink-100 border-2 border-rose-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                </div>
              </motion.div>
            </div>

            {/* Current Song Title & Artist */}
            <div className="text-center px-2 py-0.5">
              <p className="font-script text-base sm:text-lg font-bold text-warmBrown truncate">
                {currentTrack.title || "Choose a song"}
              </p>
              <p className="font-sans text-[11px] text-warmBrown/70 truncate">
                {currentTrack.artist || "YouTube Playlist"}
              </p>
            </div>
          </div>

          {/* Error Notice */}
          {audioError && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 w-full p-2.5 rounded-xl bg-pink-100 border border-rose-300 text-rose-800 text-xs text-center font-medium"
            >
              {audioError}
            </motion.div>
          )}

          {/* Progress Bar & Timers */}
          <div className="w-full mt-4 px-1">
            <div
              className="relative w-full h-2 bg-pink-100 rounded-full cursor-pointer overflow-hidden border border-rose-200"
              onClick={(e) => {
                if (!duration) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                seek(pos * duration);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-warmBrown/70 font-mono mt-1 px-0.5">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4 mt-3">
            <button
              type="button"
              onClick={prevTrack}
              className="p-3 rounded-full bg-pink-100 hover:bg-pink-200 text-warmBrown transition-colors active:scale-90"
              aria-label="Previous"
            >
              <SkipBack size={20} />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="p-4 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white shadow-warm-glow transition-all active:scale-95"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={nextTrack}
              className="p-3 rounded-full bg-pink-100 hover:bg-pink-200 text-warmBrown transition-colors active:scale-90"
              aria-label="Next"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="w-full flex items-center justify-center gap-3 mt-3 px-4 text-warmBrown/80">
            <button
              type="button"
              onClick={() => changeVolume(volume === 0 ? 0.85 : 0)}
              className="text-warmBrown hover:text-rose-600 transition-colors"
            >
              {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-32 h-1.5 bg-pink-100 accent-rose-500 rounded-lg cursor-pointer"
            />
          </div>

          {/* Playlist & Add Custom YouTube Song */}
          <div className="w-full mt-4 pt-3 border-t border-rose-200/60 max-h-48 overflow-y-auto pr-1">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-bold text-warmBrown/70 uppercase tracking-wider flex items-center gap-1">
                <span>Playlist</span>
                <span>🎵</span>
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm((v) => !v)}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-pink-100/80 hover:bg-pink-200 px-2.5 py-1 rounded-full transition-colors"
              >
                <Plus size={13} />
                <span>Add YT Link</span>
              </button>
            </div>

            {/* Expandable Add YouTube Link Form */}
            {showAddForm && (
              <form onSubmit={handleAddSubmit} className="mb-3 p-3 rounded-2xl bg-pink-100/60 border border-rose-200 flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Paste YouTube Link or Video ID (e.g. https://youtu.be/...)"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs text-warmBrown outline-none focus:border-rose-400"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Song Title (optional)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs text-warmBrown outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Artist (optional)"
                    value={newArtist}
                    onChange={(e) => setNewArtist(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs text-warmBrown outline-none"
                  />
                </div>
                {addError && (
                  <p className="text-[10px] text-red-500 font-semibold">Please paste a valid YouTube link</p>
                )}
                <button
                  type="submit"
                  className="w-full py-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-colors"
                >
                  Save to Playlist ✨
                </button>
              </form>
            )}

            {/* Songs List */}
            <div className="space-y-1.5">
              {playlist.map((song, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <div
                    key={song.id || idx}
                    className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors ${
                      isSelected
                        ? 'bg-rose-200/70 border border-rose-400 font-bold text-rose-900'
                        : 'bg-cream-100/80 hover:bg-pink-100 text-warmBrown/80'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => playSongAtIndex(idx)}
                      className="flex items-center gap-2 truncate flex-1 text-left"
                    >
                      <span>{isSelected && isPlaying ? "🎶" : "🎵"}</span>
                      <div className="truncate">
                        <span className="font-semibold block truncate">{song.title}</span>
                        <span className="text-[10px] text-warmBrown/60">{song.artist}</span>
                      </div>
                    </button>

                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-[10px] text-warmBrown/50 font-mono">
                        {song.duration}
                      </span>
                      {playlist.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSong(song.id);
                          }}
                          className="text-warmBrown/40 hover:text-red-500 p-1"
                          title="Remove song"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
