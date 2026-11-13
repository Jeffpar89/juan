export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEventDay: boolean;
}

export type AttendanceStatus = 'yes' | 'no';

export interface RsvpSubmission {
  fullName: string;
  attending: AttendanceStatus;
  adults: number;
  children: number;
  message: string;
  submittedAt: string;
}

export interface RsvpFormInput {
  fullName: string;
  attending: AttendanceStatus | null;
  adults: number;
  children: number;
  message: string;
}

export interface RsvpValidationErrors {
  fullName?: string;
  attending?: string;
  guests?: string;
}

export function getCountdownTimeLeft(targetIso: string, nowMs: number = Date.now()): CountdownState {
  const targetMs = Date.parse(targetIso);
  if (Number.isNaN(targetMs) || nowMs >= targetMs) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEventDay: true,
    };
  }

  const diffSeconds = Math.floor((targetMs - nowMs) / 1000);
  const days = Math.floor(diffSeconds / 86400);
  const hours = Math.floor((diffSeconds % 86400) / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isEventDay: false,
  };
}

export function isPastRsvpDeadline(deadlineIso: string, nowMs: number = Date.now()): boolean {
  const deadlineMs = Date.parse(deadlineIso);
  if (Number.isNaN(deadlineMs)) {
    return false;
  }
  return nowMs > deadlineMs;
}

export function buildGoogleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function formatBogotaIcsDateTime(utcMs: number): string {
  // Colombia (America/Bogota) is permanently UTC-5 (no daylight saving time).
  const bogotaDate = new Date(utcMs - 5 * 60 * 60 * 1000);
  const year = bogotaDate.getUTCFullYear();
  const month = String(bogotaDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(bogotaDate.getUTCDate()).padStart(2, '0');
  const hours = String(bogotaDate.getUTCHours()).padStart(2, '0');
  const minutes = String(bogotaDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(bogotaDate.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

function formatUtcIcsStamp(utcMs: number): string {
  const d = new Date(utcMs);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const hours = String(d.getUTCHours()).padStart(2, '0');
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');
  const seconds = String(d.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

export interface BuildIcsParams {
  title: string;
  description: string;
  location: string;
  startIso: string;
  durationHours: number;
  nowMs?: number;
}

export function buildIcsContent(params: BuildIcsParams): string {
  const startMs = Date.parse(params.startIso);
  const endMs = startMs + params.durationHours * 60 * 60 * 1000;
  const dtStart = formatBogotaIcsDateTime(startMs);
  const dtEnd = formatBogotaIcsDateTime(endMs);
  const dtStamp = formatUtcIcsStamp(params.nowMs ?? Date.now());

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Primera Comunion Juan Angel//Invitacion Digital//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    'TZID:America/Bogota',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:-0500',
    'TZOFFSETTO:-0500',
    'TZNAME:COT',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:primera-comunion-juan-angel-${dtStart}@invitacion`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=America/Bogota:${dtStart}`,
    `DTEND;TZID=America/Bogota:${dtEnd}`,
    `SUMMARY:${escapeIcsText(params.title)}`,
    `LOCATION:${escapeIcsText(params.location)}`,
    `DESCRIPTION:${escapeIcsText(params.description)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

export interface BuildWhatsAppParams {
  whatsappNumber: string;
  childName: string;
  fullName: string;
  attending: AttendanceStatus;
  totalGuests: number;
  message: string;
}

export function buildWhatsAppMessage(params: Omit<BuildWhatsAppParams, 'whatsappNumber'>): string {
  const cleanName = params.fullName.trim();
  const cleanMsg = params.message.trim();

  if (params.attending === 'yes') {
    const base = `Hola, soy ${cleanName}. Confirmo mi asistencia a la Primera Comunión de ${params.childName} el 6 de diciembre. Seremos ${params.totalGuests} ${params.totalGuests === 1 ? 'persona' : 'personas'}.`;
    return cleanMsg ? `${base} ${cleanMsg}` : base;
  }

  const base = `Hola, soy ${cleanName}. Lamentablemente no podré asistir a la Primera Comunión de ${params.childName}.`;
  return cleanMsg ? `${base} ${cleanMsg}` : base;
}

export function buildWhatsAppUrl(params: BuildWhatsAppParams): string {
  const text = buildWhatsAppMessage(params);
  const digits = params.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function validateRsvpForm(input: RsvpFormInput): RsvpValidationErrors {
  const errors: RsvpValidationErrors = {};

  if (!input.fullName.trim()) {
    errors.fullName = 'Por favor escribe tu nombre completo.';
  } else if (input.fullName.trim().length < 2) {
    errors.fullName = 'El nombre debe tener al menos 2 caracteres.';
  }

  if (input.attending !== 'yes' && input.attending !== 'no') {
    errors.attending = 'Por favor indícanos si podrás acompañarnos.';
  }

  if (input.attending === 'yes') {
    const total = input.adults + input.children;
    if (input.adults < 1 || total < 1) {
      errors.guests = 'Debe asistir al menos 1 adulto.';
    } else if (input.adults > 20 || input.children > 20) {
      errors.guests = 'Por favor verifica el número de asistentes.';
    }
  }

  return errors;
}

export function saveRsvpToStorage(key: string, data: RsvpSubmission): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function loadRsvpFromStorage(key: string): RsvpSubmission | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<RsvpSubmission>;
    if (
      typeof parsed.fullName === 'string' &&
      (parsed.attending === 'yes' || parsed.attending === 'no') &&
      typeof parsed.adults === 'number' &&
      typeof parsed.children === 'number'
    ) {
      return {
        fullName: parsed.fullName,
        attending: parsed.attending,
        adults: parsed.adults,
        children: parsed.children,
        message: typeof parsed.message === 'string' ? parsed.message : '',
        submittedAt: typeof parsed.submittedAt === 'string' ? parsed.submittedAt : '',
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function clearRsvpFromStorage(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Ignore storage errors safely
  }
}
