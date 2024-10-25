'use client';
import { Type } from '@/app/_model';
import { QueryProvider } from '@/app/_providers';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import Filter from '../filter';
import PokemonItem from '../pokemon';
import { ListProps } from './types';

const MAX_ITEMS = 48;

export default function List({ data, types }: ListProps) {
  const [boundary, setBoundary] = useState([0, MAX_ITEMS]);
  const [selectedFilters, setSelectedFilters] = useState<Type[]>([]);

  useEffect(() => {
    if (selectedFilters.length) {
    }
  }, [selectedFilters]);

  const totalData = useMemo(() => {
    let result = [];

    if (selectedFilters.length) {
      const pokemons = _.flatMap(selectedFilters, (item) =>
        _.map(item.pokemon, (p) => p.pokemon)
      );
      const counts = _.countBy(pokemons, (item) => `${item.name}-${item.url}`);

      result = _.uniqBy(
        _.filter(
          pokemons,
          (item) => counts[`${item.name}-${item.url}`] >= selectedFilters.length
        ),
        (item) => `${item.name}-${item.url}`
      );
    } else {
      result = data;
    }

    return result;
  }, [selectedFilters, data]);

  const showedData = useMemo(() => {
    return totalData.slice(boundary[0], boundary[1]);
  }, [totalData, boundary]);

  const changeFilter = (item: Type) => {
    const newBoundary = [0, MAX_ITEMS];

    const newFilters = [...selectedFilters];
    const foundIndex = selectedFilters.findIndex((i) => i.id === item.id);
    if (foundIndex >= 0) {
      newFilters.splice(foundIndex, 1);
    } else {
      newFilters.push(item);
    }

    setBoundary(newBoundary);
    setSelectedFilters(newFilters);
  };

  const changePage = (action: 'prev' | 'next') => {
    if (action === 'next') {
      setBoundary((prev) =>
        prev[1] + MAX_ITEMS >= data.length
          ? [prev[0] + MAX_ITEMS, data.length]
          : [prev[0] + MAX_ITEMS, prev[1] + MAX_ITEMS]
      );
    } else {
      setBoundary((prev) =>
        prev[0] - MAX_ITEMS <= 0
          ? [0, prev[1] - MAX_ITEMS]
          : [prev[0] - MAX_ITEMS, prev[1] - MAX_ITEMS]
      );
    }
  };

  if (showedData) {
    return (
      <QueryProvider>
        <div>
          <Filter
            label='Type:'
            data={types}
            keyIndex='id'
            contentIndex='name'
            selected={selectedFilters}
            onChange={changeFilter}
          />
          <div className='my-12 mx-4 font-bold'>
            {totalData.length} results found.
          </div>
          <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4'>
            {showedData.map((i) => (
              <PokemonItem key={i.url} url={i.url} />
            ))}
          </div>
          <div className='mt-8 flex justify-center'>
            <button
              className='p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none'
              disabled={boundary[0] <= 0}
              onClick={() => changePage('prev')}
            >
              Prev
            </button>
            <button
              className='p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none'
              disabled={boundary[1] >= data.length}
              onClick={() => changePage('next')}
            >
              Next
            </button>
          </div>
        </div>
      </QueryProvider>
    );
  }

  return 'No items';
}
