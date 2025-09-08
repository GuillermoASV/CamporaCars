'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export default function PokemonThings({ name }) {
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setLoading] = useState(false);

  useEffect(() => {
    let evitarDobleRenderizado = false;
    setLoading(true);
    setPokemon(null);

    const obtenerPokemon = () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (!evitarDobleRenderizado) {
            setPokemon(data);
            setLoading(false);
          }
        })
        .catch((e) => {
          if (!evitarDobleRenderizado) {
            toast.error('No se encontro el pokemon que estas buscando', {
              duration: 2000,
            });
            console.log('error', e.message);
            setPokemon(null);
            setLoading(false);
          }
        });
    obtenerPokemon();
    return () => {
      evitarDobleRenderizado = true;
    };
  }, [name]);

  if (cargando) return <div className="p-4 text-center">Cargando...</div>;
  if (!pokemon) return null;

  const MayusculaPrimeraLetra = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const imagenes = [
    pokemon.sprites.front_default,
    pokemon.sprites.back_default,
    pokemon.sprites.front_shiny,
    pokemon.sprites.back_shiny,
    pokemon.sprites.other['dream_world'].front_default,
    pokemon.sprites.other['official-artwork'].front_shiny,
    pokemon.sprites.other['official-artwork'].front_default,
    pokemon.sprites.versions['generation-v']['black-white'].animated.front_default,
    pokemon.sprites.versions['generation-v']['black-white'].animated.back_default,
  ];

  const datos = [
    { label: 'ID', value: pokemon.id },
    { label: 'Peso', value: `${pokemon.weight / 10} kg` },
    { label: 'Altura', value: `${pokemon.height / 10} m` },
    { label: 'Especie', value: MayusculaPrimeraLetra(pokemon.species.name) },
    {
      label: 'Generación',
      value: MayusculaPrimeraLetra(pokemon.game_indices[0]?.version.name || 'Desconocida'),
    },
  ];

  function handleImageClick(img) {
    if (img) {
      window.open(img, '_blank');
    } else {
      toast.alert('Imagen no disponible', {
        duration: 5000,
      });
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <CardTitle>{MayusculaPrimeraLetra(pokemon.name)}</CardTitle>
        <CardDescription>
          <Image
            src={
              pokemon.sprites.other['official-artwork'].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
            width={96}
            height={96}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold">Habilidades</h3>
            <ul className="space-y-2">
              {pokemon.abilities.map((i) => (
                <li
                  key={i.ability.name}
                  className="text-s mt-2 flex items-center justify-between rounded-lg border bg-gray-50 p-3"
                >
                  <div className="flex items-center">
                    <span className="p-2 font-semibold text-gray-800 capitalize">
                      {i.ability.name.replace('-', ' ')}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-bold ${
                        i.is_hidden
                          ? 'bg-indigo-200 text-indigo-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {i.is_hidden ? 'Oculta' : 'Normal'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Estadísticas</h3>
            <ul className="text-s mt-2 flex flex-col space-y-2 rounded-lg border bg-gray-50 p-3 capitalize">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  <span className="p-2 text-lg font-semibold text-gray-700 capitalize">
                    {stat.stat.name.replace('-', ' ')}:
                  </span>
                  <span className="text-bold mb-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 px-2 text-2xl text-[1.125rem] text-white hover:text-gray-200">
                    {stat.base_stat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-center font-bold">Tipo/s</h3>
            <div>
              <div className="text-s mt-2 flex flex-col space-y-2 rounded-lg border bg-gray-50 p-2 text-center text-gray-600 capitalize">
                {pokemon.types.map((type) => (
                  <div className="flex items-center justify-between" key={type.type.name}>
                    <Image
                      src={`/${type.type.name}.svg`}
                      alt={type.type.name}
                      width={32}
                      height={32}
                      className="invert"
                    />
                    <span className="font-bold">{type.type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-center font-bold">Datos</h3>
            <ul className="text-s mt-2 flex flex-col space-y-2 rounded-lg border bg-gray-50 p-3 capitalize">
              {datos.map((dato) => (
                <li key={dato.label} className="flex items-center justify-between">
                  <span className="p-2 font-semibold text-gray-800">{dato.label}:</span>
                  <span className="text-bold mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-sky-700 px-2 text-2xl text-[1.125rem] text-white hover:text-gray-200">
                    {dato.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-center font-bold">
              Imagenes de {MayusculaPrimeraLetra(pokemon.name)}
            </h3>
            <ul className="text-s mt-2 flex flex-row items-center justify-between space-y-2 space-x-4 rounded-lg border bg-gray-50 p-3">
              {imagenes.map((img, index) => (
                <li key={img ? img : `img-${index}`} className="flex items-center hover:scale-115">
                  {img ? (
                    <Image
                      src={img}
                      alt={`Imagen ${index + 1} de ${pokemon.name}`}
                      title={`Imagen ${index + 1} de ${MayusculaPrimeraLetra(pokemon.name)} `}
                      width={128}
                      height={128}
                      className="cursor-pointer rounded-md"
                      onClick={() => handleImageClick(img)}
                    />
                  ) : (
                    console.log(`Imagen ${index + 1} no disponible`)
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
