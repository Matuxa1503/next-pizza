import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useMemo, useState } from 'react';

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceRangeProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceRangeProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export const useFilters = (): ReturnProps => {
  // use for save info about filters (ingredients, sizes, pizzaTypes, price)
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  // Filter ingredients
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));

  // Filter sizes
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []));

  // Filter pizza types
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [])
  );

  // filter price in price range
  const [prices, setPrices] = useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const result = useMemo(
    () => ({
      selectedIngredients,
      sizes,
      pizzaTypes,
      prices,
      setSizes: toggleSizes,
      setPizzaTypes: togglePizzaTypes,
      setPrices: updatePrice,
      setSelectedIngredients: toggleIngredients,
    }),
    [selectedIngredients, sizes, pizzaTypes, prices]
  );

  return result;
};
