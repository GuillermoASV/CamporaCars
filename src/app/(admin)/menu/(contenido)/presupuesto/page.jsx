import { Clock } from 'lucide-react';
import Presupuesto from './components/presupuestos';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="absolute inset-0 z-20 flex min-h-screen items-center justify-center gap-4 bg-gray-400/40">
          <p className="font-bold tracking-wide">Cargando...</p>
          <Clock className="animate-spin"></Clock>
        </div>
      }
    >
      <Presupuesto />
    </Suspense>
  );
}
