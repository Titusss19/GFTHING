import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for camera access via navigator.mediaDevices.getUserMedia
 * - Supports front/back camera toggling (facingMode)
 * - Error handling for denied permission, no camera, or HTTP context
 */
export function useCamera(isActive = false) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [facingMode, setFacingMode] = useState('user'); // 'user' (front) or 'environment' (back)
  const [cameraError, setCameraError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsReady(false);
  }, []);

  const startStream = useCallback(async () => {
    stopStream();
    setCameraError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera access requires HTTPS or is not supported on this browser.");
      return;
    }

    try {
      const constraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().then(() => {
            setIsReady(true);
          }).catch((err) => {
            console.warn("Video play error:", err);
          });
        };
      }
    } catch (err) {
      console.error("Camera access error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError("Camera permission was denied. Please allow camera access in browser settings.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError("No camera found on this device.");
      } else {
        setCameraError("Could not start camera: " + (err.message || "Please try again."));
      }
    }
  }, [facingMode, stopStream]);

  useEffect(() => {
    if (isActive) {
      startStream();
    } else {
      stopStream();
    }
    return () => {
      stopStream();
    };
  }, [isActive, facingMode, startStream, stopStream]);

  const toggleFacingMode = useCallback(() => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }, []);

  return {
    videoRef,
    isReady,
    cameraError,
    facingMode,
    isFrontCamera: facingMode === 'user',
    toggleFacingMode,
    restartStream: startStream,
  };
}
