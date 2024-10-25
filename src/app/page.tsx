import { List } from './_components';
import { fetchPokemons, fetchTypes } from './_endpoints';

export default async function Home() {
  const typesData = await fetchTypes();
  const pokemonsData = await fetchPokemons(1200);

  if (typesData && pokemonsData) {
    return (
      <div>
        <List data={pokemonsData.results} types={typesData} />
      </div>
    );
  }

  return 'Loading...';
}
