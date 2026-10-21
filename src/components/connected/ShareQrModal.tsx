'use client';

import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Download, Share2, QrCode as QrIcon } from 'lucide-react';

interface ShareQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName: string;
  inviteCode: string;
  meetingPoint?: string;
}

export function ShareQrModal({
  isOpen,
  onClose,
  groupName,
  inviteCode,
  meetingPoint,
}: ShareQrModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const inviteUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/get-connected?code=${encodeURIComponent(inviteCode)}`
    : `https://kumbh2027.in/get-connected?code=${inviteCode}`;

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setShareSupported(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(inviteUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#3C2E28',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR:', err));
  }, [isOpen, inviteUrl]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = inviteUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join our Kumbh Group: ${groupName}`,
          text: `Join my live Kumbh Mela group "${groupName}" on Nashik Kumbh 2027 Portal. Invite Code: ${inviteCode}`,
          url: inviteUrl,
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQr = () => {
    // Generate clean branded poster canvas
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 760;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 760);
    bgGrad.addColorStop(0, '#FCF9F4');
    bgGrad.addColorStop(1, '#F6F0E7');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 600, 760);

    // Top Header Banner
    ctx.fillStyle = '#984300';
    ctx.fillRect(0, 0, 600, 100);

    // Brand title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.fillText('Nashik Kumbh 2027 • Get Connected', 300, 48);

    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FFDEA5';
    ctx.fillText('Official Devotee Live Location & Family Finder', 300, 76);

    // Group Name
    ctx.fillStyle = '#1C1C19';
    ctx.font = 'bold 26px "Playfair Display", serif';
    ctx.fillText(groupName, 300, 155);

    // Meeting point if set
    if (meetingPoint) {
      ctx.fillStyle = '#786D66';
      ctx.font = '14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`Meeting Point: ${meetingPoint}`, 300, 185);
    }

    // Draw QR image
    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.onload = () => {
      // White box for QR
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0,0,0,0.1)';
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 6;
      ctx.roundRect?.(125, 215, 350, 350, 24);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      ctx.drawImage(qrImg, 150, 240, 300, 300);

      // Invite Code Box
      ctx.fillStyle = '#984300';
      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('GROUP INVITE CODE', 300, 600);

      ctx.fillStyle = '#1C1C19';
      ctx.font = 'bold 32px monospace';
      ctx.fillText(inviteCode, 300, 642);

      // Footer note
      ctx.fillStyle = '#786D66';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Scan with camera or visit link • nashikkumbh2027.in', 300, 710);

      // Trigger download
      const a = document.createElement('a');
      a.download = `kumbh-group-${inviteCode}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    qrImg.src = qrDataUrl;
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-[#e8e4df] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#984300] to-[#b87635] px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <QrIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Share Group QR</h3>
              <p className="text-[11px] text-white/80">Scan or share link to join</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex flex-col items-center text-center space-y-4">
          <div>
            <h4
              className="text-lg font-bold text-[#1c1c19] leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {groupName}
            </h4>
            {meetingPoint && (
              <p className="text-xs text-[#786d66] mt-0.5">
                📍 Meeting: <span className="font-medium text-[#3c2e28]">{meetingPoint}</span>
              </p>
            )}
          </div>

          {/* QR Container */}
          <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-[#b87635]/40 shadow-inner flex flex-col items-center">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`QR code for ${groupName}`}
                className="w-56 h-56 object-contain rounded-lg"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-slate-400">
                <span className="animate-spin text-2xl">⏳</span>
              </div>
            )}

            <div className="mt-2.5 pt-2 border-t border-slate-100 w-full flex items-center justify-between px-2">
              <span className="text-[10px] text-[#786d66] uppercase tracking-wider font-semibold">
                Invite Code
              </span>
              <span className="font-mono text-sm font-bold text-[#984300] tracking-widest bg-[#984300]/10 px-2.5 py-0.5 rounded-md">
                {inviteCode}
              </span>
            </div>
          </div>

          <p className="text-[11.5px] text-[#564339] leading-relaxed max-w-[280px]">
            Other devotees can scan this QR code with their phone camera or enter the code to join this group.
          </p>

          {/* Action buttons */}
          <div className="w-full space-y-2 pt-1">
            <button
              onClick={handleCopyLink}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#984300] hover:bg-[#803800] text-white active:scale-[0.98]'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Invitation Link'}</span>
            </button>

            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                onClick={handleDownloadQr}
                className="py-2.5 px-3 rounded-xl border border-[#e5e2dd] bg-[#fcf9f4] hover:bg-[#f3ede3] text-[#3c2e28] text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5 text-[#984300]" />
                <span>Save QR Image</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="py-2.5 px-3 rounded-xl border border-[#e5e2dd] bg-[#fcf9f4] hover:bg-[#f3ede3] text-[#3c2e28] text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
              >
                <Share2 className="w-3.5 h-3.5 text-[#984300]" />
                <span>Share via App</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
