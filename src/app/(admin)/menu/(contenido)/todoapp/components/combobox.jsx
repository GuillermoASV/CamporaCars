'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function ComboboxDemo({ tareas, className, devolver, seleccionado, ...props }) {
  if (!tareas || tareas.length === 0) {
    return <div>No hay nada que mostrar en combobox</div>;
  }
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const cerrar = () => {
    devolver();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between overflow-hidden', className)}
          {...props}
        >
          {value
            ? tareas.find((framework) => framework.value === value)?.label
            : 'Selecciona la tarea'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {tareas.map((filtro) => (
                <CommandItem
                  key={filtro.value}
                  value={filtro.value}
                  onSelect={(currentValue) => {
                    cerrar();
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {filtro.label}
                  <Check
                    className={cn('ml-auto', value === filtro.value ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
