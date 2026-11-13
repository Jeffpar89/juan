import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CONFIG } from '../config';
import { GoldenCrossSvg, TwinklingStarSvg } from './SacredIllustrations';

interface EnvelopeOpenerProps {
  onOpenComplete: () => void;
}

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({ onOpenComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<'idle' | 'flap' | 'rising' | 'done'>('idle');

  const handleOpen = () => {
    if (stage !== 'idle') return;

    if (prefersReducedMotion) {
      setStage('done');
      setTimeout(onOpenComplete, 260);
      return;
    }

    setStage('flap');
    setTimeout(() => setStage('rising'), 520);
    setTimeout(() => setStage('done'), 1350);
    setTimeout(onOpenComplete, 1650);
  };

  const isOpened = stage !== 'idle';

  return (
    <motion.main
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'done' ? 0 : 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen w-full flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 35%, #FFFDF8 0%, #EDF6FC 55%, #CFE6F5 100%)',
      }}
    >
      {/* Subtle twinkling background stars */}
      <TwinklingStarSvg className="w-5 h-5 absolute top-[12%] left-[14%] animate-twinkle opacity-70 pointer-events-none" />
      <TwinklingStarSvg
        className="w-4 h-4 absolute top-[18%] right-[16%] animate-twinkle opacity-60 pointer-events-none"
      />
      <TwinklingStarSvg
        className="w-4 h-4 absolute bottom-[16%] left-[20%] animate-twinkle opacity-50 pointer-events-none"
      />

      <div className="w-full max-w-[390px] sm:max-w-[440px] flex flex-col items-center text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm tracking-[0.18em] uppercase text-[#8A6A12] font-medium mb-2"
        >
          {CONFIG.title}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-script text-4xl sm:text-5xl text-[#2C3540] mb-8 text-balance"
        >
          Tienes una invitación especial
        </motion.h1>

        {/* Envelope 3D Stage */}
        <div className="relative w-full max-w-[336px] sm:max-w-[376px] h-[230px] sm:h-[250px] perspective-1200 mb-9 flex items-center justify-center">
          {/* Pulsing golden aura behind envelope */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[32px] animate-pulse-gold pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(243,211,107,0.45) 0%, rgba(212,175,55,0.18) 50%, rgba(255,253,248,0) 75%)',
            }}
          />

          {/* Inner letter card that rises out of the envelope */}
          <motion.div
            aria-hidden="true"
            initial={{ y: 0, scale: 0.94, opacity: 0.9 }}
            animate={
              stage === 'rising' || stage === 'done'
                ? { y: -115, scale: 1.03, opacity: 1 }
                : { y: 8, scale: 0.94, opacity: 0.92 }
            }
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-5 bottom-4 rounded-xl bg-[#FFFDF8] border border-[#D4AF37]/50 shadow-md flex flex-col items-center justify-start pt-5 px-4 z-10 pointer-events-none"
          >
            <GoldenCrossSvg className="w-6 h-8 mb-1 opacity-80" />
            <p className="font-script text-3xl gold-gradient-text leading-tight">
              {CONFIG.childName}
            </p>
            <p className="text-[11px] text-[#556272] mt-1 tracking-wide">
              {CONFIG.dateDisplay}
            </p>
          </motion.div>

          {/* Envelope base box */}
          <div
            className="relative w-full h-full rounded-2xl bg-[#FFFDF8] border border-[#D4AF37]/60 shadow-[0_20px_50px_-14px_rgba(138,106,18,0.28)] overflow-visible z-20"
          >
            {/* Inner pocket back */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#F4F9FD] to-[#FFFDF8] overflow-hidden">
              {/* Subtle celeste inner lining */}
              <div
                className="absolute inset-x-0 top-0 h-20 opacity-45"
                style={{
                  background: 'linear-gradient(180deg, #CFE6F5 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Front envelope folds (left, right, bottom triangles) */}
            <svg
              viewBox="0 0 360 240"
              className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none z-20"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Left fold */}
              <polygon points="0,0 180,130 0,240" fill="#FCF9F0" stroke="#D4AF37" strokeOpacity="0.32" strokeWidth="1" />
              {/* Right fold */}
              <polygon points="360,0 180,130 360,240" fill="#FAF6EA" stroke="#D4AF37" strokeOpacity="0.32" strokeWidth="1" />
              {/* Bottom fold */}
              <polygon points="0,240 180,115 360,240" fill="#FFFDF8" stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="1.2" />
            </svg>

            {/* Top 3D animated flap */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpened ? -175 : 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transformOrigin: 'top center',
                zIndex: stage === 'rising' || stage === 'done' ? 5 : 30,
              }}
              className="absolute inset-x-0 top-0 h-[138px] preserve-3d pointer-events-none rounded-t-2xl overflow-hidden"
            >
              <svg
                viewBox="0 0 360 138"
                className="w-full h-full drop-shadow-sm"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFDF8" />
                    <stop offset="100%" stopColor="#F5EFE0" />
                  </linearGradient>
                </defs>
                <path
                  d="M4 0H356L180 132L4 0Z"
                  fill="url(#flapGrad)"
                  stroke="#D4AF37"
                  strokeOpacity="0.55"
                  strokeWidth="1.4"
                />
              </svg>
            </motion.div>

            {/* Golden Wax Cross Seal centered on flap tip */}
            <motion.button
              type="button"
              onClick={handleOpen}
              aria-label="Abrir sobre con sello dorado"
              initial={{ scale: 1, opacity: 1 }}
              animate={
                isOpened
                  ? { scale: 0.7, opacity: 0, y: -24 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 z-40 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-[0_8px_22px_rgba(138,106,18,0.42)] border-2 border-[#FFFDF8]/80 focus-visible:outline-offset-4"
              style={{
                background: 'radial-gradient(circle at 35% 30%, #F8E28C 0%, #D4AF37 55%, #8A6A12 100%)',
              }}
            >
              <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
                <path
                  d="M18 6V30M10 14H26"
                  stroke="#FFFDF8"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Primary Open Button */}
        <motion.button
          type="button"
          onClick={handleOpen}
          disabled={isOpened}
          whileHover={isOpened ? undefined : { y: -1 }}
          whileTap={isOpened ? undefined : { scale: 0.98 }}
          className="min-h-[48px] px-10 py-3 rounded-full font-medium text-base tracking-wide text-[#FFFDF8] shadow-[0_10px_26px_-6px_rgba(138,106,18,0.5)] cursor-pointer transition-all disabled:opacity-60 whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, #B68D1F 0%, #8A6A12 100%)',
          }}
        >
          {isOpened ? 'Abriendo invitación...' : 'Abrir'}
        </motion.button>

        <p className="text-xs text-[#556272] mt-4">
          Toca el sello dorado o el botón para descubrir tu invitación
        </p>
      </div>
    </motion.main>
  );
};
