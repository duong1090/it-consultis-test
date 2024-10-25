import { ListItem, Pokemon, Type } from '../_model';

const API_URL = process.env.POKEMON_API_URL;

interface ListResponse {
  count: number;
  results: ListItem[];
}

export const fetchTypes = async () => {
  try {
    const res = await fetch(API_URL + '/type');

    const types = (await res.json()) as ListResponse;

    const resTypes = await Promise.all<Type>(
      types.results.map(async (i) => {
        return (await fetch(i.url)).json();
      })
    );

    return resTypes;
  } catch (e) {
    console.error(e); // TODO: handle error
  }
};

export const fetchPokemons = async (limit: number) => {
  try {
    const res = await fetch(API_URL + '/pokemon?limit=' + limit);
    return res.json() as Promise<ListResponse>;
  } catch (e) {
    console.error(e);
  }
};

export const fetchPokemon = async (url: string) => {
  try {
    const res = await fetch(url);
    return res.json() as Promise<Pokemon>;
  } catch (e) {
    console.error(e);
  }
};

export const getImageUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
