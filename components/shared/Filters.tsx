'use client';

import { FC, useState } from 'react';
import { Title } from './Title';
import { FilterCheckbox } from './Filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './Range-slider';
import { CheckboxFiltersGroup } from './Checkbox-filters-group';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

interface Props {
  className?: string;
}

interface PriceRangeProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();
  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  // updated price in price range
  const [prices, setPrice] = useState<PriceRangeProps>({ priceFrom: 0, priceTo: 1000 });
  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value,
    });
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" name="qwe" />
        <FilterCheckbox text="Новинки" value="2" name="qwe" />
      </div>

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom, prices.priceTo]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />

        <CheckboxFiltersGroup
          title="Ингредиенты"
          className="mt-10"
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
          loading={loading}
          onClickCheckbox={onAddId}
          selectedIds={selectedIds}
          name="ingredients"
        />
      </div>
    </div>
  );
};
