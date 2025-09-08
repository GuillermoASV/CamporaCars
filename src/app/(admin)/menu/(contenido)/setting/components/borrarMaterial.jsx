import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { InteractiveHoverButton } from '@/components/ui/interactive-button';
import { Trash2, PackageSearch, Package, DollarSign, AlertTriangle } from 'lucide-react';

const DialogoEliminar = ({ tarea, alCerrar, alConfirmar }) => {
  if (!tarea) return;

  const eliminar = () => {
    const editarALista = {
      id: tarea._id,
    };
    alConfirmar(editarALista);
  };

  return (
    <Dialog open={true} onOpenChange={alCerrar}>
      <DialogContent className={'max-w-md rounded-xl border-0 bg-white shadow-xl'}>
        <DialogHeader>
          <DialogTitle className={`relative mb-2 text-center`}>
            <Trash2 className="absolute -top-1 left-0 overflow-auto text-red-500" />
            Confirmar borrado de el material
          </DialogTitle>
          <DialogDescription className={'pb-2 text-center'}>
            ¿Estás seguro de que deseas{' '}
            <span className="font-bold text-red-600">eliminar permanentemente</span> este material?
          </DialogDescription>
        </DialogHeader>
        <div
          className={`h-50 max-h-500 min-h-1/4 w-115 min-w-[100] overflow-x-auto rounded-md border bg-gray-100 p-3 break-all`}
        >
          <div className="flex">
            <span className="mt-1.5 mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600/90 px-2 py-1 text-orange-300">
              <Package size={30} />
            </span>
            <span>
              <p className="mt-1.5 text-sm text-gray-800">Material:</p>
              <p className="font-semibold">{tarea.materialYCosto[0]}</p>
            </span>
          </div>
          <div className="mt-1 flex">
            <span className="mt-1.5 mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-700/90 px-2 py-1 text-green-300">
              <DollarSign size={30} />
            </span>
            <span>
              <p className="mt-2 text-sm text-gray-800">Precio:</p>
              <p className="font-semibold">{tarea.materialYCosto[1]}</p>
            </span>
          </div>
          <div className="mt-1 flex">
            <span className="mt-1.5 mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-700/90 px-2 py-1 text-blue-300">
              <PackageSearch size={30} />
            </span>
            <span>
              <p className="mt-2 text-sm text-gray-800">Inventario:</p>
              <p className="font-semibold">{tarea.materialYCosto[2]}</p>
            </span>
          </div>
        </div>
        <div className="mt-1 rounded-md border border-amber-200 bg-amber-50 p-3">
          <div className="flex items-start">
            <AlertTriangle className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-amber-500" />
            <p className="text-xs text-amber-700">
              Esta acción no se puede deshacer. El material será eliminado permanentemente del
              sistema.
            </p>
          </div>
        </div>
        <DialogFooter className={'flex flex-row justify-between'}>
          <DialogClose asChild>
            <Button variant="outline" className={'cursor-pointer'} onClick={alCerrar}>
              Cancelar
            </Button>
          </DialogClose>
          <InteractiveHoverButton
            variant="Eliminar"
            className={'cursor-pointer'}
            onClick={eliminar}
          >
            Confirmar
          </InteractiveHoverButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DialogoEliminar;
