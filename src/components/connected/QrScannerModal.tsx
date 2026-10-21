'use client';

import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { X, Camera, Upload, AlertCircle, RefreshCw, KeyRound } from 'lucide-react';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCodeDetected: (code: string) => void;
}

export function QrScannerModal({ isOpen, onClose, onCodeDetected }: QrScannerModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const animationFrameId = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const parseCodeFromText = (raw: string): string => {
    try {
      if (raw.includes('code=')) {
        const url = new URL(raw, window.location.origin);
        const code = url.searchParams.get('code');
        if (code) return code.trim().toUpperCase();
      }
    } catch {
      // not a full url
    }
    // Clean string e.g. "KMB-8A2F" or "8A2F"
    return raw.trim().toUpperCase();
  };

  // Start camera stream when modal opens
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    let active = true;

    async function startCamera() {
      setCameraError(null);
      setIsScanning(true);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported by your browser. Please upload an image or enter the code manually.');
        setIsScanning(false);
        return;
      }

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (!active) {
          mediaStream.getTracks().forEach((t) => t.stop());
          return;
        }

        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.setAttribute('playsinline', 'true');
          await videoRef.current.play();
        }
      } catch (err: unknown) {
        console.warn('[QrScanner] Camera error:', err);
        const errMsg = err instanceof Error ? err.name : 'Unknown';
        if (errMsg === 'NotAllowedError' || errMsg === 'PermissionDeniedError') {
          setCameraError('Camera permission was denied. You can allow camera in browser settings, or enter the invite code manually below.');
        } else {
          setCameraError('Unable to start camera. Please upload a photo or enter the invite code below.');
        }
        setIsScanning(false);
      }
    }

    startCamera();

    return () => {
      active = false;
      stopCamera();
    };
  }, [isOpen]);

  const stopCamera = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  // Scanning loop
  useEffect(() => {
    if (!isOpen || !stream) return;

    let stopped = false;

    const tick = () => {
      if (stopped) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (qrCode && qrCode.data) {
            const detected = parseCodeFromText(qrCode.data);
            if (detected) {
              stopped = true;
              stopCamera();
              onCodeDetected(detected);
              onClose();
              return;
            }
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(tick);
    };

    animationFrameId.current = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isOpen, stream]);

  // Handle uploaded photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          const detected = parseCodeFromText(code.data);
          stopCamera();
          onCodeDetected(detected);
          onClose();
        } else {
          setCameraError('No valid Kumbh QR code was found in this photo. Please try another image or enter the code manually.');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = manualCode.trim().toUpperCase();
    if (!clean) return;
    stopCamera();
    onCodeDetected(clean);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-[#e8e4df] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#1c1c19] px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#984300] flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Scan Group QR</h3>
              <p className="text-[11px] text-[#ffdea5]">Point camera at group code</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Viewfinder / Video Container */}
        <div className="relative bg-black w-full aspect-square overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            className={`w-full h-full object-cover ${cameraError ? 'hidden' : 'block'}`}
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Scanner Overlay Box */}
          {!cameraError && isScanning && (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
              <div className="relative w-56 h-56 border-2 border-[#ffdea5] rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]">
                {/* Corner accents */}
                <span className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-[#984300] rounded-tl-lg" />
                <span className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-[#984300] rounded-tr-lg" />
                <span className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-[#984300] rounded-bl-lg" />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-[#984300] rounded-br-lg" />

                {/* Laser scan line animation */}
                <div className="absolute inset-x-2 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#ffdea5] to-transparent animate-pulse shadow-[0_0_12px_#ffdea5]" />
              </div>
              <p className="text-[11px] text-white/90 mt-4 px-3 py-1 bg-black/60 rounded-full font-medium tracking-wide">
                Align QR inside the frame
              </p>
            </div>
          )}

          {/* Camera Error Message */}
          {cameraError && (
            <div className="p-6 text-center text-white flex flex-col items-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-xs text-white/80 leading-relaxed max-w-[260px]">{cameraError}</p>
            </div>
          )}
        </div>

        {/* Alternative options: Upload photo or Manual Code */}
        <div className="p-4 bg-[#fcf9f4] space-y-3 border-t border-[#e8e4df]">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 px-3 rounded-xl border border-[#d8d3cb] bg-white hover:bg-slate-50 text-[#3c2e28] text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
            >
              <Upload className="w-3.5 h-3.5 text-[#984300]" />
              <span>Upload Photo</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Manual Entry Form */}
          <form onSubmit={handleManualSubmit} className="pt-1">
            <div className="text-[11px] font-semibold text-[#786d66] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-[#984300]" />
              <span>Or Enter Code Manually</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="e.g. KMB-8A2F"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                className="flex-1 bg-white border border-[#d8d3cb] rounded-xl px-3 py-2 text-sm font-mono tracking-wider font-bold text-[#1c1c19] placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#984300]"
              />
              <button
                type="submit"
                disabled={!manualCode.trim()}
                className="py-2 px-4 rounded-xl bg-[#984300] hover:bg-[#803800] text-white text-xs font-bold transition disabled:opacity-50 active:scale-[0.98]"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
