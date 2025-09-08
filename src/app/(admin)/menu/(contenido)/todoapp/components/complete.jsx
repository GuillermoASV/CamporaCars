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
import { BadgeCheck } from 'lucide-react';
import { TimerOff, UserRoundPen, NotebookText, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import mdComponents, { mdRemarkPlugins } from './markdownComponents';

function Mayuscula(todo) {
  const upper = `${todo[0].toUpperCase()}${todo.slice(1)}`;
  return upper;
}

const DialogoCompletar = ({ tarea, alCerrar, alConfirmar }) => {
  if (!tarea) return;

  const completar = () => {
    alConfirmar();
  };

  const fechalimite = new Date(tarea.limiteFecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Dialog open={true} onOpenChange={alCerrar}>
      <DialogContent
        className={`${tarea.descripcion.length > 500 ? 'h-45' : 'h-160'}max-h-3/4 min-h-1/4`}
      >
        <DialogHeader>
          <DialogTitle className={`relative mb-2 text-center`}>
            {' '}
            <BadgeCheck className="absolute -top-1 left-0 hover:fill-green-400" /> Confirmar
            completacion de tarea
          </DialogTitle>
          <DialogDescription className={'pb-2 text-center'}>
            ¿Estas seguro que quieres marcar como <span className="text-green-600">completada</span>{' '}
            la tarea?
          </DialogDescription>
        </DialogHeader>
        <div
          className={`${tarea.descripcion.length > 270 ? 'h-110' : 'h-70'} max-h-500 min-h-1/4 w-115 min-w-[100] overflow-x-auto rounded-md border bg-gray-100 p-3 break-all`}
        >
          <div className="flex">
            <span className="mt-1.5 mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 px-2 py-1 text-yellow-300">
              <Tag size={30} />
            </span>

            <span>
              <p className="mt-1.5 text-sm text-gray-800">Titulo:</p>
              <p className="font-semibold">{tarea.titulo}</p>
            </span>
          </div>
          <div className="mt-1 flex">
            <span className="mt-1.5 mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 px-2 py-1 text-blue-300">
              <UserRoundPen size={30} />
            </span>

            <span>
              <p className="mt-2 text-sm text-gray-800">Nombre y apellido:</p>
              <p className="font-semibold">
                {tarea.nombre} {tarea.apellido}
              </p>
            </span>
          </div>
          <div className="mt-1 flex">
            <TimerOff
              size={30}
              className="mt-1.5 mr-2 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 px-1 py-1 text-red-300"
            />
            <span>
              <p className="mt-2 text-sm text-gray-800">Fecha Límite:</p>
              <p className="font-semibold">{fechalimite}</p>
            </span>
          </div>
          <div className="mt-1 flex">
            <span className="mt-1.5 mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-600 px-2 py-1 text-gray-300">
              <NotebookText size={30} />
            </span>
            <span>
              <p className="mt-2 text-sm text-gray-800">Descripción de la tarea:</p>

              <span className="flex font-semibold">
                <ReactMarkdown remarkPlugins={mdRemarkPlugins} components={mdComponents}>
                  {Mayuscula(tarea.descripcion)}
                </ReactMarkdown>
              </span>
            </span>
          </div>
        </div>
        <DialogFooter className={'flex flex-row justify-between'}>
          <DialogClose asChild>
            <Button variant="outline" className={'cursor-pointer'} onClick={alCerrar}>
              Cancelar
            </Button>
          </DialogClose>

          <InteractiveHoverButton className={'cursor-pointer'} onClick={completar}>
            Confirmar
          </InteractiveHoverButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DialogoCompletar;
