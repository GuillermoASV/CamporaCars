'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DatePickerDemo } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { GetCurrentDateLongWithoutTime } from '@/utils/fecha-actual';

const DialogoGenerar = ({ alConfirmar }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [titulo, setTitulo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [limiteFecha, setLimiteFecha] = useState('');
  const [importancia, setImportancia] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setFechaInicio(GetCurrentDateLongWithoutTime());
    const intervalID = setInterval(() => {
      setFechaInicio(GetCurrentDateLongWithoutTime());
    }, 60 * 1000);
    return () => clearInterval(intervalID);
  }, []);

  const generar = () => {
    if (!nombre || !apellido || !limiteFecha || !descripcion || !importancia || !titulo) {
      setError(true);
      toast.error('Campos no rellenados', {
        description:
          'Revisa cada uno de los campos y rellenalo/s. Comprueba que la fecha sea mayor a la de hoy',
        duration: 5000,
        icon: '❌',
      });
      return;
    }
    setNombre('');
    setDescripcion('');
    setLimiteFecha('');
    setApellido('');
    setImportancia('');
    setTitulo('');
    const generarTarea = {
      fechaInicio: fechaInicio,
      nombre: nombre,
      apellido: apellido,
      fecha: fechaInicio,
      limiteFecha: limiteFecha,
      importancia: importancia,
      titulo: titulo,
      descripcion: descripcion,
    };
    alConfirmar(generarTarea);
  };
  const limpiarError = () => {
    if (error) {
      setError(false);
    }
  };

  const fechaDada = (diaSeleccionado) => {
    limpiarError();
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    const fechaSelecconada = new Date(diaSeleccionado);

    if (isNaN(fechaSelecconada.getTime())) {
      setError(true);
      toast.error('Necesitas poner la fecha', { icon: '⚠️', duration: 5000 });
      return;
    }

    if (new Date(diaSeleccionado).getTime() < fechaActual.getTime()) {
      setLimiteFecha('');
      setError(true);
      toast.warning('Porfavor, coloca un fecha mayor a la de hoy.');
      return;
    } else {
      setLimiteFecha(diaSeleccionado);
      limpiarError();
    }
  };

  return (
    <div>
      <div className="mb-5 flex justify-between">
        <div className="flex-1">
          <dt className="ml-2 font-bold text-black opacity-80">Nombre:</dt>
        </div>
        <div className="flex-1">
          <dd className="ml-4 font-bold text-black opacity-80">Apellido:</dd>
        </div>
      </div>
      <div className="mb-3 flex gap-2">
        <Input
          placeholder={'Nombre'}
          onChange={(e) => setNombre(e.target.value) || limpiarError()}
          className={
            'hover:bg-accent mr-2 hover:opacity-90 hover:transition-all hover:duration-175'
          }
        />
        <Input
          placeholder={'Apellido'}
          onChange={(e) => setApellido(e.target.value) || limpiarError()}
          className={
            'hover:bg-accent ml-2 hover:opacity-90 hover:transition-all hover:duration-175'
          }
        />
      </div>
      <div className="mt-5 mb-5 flex justify-between">
        <div className="flex-1">
          <dt className="ml-2 font-bold text-black opacity-80">Fecha de Inicio:</dt>
        </div>
        <div className="flex-1">
          <dd className="ml-4 font-bold text-black opacity-80">Fecha de Finalizacion:</dd>
        </div>
      </div>
      <div className="mb-3 flex gap-2">
        <Input value={fechaInicio} disabled className={'mr-2 w-[220px] truncate text-2xl'} />
        <DatePickerDemo callback={fechaDada}></DatePickerDemo>
      </div>
      <div className="mt-5 mb-5 flex justify-between">
        <div className="flex-1">
          <dt className="ml-2 font-bold text-black opacity-80">Título:</dt>
        </div>
        <div className="flex-1">
          <dd className="ml-4 font-bold text-black opacity-80">Importancia:</dd>
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder={'Titulo'}
          onChange={(e) => setTitulo(e.target.value) || limpiarError()}
          className={
            'hover:bg-accent mr-2 w-[220px] hover:opacity-90 hover:transition-all hover:duration-175'
          }
        />
        <Select onValueChange={(value) => setImportancia(value)}>
          <SelectTrigger className="hover:bg-accent ml-2 w-[220px] cursor-pointer hover:opacity-90 hover:transition-all hover:duration-175">
            <SelectValue placeholder={'Selecciona'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Baja">
                Baja
                <span className="absolute right-15 flex justify-center [&_svg]:fill-yellow-500">
                  <Star className={'text-yellow-500'} />
                </span>
              </SelectItem>
              <SelectItem value="Media">
                Media{' '}
                <span className="absolute right-15 flex justify-center gap-2 [&_svg]:fill-yellow-500">
                  <Star className={'text-yellow-500'} />
                  <Star className={'text-yellow-500'} />
                </span>
              </SelectItem>
              <SelectItem value="Alta">
                Alta{' '}
                <span className="ml absolute right-15 flex justify-center gap-2 [&_svg]:fill-yellow-500">
                  <Star className={'text-yellow-500'} />
                  <Star className={'text-yellow-500'} />
                  <Star className={'text-yellow-500'} />
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <span className="mt-3 mb-3 ml-2 block font-bold text-black opacity-80">Descripcion:</span>

        <textarea
          rows="5"
          cols="33"
          placeholder="Porfavor colocar una descripcion del trabajo que se va a realizar"
          className="hover:bg-accent mt-4 w-full resize-none rounded-md border-black p-2 text-sm shadow-sm outline-2 outline-gray-200 hover:opacity-90 hover:transition-all hover:duration-175"
          onChange={(e) => setDescripcion(e.target.value) || limpiarError()}
        ></textarea>
      </div>
      <Button className={'mx-auto mt-4 block w-full hover:text-gray-300'} onClick={generar}>
        Confirmar
      </Button>
    </div>
  );
};
export default DialogoGenerar;
