import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { MiniEnvelopeSvg, TwinklingStarSvg } from './SacredIllustrations';

interface FallingEnvelopeSpec {
  id: number;
  leftPercent: number;
  durationSec: number;
  delaySec: number;
  scale: number;
  badgeType: 'heart' | 'star';
}

const FALLING_ENVELOPES: FallingEnvelopeSpec[] = [
  { id: 1, leftPercent: 8, durationSec: 8.5, delaySec: -1, scale: 0.95, badgeType: 'heart' },
  { id: 2, leftPercent: 22, durationSec: 10.2, delaySec: -5.5, scale: 1.05, badgeType: 'star' },
  { id: 3, leftPercent: 37, durationSec: 9.0, delaySec: -3, scale: 0.9, badgeType: 'heart' },
  { id: 4, leftPercent: 52, durationSec: 11.0, delaySec: -7, scale: 1.08, badgeType: 'star' },
  { id: 5, leftPercent: 68, durationSec: 8.8, delaySec: -2, scale: 0.96, badgeType: 'heart' },
  { id: 6, leftPercent: 83, durationSec: 9.8, delaySec: -6, scale: 1.0, badgeType: 'star' },
];

export const EnvelopeShower: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [openedEnvelope, setOpenedEnvelope] = useState<{
    id: number;
    badgeType: 'heart' | 'star';
  } | null>(null);

  const handleOpenMiniEnvelope = (env: FallingEnvelopeSpec) => {
    setOpenedEnvelope({ id: env.id, badgeType: env.badgeType });
  };

  return (
    <section
      aria-labelledby="lluvia-sobres-titulo"
      className="w-full max-w-3xl mx-auto px-5 py-10 sm:py-14"
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pearl-card rounded-3xl overflow-hidden"
      >
        {/* Top copy */}
        <div className="px-6 pt-8 pb-5 text-center max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A6A12] font-medium mb-2">
            Detalle especial
          </p>
          <h2
            id="lluvia-sobres-titulo"
            className="font-script text-4xl sm:text-[2.75rem] gold-gradient-text mb-3"
          >
            Lluvia de sobres
          </h2>
          <p className="text-sm sm:text-base text-[#556272] leading-relaxed">
            Tu presencia es mi mejor regalo. Si deseas tener un detalle conmigo, tendré una lluvia de sobres.
          </p>
          <p className="text-xs text-[#8A6A12] mt-3 font-medium">
            Toca un sobrecito para abrirlo
          </p>
        </div>

        {/* Falling envelopes stage */}
        <div
          className="relative w-full h-[300px] sm:h-[320px] overflow-hidden border-t border-[#D4AF37]/20"
          style={{
            background: 'linear-gradient(180deg, #EBF5FC 0%, #FFFDF8 100%)',
          }}
        >
          {/* Ambient stars */}
          <TwinklingStarSvg className="w-4 h-4 absolute top-6 left-8 opacity-60 pointer-events-none" />
          <TwinklingStarSvg className="w-3.5 h-3.5 absolute top-14 right-10 opacity-50 pointer-events-none" />

          {/* Falling or gently resting mini envelopes */}
          {FALLING_ENVELOPES.map((env, index) => {
            const isSelected = openedEnvelope?.id === env.id;

            return (
              <button
                key={env.id}
                type="button"
                onClick={() => handleOpenMiniEnvelope(env)}
                aria-label={`Abrir sobrecito ${env.id} de lluvia de sobres`}
                className={`absolute min-w-[48px] min-h-[48px] p-1 flex items-center justify-center cursor-pointer rounded-xl focus-visible:outline-[#8A6A12] transition-opacity ${
                  prefersReducedMotion ? '' : 'animate-envelope-fall'
                } ${openedEnvelope ? 'opacity-20 pointer-events-none' : ''}`}
                style={
                  prefersReducedMotion
                    ? {
                        left: `${env.leftPercent}%`,
                        top: `${24 + (index % 2) * 95}px`,
                      }
                    : {
                        left: `${env.leftPercent}%`,
                        top: 0,
                        animationDuration: `${env.durationSec}s`,
                        animationDelay: `${env.delaySec}s`,
                        transform: `scale(${env.scale})`,
                      }
                }
              >
                <MiniEnvelopeSvg
                  className={`w-12 h-9 transition-transform duration-200 hover:scale-110 ${
                    isSelected ? 'opacity-40 scale-90' : 'drop-shadow-sm'
                  }`}
                />
              </button>
            );
          })}

          {/* Opened thank-you card reveal */}
          <AnimatePresence>
            {openedEnvelope && (
              <motion.div
                key={openedEnvelope.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-4 bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-80 bg-[#FFFDF8] border border-[#D4AF37]/45 rounded-2xl px-5 py-5 flex flex-col items-center text-center shadow-[0_16px_38px_-10px_rgba(138,106,18,0.28)] z-30"
              >
                <div className="w-10 h-10 rounded-full bg-[#E8F4FB] border border-[#D4AF37]/40 flex items-center justify-center mb-2">
                  {openedEnvelope.badgeType === 'heart' ? (
                    <Heart className="w-5 h-5 text-[#B68D1F] fill-[#F3D36B]" aria-hidden="true" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-[#B68D1F]" aria-hidden="true" />
                  )}
                </div>
                <p className="font-script text-3xl gold-gradient-text leading-tight">
                  ¡Gracias por tu cariño!
                </p>
                <button
                  type="button"
                  onClick={() => setOpenedEnvelope(null)}
                  className="mt-2 min-h-[36px] px-3 text-xs text-[#556272] hover:text-[#2C3540] underline cursor-pointer"
                >
                  Seguir viendo los sobres
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
