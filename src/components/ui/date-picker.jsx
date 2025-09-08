'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePickerDemo({ callback, actualizarFecha = '' }) {
  const [date, setDate] = React.useState(actualizarFecha);

  const dateSelect = (diaSeleccionado) => {
    if (actualizarFecha) {
      setDate(() => {
        actualizarFecha;
      });
    }
    setDate(diaSeleccionado);
    if (callback) {
      callback(diaSeleccionado);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground ml-2 w-[220px] cursor-pointer justify-start truncate p-3 text-left font-normal"
        >
          {date ? format(date, 'PPP', { locale: es }) : <span>Fecha a terminar</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          captionLayout="dropdown-months"
          mode="single"
          selected={date}
          locale={es}
          onSelect={dateSelect}
        />
      </PopoverContent>
    </Popover>
  );
}
