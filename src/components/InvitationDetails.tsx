import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { CONFIG } from '../config';
import { WheatDividerSvg } from './SacredIllustrations';

export const InvitationDetails: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const detailCards = [
    {
      id: 'fecha',
      label: 'Fecha',
      value: CONFIG.dateDisplay,
      icon: Calendar,
    },
    {
      id: 'hora',
      label: 'Hora',
      value: CONFIG.timeDisplay,
      icon: Clock,
    },
    {
      id: 'lugar',
      label: 'Lugar',
      value: CONFIG.locationShort,
      icon: MapPin,
    },
  ];

  return (
    <section
      id="invitacion-frase"
      aria-labelledby="frase-invitacion-titulo"
      className="w-full max-w-4xl mx-auto px-5 py-12 sm:py-16"
    >
      {/* Phrase & Parents Blessing */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-xl mx-auto mb-12"
      >
        <WheatDividerSvg className="w-48 h-6 mx-auto mb-6 opacity-90" />

        <h2
          id="frase-invitacion-titulo"
          className="font-script text-3xl sm:text-[2.6rem] leading-snug text-[#2C3540] text-balance"
        >
          “{CONFIG.invitationQuote}”
        </h2>

        <p className="mt-4 text-sm sm:text-base text-[#556272] font-light leading-relaxed">
          Con la bendición de Dios y de mis padres,{' '}
          <span className="font-medium text-[#8A6A12]">{CONFIG.parents}</span>
        </p>
      </motion.div>

      {/* Event Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {detailCards.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <motion.article
              key={item.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: prefersReducedMotion ? 0 : idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pearl-card rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-full bg-[#E8F4FB] border border-[#D4AF37]/35 flex items-center justify-center mb-3"
              >
                <IconComponent className="w-5 h-5 text-[#8A6A12]" />
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#8A6A12] font-medium mb-1">
                {item.label}
              </p>
              <p className="text-base sm:text-lg font-medium text-[#2C3540]">
                {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
