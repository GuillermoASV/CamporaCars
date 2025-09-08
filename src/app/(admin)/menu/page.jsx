'use client';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { List, History, Coins, UserCog } from 'lucide-react';

const navigationItems = [
  {
    historial: 'menu/historial',
    presupuesto: 'menu/presupuesto',
    settings: 'menu/setting',
    todoapp: 'menu/todoapp',
  },
  {
    historialName: 'Historial',
    presupuestoName: 'Presupuesto',
    settingsName: 'Configuración',
    todoappName: 'Tareas',
  },
];
const TEXTOCARGA = 'Cargando...';

export default function Page() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-bl from-gray-100 to-red-50">
      <div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Menu de inicio</h1>
          <p className="mt-2 mb-6 text-slate-700">
            Selecciona una opción para diriguirte a una ruta
          </p>
        </div>
        {loading && (
          <div className="absolute inset-0 z-20 flex min-h-screen items-center justify-center gap-4 bg-gray-400/40">
            <p className="font-bold tracking-wide">{TEXTOCARGA}</p>
            <Clock className="animate-spin"></Clock>
          </div>
        )}

        <div className="grid h-[600px] w-[850px] grid-cols-3 grid-rows-3 gap-4">
          <div className="group col-span-2 col-start-2 row-span-1 row-start-1 flex flex-col items-center justify-center rounded-sm bg-red-300 shadow-sm duration-200 ease-out hover:scale-105 hover:bg-red-400 hover:shadow-md">
            <History
              size={40}
              className="rounded-full bg-red-200 p-2 duration-300 group-hover:bg-red-300 hover:text-white"
            />
            <Link href={navigationItems[0].historial}>
              <Button
                variant="link"
                aria-label="Ingresar a historial"
                className={
                  "relative cursor-pointer px-10 text-lg duration-300 after:absolute after:inset-[-40px] after:content-[''] hover:font-bold hover:text-white"
                }
                onClick={() => setLoading(true)}
              >
                {' '}
                {navigationItems[1].historialName}
              </Button>
            </Link>
          </div>
          <div className="group col-span-1 col-start-1 row-span-1 row-start-1 flex flex-col items-center justify-center rounded-sm bg-blue-300 shadow-sm duration-200 ease-out hover:scale-105 hover:bg-blue-400 hover:shadow-md">
            <Coins
              size={40}
              className="rounded-full bg-blue-200 p-2 duration-300 group-hover:bg-blue-300 hover:text-white"
            />
            <Link href={navigationItems[0].presupuesto}>
              <Button
                variant="link"
                aria-label="Ingresar a presupuesto"
                className={
                  "relative cursor-pointer px-10 text-lg duration-300 after:absolute after:inset-[-20px] after:content-[''] hover:font-bold hover:text-white"
                }
                onClick={() => setLoading(true)}
              >
                {' '}
                {navigationItems[1].presupuestoName}
              </Button>
            </Link>
          </div>
          <div className="group col-span-2 col-start-2 row-span-2 row-start-2 flex flex-col items-center justify-center rounded-sm bg-green-300 shadow-sm duration-200 ease-out hover:scale-105 hover:bg-green-400 hover:shadow-md">
            <UserCog
              size={40}
              className="rounded-full bg-green-200 p-2 duration-300 group-hover:bg-green-300"
            />
            <Link href={navigationItems[0].settings}>
              <Button
                variant="link"
                aria-label="Ingresar a settings"
                className={
                  "relative cursor-pointer px-15 text-lg duration-300 after:absolute after:inset-[-60px] after:content-[''] hover:font-bold hover:text-white"
                }
                onClick={() => setLoading(true)}
              >
                {' '}
                {navigationItems[1].settingsName}
              </Button>
            </Link>
          </div>
          <div className="group col-span-1 col-start-1 row-span-2 row-start-2 flex flex-col items-center justify-center gap-2 rounded-sm bg-yellow-300 shadow-sm duration-200 ease-out hover:scale-105 hover:bg-yellow-400/90 hover:shadow-md">
            <List
              size={40}
              className="rounded-full bg-yellow-200 p-2 duration-300 group-hover:bg-yellow-300"
            />
            <Link href={navigationItems[0].todoapp}>
              <Button
                variant="link"
                aria-label="Ingresar a todoapp"
                className={
                  "relative cursor-pointer px-10 text-lg duration-300 after:absolute after:inset-[-60px] after:content-[''] hover:font-bold hover:text-white"
                }
                onClick={() => setLoading(true)}
              >
                {' '}
                {navigationItems[1].todoappName}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
