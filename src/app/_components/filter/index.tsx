import clsx from 'clsx';
import { FilterProps } from './types';

export default function Filter<T extends Record<string, any>>({
  label,
  data,
  contentIndex,
  keyIndex,
  selected,
  onChange,
}: FilterProps<T>) {
  return (
    <div className='mx-auto max-w-screen-xl'>
      <div className='flex flex-wrap items-center mx-4 my-4'>
        <label className='mr-2 my-4 font-bold self-start'>{label}</label>
        {data.map((i, index) => {
          const isSelected = selected.find((j) => j[keyIndex] === i[keyIndex]);
          return (
            <div
              key={'filter' + index}
              className={clsx(
                'px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold text-red-900  cursor-pointer',
                !!isSelected && 'text-white bg-red-900'
              )}
              onClick={() => onChange(i)}
            >
              <span>{i[contentIndex]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
