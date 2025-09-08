import { fetchHistorial, fetchHistorialPresupuesto, getHistorial } from '@/utils/makeHistorial.js';
import historial from './mock/historial.json';
import todo from './mock/todo.json';
import presupuesto from './mock/presupuesto.json';
import historialdb from './mock/historial-db.json';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Test de historiales y obtener', () => {
  it('Deberia de crear un historial para todo', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(historial),
      }),
    );
    const result = await fetchHistorial(todo, 'crear');
    expect(result).toEqual(historial);
  });
  it('Deberia crear un gasto en el historial para presupuesto', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(presupuesto),
      }),
    );
    const result = await fetchHistorialPresupuesto(todo, 'gasto');
    expect(result).toEqual(presupuesto);
  });
  it('Deberia obtener todos los historiales de la base de datos', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(historialdb),
      }),
    );
    const result = await getHistorial();
    expect(result).toEqual([historial, presupuesto]);
  });
});
