import React, { useState } from 'react';
import { CalendarPlus, Check, MapPin } from 'lucide-react';
import { CONFIG } from '../config';
import { buildGoogleMapsUrl, buildIcsContent } from '../utils/invitationUtils';

export const ActionButtons: React.FC = () => {
  const [calendarSaved, setCalendarSaved] = useState(false);

  const mapsUrl = buildGoogleMapsUrl(CONFIG.mapsQuery);

  const handleDownloadIcs = () => {
    const icsContent = buildIcsContent({
      title: CONFIG.calendarTitle,
      description: CONFIG.calendarDescription,
      location: CONFIG.locationShort,
      startIso: CONFIG.eventStartIso,
      durationHours: CONFIG.eventDurationHours,
    });

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Primera-Comunion-Juan-Angel.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 3000);
  };

  return (
    <section
      aria-label="Acciones del evento"
      className="w-full max-w-2xl mx-auto px-5 py-6 sm:py-8"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] px-6 py-3 rounded-full text-sm sm:text-base font-medium text-[#FFFDF8] shadow-[0_10px_24px_-6px_rgba(138,106,18,0.45)] inline-flex items-center justify-center gap-2.5 transition-transform active:scale-[0.98] whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, #B68D1F 0%, #8A6A12 100%)',
          }}
        >
          <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Cómo llegar</span>
        </a>

        <button
          type="button"
          onClick={handleDownloadIcs}
          className="min-h-[48px] px-6 py-3 rounded-full pearl-card text-sm sm:text-base font-medium text-[#2C3540] hover:border-[#D4AF37] inline-flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
        >
          {calendarSaved ? (
            <>
              <Check className="w-4 h-4 text-[#8A6A12] shrink-0" aria-hidden="true" />
              <span>¡Agregado al calendario!</span>
            </>
          ) : (
            <>
              <CalendarPlus className="w-4 h-4 text-[#8A6A12] shrink-0" aria-hidden="true" />
              <span>Agregar a mi calendario</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
