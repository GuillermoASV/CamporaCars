'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

//1
import { Hash, Package, DollarSign, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

//2

const DialogoGastos = ({ tarea, alConfirmar }) => {
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [materiales, setMateriales] = useState('');
  const [gastos, setGastos] = useState('');
  const [cantidades, setCantidades] = useState('');
  const [error, setError] = useState(false);
  const [lista, setLista] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  if (!tarea) return null;

  const componeteGastos = () => {
    if (
      !materiales ||
      !gastos ||
      !cantidades ||
      isNaN(cantidades) ||
      isNaN(gastos) ||
      cantidades < 0 ||
      gastos < 0
    ) {
      toast.error('Hubo un error al procesar los datos', {
        description:
          'Por favor, completa los campos de cantidad, material y gastos o verifica si son correctos los campos.',
        duration: 5000,
        icon: '❌',
      });
    } else {
      const tareaActualizada = {
        id: tarea._id,
        gastos,
        materiales,
        cantidades,
      };
      alConfirmar(tareaActualizada);
    }
  };
  const fetchLista = async () => {
    try {
      const response = await fetch(`/api/materiales`);
      const data = await response.json();
      const list = data.map((material) => ({
        value: material.materialYCosto[0],
        label: material.materialYCosto[0],
        costo: material.materialYCosto[1],
      }));
      setLista(list);
    } catch (error) {
      toast.error('Hubo un fallo al cargar los Todos', {
        description: 'Probablemente este vacio',
        duration: 5000,
        icon: '❌',
      });
    }
  };
  useEffect(() => {
    fetchLista();
  }, []);

  const displayValue =
    materiales || lista.find((item) => item.value === value)?.label || 'Selecciona o escribe';

  const limpiarError = () => {
    if (error) {
      setError(false);
    }
  };

  return (
    <div>
      <span className="text-sm text-gray-600">
        <p className="rounded-sm bg-gray-200 px-1 py-1 pl-2 font-mono">Tarea: {titulo}</p>
      </span>
      <div className="mt-6 mb-3 flex justify-between">
        <div className="flex text-sm font-medium">
          <Hash size={20} className="mr-1" />
          <dd className="text-gray-700">Cantidad</dd>
        </div>
        <div className="flex text-sm font-medium text-gray-700">
          <Package className="mr-1 text-blue-500" size={20} />
          <dd className="mr-5">Material</dd>
        </div>
        <div className="flex text-sm font-medium text-gray-700">
          <DollarSign className="mr-0.5 text-green-600" size={20} />
          <dd className="f mr-3">Costo por unidad</dd>
        </div>
      </div>
      <div className="mb-3 flex gap-3">
        <Input
          placeholder="0"
          min="0"
          step="1"
          type="number"
          onChange={(e) => setCantidades(e.target.value) || limpiarError()}
          className={'hover:bg-accent hover:opacity-90 hover:transition-all hover:duration-175'}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[170px] justify-between"
            >
              <span className="truncate">{displayValue}</span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <div className="border-t p-2">
                <Input
                  className={'border-gray-700/50'}
                  placeholder="Escribe un material"
                  onChange={(e) => {
                    setMateriales(e.target.value);
                    setValue('');
                    setGastos('');
                  }}
                />
              </div>
              <CommandInput placeholder="Buscar en la lista..." />
              <CommandList>
                <CommandEmpty>
                  <p className="mx-1">Sin resultados.</p>
                  <p className="mx-1 mt-1">Prueba en agregar uno en configuracion.</p>
                </CommandEmpty>
                <CommandGroup className={'h-35 overflow-y-auto'}>
                  {lista.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setMateriales(currentValue === value ? '' : currentValue);
                        setGastos(item.costo);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          placeholder="0.00"
          min="0"
          step="1"
          type="number"
          value={gastos}
          onChange={(e) => setGastos(e.target.value) || limpiarError()}
          disabled={!materiales}
          className={'hover:bg-accent hover:opacity-90 hover:transition-all hover:duration-175'}
        />
      </div>

      <Button className={'mx-auto mt-4 block w-full hover:text-gray-300'} onClick={componeteGastos}>
        Confirmar
      </Button>
    </div>
  );
};
export default DialogoGastos;
