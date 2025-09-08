'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Hash, PackageSearch, DollarSign, Box } from 'lucide-react';

const DialogoListaEditar = ({ tarea, alConfirmar }) => {
  const [material, setMaterial] = useState(tarea.materialYCosto[0]);
  const [costo, setCosto] = useState(tarea.materialYCosto[1]);
  const [inventario, setInventario] = useState(tarea.materialYCosto[2]);
  const [error, setError] = useState(false);
  if (!tarea) return;

  const editarLista = () => {
    if (
      !material ||
      !costo ||
      !inventario ||
      isNaN(costo) ||
      isNaN(inventario) ||
      costo < 0 ||
      inventario < 0
    ) {
      toast.error('Campos no rellenados', {
        description:
          'Revisa cada uno de los campos y rellenalo/s. Comprueba que la fecha sea mayor a la de hoy',
        duration: 5000,
        icon: '❌',
      });
    } else {
      const editarALista = {
        id: tarea._id,
        costo,
        material,
        inventario,
      };
      alConfirmar(editarALista);
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
        <div className="mb-3 flex gap-2">
          <Input
            value={material}
            onChange={(e) => setMaterial(e.target.value) || limpiarError()}
            className={'hover:bg-accent hover:opacity-90 hover:transition-all hover:duration-175'}
          />
          <Input
            value={costo}
            min="0"
            step="1"
            type="number"
            onChange={(e) => setCosto(e.target.value) || limpiarError()}
            className={'hover:bg-accent hover:opacity-90 hover:transition-all hover:duration-175'}
          />
          <Input
            value={inventario}
            min="0"
            step="1"
            type="number"
            onChange={(e) => setInventario(e.target.value) || limpiarError()}
            className={'hover:bg-accent hover:opacity-90 hover:transition-all hover:duration-175'}
          />
        </div>

        <Button className={'mx-auto mt-4 block w-full hover:text-gray-300'} onClick={editarLista}>
          Confirmar
        </Button>
      </div>
    </div>
  );
};
export default DialogoListaEditar;
