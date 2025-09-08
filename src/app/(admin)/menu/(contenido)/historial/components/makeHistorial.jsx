import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import { TimerOff, Timer, Star, NotebookText, Activity } from 'lucide-react';

const FechaDeNumerosALetras = (historial) => {
  const MESESNUMEROS = {
    '01': 'enero',
    '02': 'febrero',
    '03': 'marzo',
    '04': 'abril',
    '05': 'mayo',
    '06': 'junio',
    '07': 'julio',
    '08': 'agosto',
    '09': 'septiembre',
    10: 'octubre',
    11: 'noviembre',
    12: 'diciembre',
  };

  const Separacion = historial.split('-');
  const MESESNOMBRES = Separacion[1];
  const month = MESESNUMEROS[MESESNOMBRES];
  const day = Separacion[2].slice(0, 2);
  const resultado = `${day} de ${month} de ${Separacion[0]}`;
  return resultado;
};

const MakeHistorial = ({ historial = [] }) => {
  const longitud = historial.length === 0;
  return (
    <div className="mx-auto h-5/6 max-h-[900px] w-6/7 overflow-y-auto rounded-md border bg-white shadow-sm">
      <Table className="min-w-full table-fixed">
        <TableCaption>Historial de acciones</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px] bg-slate-900 text-white">
              <div className="flex justify-start">
                <Activity className="flex" /> <p className="mt-0.5 ml-2">Acción</p>
              </div>
            </TableHead>
            <TableHead className="w-[220px] bg-slate-900 text-white">
              <div className="flex">
                <NotebookText className="flex" />{' '}
                <p className="mt-0.5 ml-2">Descripcion de la tarea</p>
              </div>
            </TableHead>
            <TableHead className="w-[140px] bg-slate-900 text-white">
              <div className="flex">
                <Timer className="flex" /> <p className="mt-0.5 ml-2">Fecha</p>
              </div>
            </TableHead>
            <TableHead className="w-[140px] bg-slate-900 text-white">
              <div className="flex">
                <TimerOff className="flex" /> <p className="mt-0.5 ml-2">Fecha limite</p>
              </div>
            </TableHead>
            <TableHead className="w-[120px] bg-slate-900 text-white">
              <div className="flex justify-end">
                <Star className="flex" /> <p className="mt-0.5 ml-2">Importancia</p>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {longitud ? (
            <TableRow>
              <TableCell className="font-sm max-w-2xl truncate">No hay DATOS</TableCell>
              <TableCell className="truncate">No hay DATOS</TableCell>
              <TableCell className="truncate">No hay DATOS</TableCell>
              <TableCell className="truncate">No hay DATOS</TableCell>
              <TableCell className="text-right">No hay DATOS</TableCell>
            </TableRow>
          ) : (
            <>
              {historial.map((historialItem, i) => (
                <TableRow key={i}>
                  <TableCell className="font-sm max-w-xs truncate">
                    {historialItem.accion}
                  </TableCell>
                  <TableCell className="max-w-2xl truncate">{historialItem.descripcion}</TableCell>
                  <TableCell className="truncate">{historialItem.fecha}</TableCell>
                  <TableCell className="truncate">
                    {FechaDeNumerosALetras(historialItem.limiteFecha)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`inline-flex cursor-default items-center justify-center rounded-2xl px-4 py-1 text-sm ${
                        historialItem.importancia === 'Alta'
                          ? 'importancia-alta'
                          : historialItem.importancia === 'Media'
                            ? 'importancia-media'
                            : 'importancia-baja'
                      }`}
                    >
                      {historialItem.importancia}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MakeHistorial;
