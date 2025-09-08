import {
  GetCurrentDateWithoutTime,
  GetCurrentDateShort,
  GetCurrentYear,
  GetCurrentDateLong,
  GetCurrentDateLongWithoutTime,
} from '@/utils/fecha-actual.js';

const DateNoTime = () => {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const DateShort = () => {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const Year = () => {
  return new Date().getFullYear();
};

const DateLong = () => {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    formatMatcher: 'basic',
  });
};

const DateLongNoTime = () => {
  return new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    formatMatcher: 'basic',
  });
};

describe('Tests para los exports de fecha', () => {
  it('Deberia obtener la fecha actual sin tiempo', () => {
    expect(GetCurrentDateWithoutTime()).toBe(DateNoTime());
  });
  it('Deberia obtener la fecha actual corta', () => {
    expect(GetCurrentDateShort()).toBe(DateShort());
  });
  it('Deberia obtener el año actual', () => {
    expect(GetCurrentYear()).toBe(Year());
  });
  it('Deberia obtener la fecha actual larga', () => {
    expect(GetCurrentDateLong()).toBe(DateLong());
  });
  it('Deberia obtener la fecha actual larga sin tiempo', () => {
    expect(GetCurrentDateLongWithoutTime()).toBe(DateLongNoTime());
  });
});
