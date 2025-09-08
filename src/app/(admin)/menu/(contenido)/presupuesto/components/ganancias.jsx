import { Button } from '@/components/ui/button';
import { ValueLineBarChart } from '@/components/ui/value-line-bar-chart';
import { Badge } from '@/components/ui/badge';

const DialogoGanancias = ({ tarea, alConfirmar }) => {
  if (!tarea) return;

  return (
    <div>
      <div className="w-full">
        {/* Dar en vez de martillo bla bla los datos de eso y multiplicar el valor */}
        <ValueLineBarChart datosProducto={tarea}></ValueLineBarChart>
      </div>
      <Badge variant="secondary" className={'mt-6 w-[200px] gap-2 bg-gray-200 text-black'}>
        <span>INFO EXTRA NO UTIL TODAVIA </span>
      </Badge>

      <Button onClick={alConfirmar} className={'mx-auto mt-4 block w-full hover:text-gray-300'}>
        Confirmar
      </Button>
    </div>
  );
};
export default DialogoGanancias;
