import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Share2, Check } from 'lucide-react';
import { CONFIG } from '../config';
import {
  ChaliceWithHostSvg,
  GoldenCrossSvg,
  TwinklingStarSvg,
  WhiteDoveSvg,
} from './SacredIllustrations';

export const HeroCover: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  const handleShare = async () => {
    const shareUrl = window.location.href.split('?')[0];
    const shareText = `Te invito a la Primera Comunión de ${CONFIG.childName} el ${CONFIG.dateDisplay} a las ${CONFIG.timeDisplay} en la ${CONFIG.locationShort}.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${CONFIG.title} · ${CONFIG.childName}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      }
    } catch {
      // User cancelled or Web Share failed — fall back to clipboard if appropriate
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 2600);
      }
    } catch {
      // Ignore clipboard permission errors silently
    }
  };

  return (
    <header className="relative w-full min-h-[88vh] flex flex-col items-center justify-between px-5 pt-6 pb-10 overflow-hidden">
      {/* Soft descending diagonal light rays */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[640px] animate-ray"
          style={{
            background:
              'conic-gradient(from 165deg at 50% 0%, transparent 0deg, rgba(243,211,107,0.22) 14deg, transparent 28deg, rgba(207,230,245,0.45) 42deg, transparent 58deg, rgba(243,211,107,0.18) 72deg, transparent 90deg)',
            maskImage: 'radial-gradient(ellipse 68% 85% at 50% 0%, black 30%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse 68% 85% at 50% 0%, black 30%, transparent 78%)',
          }}
        />
      </div>

      {/* Twinkling golden stars */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <TwinklingStarSvg className="w-4 h-4 absolute top-16 left-[10%] animate-twinkle" />
        <TwinklingStarSvg
          className="w-3.5 h-3.5 absolute top-28 right-[12%] animate-twinkle"
        />
        <TwinklingStarSvg
          className="w-5 h-5 absolute top-[46%] left-[8%] animate-twinkle"
        />
        <TwinklingStarSvg
          className="w-4 h-4 absolute top-[52%] right-[9%] animate-twinkle"
        />
        <TwinklingStarSvg
          className="w-3.5 h-3.5 absolute bottom-24 left-[18%] animate-twinkle"
        />
      </div>

      {/* Slowly gliding white doves */}
      {!prefersReducedMotion ? (
        <div aria-hidden="true" className="absolute inset-x-0 top-12 h-56 pointer-events-none overflow-hidden">
          <div className="animate-dove-glide" style={{ animationDuration: '20s', animationDelay: '-4s' }}>
            <WhiteDoveSvg className="w-16 h-11 opacity-85 animate-dove-wing" />
          </div>
          <div
            className="animate-dove-glide mt-16"
            style={{ animationDuration: '24s', animationDelay: '-13s' }}
          >
            <WhiteDoveSvg className="w-12 h-8 opacity-75 animate-dove-wing" />
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className="absolute top-14 right-8 pointer-events-none opacity-80">
          <WhiteDoveSvg className="w-14 h-10" flip />
        </div>
      )}

      {/* Top row: subtle cross emblem & Share button */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-3 relative z-20">
        <div className="flex items-center gap-2 text-xs text-[#8A6A12] font-medium tracking-wider uppercase whitespace-nowrap shrink-0">
          <GoldenCrossSvg className="w-4 h-5 shrink-0" />
          <span>6 dic 2026 · Bogotá</span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          aria-label="Compartir esta invitación"
          className="min-h-[44px] px-4 py-2 rounded-full pearl-card text-xs sm:text-sm font-medium text-[#2C3540] hover:border-[#D4AF37] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          {shareStatus === 'copied' ? (
            <>
              <Check className="w-4 h-4 text-[#8A6A12]" aria-hidden="true" />
              <span>¡Enlace copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-[#8A6A12]" aria-hidden="true" />
              <span>Compartir</span>
            </>
          )}
        </button>
      </div>

      {/* Main Cover Composition */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center relative z-10 my-auto py-6">
        {/* Sacred Cross & Chalice with soft glowing aura */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center mb-3"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full blur-2xl opacity-60 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(243,211,107,0.45) 0%, rgba(207,230,245,0.25) 60%, transparent 80%)',
            }}
          />
          <GoldenCrossSvg className="w-8 h-10 mb-1 relative z-10" />
          <ChaliceWithHostSvg className="w-36 h-40 sm:w-44 sm:h-48 relative z-10" />
        </motion.div>

        {/* Handwriting Reveal of Child Name */}
        <div className="overflow-hidden px-7 sm:px-10 py-2">
          <h1
            className={`font-script text-[3.4rem] sm:text-[4.6rem] leading-[1.18] gold-gradient-text drop-shadow-[0_2px_10px_rgba(212,175,55,0.18)] ${
              prefersReducedMotion ? '' : 'animate-script-reveal'
            }`}
          >
            {CONFIG.childName}
          </h1>
        </div>

        {/* Title underneath */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.75 }}
          className="text-lg sm:text-2xl font-medium tracking-[0.14em] uppercase text-[#2C3540] mt-2"
        >
          {CONFIG.title}
        </motion.p>

        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 1.0 }}
          className="text-sm text-[#556272] mt-2"
        >
          {CONFIG.dateDisplay} · {CONFIG.timeDisplay}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#invitacion-frase"
        aria-label="Deslizar para leer la invitación"
        className="relative z-10 min-h-[44px] px-4 inline-flex flex-col items-center justify-center text-xs text-[#556272] hover:text-[#8A6A12] transition-colors gap-1"
      >
        <span>Desliza para descubrir más</span>
        <ChevronDown
          className={`w-5 h-5 text-[#8A6A12] ${prefersReducedMotion ? '' : 'animate-bounce'}`}
          aria-hidden="true"
        />
      </a>
    </header>
  );
};
