export interface InvitationConfig {
  title: string;
  childName: string;
  dateDisplay: string;
  timeDisplay: string;
  locationShort: string;
  locationFull: string;
  mapsQuery: string;
  invitationQuote: string;
  parents: string;
  whatsappNumber: string;
  rsvpDeadlineDisplay: string;
  rsvpDeadlineShort: string;
  rsvpDeadlineIso: string;
  eventStartIso: string;
  eventDurationHours: number;
  calendarTitle: string;
  calendarDescription: string;
  storageKey: string;
}

export const CONFIG: InvitationConfig = {
  title: 'Mi Primera Comunión',
  childName: 'Juan Ángel',
  dateDisplay: 'Domingo 6 de diciembre de 2026',
  timeDisplay: '9:30 a. m.',
  locationShort: 'Iglesia San Juan de Mata, Bogotá',
  locationFull: 'Iglesia San Juan de Mata, Bogotá, Colombia',
  mapsQuery: 'Iglesia San Juan de Mata Bogotá',
  invitationQuote: 'Te invito a compartir conmigo este día tan especial',
  parents: 'Tatiana y Henry',
  whatsappNumber: '573124785993',
  rsvpDeadlineDisplay: 'Domingo 29 de noviembre de 2026',
  rsvpDeadlineShort: '29 de noviembre',
  rsvpDeadlineIso: '2026-11-29T23:59:59-05:00',
  eventStartIso: '2026-12-06T09:30:00-05:00',
  eventDurationHours: 2,
  calendarTitle: 'Primera Comunión de Juan Ángel',
  calendarDescription:
    'Te invito a compartir conmigo este día tan especial. Con la bendición de Dios y de mis padres, Tatiana y Henry.',
  storageKey: 'comunion_juan_angel_rsvp_v1',
};
