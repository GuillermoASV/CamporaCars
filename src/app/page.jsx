'use client';
import PokemonThings from '@/app/(contenido)/pokemonv2/[pokemonname]/components/obtenerPokemon';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

import { Card, CardHeader } from '@/components/ui/card';

export default function Page() {
  const [inputValue, setInputValue] = useState('');
  const [pokemonData, setPokemonData] = useState('');

  const GUARDAR = (e) => {
    setInputValue(e.target.value);
    setPokemonData('');
  };

  const CLICKBOTON = () => {
    try {
      if (inputValue.trim() === '') {
        toast.error('Hubo un error, revisa el campo si tiene algun texto', {
          duration: 5000,
        });
      }
      setPokemonData(inputValue);
    } catch (error) {
      alert('Error, intenta mas tarde');
    }
  };

  const enter = (e) => {
    if (e.key === 'Enter') {
      CLICKBOTON();
    }
  };

  return (
    <div>
      <Card className="container m-2 mx-auto max-w-2xl flex-col p-4">
        <label className="mb-2 text-center text-lg font-semibold">
          BUSCA TU POKEMON
          <input
            className="focus-visible:border-ring focus-visible:ring-ring/50 mt-2 ml-2 rounded-sm bg-red-500 px-2 py-1 text-white focus-visible:ring-[3px]"
            onChange={GUARDAR}
            type="text"
            placeholder="Escribe un pokemon"
            value={inputValue}
            onKeyDown={enter}
          />
        </label>
        <CardHeader className="flex items-center justify-center">
          <Button
            variant="outline"
            type="button"
            className="mx-auto mt-4 block"
            onClick={CLICKBOTON}
          >
            PRESIONA PARA ENVIAR
          </Button>
        </CardHeader>
        {pokemonData && <PokemonThings name={pokemonData} />}
      </Card>
    </div>
  );
}
