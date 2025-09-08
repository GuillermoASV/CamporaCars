import MakeHistorial from '@/app/(admin)/menu/(contenido)/historial/components/makeHistorial';
import { render, screen } from '@testing-library/react';
import historialMock from './mock/historialMock.json';

beforeEach(() => {
  jest.resetAllMocks();

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(historialMock),
    }),
  );
});

describe('Test para el header de historial', () => {
  it('Deberia mostrar el texto en grande que dice "Historial" en el header', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText(/Historial/)).toBeInTheDocument();
  });
});

describe('Test para el page de historial', () => {
  it('Deberia estar la accion de la tarea del mock en el historial', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText(/Ha sido agregado un nuevo gasto/)).toBeInTheDocument();
  });
  it('Deberia estar la descripcion de la tarea del mock en el historial', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText(/test test test test/)).toBeInTheDocument();
  });
  it('Deberia estar la fecha de la tarea del mock en el historial', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText(/8 de agosto de 2025/)).toBeInTheDocument();
  });
  it('Deberia estar la fecha limite de la tarea del mock en el historial', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText(/3 de diciembre de 2025/i)).toBeInTheDocument();
  });
  it('Deberia estar la importancia de la tarea del mock en el historial', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText(/Alta/i)).toBeInTheDocument();
  });
});

describe('Test para mostrar los textos de cabezera de la columna', () => {
  it('Deberia mostrar el texto de "Accion" en el historial', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText(/Acción/)).toBeInTheDocument();
  });
  it('Deberia mostrar el texto de "Descripcion de la tarea" en el historial', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText(/Descripcion de la tarea/)).toBeInTheDocument();
  });
  it('Deberia mostrar el texto de "Fecha" en el historial', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText('Fecha')).toBeInTheDocument();
  });
  it('Deberia mostrar el texto de "Fecha limite" en el historial', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText('Fecha limite')).toBeInTheDocument();
  });
  it('Deberia mostrar el texto de "Importancia" en el historial', async () => {
    render(<MakeHistorial historial={[historialMock]} />);
    expect(screen.getByText(/Importancia/)).toBeInTheDocument();
  });
});
