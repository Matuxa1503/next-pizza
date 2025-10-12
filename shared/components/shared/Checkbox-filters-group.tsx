'use client';
import { FC, useState } from 'react';
import { FilterCheckbox, FilterCheckboxProps } from './Filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  name?: string;
  loading?: boolean;
  className?: string;
}

export const CheckboxFiltersGroup: FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  loading,
  searchInputPlaceholder = 'Поиск...',
  onClickCheckbox,
  selected,
  name,
  defaultValue,
  className,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onChangeOpen = () => {
    setShowAll(!showAll);
    setSearchValue('');
  };

  const list = showAll
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : (defaultItems || items).slice(0, limit);

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, ind) => <Skeleton key={ind} className="h-6 mb-4 rounded-[8px]" />)}
        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            name={name}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => onChangeOpen()} className="text-primary mt-3 cursor-pointer">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
