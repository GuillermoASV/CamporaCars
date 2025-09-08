import Page from '@/app/(admin)/menu/(contenido)/setting/page';
import { render, screen } from '@testing-library/react';

describe('Test para el page de settings', () => {
  it(
    'Deberia mostrar el texto de arriba de header que dice "Configuracion"',
    () => {
      render(<Page />);
      expect(screen.getByText(/Configuracion/i)).toBeInTheDocument();
    },
    it('Deberia mostrar un parrafo que dice "Lista de materiales"', () => {
      render(<Page />);
      expect(screen.getByText(/Lista de materiales/i)).toBeInTheDocument();
    }),
  );
});
