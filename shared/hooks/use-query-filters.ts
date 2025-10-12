import { useEffect } from 'react';
import qs from 'qs';
import { Filters } from './use-filters';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  // all filters
  useEffect(() => {
    const params = {
      ...filters.prices,
      sizes: Array.from(filters.sizes),
      pizzaTypes: Array.from(filters.pizzaTypes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, { arrayFormat: 'comma' });

    router.push(`?${query}`, { scroll: false }); // update url without reloading
  }, [filters, router]);
};
