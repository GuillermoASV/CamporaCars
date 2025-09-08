'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { PackageSearch, DollarSign, Box } from 'lucide-react';

const DialogoLista = ({ alConfirmar }) => {
  const [material, setMaterial] = useState('');
  const [costo, setCosto] = useState('');
  const [inventario, setInventario] = useState('');
  const [error, setError] = useState(false);

  const componeteLista = () => {
    if (!material || !costo || !inventario) {
      toast.error('Campos no rellenados', {
        description:
          'Revisa cada uno de los campos y rellenalo/s. Comprueba que la fecha sea mayor a la de hoy',
        duration: 5000,
        icon: '❌',
      });
    } else {
      const agregarALista = {
        costo,
        material,
        inventario,
      };
      alConfirmar(agregarALista);
    }
  };
  const limpiarError = () => {
    if (error) {
      setError(false);
    }
  };

  return (
    <div>
      <div>
        <div className="mt-1 mb-3 flex justify-between">
          <div className="flex text-sm font-medium">
            <Box size={20} className="mr-1 text-orange-500" />
            <dd className="text-gray-700">Material</dd>
          </div>
          <div className="flex text-sm font-medium text-gray-700">
            <DollarSign className="mr-1 text-green-600" size={20} />
            <dd className="mr-5">Precio:</dd>
          </div>
          <div className="flex justify-start text-sm font-medium text-gray-700">
            <PackageSearch className="mr-1 text-blue-500" size={20} />
            <dd className="mr-7">En inventario:</dd>
          </div>
        </div>
        <div className="mb-3 flex gap-3">
          <Input
            placeholder="Agrega el material"
            onChange={(e) => setMaterial(e.target.value) || limpiarError()}
            className={'hover:bg-accent hover:opacity-90 hover:transition-all hover:duration-175'}
          />
          <Input
            placeholder="0.00"
            min="0"
            step="1"
            type="number"
            onChange={(e) => setCosto(e.target.value) || limpiarError()}
            className={'hover:bg-accent hover:opacity-90 hover:transition-all hover:duration-175'}
          />
          <Input
            placeholder="En existencia"
            min="0"
            step="1"
            type="number"
            onChange={(e) => setInventario(e.target.value) || limpiarError()}
            className={'hover:bg-accent hover:opacity-90 hover:transition-all hover:duration-175'}
          />
        </div>

        <Button
          className={'mx-auto mt-4 block w-full hover:text-gray-300'}
          onClick={componeteLista}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};
export default DialogoLista;
