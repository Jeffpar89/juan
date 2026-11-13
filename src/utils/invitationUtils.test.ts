import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoogleMapsUrl,
  buildIcsContent,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  getCountdownTimeLeft,
  isPastRsvpDeadline,
  validateRsvpForm,
} from './invitationUtils';

test('getCountdownTimeLeft calculates exact days, hours, minutes, seconds for Bogota time', () => {
  const targetIso = '2026-12-06T09:30:00-05:00';
  // 2 days, 3 hours, 15 minutes, 40 seconds before target
  const targetMs = Date.parse(targetIso);
  const deltaMs = ((2 * 24 + 3) * 3600 + 15 * 60 + 40) * 1000;
  const result = getCountdownTimeLeft(targetIso, targetMs - deltaMs);

  assert.deepEqual(result, {
    days: 2,
    hours: 3,
    minutes: 15,
    seconds: 40,
    isEventDay: false,
  });
});

test('getCountdownTimeLeft returns isEventDay true when target date is reached or passed', () => {
  const targetIso = '2026-12-06T09:30:00-05:00';
  const targetMs = Date.parse(targetIso);

  assert.equal(getCountdownTimeLeft(targetIso, targetMs).isEventDay, true);
  assert.equal(getCountdownTimeLeft(targetIso, targetMs + 60000).isEventDay, true);
  assert.deepEqual(getCountdownTimeLeft(targetIso, targetMs), {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEventDay: true,
  });
});

test('isPastRsvpDeadline detects before vs after Nov 29 2026', () => {
  const deadlineIso = '2026-11-29T23:59:59-05:00';
  assert.equal(isPastRsvpDeadline(deadlineIso, Date.parse('2026-11-15T10:00:00-05:00')), false);
  assert.equal(isPastRsvpDeadline(deadlineIso, Date.parse('2026-11-30T00:00:01-05:00')), true);
});

test('buildGoogleMapsUrl encodes query cleanly', () => {
  const url = buildGoogleMapsUrl('Iglesia San Juan de Mata Bogotá');
  assert.equal(
    url,
    'https://www.google.com/maps/search/?api=1&query=Iglesia%20San%20Juan%20de%20Mata%20Bogot%C3%A1',
  );
});

test('buildIcsContent generates valid Colombia-timezone VEVENT with 2-hour duration', () => {
  const ics = buildIcsContent({
    title: 'Primera Comunión de Juan Ángel',
    description: 'Celebración especial',
    location: 'Iglesia San Juan de Mata, Bogotá',
    startIso: '2026-12-06T09:30:00-05:00',
    durationHours: 2,
    nowMs: Date.parse('2026-11-12T12:00:00Z'),
  });

  assert.match(ics, /BEGIN:VCALENDAR/);
  assert.match(ics, /TZID:America\/Bogota/);
  assert.match(ics, /DTSTART;TZID=America\/Bogota:20261206T093000/);
  assert.match(ics, /DTEND;TZID=America\/Bogota:20261206T113000/);
  assert.match(ics, /SUMMARY:Primera Comunión de Juan Ángel/);
  assert.match(ics, /LOCATION:Iglesia San Juan de Mata\\, Bogotá/);
  assert.match(ics, /END:VCALENDAR/);
});

test('buildWhatsAppUrl generates properly encoded attending and non-attending messages', () => {
  const yesMsg = buildWhatsAppMessage({
    childName: 'Juan Ángel',
    fullName: 'María Gómez',
    attending: 'yes',
    totalGuests: 3,
    message: '¡Dios lo bendiga!',
  });
  assert.equal(
    yesMsg,
    'Hola, soy María Gómez. Confirmo mi asistencia a la Primera Comunión de Juan Ángel el 6 de diciembre. Seremos 3 personas. ¡Dios lo bendiga!',
  );

  const yesUrl = buildWhatsAppUrl({
    whatsappNumber: '573124785993',
    childName: 'Juan Ángel',
    fullName: 'María Gómez',
    attending: 'yes',
    totalGuests: 3,
    message: '¡Dios lo bendiga!',
  });
  assert.ok(yesUrl.startsWith('https://wa.me/573124785993?text='));
  assert.ok(yesUrl.includes(encodeURIComponent('Seremos 3 personas.')));

  const noMsg = buildWhatsAppMessage({
    childName: 'Juan Ángel',
    fullName: 'Carlos Pérez',
    attending: 'no',
    totalGuests: 0,
    message: '',
  });
  assert.equal(
    noMsg,
    'Hola, soy Carlos Pérez. Lamentablemente no podré asistir a la Primera Comunión de Juan Ángel.',
  );
});

test('validateRsvpForm enforces required fields and guest constraints', () => {
  const emptyErrors = validateRsvpForm({
    fullName: '   ',
    attending: null,
    adults: 1,
    children: 0,
    message: '',
  });
  assert.ok(emptyErrors.fullName);
  assert.ok(emptyErrors.attending);

  const zeroAdultsErrors = validateRsvpForm({
    fullName: 'Ana Sofía',
    attending: 'yes',
    adults: 0,
    children: 1,
    message: '',
  });
  assert.ok(zeroAdultsErrors.guests);

  const validNo = validateRsvpForm({
    fullName: 'Ana Sofía',
    attending: 'no',
    adults: 0,
    children: 0,
    message: 'Un abrazo',
  });
  assert.deepEqual(validNo, {});
});
