'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Box,
  DollarSign,
  List,
  NotebookPen,
  PackageSearch,
  Palette,
  Pen,
  Plus,
  Trash2,
  NotepadText,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import DialogoLista from './agregarMaterial';
import DialogoEliminar from './borrarMaterial';
import DialogoListaEditar from './editarMaterial';

const Setting = () => {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listaMateriales, setListaMateriales] = useState(false);
  const [tareaSeleccionadaEditar, setTareaSeleccionadaEditar] = useState(null);
  const [material, setMaterial] = useState(false);
  const [tareaSeleccionadaBorrar, setTareaSeleccionadaBorrar] = useState(null);
  const [materialBorrar, setMaterialBorrar] = useState(false);

  const ABRIRMODALEDITAR = (material) => {
    setTareaSeleccionadaEditar(material);
    setMaterial(true);
  };

  const CERRARMODALEDITAR = () => {
    setMaterial(false);
    setTareaSeleccionadaEditar(null);
  };

  const ABRIRMODALBORRAR = (material) => {
    setTareaSeleccionadaBorrar(material);
    setMaterialBorrar(true);
  };

  const CERRARMODALBORRAR = () => {
    setMaterialBorrar(false);
    setTareaSeleccionadaBorrar(null);
  };

  const fetchLista = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/materiales`);
      const data = await response.json();
      setLoading(false);
      setLista(data);
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
    fetchLista();
  }, []);

  const generarNuevoMaterial = async (datos) => {
    try {
      const res = await fetch('/api/materiales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      if (res.ok) {
        toast.success('Todo salio bien!', {
          description: 'TODO guardado',
          duration: 3000,
          icon: '✅',
        });
        fetchLista();
      }

      setListaMateriales(false);
    } catch (error) {
      toast.error('Error del lado del servidor', {
        description: 'Intenta mas tarde',
        duration: 5000,
        icon: '❌',
      });
    }
  };

  const editarMaterial = async (informacionActualizada) => {
    const response = await fetch(`/api/materiales`, {
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(informacionActualizada),
    });
    if (!response.ok) {
      toast.error('Error al actualizar los datos de gastos del TODO', {
        description: 'Vuelve a intentarlo',
        duration: 5000,
        icon: '❌',
      });
      return;
    }
    toast.success('Tarea actualizada con éxito!!', { icon: '✅', duration: 5000 });
    fetchLista();
    CERRARMODALEDITAR();
  };

  const borrarMaterial = async (informacion) => {
    const response = await fetch(`/api/materiales`, {
      headers: { 'content-type': 'application/json' },
      method: 'DELETE',
      body: JSON.stringify(informacion),
    });
    if (!response.ok) {
      toast.error('Error al actualizar los datos de gastos del TODO', {
        description: 'Vuelve a intentarlo',
        duration: 5000,
        icon: '❌',
      });
      return;
    }
    toast.success('Tarea fue borrada con éxito!!', { icon: '✅', duration: 5000 });
    fetchLista();
    CERRARMODALBORRAR();
  };

  return (
    <div>
      <div>
        <Accordion
          type="single"
          collapsible
          className="w-full cursor-pointer"
          defaultValue="item-1"
        >
          <AccordionItem value="item-2">
            <AccordionTrigger>
              {' '}
              <div className="ml-1 flex">
                <List />
                <p className="mt-0.5 ml-1 flex cursor-pointer text-black">Lista de materiales</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <button
                type="button"
                onClick={() => setListaMateriales(!listaMateriales)}
                className="group ml-3 flex text-start underline"
              >
                <Plus
                  className={`transition-transform duration-300 ease-out group-hover:rotate-180 group-hover:text-blue-500`}
                />
                <p className="mt-0.5 flex cursor-pointer text-center opacity-90 group-hover:text-blue-500">
                  Agregar un nuevo material a la lista
                </p>
              </button>
              <div className="ml-9">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="-ml-6 flex">
                        <Pen />
                        <div className="flex items-center justify-center gap-4">
                          <p className="mt-0.5 ml-1 flex cursor-pointer text-black">
                            Editar Precio
                          </p>
                          <div className="flex h-4 items-center justify-center rounded-full bg-gray-600 p-2 text-sm tracking-wide text-white hover:bg-gray-700">
                            <p>
                              {lista.length > 0
                                ? lista.length > 1
                                  ? `${lista.length} materiales`
                                  : `${lista.length} material`
                                : 'No hay materiales'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="grid gap-3 py-3">
                      {lista.map((materiales, index) => (
                        <div
                          key={`mat-${index}`}
                          className="flex flex-col items-start justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center"
                        >
                          <div className="mb-2 flex-1 sm:mb-0">
                            <div className="flex items-center">
                              <Box className="mr-2 size-4 text-orange-500" />
                              <h4 className="text-xs font-semibold tracking-wide text-gray-500">
                                MATERIAL
                              </h4>
                            </div>
                            <p className="mt-1 ml-6 cursor-pointer overflow-x-auto text-base font-medium text-gray-900 transition-colors hover:text-orange-600 md:max-w-[7rem] lg:max-w-[21.9rem] xl:max-w-[32.5rem]">
                              {materiales.materialYCosto[0]}
                            </p>
                          </div>

                          <div className="mb-2 flex-1 sm:mb-0">
                            <div className="flex items-center">
                              <DollarSign className="mr-2 size-4 text-green-500" />
                              <h4 className="text-xs font-semibold tracking-wide text-gray-500">
                                PRECIO
                              </h4>
                            </div>
                            <p className="mt-1 ml-6 text-base font-semibold text-green-700">
                              {/* EL ISNAN ES UN ARREGLO EN LA UI PERO SALE DE LA BASE DE DATOS COMO NAN */}
                              {isNaN(materiales.materialYCosto[1])
                                ? '0'
                                : materiales.materialYCosto[1]}
                              $
                            </p>
                          </div>

                          <div className="mb-2 flex-1 sm:mb-0">
                            <div className="flex items-center">
                              <PackageSearch className="mr-2 size-4 text-blue-500" />
                              <h4 className="text-xs font-semibold tracking-wide text-gray-500">
                                INVENTARIO
                              </h4>
                            </div>
                            <span className="mt-1 ml-6 text-base font-semibold">
                              {materiales.materialYCosto[2] > 1 ? (
                                materiales.materialYCosto[2]
                              ) : (
                                <p className="text-blue-500">
                                  No tienes este material en el Inventario
                                </p>
                              )}
                            </span>
                          </div>

                          <div className="flex justify-end space-x-3 sm:justify-start sm:pl-4">
                            <button
                              type="button"
                              onClick={() => ABRIRMODALEDITAR(materiales)}
                              className="group flex items-center justify-center rounded-lg border border-orange-200 p-2 transition-colors duration-200 hover:bg-orange-100"
                              aria-label="Editar material"
                            >
                              <NotebookPen className="mr-1 size-4 text-orange-500 group-hover:text-orange-700" />
                              <p className="hidden text-xs text-orange-700 group-hover:text-orange-900 sm:block">
                                Editar
                              </p>
                            </button>
                            <button
                              type="button"
                              onClick={() => ABRIRMODALBORRAR(materiales)}
                              className="group flex items-center justify-center rounded-lg border border-red-200 p-2 transition-colors duration-200 hover:bg-red-100"
                              aria-label="Eliminar material"
                            >
                              <Trash2 className="mr-1 size-4 text-red-500 group-hover:text-red-700" />
                              <p className="hidden text-xs text-red-700 group-hover:text-red-900 sm:block">
                                Eliminar
                              </p>
                            </button>
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="-ml-6 flex">
                        <NotepadText />
                        <div className="flex items-center justify-center gap-4">
                          <p className="mt-0.5 ml-1 flex cursor-pointer text-black">Inventario</p>
                          <div className="flex h-4 items-center justify-center rounded-full bg-gray-600 p-2 text-sm tracking-wide text-white hover:bg-gray-700">
                            <p>Ver inventario</p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="grid gap-3 py-3">
                      {lista.map((materiales, index) =>
                        materiales.materialYCosto[2] > 0 ? (
                          <div
                            key={`mat-${index}`}
                            className="flex flex-col items-start justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center"
                          >
                            <div className="mb-2 flex-1 sm:mb-0">
                              <div className="flex items-center">
                                <Box className="mr-2 size-4 text-orange-500" />
                                <h4 className="text-xs font-semibold tracking-wide text-gray-500">
                                  MATERIAL
                                </h4>
                              </div>
                              <p className="mt-1 ml-6 max-w-[60rem] cursor-pointer overflow-x-auto text-base font-medium text-gray-900 transition-colors hover:text-orange-600 md:max-w-[7rem] lg:max-w-[30rem] xl:max-w-[53rem]">
                                {materiales.materialYCosto[0]}
                              </p>
                            </div>

                            <div className="mb-2 flex-1 sm:mb-0">
                              <div className="flex items-center">
                                <PackageSearch className="mr-2 size-4 text-blue-500" />
                                <h4 className="text-xs font-semibold tracking-wide text-gray-500">
                                  EN EXISTENCIA
                                </h4>
                              </div>
                              <p className="mt-1 ml-6 text-base font-semibold">
                                {materiales.materialYCosto[2]}
                              </p>
                            </div>
                          </div>
                        ) : (
                          ''
                        ),
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {listaMateriales && (
        <Dialog open={listaMateriales} onOpenChange={setListaMateriales}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={`mt-1 mb-2 ml-1 text-left`}>
                Añadir material a la lista
              </DialogTitle>
              <DialogDescription className={'ml-2 pb-2 text-left'}>
                Aqui añadiras un material y su precio para verlo en la lista de gastos cuando estes
                en el apartado de presupuesto.
              </DialogDescription>
            </DialogHeader>
            <DialogoLista alConfirmar={generarNuevoMaterial} />
          </DialogContent>
        </Dialog>
      )}
      {material && (
        <Dialog open={true} onOpenChange={CERRARMODALEDITAR}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={`mt-1 mb-2 ml-1 text-left`}>Editar Material</DialogTitle>
              <DialogDescription className={'ml-2 pb-2 text-left'}>
                Aqui podras editar el material ya sea que los precios hayan aumentado o te
                equivocastes al escribir el nombre del producto o el precio .
              </DialogDescription>
            </DialogHeader>
            <DialogoListaEditar
              tarea={tareaSeleccionadaEditar}
              alConfirmar={editarMaterial}
              alCerrar={CERRARMODALEDITAR}
            />
          </DialogContent>
        </Dialog>
      )}
      {materialBorrar && (
        <DialogoEliminar
          tarea={tareaSeleccionadaBorrar}
          alConfirmar={borrarMaterial}
          alCerrar={CERRARMODALBORRAR}
        />
      )}
    </div>
  );
};

export default Setting;
