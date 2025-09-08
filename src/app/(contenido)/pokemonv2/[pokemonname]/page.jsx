import PokemonThings from '@/app/(contenido)/pokemonv2/[pokemonname]/components/obtenerPokemon';

export default async function Page({ params }) {
  const { pokemonname } = await params;
  return <PokemonThings name={pokemonname} />;
}
