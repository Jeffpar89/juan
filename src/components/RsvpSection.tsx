import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Send,
  Users,
} from 'lucide-react';
import { CONFIG } from '../config';
import {
  AttendanceStatus,
  RsvpSubmission,
  RsvpValidationErrors,
  buildWhatsAppUrl,
  clearRsvpFromStorage,
  isPastRsvpDeadline,
  loadRsvpFromStorage,
  saveRsvpToStorage,
  validateRsvpForm,
} from '../utils/invitationUtils';
import { WhiteDoveSvg } from './SacredIllustrations';

interface ConfettiPiece {
  id: number;
  leftPercent: number;
  delaySec: number;
  driftPx: number;
  color: string;
  sizePx: number;
}

const CONFETTI_PIECES: ConfettiPiece[] = [
  { id: 1, leftPercent: 6, delaySec: 0, driftPx: -20, color: '#F3D36B', sizePx: 8 },
  { id: 2, leftPercent: 14, delaySec: 0.15, driftPx: 26, color: '#FFFDF8', sizePx: 10 },
  { id: 3, leftPercent: 22, delaySec: 0.08, driftPx: -14, color: '#D4AF37', sizePx: 7 },
  { id: 4, leftPercent: 30, delaySec: 0.25, driftPx: 30, color: '#CFE6F5', sizePx: 9 },
  { id: 5, leftPercent: 38, delaySec: 0.05, driftPx: -24, color: '#F3D36B', sizePx: 8 },
  { id: 6, leftPercent: 46, delaySec: 0.3, driftPx: 18, color: '#FFFFFF', sizePx: 10 },
  { id: 7, leftPercent: 54, delaySec: 0.12, driftPx: -28, color: '#D4AF37', sizePx: 9 },
  { id: 8, leftPercent: 62, delaySec: 0.2, driftPx: 22, color: '#FFFDF8', sizePx: 8 },
  { id: 9, leftPercent: 70, delaySec: 0.04, driftPx: -18, color: '#F3D36B', sizePx: 10 },
  { id: 10, leftPercent: 78, delaySec: 0.28, driftPx: 26, color: '#CFE6F5', sizePx: 7 },
  { id: 11, leftPercent: 86, delaySec: 0.1, driftPx: -22, color: '#D4AF37', sizePx: 9 },
  { id: 12, leftPercent: 93, delaySec: 0.22, driftPx: 16, color: '#FFFFFF', sizePx: 8 },
];

export const RsvpSection: React.FC = () => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const pastDeadline = isPastRsvpDeadline(CONFIG.rsvpDeadlineIso);

  const [savedRsvp, setSavedRsvp] = useState<RsvpSubmission | null>(() =>
    loadRsvpFromStorage(CONFIG.storageKey),
  );
  const [wasLoadedFromStorage, setWasLoadedFromStorage] = useState<boolean>(() =>
    Boolean(loadRsvpFromStorage(CONFIG.storageKey)),
  );
  const [justCelebrated, setJustCelebrated] = useState(false);

  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<AttendanceStatus | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<RsvpValidationErrors>({});

  useEffect(() => {
    if (!justCelebrated) return;
    const timeout = window.setTimeout(() => setJustCelebrated(false), 4500);
    return () => window.clearTimeout(timeout);
  }, [justCelebrated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateRsvpForm({
      fullName,
      attending,
      adults,
      children,
      message,
    });

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const submission: RsvpSubmission = {
      fullName: fullName.trim(),
      attending: attending as AttendanceStatus,
      adults: attending === 'yes' ? adults : 0,
      children: attending === 'yes' ? children : 0,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    saveRsvpToStorage(CONFIG.storageKey, submission);
    setSavedRsvp(submission);
    setWasLoadedFromStorage(false);
    setErrors({});

    if (submission.attending === 'yes') {
      setJustCelebrated(true);
    }
  };

  const handleEditResponse = () => {
    if (savedRsvp) {
      setFullName(savedRsvp.fullName);
      setAttending(savedRsvp.attending);
      setAdults(savedRsvp.adults > 0 ? savedRsvp.adults : 1);
      setChildren(savedRsvp.children);
      setMessage(savedRsvp.message);
    }
    clearRsvpFromStorage(CONFIG.storageKey);
    setSavedRsvp(null);
    setWasLoadedFromStorage(false);
    setJustCelebrated(false);
  };

  const totalGuests = savedRsvp ? savedRsvp.adults + savedRsvp.children : adults + children;

  const whatsappUrl = savedRsvp
    ? buildWhatsAppUrl({
        whatsappNumber: CONFIG.whatsappNumber,
        childName: CONFIG.childName,
        fullName: savedRsvp.fullName,
        attending: savedRsvp.attending,
        totalGuests,
        message: savedRsvp.message,
      })
    : '';

  return (
    <section
      id="confirmar-asistencia"
      aria-labelledby="rsvp-titulo"
      className="w-full max-w-2xl mx-auto px-5 py-10 sm:py-14 relative"
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="pearl-card rounded-3xl p-6 sm:p-9 relative overflow-hidden"
      >
        {/* Celebration Confetti & Flying Doves when attending */}
        {justCelebrated && !prefersReducedMotion && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none overflow-hidden z-20"
          >
            {CONFETTI_PIECES.map((piece) => (
              <span
                key={piece.id}
                className="absolute top-0 rounded-sm animate-confetti"
                style={
                  {
                    left: `${piece.leftPercent}%`,
                    width: `${piece.sizePx}px`,
                    height: `${piece.sizePx * 1.4}px`,
                    backgroundColor: piece.color,
                    border: '1px solid rgba(138,106,18,0.2)',
                    animationDelay: `${piece.delaySec}s`,
                    '--drift': `${piece.driftPx}px`,
                  } as React.CSSProperties
                }
              />
            ))}
            <div className="absolute top-10 inset-x-0 animate-dove-glide" style={{ animationDuration: '5.5s' }}>
              <WhiteDoveSvg className="w-16 h-11" />
            </div>
            <div
              className="absolute top-28 inset-x-0 animate-dove-glide"
              style={{ animationDuration: '6.5s', animationDelay: '0.4s' }}
            >
              <WhiteDoveSvg className="w-12 h-9" />
            </div>
          </div>
        )}

        <div className="text-center mb-7 relative z-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A6A12] font-medium mb-2">
            Confirmación de asistencia
          </p>
          <h2
            id="rsvp-titulo"
            className="text-xl sm:text-2xl font-semibold text-[#2C3540] text-balance"
          >
            Confirma tu asistencia antes del {CONFIG.rsvpDeadlineShort}
          </h2>
        </div>

        {/* Gentle notice if past deadline */}
        {pastDeadline && (
          <div
            role="status"
            className="mb-6 rounded-2xl bg-[#E8F4FB] border border-[#D4AF37]/35 px-4 py-3 text-sm text-[#2C3540] flex items-start gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-[#8A6A12] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              El plazo de confirmación ya pasó, pero aún puedes escribirnos por WhatsApp
            </span>
          </div>
        )}

        {/* Confirmation Screen or Form */}
        {savedRsvp ? (
          <div className="relative z-10 text-center space-y-5 py-2">
            {wasLoadedFromStorage && (
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F4FB] border border-[#D4AF37]/30 px-4 py-1.5 text-xs font-medium text-[#8A6A12]">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Tu confirmación ya fue enviada</span>
              </div>
            )}

            <div className="w-14 h-14 mx-auto rounded-full bg-[#E8F4FB] border border-[#D4AF37]/40 flex items-center justify-center">
              {savedRsvp.attending === 'yes' ? (
                <CheckCircle2 className="w-7 h-7 text-[#8A6A12]" aria-hidden="true" />
              ) : (
                <Heart className="w-7 h-7 text-[#8A6A12]" aria-hidden="true" />
              )}
            </div>

            {savedRsvp.attending === 'yes' ? (
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#2C3540]">
                  ¡Gracias por confirmar, {savedRsvp.fullName}! Nos vemos el 6 de diciembre
                </h3>
                <p className="text-sm text-[#556272]">
                  {totalGuests === 1 ? '1 persona confirmada' : `${totalGuests} personas confirmadas`} (
                  {savedRsvp.adults} {savedRsvp.adults === 1 ? 'adulto' : 'adultos'}
                  {savedRsvp.children > 0
                    ? `, ${savedRsvp.children} ${savedRsvp.children === 1 ? 'niño' : 'niños'}`
                    : ''}
                  )
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#2C3540]">
                  Gracias por avisarnos, te llevamos en el corazón
                </h3>
                <p className="text-sm text-[#556272]">
                  Agradecemos mucho tu mensaje, {savedRsvp.fullName}.
                </p>
              </div>
            )}

            {savedRsvp.message && (
              <blockquote className="rounded-2xl bg-[#FFFDF8] border border-[#D4AF37]/25 px-4 py-3 text-sm italic text-[#556272]">
                “{savedRsvp.message}”
              </blockquote>
            )}

            <div className="pt-2 flex flex-col items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] px-5 sm:px-7 py-3 rounded-full text-[13px] sm:text-base font-medium text-[#FFFDF8] shadow-[0_10px_24px_-6px_rgba(22,124,65,0.4)] inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.98] whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #259B56 0%, #17783F 100%)',
                }}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
                <span>Enviar mi confirmación por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleEditResponse}
                className="min-h-[44px] px-4 py-2 text-xs text-[#556272] hover:text-[#2C3540] underline cursor-pointer"
              >
                Cambiar mi respuesta
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6 relative z-10">
            {/* Nombre completo */}
            <div>
              <label
                htmlFor="rsvp-nombre"
                className="block text-sm font-medium text-[#2C3540] mb-1.5"
              >
                Nombre completo <span className="text-[#8A6A12]" aria-hidden="true">*</span>
              </label>
              <input
                id="rsvp-nombre"
                type="text"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                placeholder="Ej. María Fernanda López"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'error-nombre' : undefined}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#2C3540] placeholder:text-[#8E9BA8] text-base focus:border-[#8A6A12] transition-colors"
              />
              {errors.fullName && (
                <p id="error-nombre" role="alert" className="mt-1.5 text-xs text-[#B91C1C] font-medium">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* ¿Asistirás? */}
            <fieldset>
              <legend className="block text-sm font-medium text-[#2C3540] mb-2">
                ¿Asistirás? <span className="text-[#8A6A12]" aria-hidden="true">*</span>
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  aria-pressed={attending === 'yes'}
                  onClick={() => {
                    setAttending('yes');
                    if (errors.attending) setErrors((prev) => ({ ...prev, attending: undefined }));
                  }}
                  className={`min-h-[54px] px-4 py-3 rounded-2xl border text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    attending === 'yes'
                      ? 'bg-[#8A6A12] text-[#FFFDF8] border-[#8A6A12] shadow-md'
                      : 'bg-white text-[#2C3540] border-[#D4AF37]/40 hover:border-[#8A6A12]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Sí, ahí estaré</span>
                </button>

                <button
                  type="button"
                  aria-pressed={attending === 'no'}
                  onClick={() => {
                    setAttending('no');
                    if (errors.attending || errors.guests) {
                      setErrors((prev) => ({ ...prev, attending: undefined, guests: undefined }));
                    }
                  }}
                  className={`min-h-[54px] px-4 py-3 rounded-2xl border text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    attending === 'no'
                      ? 'bg-[#3C4B5C] text-[#FFFDF8] border-[#3C4B5C] shadow-md'
                      : 'bg-white text-[#2C3540] border-[#D4AF37]/40 hover:border-[#3C4B5C]'
                  }`}
                >
                  <Heart className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>No podré asistir</span>
                </button>
              </div>
              {errors.attending && (
                <p role="alert" className="mt-1.5 text-xs text-[#B91C1C] font-medium">
                  {errors.attending}
                </p>
              )}
            </fieldset>

            {/* Número de personas (solo si responde que sí) */}
            <AnimatePresence initial={false}>
              {attending === 'yes' && (
                <motion.div
                  key="guest-counters"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-2xl bg-[#F4F9FD] border border-[#CFE6F5] p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#2C3540]">
                      <Users className="w-4 h-4 text-[#8A6A12]" aria-hidden="true" />
                      <span>Número de personas</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Adultos */}
                      <div className="flex items-center justify-between bg-white rounded-xl border border-[#D4AF37]/30 px-3.5 py-2.5">
                        <div>
                          <p className="text-sm font-medium text-[#2C3540]">Adultos</p>
                          <p className="text-xs text-[#556272]">Mínimo 1</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setAdults((v) => Math.max(1, v - 1))}
                            aria-label="Disminuir número de adultos"
                            disabled={adults <= 1}
                            className="w-11 h-11 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#2C3540] hover:bg-[#FFFDF8] disabled:opacity-40 cursor-pointer"
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span
                            aria-live="polite"
                            className="w-7 text-center font-semibold tabular-nums text-[#2C3540]"
                          >
                            {adults}
                          </span>
                          <button
                            type="button"
                            onClick={() => setAdults((v) => Math.min(15, v + 1))}
                            aria-label="Aumentar número de adultos"
                            className="w-11 h-11 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#2C3540] hover:bg-[#FFFDF8] cursor-pointer"
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Niños */}
                      <div className="flex items-center justify-between bg-white rounded-xl border border-[#D4AF37]/30 px-3.5 py-2.5">
                        <div>
                          <p className="text-sm font-medium text-[#2C3540]">Niños</p>
                          <p className="text-xs text-[#556272]">Opcional</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setChildren((v) => Math.max(0, v - 1))}
                            aria-label="Disminuir número de niños"
                            disabled={children <= 0}
                            className="w-11 h-11 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#2C3540] hover:bg-[#FFFDF8] disabled:opacity-40 cursor-pointer"
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span
                            aria-live="polite"
                            className="w-7 text-center font-semibold tabular-nums text-[#2C3540]"
                          >
                            {children}
                          </span>
                          <button
                            type="button"
                            onClick={() => setChildren((v) => Math.min(15, v + 1))}
                            aria-label="Aumentar número de niños"
                            className="w-11 h-11 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#2C3540] hover:bg-[#FFFDF8] cursor-pointer"
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {errors.guests && (
                      <p role="alert" className="text-xs text-[#B91C1C] font-medium">
                        {errors.guests}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mensaje o bendición */}
            <div>
              <label
                htmlFor="rsvp-mensaje"
                className="block text-sm font-medium text-[#2C3540] mb-1.5"
              >
                Mensaje o bendición para {CONFIG.childName}{' '}
                <span className="text-xs font-normal text-[#556272]">(opcional)</span>
              </label>
              <textarea
                id="rsvp-mensaje"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe unas lindas palabras o una bendición..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#D4AF37]/40 text-[#2C3540] placeholder:text-[#8E9BA8] text-base focus:border-[#8A6A12] transition-colors resize-none"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full min-h-[52px] px-6 py-3.5 rounded-full text-base font-medium text-[#FFFDF8] shadow-[0_12px_28px_-8px_rgba(138,106,18,0.5)] inline-flex items-center justify-center gap-2.5 transition-transform active:scale-[0.98] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #B68D1F 0%, #8A6A12 100%)',
              }}
            >
              <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Confirmar asistencia</span>
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};
