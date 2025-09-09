'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { number } from 'motion';

const DialogoPresupuesto = ({ alConfirmar, tarea }) => {
  const [presupuesto, setPresupuesto] = useState(tarea.presupuesto);

  const componetePresupuesto = () => {
    if (!presupuesto || isNaN(presupuesto) || presupuesto < 1) {
      toast.error('Hubo un error al procesar los datos', {
        description:
          'Por favor, completa los campos de cantidad, material y gastos o verifica si son correctos los campos.',
        duration: 5000,
        icon: '❌',
      });
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
        <div className="mb-3 flex justify-between">
          <div className="flex text-sm font-medium">
            <DollarSign size={20} className="mr-1 text-green-600" />
            <dd className="text-gray-900">Presupuesto</dd>
          </div>
        </div>
        <div className="mb-3 flex gap-3">
          <Input
            value={presupuesto}
            min={0}
            step={0}
            type={number}
            onChange={(e) => setPresupuesto(e.target.value)}
            className={'hover:bg-accent hover:opacity-90 hover:transition-all hover:duration-175'}
          />
        </div>
        <Button
          className={'mx-auto mt-5 block w-full hover:text-gray-300'}
          onClick={componetePresupuesto}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};
export default DialogoPresupuesto;
