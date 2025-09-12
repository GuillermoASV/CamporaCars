'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Box,
  Boxes,
  ChartNoAxesCombined,
  Check,
  ChevronsUpDown,
  CircleDollarSign,
  ClipboardList,
  Clock,
  Delete,
  Loader,
  Menu,
  NotebookPen,
  Search,
  SearchX,
} from 'lucide-react';

import { useQueryState } from 'nuqs';
import { Suspense } from 'react';
import { toast } from 'sonner';
import DialogoGanancias from './ganancias';
import DialogoGastos from './gastos';
import { fetchHistorialInventario, fetchHistorialPresupuesto } from '@/utils/makeHistorial';
import DialogoPresupuesto from './presupuesto';

export default function Presupuesto() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gastosTarea, setGastosTarea] = useState(false);
  const [gananciasTarea, setGananciasTarea] = useState(false);
  const [presupuestoTarea, setPresupuestoTarea] = useState(false);
  const [tareaSeleccionadaPresupuesto, setTareaSeleccionadaPresupuesto] = useState(null);
  const [tareaSeleccionadaGastos, setTareaSeleccionadaGastos] = useState(null);
  const [tareaSeleccionadaGanancias, setTareaSeleccionadaGanancias] = useState(null);

  const [filterNuqs, setFilterNuqs] = useQueryState('filtro', {
    defaultValue: 'all',
  });

  const [isFilterButton, setIsFilterButton] = useQueryState('btn-filtros', {
    defaultValue: false,
  });

  // Selector del filtro
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const todoCategories = [
    {
      value: 'completados',
      label: 'Completados',
    },
    {
      value: 'archivados',
      label: 'Archivados',
    },
    {
      value: 'Alta',
      label: 'Importancia Alta',
    },
    {
      value: 'Media',
      label: 'Importancia Media',
    },
    {
      value: 'Baja',
      label: 'Importancia Baja',
    },
  ];
  const OpcionesMenu = (todo, AbrirGastos, AbrirGanancias, AbrirPresupuesto) => {
    const mostrarOpcionesCompletas = !todo.completado && !todo.deleted;

    return (
      <div className="mr-3 flex flex-1 justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="cursor-pointer text-gray-500 transition-colors hover:text-gray-800">
            <Menu size={30} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex scale-90 items-center font-bold">
              <ClipboardList size={17} className="mr-2" />
              OPCIONES
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mostrarOpcionesCompletas && (
              <DropdownMenuItem className="cursor-pointer" onClick={() => AbrirGastos(todo)}>
                <NotebookPen className="mr-2 size-4" />
                <span>Gastos</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer" onClick={() => AbrirPresupuesto(todo)}>
              <CircleDollarSign className="mr-2 size-4" />
              <span>Presupuesto</span>
            </DropdownMenuItem>{' '}
            <DropdownMenuItem className="cursor-pointer" onClick={() => AbrirGanancias(todo)}>
              <ChartNoAxesCombined className="mr-2 size-4" />
              <span>Ganancias</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };
  const ABRIRMODALGASTOS = (todo) => {
    setTareaSeleccionadaGastos(todo);
    setGastosTarea(true);
  };

  const CERRARMODALGASTOS = () => {
    setGastosTarea(false);
    setTareaSeleccionadaGastos(null);
  };

  const ABRIRMODALPRESUPUESTO = (todo) => {
    setTareaSeleccionadaPresupuesto(todo);
    setPresupuestoTarea(true);
  };

  const CERRARMODALPRESUPUESTO = () => {
    setPresupuestoTarea(false);
    setTareaSeleccionadaPresupuesto(null);
  };

  const ABRIRMODALGANANCIAS = (todo) => {
    setTareaSeleccionadaGanancias(todo);
    setGananciasTarea(true);
    fetchHistorialPresupuesto(tareaSeleccionadaGanancias, 'grafica-gasto');
  };

  const CERRARMODALGANANCIAS = () => {
    setGananciasTarea(false);
    setTareaSeleccionadaGanancias(null);
  };

  const fetchTodo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/buscarTODO?filtro=${filterNuqs}`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      toast.error('Hubo un fallo al cargar los Todos', {
        description: 'Probablemente este vacio',
        duration: 5000,
        icon: '❌',
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTodo();
  }, [filterNuqs]);

  const CONFIRMARGASTOS = async (informacionActualizada, informacionActualizada2) => {
    const response = await fetch(`/api/gastosTODO`, {
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(informacionActualizada),
    });
    if (informacionActualizada2) {
      const inventarioMateriales = await fetch(`/api/materiales`, {
        headers: { 'content-type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(informacionActualizada2),
      });
      const inventarioTodo = await fetch(`/api/inventarioTodo`, {
        headers: { 'content-type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(informacionActualizada),
      });
      fetchHistorialInventario(tareaSeleccionadaGastos, 'Inventario');
    } else if (!response.ok) {
      toast.error('Error al actualizar los datos de gastos del TODO', {
        description: 'Vuelve a intentarlo',
        duration: 5000,
        icon: '❌',
      });
      return null;
    }
    fetchHistorialPresupuesto(tareaSeleccionadaGastos, 'gasto');
    toast.success('Tarea actualizada con éxito!!', { icon: '✅', duration: 5000 });
    fetchTodo();
    CERRARMODALGASTOS();
  };

  const CONFIRMARPRESUPUESTO = async (informacionActualizada) => {
    const response = await fetch(`/api/presupuestoTODO`, {
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(informacionActualizada),
    });
    if (!response.ok) {
      toast.error('Error al actualizar los datos del monto de la tarea', {
        description: 'Vuelve a intentarlo',
        duration: 5000,
        icon: '❌',
      });
      return;
    }
    fetchHistorialPresupuesto(tareaSeleccionadaPresupuesto, 'monto');
    toast.success('Monto de tarea actualizada con éxito!!', { icon: '✅', duration: 5000 });
    fetchTodo();
    CERRARMODALPRESUPUESTO();
  };

  function descartarFiltro() {
    setFilterNuqs('all');
    setValue('');
  }

  const CONFIRMARGRAFICAGASTO = () => {
    CERRARMODALGANANCIAS();
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-red-50">
      <header className="relative mb-20 flex h-18 w-full items-center justify-center bg-gray-900">
        <h1 className="text-4xl text-white">Presupuesto</h1>
        <div className="absolute right-0 flex">
          {isFilterButton ? (
            <div className="flex items-center">
              <Button
                arial-label="Descartar busqueda con filtros"
                onClick={() => {
                  setIsFilterButton(false);
                  descartarFiltro();
                }}
                className={`relative mr-6 cursor-pointer bg-red-600 text-center text-white duration-100 ease-in after:absolute after:inset-[-5px] after:content-[''] hover:bg-red-500 hover:text-black active:scale-95`}
              >
                {' '}
                <SearchX className="mt-0 mr-1.5 animate-pulse" /> Descartar los Filtros
              </Button>
            </div>
          ) : (
            <div className="flex items-center">
              <Button
                onClick={() => setIsFilterButton(true)}
                arial-label="Buscar con filtros"
                className={`relative mr-6 cursor-pointer bg-gray-600 text-center text-white duration-100 ease-in after:absolute after:inset-[-5px] after:content-[''] hover:bg-gray-500 hover:text-black active:scale-95`}
              >
                <Search className="mt-0.5 mr-1.5" /> <p> Busqueda con Filtros </p>
              </Button>
            </div>
          )}
          {isFilterButton && (
            <div
              className={`mr-6 flex items-center ${isFilterButton ? 'opacity-100' : 'opacity-0'}`}
            >
              <Popover open={open} onOpenChange={setOpen} className="relative">
                {filterNuqs !== 'all' && (
                  <Delete
                    className="absolute right-16 cursor-pointer text-red-500 hover:rounded-sm hover:bg-red-100 hover:text-red-700 active:scale-98 active:ease-out"
                    onClick={descartarFiltro}
                  ></Delete>
                )}
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={'w-[240px] justify-between overflow-hidden'}
                  >
                    {filterNuqs !== 'all'
                      ? todoCategories.find((categories) => categories.value === filterNuqs)?.label
                      : 'Selecciona el filtro'}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar filtros..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>Filtro no disponible</CommandEmpty>
                      <CommandGroup>
                        {todoCategories.map((filtro) => (
                          <CommandItem
                            key={filtro.value}
                            value={filtro.value}
                            onSelect={(currentValue) => {
                              setFilterNuqs(currentValue === value ? 'all' : currentValue);
                              setValue(currentValue === value ? '' : currentValue);
                              setOpen(false);
                            }}
                          >
                            {filtro.label}
                            <Separator className={'absolute right-0 bottom-0 flex-1'} />
                            <Check
                              className={`ml-auto ${value === filtro.value ? 'opacity-100' : 'opacity-0'}`}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </header>
      <div className="min-h-screen">
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader className="animate-spin" />
            <p>Cargando...</p>
          </div>
        ) : todos.length === 0 ? (
          <span
            className="text-bold flex items-center justify-center tracking-tight"
            style={{ whiteSpace: 'pre-line' }}
          >
            {`${
              isFilterButton
                ? 'No se encontraron tareas para agregar presupuesto en la base de datos con los filtros aplicados. \n\n (Tambien puedes revisar si tienes alguna tarea de presupuestos archivada dandole click a "Busqueda con filtros" luego "Seleccionar el filtro" y pulsa el boton de archivados, si no funciona intenta crear una)'
                : 'No se encontraron tareas en la base de datos. \n\n Prueba a crear una en la seccion de Todo y darle al boton de arriba que dice "Crear una tarea". \n\n (Tambien puedes revisar si tienes alguna tarea de presupuestos archivada dandole click a "Busqueda con filtros" luego "Seleccionar el filtro" y pulsa el boton de archivados)'
            }`}{' '}
          </span>
        ) : (
          <section
            aria-labelledby="Lista de presupuestos"
            className="mx-auto max-w-[137.5rem] items-center"
          >
            <div className="-mt-4 mb-4 ml-4 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {todos.map((todo) => (
                <article key={todo._id}>
                  <Suspense>
                    <div className="flex h-65 min-h-30 w-[27.5rem] max-w-[31.25rem] min-w-[17.5rem] flex-col justify-between rounded-xl border bg-gray-100 shadow-md shadow-indigo-500/50 duration-200 ease-out hover:scale-105 hover:bg-gray-300/90 hover:shadow-xl sm:w-[20rem] md:h-[15rem] md:w-[21.25rem] lg:w-[25rem]">
                      <div className="adsolute mt-2 flex justify-between">
                        <header className="ml-4 flex">
                          <p
                            className={`foun max-w-[20rem] truncate border-b-2 font-bold ${todo.importancia === 'Alta' ? 'border-red-600' : todo.importancia === 'Media' ? 'border-yellow-500' : 'border-green-600'}`}
                          >
                            {todo.titulo}
                          </p>
                        </header>
                        {/* Emilio, revisa si te gusta y ver si se lo adaptamos a el archivado en este caso pasa evitar que le agregen cosas a las cosas que estan archivadas por seguridad del cliente. */}
                        {todo.completado
                          ? OpcionesMenu(todo, 0, ABRIRMODALGANANCIAS)
                          : todo.deleted
                            ? OpcionesMenu(todo, 0, ABRIRMODALGANANCIAS)
                            : OpcionesMenu(
                                todo,
                                ABRIRMODALGASTOS,
                                ABRIRMODALGANANCIAS,
                                ABRIRMODALPRESUPUESTO,
                              )}
                      </div>
                      <div className="mx-3 flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-3">
                        <div className="flex justify-between gap-4 border-b border-gray-200 pb-2">
                          <div className="flex text-xs font-semibold text-gray-800">
                            <Boxes className="text-blue-500" />
                            <span className="mt-1 ml-1 flex">Cantidad</span>
                          </div>
                          <div className="flex text-xs font-semibold text-gray-800">
                            <Box className="text-orange-500" />
                            <span className="mt-1 ml-1 flex">Materiales</span>
                          </div>
                        </div>

                        <div className="mt-2 flex-1 overflow-y-auto">
                          {todo.materiales.length > 0 ? (
                            <div>
                              {todo.materiales.map((material, index) => (
                                <div
                                  key={`mat-${index}`}
                                  className="gap-4 rounded border-b px-1 py-1.5 hover:bg-gray-100"
                                >
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <div className="flex w-full justify-between">
                                        <span className="justify-self-start text-sm font-medium text-blue-400">
                                          {todo.cantidades?.[index]}x
                                        </span>
                                        <p className="mr-2 truncate text-sm text-gray-700">
                                          {material}
                                        </p>
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                      Costo por unidad: {todo.gastos?.[index]}
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <p className="text-xs text-gray-600">No hay materiales registrados</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <footer className="m-2 flex min-h-[20px] min-w-[322px] justify-between">
                        <span className="flex rounded-xl bg-gray-100 px-2">
                          <Clock size={17} className="mt-0.5 mr-1" />
                          <p className="text-sm">{todo.fecha}</p>
                        </span>
                        <span
                          className={`rounded-xl ${todo.deleted ? 'bg-red-500' : todo.completado === true ? 'bg-yellow-500' : 'bg-green-500'} cursor-default px-2 text-sm`}
                        >
                          <span className="flex">
                            <div
                              className={`mt-1.5 size-2 rounded-full ${todo.deleted ? 'bg-transparent' : todo.completado === true ? 'bg-yellow-300' : 'bg-green-300'}`}
                            ></div>
                            {todo.deleted ? (
                              'ARCHIADO'
                            ) : todo.completado ? (
                              <p className="ml-1">Completado</p>
                            ) : (
                              <p className="ml-1">En curso</p>
                            )}
                          </span>
                        </span>
                      </footer>
                    </div>
                  </Suspense>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
      {gastosTarea && (
        <Dialog open={true} onOpenChange={CERRARMODALGASTOS}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={`mt-1 mb-2 ml-1 text-left`}>Gastos de la tarea</DialogTitle>
              <DialogDescription className={'ml-2 pb-2 text-left'}>
                Registra el inventario de materiales utilizados y sus costos asociados
              </DialogDescription>
            </DialogHeader>
            <DialogoGastos
              tarea={tareaSeleccionadaGastos}
              alCerrar={CERRARMODALGASTOS}
              alConfirmar={CONFIRMARGASTOS}
            />
          </DialogContent>
        </Dialog>
      )}
      {gananciasTarea && (
        <Dialog open={true} onOpenChange={CERRARMODALGANANCIAS}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={`mt-1 mb-2 ml-1 text-left`}>Estimacion de gastos</DialogTitle>
              <DialogDescription className={'ml-2 pb-2 text-left'}>
                Aqui ver las estimaciones de gastos de la tarea luego de agregar el monto recibido
                como pago y tambien todos los materiales que se usaron.
              </DialogDescription>
            </DialogHeader>
            <DialogoGanancias
              tarea={tareaSeleccionadaGanancias}
              alConfirmar={CONFIRMARGRAFICAGASTO}
            />
          </DialogContent>
        </Dialog>
      )}
      {presupuestoTarea && (
        <Dialog open={true} onOpenChange={CERRARMODALPRESUPUESTO}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={`mt-1 mb-2 ml-1 text-left`}>Presupuesto</DialogTitle>
              <DialogDescription className={'ml-2 pb-2 text-left'}>
                Aqui ingresaras el monto pagado por la tarea para saber cual fue tu ganancia
                descontando todos los materiales usados.
              </DialogDescription>
            </DialogHeader>
            <DialogoPresupuesto
              tarea={tareaSeleccionadaPresupuesto}
              alConfirmar={CONFIRMARPRESUPUESTO}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
