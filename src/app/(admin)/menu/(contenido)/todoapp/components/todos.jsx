import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArchiveRestore,
  CircleSlash,
  FileCheck,
  Flag,
  Loader,
  Menu,
  MoveDown,
  MoveHorizontal,
  MoveUp,
  Pen,
  Plus,
  Rocket,
  Search,
  SlidersHorizontal,
  User,
} from 'lucide-react';
import { Roboto_Condensed } from 'next/font/google';
import { useSearchParams } from 'next/navigation';

const roboto = Roboto_Condensed({
  style: ['normal'],
  weight: ['900'],
  subsets: ['latin'],
});
function darParametros() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('filtro');
  return searchTerm;
}

import getTaskIconByTitle from './getIcons';

import ReactMarkdown from 'react-markdown';
import mdComponents, { mdRemarkPlugins } from './markdownComponents';

function Mayuscula(todo) {
  const upper = `${todo[0].toUpperCase()}${todo.slice(1)}`;
  return upper;
}

const Todos = ({
  todos,
  loading,
  isFilterButton,
  ABRIRMODALEDITAR,
  ABRIRMODALARCHIVAR,
  ABRIRMODALCOMPLETARCERRAR,
}) => {
  return (
    <div className="mx-auto mt-5 mb-5 flex w-full max-w-[100rem] flex-col items-center space-y-8 rounded-lg bg-gray-200 p-10">
      <h1 className={`${roboto.className} text-3xl opacity-90`}>Lista de tareas por hacer</h1>
      <div>
        {' '}
        {loading ? (
          <Loader className="flex animate-spin items-center justify-start" />
        ) : todos.length === 0 ? (
          <Card className={'container max-w-[1200px]'}>
            <CardHeader>
              {' '}
              <CardTitle className={'text-bold flex items-center justify-center gap-4'}>
                {isFilterButton ? (
                  <p className="flex items-center gap-4">
                    <SlidersHorizontal size={24} /> No se encontraron tareas en la base de datos con
                    los filtros aplicados
                  </p>
                ) : (
                  <p className="flex items-center gap-4">
                    <CircleSlash size={24} /> No se encontraron tareas en la base de datos{' '}
                  </p>
                )}
              </CardTitle>
              <Separator className={'mt-2'} />
            </CardHeader>
            <CardContent className={'text-left'}>
              {isFilterButton ? (
                <p className="tracking-wide">
                  No se encontraron tareas en la base de datos con los filtros aplicados. <br />{' '}
                  <br />
                  {darParametros() != 'archivados' ? (
                    <span>
                      (Tambien puedes revisar si tienes alguna tarea de presupuestos archivada
                      dandole click a{' '}
                      <span className="mx-2 inline-flex items-center gap-[4px]">
                        <Search size={16} />
                        <span className="mt-[6px]">Busqueda con filtros</span>
                      </span>
                      luego "Seleccionar el filtro" y pulsa el boton de archivados, si no funciona
                      intenta crear una)
                    </span>
                  ) : null}
                </p>
              ) : (
                <p className="text-left tracking-wide">
                  Prueba a crear una dandole click a el boton de arriba que dice{' '}
                  <span className="ml-[4px] inline-flex items-center gap-[4px]">
                    <Plus size={16} />
                    <span className="mt-[5px]">Crear una tarea</span>
                  </span>{' '}
                  <br /> <br />
                  (Tambien puedes revisar si tienes alguna tarea archivada dandole click a
                  <span className="mx-2 inline-flex items-center gap-[4px]">
                    <Search size={16} />
                    <span className="mt-[5px]">Busqueda con filtros</span>
                  </span>{' '}
                  luego "Seleccionar el filtro" y pulsa el boton de archivados)
                </p>
              )}{' '}
            </CardContent>
          </Card>
        ) : (
          <div className="mb-6 w-full border-amber-600 break-all">
            {todos.map((todo) => (
              <article
                key={todo._id}
                className="relative m-5 flex w-[77.5rem] min-w-[37.5rem] items-center justify-center rounded-lg bg-white p-4 shadow-sm shadow-indigo-500/50 hover:shadow-xl"
              >
                <div className="flex w-[70rem] flex-col justify-center gap-4">
                  <div className="flex flex-row items-start justify-between break-all">
                    <header className="flex flex-row items-center gap-4">
                      <h1
                        className={`flex max-w-[62.5rem] gap-2 text-left text-xl font-semibold text-gray-900 capitalize`}
                      >
                        {getTaskIconByTitle(todo.titulo)}
                        {todo.titulo}{' '}
                      </h1>
                    </header>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <User
                      size={27}
                      className="flex rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 px-1 py-1 text-cyan-200"
                    />
                    <h3
                      className={`max-w-[29rem] text-lg font-bold ${roboto.className} flex items-center gap-2 text-gray-600 capitalize`}
                    >
                      {todo.nombre} {todo.apellido}{' '}
                    </h3>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <span
                        className={`flex cursor-default items-center justify-center rounded-2xl px-4 py-1 text-sm ${
                          todo.importancia === 'Alta'
                            ? 'importancia-alta'
                            : todo.importancia === 'Media'
                              ? 'importancia-media'
                              : 'importancia-baja'
                        }`}
                      >
                        {todo.importancia}
                        {todo.importancia === 'Alta' ? (
                          <MoveUp size={16} className="ml-1" />
                        ) : todo.importancia === 'Media' ? (
                          <MoveHorizontal size={16} className="ml-1" />
                        ) : (
                          <MoveDown size={16} className="ml-1" />
                        )}
                      </span>
                      {!todo.completado && (
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger className={'cursor-pointer hover:text-gray-700'}>
                            {/* *Cambiar luego esta cosas por un efecto animado o algo * */}
                            <Menu size={30} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel className={'scale-90 font-bold'}>
                              OPCIONES
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className={'cursor-pointer'}
                              onClick={() => ABRIRMODALEDITAR(todo)}
                            >
                              <Pen /> Editar
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className={'cursor-pointer'}
                              onClick={() => ABRIRMODALCOMPLETARCERRAR(todo)}
                            >
                              <FileCheck /> Completar
                            </DropdownMenuItem>

                            {!todo.deleted && (
                              <DropdownMenuItem
                                className={'cursor-pointer'}
                                onClick={() => ABRIRMODALARCHIVAR(todo)}
                              >
                                <ArchiveRestore /> Archivar
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                  <div
                    className={`${roboto.className} mx-auto mt-3 w-[60rem] max-w-[62.5rem] text-left text-sm break-words text-gray-500`}
                  >
                    <ReactMarkdown remarkPlugins={mdRemarkPlugins} components={mdComponents}>
                      {Mayuscula(todo.descripcion)}
                    </ReactMarkdown>
                    <footer>
                      <span
                        className={`mt-8 flex items-center justify-between gap-2 text-xs text-gray-500`}
                      >
                        <div className="flex items-center gap-2">
                          <Rocket size={15} />
                          <time dateTime={todo.fecha}>{todo.fecha}</time>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flag size={15} className="fill-red-500" />
                          <time dateTime={todo.limiteFecha}>
                            {new Date(todo.limiteFecha).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                        </div>
                      </span>
                    </footer>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todos;
