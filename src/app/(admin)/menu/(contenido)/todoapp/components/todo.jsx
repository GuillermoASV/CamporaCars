'use client';

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
import { Check, ChevronsUpDown, Delete, Plus, Search, SearchX } from 'lucide-react';
import { Roboto_Condensed } from 'next/font/google';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import DialogoArchivar from './archivar';
import DialogoCompletar from './complete';
import DialogoEditar from './edit';
import DialogoGenerar from './generar';
import Todos from './todos';
import { fetchHistorial } from '../../../../../../utils/makeHistorial';
const roboto = Roboto_Condensed({
  style: ['normal'],
  weight: ['900'],
  subsets: ['latin'],
});

export default function Todo() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbrir, setModalCerrar] = useState(false);
  const [modalCompletarAbrir, setModalCompletarCerrar] = useState(false);
  const [editarTarea, setEditarTarea] = useState(false);
  //Combobox states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [tareaSeleccionadaCompletada, setTareaSeleccionadaCompletada] = useState(null);

  //Nuqs
  const [filterNuqs, setFilterNuqs] = useQueryState('filtro', {
    defaultValue: 'all',
  });

  const [isFilterButton, setIsFilterButton] = useQueryState('btn-filtros', {
    defaultValue: false,
  });
  const [tareaSeleccionadaEditada, setTareaSeleccionadaEditada] = useState(null);

  const fetchTodo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/generarTODO?filtro=${filterNuqs}`);
      const data = await response.json();
      setLoading(false);
      setTodos(data); //dolor de huevos
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

  const ABRIRMODALARCHIVAR = (todo) => {
    setTareaSeleccionada(todo);
    setModalCerrar(true);
  };

  const CERRARMODALARCHIVAR = () => {
    setModalCerrar(false);
    setTareaSeleccionada(null);
  };

  const ABRIRMODALEDITAR = (todo) => {
    setTareaSeleccionadaEditada(todo);
    setEditarTarea(true);
  };

  const CERRARMODALEDITAR = () => {
    setEditarTarea(false);
    setTareaSeleccionadaEditada(null);
  };

  const ABRIRMODALCOMPLETARCERRAR = (todo) => {
    setTareaSeleccionadaCompletada(todo);
    setModalCompletarCerrar(true);
  };

  const CERRARMODALCOMPLETARBORRAR = () => {
    setModalCompletarCerrar(false);
    setTareaSeleccionadaCompletada(null);
  };

  const generarTodo = async (datos) => {
    try {
      const res = await fetch('/api/generarTODO', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      if (res.ok) {
        fetchHistorial(datos, 'crear');
        toast.success('Todo salio bien gracias a jesus!', {
          description: 'TODO guardado',
          duration: 3000,
          icon: '✅',
        });
        fetchTodo();
      }

      setShowModal(false);
    } catch (error) {
      toast.error('Error del lado del servidor', {
        description: 'Intenta mas tarde',
        duration: 5000,
        icon: '❌',
      });
    }
  };

  const limpiarError = () => {
    if (error) {
      setError(false);
    }
  };

  const CONFIRMARCOMPLETAR = async () => {
    const response = await fetch(`/api/completarTODO`, {
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({
        id: tareaSeleccionadaCompletada._id,
      }),
    });
    if (!response.ok) {
      return toast.error('Error al completar la tarea', {
        description: 'Intenta más tarde',
        duration: 5000,
        icon: '❌',
      });
    }
    fetchHistorial(tareaSeleccionadaCompletada, 'completar');
    fetchTodo();
    CERRARMODALCOMPLETARBORRAR();
  };

  const CONFIRMARARCHIVAR = async () => {
    const response = await fetch(`/api/borrarTODO`, {
      headers: { 'content-type': 'application/json' },
      method: 'DELETE',
      body: JSON.stringify({
        id: tareaSeleccionada._id,
      }),
    });
    if (!response.ok) {
      toast.error('Error al borrar el TODO', {
        description: 'Intenta más tarde',
        duration: 5000,
        icon: '❌',
      });
      return;
    }
    fetchHistorial(tareaSeleccionada, 'archivar');
    fetchTodo();
    CERRARMODALARCHIVAR();
  };

  const CONFIRMAREDITAR = async (tareaActualizada) => {
    const response = await fetch(`/api/modificarTODO`, {
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(tareaActualizada),
    });
    if (!response.ok) {
      toast.error('Error al editar el TODO', {
        description: 'Intenta más tarde',
        duration: 5000,
        icon: '❌',
      });
      return;
    }
    toast.success('Tarea editada con éxito!', { icon: '✅', duration: 5000 });
    fetchHistorial(tareaSeleccionadaEditada, 'editar');
    fetchTodo();
    CERRARMODALEDITAR();
  };

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

  function descartarFiltro() {
    setFilterNuqs('all');
    setValue('');
  }

  return (
    <div className="flex h-full flex-col bg-gradient-to-bl from-gray-100 to-red-50 text-center">
      {/* Modelo de justify-between en este caso justify-end porque como solo es uno no es necesario ahora el between en cualquier caso tendria que ser everly o el otro ya que si no choca con el sidenav trigger. No choca pero se ve feo */}
      <div className="flex h-18 w-full items-center justify-end bg-gray-900">
        <Button
          className={`mr-6 cursor-pointer bg-green-600 text-white ease-in-out hover:bg-green-500 hover:text-black active:scale-95`}
          onClick={() => setShowModal(!showModal)}
        >
          <Plus
            className={`${showModal ? '' : 'rotate-180 transition-transform duration-500 ease-out'}`}
          />{' '}
          Crear una tarea
        </Button>
        {isFilterButton ? (
          <div className="flex items-center">
            <Button
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
              className={`relative mr-6 cursor-pointer bg-gray-600 text-center text-white duration-100 ease-in after:absolute after:inset-[-5px] after:content-[''] hover:bg-gray-500 hover:text-black active:scale-95`}
            >
              <Search className="mt-0.5 mr-1.5" /> <p> Busqueda con Filtros </p>
            </Button>
          </div>
        )}
        {isFilterButton && (
          <div
            className={`mr-6 flex items-center ${
              isFilterButton
                ? 'max-w-[500px] translate-x-0 opacity-100'
                : 'max-w-0 -translate-x-10 opacity-0'
            }`}
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
      <Todos
        todos={todos}
        loading={loading}
        isFilterButton={isFilterButton}
        ABRIRMODALARCHIVAR={ABRIRMODALARCHIVAR}
        ABRIRMODALCOMPLETARCERRAR={ABRIRMODALCOMPLETARCERRAR}
        ABRIRMODALEDITAR={ABRIRMODALEDITAR}
      ></Todos>
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={`${roboto.className} mt-1 mb-2 ml-1 text-left`}>
                Creación de una tarea
              </DialogTitle>
              <DialogDescription className={'ml-2 pb-2 text-left'}>
                Aqui designaras la tarea que se tiene que hacer, el nombre del trabajador que hará
                la tarea y el tiempo que deberia tardar.
              </DialogDescription>
            </DialogHeader>
            <DialogoGenerar alConfirmar={generarTodo} />
          </DialogContent>
        </Dialog>
      )}
      {modalAbrir && (
        <DialogoArchivar
          tarea={tareaSeleccionada}
          alCerrar={CERRARMODALARCHIVAR}
          alConfirmar={CONFIRMARARCHIVAR}
        />
      )}
      {modalCompletarAbrir && (
        <DialogoCompletar
          tarea={tareaSeleccionadaCompletada}
          alCerrar={CERRARMODALCOMPLETARBORRAR}
          alConfirmar={CONFIRMARCOMPLETAR}
        />
      )}
      {editarTarea && (
        <Dialog open={true} onOpenChange={CERRARMODALEDITAR}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={`${roboto.className} mt-1 mb-2 ml-1 text-left`}>
                Editar tarea
              </DialogTitle>
              <DialogDescription className={'ml-2 pb-2 text-left'}>
                Aqui realizaras los cambios a la tarea que se tiene que hacer, como el nombre del
                trabajador que hará la tarea y el tiempo que deberia tardar.
              </DialogDescription>
            </DialogHeader>
            <DialogoEditar
              tarea={tareaSeleccionadaEditada}
              alCerrar={CERRARMODALEDITAR}
              alConfirmar={CONFIRMAREDITAR}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
