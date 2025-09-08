import Page from '@/app/(admin)/menu/page';
import { render, screen } from '@testing-library/react';

describe('Test para el page de Menu', () => {
  (it('Deberia mostrar el texto de menu de inicio', () => {
    render(<Page />);
    expect(screen.getByText(/Menu de inicio/i)).toBeInTheDocument();
  }),
    it('Deberia mostrar el parrafo de menu de seleccion de rutas', () => {
      render(<Page />);
      expect(
        screen.getByText(/Selecciona una opción para diriguirte a una ruta/i),
      ).toBeInTheDocument();
    }),
    it('Deberia mostrar el grid de presupuesto con su arial-label ', () => {
      render(<Page />);
      expect(screen.getByRole('button', { name: /Ingresar a presupuesto/i })).toBeInTheDocument();
    }),
    it('Deberia mostrar el grid de todo con su arial-label ', () => {
      render(<Page />);
      expect(screen.getByRole('button', { name: /Ingresar a todoapp/i })).toBeInTheDocument();
    }),
    it('Deberia mostrar el grid de historial con su arial-label ', () => {
      render(<Page />);
      expect(screen.getByRole('button', { name: /Ingresar a historial/i })).toBeInTheDocument();
    }),
    it('Deberia mostrar el grid de configuracion con su arial-label', () => {
      render(<Page />);
      expect(screen.getByRole('button', { name: /Ingresar a settings/i })).toBeInTheDocument();
    }));
});
