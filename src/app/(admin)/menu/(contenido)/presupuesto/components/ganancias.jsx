'use client';
import { Button } from '@/components/ui/button';
import { ValueLineBarChart } from '@/components/ui/value-line-bar-chart';

const DialogoGanancias = ({ tarea, alConfirmar }) => {
  if (!tarea) return;

  return (
    <div>
      <div className="w-full">
        <ValueLineBarChart datosProducto={tarea}></ValueLineBarChart>
      </div>
      <Button onClick={alConfirmar} className={'mt-4 hover:text-gray-300'}>
        Confirmar
      </Button>
    </div>
  );
};
export default DialogoGanancias;
