'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';

const DialogoPresupuesto = ({ alConfirmar, tarea }) => {
  const [presupuesto, setPresupuesto] = useState(tarea.presupuesto);

  const componentePresupuesto = () => {
    if (!presupuesto || isNaN(presupuesto) || presupuesto < 0) {
      console.error('Hubo un error');
    } else {
      const agregarPresupuesto = {
        id: tarea._id,
        presupuesto,
      };
      alConfirmar(agregarPresupuesto);
    }
  };
  return (
    <div>
      <div>
        <div className="mt-1 mb-3 flex justify-between">
          <div className="flex text-sm font-medium">
            <DollarSign size={20} className="mr-1 text-green-600" />
            <dd className="text-gray-900">Presupuesto</dd>
          </div>
        </div>
        <div className="mb-3 flex gap-3">
          <Input
            value={presupuesto}
            min="0"
            step="1"
            placeholder={'0$'}
            type="number"
            onChange={(e) => setPresupuesto(e.target.value)}
            className={'hover:bg-accent hover:opacity-90 hover:transition-all hover:duration-175'}
          />
        </div>
        <Button
          className={'mx-auto mt-4 block w-full hover:text-gray-300'}
          onClick={componentePresupuesto}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};
export default DialogoPresupuesto;
