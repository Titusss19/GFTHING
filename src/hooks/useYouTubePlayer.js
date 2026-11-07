import { useState, useRef, useEffect, useCallback } from 'react';
import { songs as initialSongs } from '../data/songs';

/**
 * Helper to extract YouTube 11-char Video ID from any YouTube URL
 */
export function extractYouTubeId(urlOrId) {
  if (!urlOrId) return '';
  const str = String(urlOrId).trim();
  if (str.length === 11 && !str.includes('/') && !str.includes('?') && !str.includes('&')) {
    return str;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = str.match(regExp);
  return (match && match[2].length === 11) ? match[2] : str;
}

export function useYouTubePlayer() {
  // Initialize playlist: merge default verified songs with any user-added songs
  const [playlist, setPlaylist] = useState(() => {
    try {
      const savedUserSongs = localStorage.getItem('user_added_yt_songs');
      const extra = savedUserSongs ? JSON.parse(savedUserSongs) : [];
      // Always prioritize latest verified initialSongs, then append extra
      return [...initialSongs, ...extra];
    } catch (e) {
      return initialSongs;
    }
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [audioError, setAudioError] = useState(null);

  const playerRef = useRef(null);
  const timerRef = useRef(null);
  const activeVideoIdRef = useRef('');

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      const initialId = extractYouTubeId(playlist[0]?.youtubeId || playlist[0]?.url || 'XToA-1dZYWA');
      activeVideoIdRef.current = initialId;

      playerRef.current = new window.YT.Player('youtube-audio-player', {
        height: '200',
        width: '200',
        videoId: initialId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            setIsPlayerReady(true);
            try {
              event.target.setVolume(volume * 100);
            } catch (e) {}
          },
          onStateChange: (event) => {
            // YT.PlayerState: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering
            if (event.data === 1) {
              setIsPlaying(true);
              setAudioError(null);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              // Advance to next song when finished
              setCurrentIndex((prev) => (prev + 1) % playlist.length);
            }
          },
          onError: (err) => {
            console.warn("YouTube Player error:", err);
            // Error codes: 2 (invalid id), 5 (HTML5 error), 100 (not found/private), 101/150 (not allowed to embed)
            const trackName = playlist[currentIndex]?.title || "This track";
            setAudioError(`"${trackName}" cannot be played in embed mode. Please choose another song 🎵`);
            setIsPlaying(false);
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Sync track when currentIndex changes (single-source loading)
  useEffect(() => {
    if (!playerRef.current || !isPlayerReady || !playlist[currentIndex]) return;
    const nextId = extractYouTubeId(playlist[currentIndex].youtubeId || playlist[currentIndex].url);
    if (!nextId) return;

    // Only load if not already the active video to prevent dual-trigger collision
    if (activeVideoIdRef.current !== nextId) {
      activeVideoIdRef.current = nextId;
      try {
        if (isPlaying) {
          playerRef.current.loadVideoById(nextId);
        } else {
          playerRef.current.cueVideoById(nextId);
        }
        setAudioError(null);
      } catch (e) {
        console.warn("Error changing video:", e);
      }
    }
  }, [currentIndex, isPlayerReady]);

  // Polling playback progress timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          try {
            const cur = playerRef.current.getCurrentTime() || 0;
            const dur = playerRef.current.getDuration() || 0;
            setCurrentTime(cur);
            if (dur > 0) setDuration(dur);
          } catch (e) {}
        }
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !isPlayerReady) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        const nextId = extractYouTubeId(playlist[currentIndex]?.youtubeId || playlist[currentIndex]?.url);
        if (nextId && activeVideoIdRef.current !== nextId) {
          activeVideoIdRef.current = nextId;
          playerRef.current.loadVideoById(nextId);
        } else {
          playerRef.current.playVideo();
        }
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn("Error toggling play:", e);
    }
  }, [isPlaying, isPlayerReady, currentIndex, playlist]);

  const playSongAtIndex = useCallback((index) => {
    if (!playerRef.current || !isPlayerReady || !playlist[index]) return;
    const nextId = extractYouTubeId(playlist[index].youtubeId || playlist[index].url);
    activeVideoIdRef.current = nextId;
    setCurrentIndex(index);
    setIsPlaying(true);
    setAudioError(null);

    try {
      playerRef.current.loadVideoById(nextId);
      playerRef.current.playVideo();
    } catch (e) {
      console.warn("Error playing track index:", e);
    }
  }, [isPlayerReady, playlist]);

  const nextTrack = useCallback(() => {
    const nextIdx = (currentIndex + 1) % playlist.length;
    playSongAtIndex(nextIdx);
  }, [currentIndex, playlist.length, playSongAtIndex]);

  const prevTrack = useCallback(() => {
    const prevIdx = (currentIndex - 1 + playlist.length) % playlist.length;
    playSongAtIndex(prevIdx);
  }, [currentIndex, playlist.length, playSongAtIndex]);

  const seek = useCallback((time) => {
    if (!playerRef.current || !isPlayerReady) return;
    try {
      playerRef.current.seekTo(time, true);
      setCurrentTime(time);
    } catch (e) {
      console.warn("Error seeking:", e);
    }
  }, [isPlayerReady]);

  const changeVolume = useCallback((val) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolume(clamped);
    if (playerRef.current && isPlayerReady && playerRef.current.setVolume) {
      try {
        playerRef.current.setVolume(clamped * 100);
      } catch (e) {}
    }
  }, [isPlayerReady]);

  // Add custom YouTube song
  const addYouTubeSong = useCallback((title, artist, urlOrId) => {
    const cleanId = extractYouTubeId(urlOrId);
    if (!cleanId) return false;

    const newTrack = {
      id: Date.now(),
      title: title.trim() || "Custom Track",
      artist: artist.trim() || "YouTube",
      url: `https://www.youtube.com/watch?v=${cleanId}`,
      youtubeId: cleanId,
      duration: "Stream",
    };

    setPlaylist((prev) => {
      const updated = [...prev, newTrack];
      try {
        const userSongs = updated.filter((s) => !initialSongs.some((init) => init.id === s.id));
        localStorage.setItem('user_added_yt_songs', JSON.stringify(userSongs));
      } catch (e) {}
      return updated;
    });

    return true;
  }, []);

  const removeSong = useCallback((id) => {
    setPlaylist((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      try {
        const userSongs = updated.filter((s) => !initialSongs.some((init) => init.id === s.id));
        localStorage.setItem('user_added_yt_songs', JSON.stringify(userSongs));
      } catch (e) {}
      return updated;
    });
  }, []);

  return {
    playlist,
    currentIndex,
    currentTrack: playlist[currentIndex] || {},
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
  };
}
