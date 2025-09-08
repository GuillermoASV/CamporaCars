'use client';
import { useKeyCombination } from '@/app/hooks/useHotKey.jsx';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { GetCurrentDateWithoutTime } from '@/utils/fecha-actual.js';
import { Roboto_Condensed } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const roboto = Roboto_Condensed({
  style: ['normal'],
  weight: ['900'],
  subsets: ['latin'],
});

const TOKENVIDA = 30;
export default function Page() {
  const route = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState('');

  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const limpiarError = () => {
    if (error) {
      setError(false);
    }
  };

  useKeyCombination('u', async () => {
    if (showModal) {
      setShowModal(false);
      return;
    }
    await generarToken();
    setShowModal(true);
  });

  const generarToken = async () => {
    try {
      const response = await fetch('/api/generarToken');
      if (!response.ok) {
        throw new Error('Error al generar el token');
      }
      const data = await response.json();
      setToken(data.token);
    } catch (error) {
      console.error('Error al generar el token:', error.message);
    }
  };

  const verificarToken = async () => {
    const response = await fetch('/api/verificarToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: pass }),
    });
    const data = await response.json();
    if (data.success) {
      limpiarError();
      toast.success('Token verificado correctamente', {
        description: `El inicio de seccion fue exitoso, ${GetCurrentDateWithoutTime()}`,
        duration: 3000,
        icon: '✅',
      });
      setTimeout(() => {
        route.push('/menu');
      }, 500);
    } else {
      console.log('Error al verificar el token');
      toast.error('El token ingresado es incorrecto o ha expirado.', {
        description: `Intenta verificar si tu token esta bien escrito o si no ha expirado`,
        icon: '❌',
        duration: 5000,
      });
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-bl from-gray-100 to-red-50">
      <div className="w-full max-w-lg space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div className="space-y-4">
          <h1 className={`${roboto.className} text-center text-3xl font-bold text-gray-900`}>
            INICIO DE SECCION
          </h1>
          <div className="relative m-2 max-w-xl space-y-4">
            <label className="mb-2 block text-sm font-medium opacity-85" htmlFor="pass">
              Ingresa tu token
            </label>
            <Input
              id="pass"
              type={'password'}
              aria-label="Agregar contraseña"
              className={`mt-1 block w-full hover:bg-blue-50 ${error ? 'border-red-500 bg-red-100 hover:bg-red-50 focus-visible:ring-[2px] focus-visible:ring-red-500' : ''} `}
              placeholder="Ingresa aqui tu token."
              onChange={(e) => setPass(e.target.value) || limpiarError()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  verificarToken();
                }
              }}
            ></Input>

            <Button
              className={'mx-auto mt-4 w-full p-1 hover:text-gray-300'}
              aria-label="Confirmar pass"
              onClick={verificarToken}
              disabled={!pass}
            >
              Confirmar token{' '}
            </Button>
          </div>
        </div>
      </div>
      {/* <p className="mt-2 font-bold text-yellow-400">{token}</p> */}
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={`${roboto.className} mt-1 mb-2 text-center`}>
                Generacion de token
              </DialogTitle>
              <DialogDescription>
                Este es tu <code>nuevo</code> token secreto que tienes que <code>copiar</code> para
                iniciar seccion.
                <span className="mt-4 block font-bold text-black">
                  Este token tiene una vida de {TOKENVIDA} minutos
                </span>
              </DialogDescription>
            </DialogHeader>
            <label htmlFor="token"></label>
            <Input id="token" readOnly defaultValue={token} />
            <Button
              className={'mx-auto block w-32 hover:text-gray-300'}
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
