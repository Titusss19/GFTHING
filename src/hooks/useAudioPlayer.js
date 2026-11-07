import { useState, useRef, useEffect, useCallback } from 'react';
import { songs as defaultSongs } from '../data/songs';

/**
 * Custom hook to manage HTML5 Audio playback at the App level
 * - Persists playback across modal open/close
 * - Handles mobile autoplay restrictions gracefully
 * - Formats time, controls volume, track seeking, next/prev
 */
export function useAudioPlayer(playlist = defaultSongs) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [audioError, setAudioError] = useState(null);

  const audioRef = useRef(null);

  // Initialize Audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setAudioError(null);
    };
    const onEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };
    const onError = () => {
      setAudioError("Add your songs to /public/songs/ to play music 🎵");
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [playlist.length]);

  // Load track when currentIndex changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playlist[currentIndex]) return;

    audio.src = playlist[currentIndex].src;
    audio.currentTime = 0;
    setCurrentTime(0);

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Playback prevented (autoplay or missing file):", err);
        setIsPlaying(false);
      });
    }
  }, [currentIndex, playlist]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setAudioError(null);
      if (!audio.src && playlist[currentIndex]) {
        audio.src = playlist[currentIndex].src;
      }
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Play error:", err);
        setAudioError("Place an MP3 file in /public/songs/song1.mp3 to play 🎵");
        setIsPlaying(false);
      });
    }
  }, [isPlaying, currentIndex, playlist]);

  const playSongAtIndex = useCallback((index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const prevTrack = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const changeVolume = useCallback((val) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(1, val));
    audio.volume = clamped;
    setVolume(clamped);
  }, []);

  return {
    isPlaying,
    currentIndex,
    currentTrack: playlist[currentIndex] || {},
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
  };
}
