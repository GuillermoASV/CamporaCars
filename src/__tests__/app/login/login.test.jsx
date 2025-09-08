import Page from '@/app/(login)/login/page';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
jest.mock('next/navigation');

describe('Test para el page de Login', () => {
  (it('Deberia mostrar el texto de Inicio de seccion', () => {
    render(<Page />);
    expect(screen.getByText(/Inicio de seccion/i)).toBeInTheDocument();
  }),
    it('Deberia mostrar el label de el input para ingresar el token', () => {
      render(<Page />);
      expect(screen.getByLabelText(/Ingresa tu token/i)).toBeInTheDocument();
    }),
    it('Deberia ingresar un texto en el campo de ingresar la contraseña', async () => {
      render(<Page />);
      const passwordInput = screen.getByLabelText(/Agregar contraseña/i);
      await user.type(passwordInput, 'test123');
      expect(passwordInput).toHaveValue('test123');
    }),
    it('Deberia mostrar el placeholder el input para ingresar el token', () => {
      render(<Page />);
      expect(screen.getByPlaceholderText(/Ingresa aqui tu token/i)).toBeInTheDocument();
    }));
});
