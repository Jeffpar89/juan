import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Share2 } from 'lucide-react';
import { CONFIG } from '../config';
import { TwinklingStarSvg, WheatDividerSvg, WhiteDoveSvg } from './SacredIllustrations';

export const FarewellFooter: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href.split('?')[0];
    const shareText = `Te invito a la Primera Comunión de ${CONFIG.childName} el ${CONFIG.dateDisplay}.`;

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
      // Fallback to clipboard
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2600);
      }
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <footer className="relative w-full pt-12 pb-16 px-5 overflow-hidden text-center">
      {/* Crossing white dove across screen */}
      {!prefersReducedMotion ? (
        <div aria-hidden="true" className="relative w-full h-16 overflow-hidden pointer-events-none mb-2">
          <div className="animate-dove-glide" style={{ animationDuration: '16s' }}>
            <WhiteDoveSvg className="w-16 h-11 animate-dove-wing" />
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className="flex justify-center mb-4">
          <WhiteDoveSvg className="w-14 h-10" />
        </div>
      )}

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
        className="max-w-lg mx-auto relative z-10"
      >
        <WheatDividerSvg className="w-44 h-6 mx-auto mb-6 opacity-85" />

        <p className="text-sm sm:text-base text-[#556272] leading-relaxed mb-4">
          Que la paz, la fe y la alegría de este sacramento iluminen siempre cada paso de tu vida.
        </p>

        <div className="relative inline-flex items-center justify-center my-2">
          <TwinklingStarSvg className="w-4 h-4 mr-2 animate-twinkle" />
          <p className="font-script text-5xl sm:text-6xl gold-shimmer-text py-1">
            {CONFIG.childName}
          </p>
          <TwinklingStarSvg className="w-4 h-4 ml-2 animate-twinkle" />
        </div>

        <p className="mt-4 text-sm sm:text-base font-medium text-[#2C3540]">
          Con cariño, <span className="text-[#8A6A12]">{CONFIG.parents}</span>
        </p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleShare}
            className="min-h-[44px] px-5 py-2.5 rounded-full pearl-card text-xs sm:text-sm font-medium text-[#2C3540] hover:border-[#D4AF37] inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#8A6A12]" aria-hidden="true" />
                <span>¡Enlace copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#8A6A12]" aria-hidden="true" />
                <span>Compartir invitación</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </footer>
  );
};
