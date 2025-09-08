export function GetCurrentDateWithoutTime() {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function GetCurrentDateShort() {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function GetCurrentYear() {
  return new Date().getFullYear();
}

export function GetCurrentDateLong() {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    formatMatcher: 'basic',
  });
}

export function GetCurrentDateLongWithoutTime() {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    formatMatcher: 'basic',
  });
}
