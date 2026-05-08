import { EVENT_TYPES, InvitationData } from '@/providers/invitation';

export function getEventLabel(type: string) {
  switch (type) {
    case EVENT_TYPES.QUINCEANERA.value:
      return 'Quinceañera';
    case EVENT_TYPES.BIRTHDAY.value:
      return 'Cumpleaños';
    case EVENT_TYPES.WEDDING.value:
      return 'Boda';
    default:
      return 'Evento';
  }
}

export function getHeroHeadline(data: InvitationData) {
  if (data.theme.cover.headline) return data.theme.cover.headline;

  switch (data.type) {
    case EVENT_TYPES.QUINCEANERA.value:
      return 'Mis XV Años';
    case EVENT_TYPES.WEDDING.value:
      return 'Nuestra Boda';
    default:
      return 'Estás Invitado';
  }
}

export function getParentsTitle(type: string) {
  switch (type) {
    case EVENT_TYPES.QUINCEANERA.value:
      return 'Mis Padres';
    case EVENT_TYPES.WEDDING.value:
      return 'Nuestros Padres';
    default:
      return 'Padres';
  }
}

export function getCoupleNamesDisplay(data: InvitationData) {
  const { brideName, groomName } = data.couple;

  if (data.type === EVENT_TYPES.QUINCEANERA.value) {
    return brideName || groomName; // Usually just one for XV
  }

  if (brideName && groomName) {
    return `${brideName} & ${groomName}`;
  }

  return brideName || groomName;
}
export function getPossessiveAdjective(data: InvitationData, plural = false) {
  if (data.type === EVENT_TYPES.QUINCEANERA.value || data.type === EVENT_TYPES.BIRTHDAY.value) {
    return plural ? 'Mis' : 'Mi';
  }
  return plural ? 'Nuestros' : 'Nuestra';
}

export function getFirstName(name: string) {
  if (!name) return '';
  return name.split(' ')[0];
}

export function getEventPadrinosLabel(category: string, type: string) {
  if (!category) return 'Padrinos';

  if (type === EVENT_TYPES.QUINCEANERA.value) {
    // Casos especiales para XV
    if (category.toLowerCase().includes('velación') || category.toLowerCase().includes('velacion'))
      return 'Padrinos de Velación';
    if (category.toLowerCase().includes('padres')) return 'Padrinos de Honor';
    return `Padrinos de ${category}`;
  }

  return `Padrinos de ${category}`;
}
