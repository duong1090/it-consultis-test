'use client';
import { fetchPokemon, getImageUrl } from '@/app/_endpoints';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { PokemonProps } from './types';

const PokemonItem = ({ url }: PokemonProps) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await fetchPokemon(url),
    queryKey: [url],
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return (
    <div className='flex flex-col items-center justify-center'>
      {!isLoading && data?.id ? (
        <>
          <div className='h-24 w-24'>
            <Image
              src={getImageUrl(data.id)}
              alt={data.name}
              title={data.name}
              width='100'
              height='100'
              loading='lazy'
            />
          </div>
          <div className='text-center'>{data.name}</div>
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default React.memo(PokemonItem);
