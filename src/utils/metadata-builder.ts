import type { Metadata } from 'next';

// ----------------------------------------------------------------------

const EVENT_METADATA_COPY = {
  WEDDING: {
    label: 'Boda',
    fallbackTitle: 'Invitación | Nuestra Boda',
    siteName: 'Boda',
  },
  QUINCEANERA: {
    label: 'Quinceañera',
    fallbackTitle: 'Invitación | Quinceañera',
    siteName: 'Quinceañera',
  },
  BIRTHDAY: {
    label: 'Cumpleaños',
    fallbackTitle: 'Invitación | Cumpleaños',
    siteName: 'Cumpleaños',
  },
  CORPORATE: {
    label: 'Evento Corporativo',
    fallbackTitle: 'Invitación | Evento Corporativo',
    siteName: 'Evento Corporativo',
  },
  OTHER: {
    label: 'Evento',
    fallbackTitle: 'Invitación | Evento',
    siteName: 'Evento',
  },
} as const;

export type EventType = keyof typeof EVENT_METADATA_COPY;

type GuestLike = {
  firstName?: string | null;
  lastName?: string | null;
};

type CoupleLike = {
  brideName?: string | null;
  groomName?: string | null;
};

type LegacyHostsLike = {
  firstHost?: string | null;
  secondHost?: string | null;
};

type ThemeLike = {
  cover?: {
    images?: string[] | null;
  } | null;
};

type InvitationLike = {
  maxGuests?: number | string | null;
};

export interface InvitationMetadataInput {
  type?: string | null;
  couple?: CoupleLike | null;
  hosts?: LegacyHostsLike | unknown[] | null;
  theme?: ThemeLike | null;
  invitation?: InvitationLike | null;
  mainGuest?: GuestLike | null;
  otherGuests?: GuestLike[] | null;
}

// ----------------------------------------------------------------------

function cleanText(value?: string | null) {
  return (value || '').replace(/\s+/g, ' ').trim();
}

function cleanName(value?: string | null) {
  return cleanText(value)
    .replace(/[^\p{L}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeEventType(type?: string | null): EventType {
  const normalizedType = cleanText(type).toUpperCase();

  if (normalizedType in EVENT_METADATA_COPY) {
    return normalizedType as EventType;
  }

  return 'OTHER';
}

function getEventCopy(type?: string | null) {
  return EVENT_METADATA_COPY[normalizeEventType(type)];
}

function getPrimaryNames(data: InvitationMetadataInput) {
  const first = cleanText(data?.couple?.brideName);
  const second = cleanText(data?.couple?.groomName);

  if (first && second) return `${first} y ${second}`;
  if (first) return first;
  if (second) return second;

  return '';
}

function getFormattedGuestNames(data: InvitationMetadataInput) {
  const allGuestNames = [
    data?.mainGuest
      ? cleanName([data.mainGuest.firstName, data.mainGuest.lastName].filter(Boolean).join(' '))
      : '',
    ...(Array.isArray(data?.otherGuests)
      ? data.otherGuests.map((guest) =>
          cleanName([guest.firstName, guest.lastName].filter(Boolean).join(' '))
        )
      : []),
  ].filter(Boolean);

  if (!allGuestNames.length) return '';

  if (allGuestNames.length === 1) {
    return allGuestNames[0];
  }

  return `${allGuestNames.slice(0, -1).join(', ')} y ${allGuestNames[allGuestNames.length - 1]}`;
}

function getNumberOfHosts(data: InvitationMetadataInput) {
  // Compatibilidad con estructura vieja
  if (data?.hosts && !Array.isArray(data.hosts)) {
    const legacyHosts = [cleanText(data.hosts.firstHost), cleanText(data.hosts.secondHost)].filter(
      Boolean
    );

    if (legacyHosts.length) return legacyHosts.length;
  }

  // Estructura actual: usamos a los protagonistas del evento
  const first = cleanText(data?.couple?.brideName);
  const second = cleanText(data?.couple?.groomName);

  if (first && second) return 2;
  if (first || second) return 1;

  return 1;
}

function getNumberOfInvitees(data: InvitationMetadataInput) {
  const maxGuests = Number(data?.invitation?.maxGuests);

  if (Number.isFinite(maxGuests) && maxGuests > 0) {
    return maxGuests;
  }

  const mainGuestCount = data?.mainGuest ? 1 : 0;
  const otherGuestsCount = Array.isArray(data?.otherGuests) ? data.otherGuests.length : 0;

  return mainGuestCount + otherGuestsCount || 1;
}

function getDynamicEventDescription(data: InvitationMetadataInput) {
  const eventType = normalizeEventType(data?.type);
  const numberOfHosts = getNumberOfHosts(data);
  const numberOfInvitees = getNumberOfInvitees(data);

  const inviteVerb = numberOfInvitees > 1 ? 'invitarles' : 'invitarte';
  const isPluralHost = numberOfHosts > 1;

  const toneByEvent: Record<
    EventType,
    { singular: (verb: string) => string; plural: (verb: string) => string }
  > = {
    WEDDING: {
      singular: (verb) => `Me llena de alegría ${verb} a mi boda.`,
      plural: (verb) => `Nos llena de alegría ${verb} a nuestra boda.`,
    },
    QUINCEANERA: {
      singular: (verb) => `Tengo la alegría de ${verb} a mis XV años.`,
      plural: (verb) => `Tenemos la alegría de ${verb} a nuestra celebración de XV años.`,
    },
    BIRTHDAY: {
      singular: (verb) => `Tengo el gusto de ${verb} a mi cumpleaños.`,
      plural: (verb) => `Tenemos el gusto de ${verb} a nuestro cumpleaños.`,
    },
    CORPORATE: {
      singular: (verb) => `Tengo el gusto de ${verb} a mi evento corporativo.`,
      plural: (verb) => `Tenemos el gusto de ${verb} a nuestro evento corporativo.`,
    },
    OTHER: {
      singular: (verb) => `Tengo el gusto de ${verb} a mi evento.`,
      plural: (verb) => `Tenemos el gusto de ${verb} a nuestro evento.`,
    },
  };

  const tone = toneByEvent[eventType] || toneByEvent.OTHER;

  return isPluralHost ? tone.plural(inviteVerb) : tone.singular(inviteVerb);
}

function getOgImages(data: InvitationMetadataInput) {
  const images = data?.theme?.cover?.images;

  if (Array.isArray(images) && images.length > 0) {
    return [images[0]];
  }

  return ['/og.jpg'];
}

// ----------------------------------------------------------------------

export function buildFallbackMetadata(): Metadata {
  const fallbackTitle = EVENT_METADATA_COPY.OTHER.fallbackTitle;
  const fallbackDescription = 'Tenemos el gusto de invitarte a nuestro evento.';

  return {
    title: fallbackTitle,
    description: fallbackDescription,
    openGraph: {
      title: fallbackTitle,
      description: fallbackDescription,
      siteName: EVENT_METADATA_COPY.OTHER.siteName,
      locale: 'es_MX',
      type: 'website',
      images: ['/og.jpg'],
    },
  };
}

export function buildInvitationMetadata(data: InvitationMetadataInput): Metadata {
  const eventCopy = getEventCopy(data?.type);
  const primaryNames = getPrimaryNames(data);
  const formattedGuestNames = getFormattedGuestNames(data);

  const eventTitle = primaryNames ? `${eventCopy.label} de ${primaryNames}` : eventCopy.label;

  const title = formattedGuestNames
    ? `Especialmente para ${formattedGuestNames} | ${eventTitle}`
    : eventTitle;

  const description = getDynamicEventDescription(data);

  const siteName = primaryNames ? `${eventCopy.label} de ${primaryNames}` : eventCopy.siteName;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName,
      locale: 'es_MX',
      type: 'website',
      images: getOgImages(data),
    },
  };
}
