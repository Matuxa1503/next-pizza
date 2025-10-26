'use client';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store';
import { Category } from '@prisma/client';
import { FC } from 'react';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map((cat) => (
        <a
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer',
            categoryActiveId === cat.id && 'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href={`/#${cat.name}`}
          key={cat.id}
        >
          <button className="cursor-pointer">{cat.name}</button>
        </a>
      ))}
    </div>
  );
};
