import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CONFIG } from '../config';
import { getCountdownTimeLeft, CountdownState } from '../utils/invitationUtils';
import { TwinklingStarSvg } from './SacredIllustrations';

interface FlipUnitProps {
  value: number;
  label: string;
  reducedMotion: boolean;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ value, label, reducedMotion }) => {
  const formatted = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[70px] h-[78px] sm:w-[88px] sm:h-[96px] rounded-2xl pearl-card flex items-center justify-center overflow-hidden perspective-1200">
        {/* Horizontal split-flap crease */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-px bg-[#D4AF37]/25 z-10 pointer-events-none"
        />
        {/* Soft celeste upper sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#E8F4FB]/55 to-transparent pointer-events-none"
        />
        <span
          key={formatted}
          className={`text-3xl sm:text-4xl font-semibold tabular-nums gold-gradient-text relative z-0 ${
            reducedMotion ? '' : 'animate-flip-digit'
          }`}
        >
          {formatted}
        </span>
      </div>
      <span className="mt-2 text-xs sm:text-sm text-[#556272] font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
};

export const CountdownSection: React.FC = () => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    getCountdownTimeLeft(CONFIG.eventStartIso),
  );

  useEffect(() => {
    const update = () => setCountdown(getCountdownTimeLeft(CONFIG.eventStartIso));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      aria-labelledby="cuenta-regresiva-titulo"
      className="w-full max-w-3xl mx-auto px-5 py-8 sm:py-12"
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <p
          id="cuenta-regresiva-titulo"
          className="text-xs uppercase tracking-[0.2em] text-[#8A6A12] font-medium mb-5"
        >
          Falta muy poco para este gran día
        </p>

        {countdown.isEventDay ? (
          <div className="pearl-card rounded-3xl px-6 py-8 inline-flex items-center justify-center gap-3">
            <TwinklingStarSvg className="w-5 h-5 shrink-0" />
            <p className="font-script text-4xl sm:text-5xl gold-gradient-text">
              ¡Hoy es el gran día!
            </p>
            <TwinklingStarSvg className="w-5 h-5 shrink-0" />
          </div>
        ) : (
          <div
            role="timer"
            aria-label={`Faltan ${countdown.days} días, ${countdown.hours} horas, ${countdown.minutes} minutos y ${countdown.seconds} segundos`}
            className="flex items-center justify-center gap-3 sm:gap-5"
          >
            <FlipUnit value={countdown.days} label="Días" reducedMotion={prefersReducedMotion} />
            <FlipUnit value={countdown.hours} label="Horas" reducedMotion={prefersReducedMotion} />
            <FlipUnit value={countdown.minutes} label="Minutos" reducedMotion={prefersReducedMotion} />
            <FlipUnit value={countdown.seconds} label="Segundos" reducedMotion={prefersReducedMotion} />
          </div>
        )}
      </motion.div>
    </section>
  );
};
