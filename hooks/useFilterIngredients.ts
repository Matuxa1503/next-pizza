import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

type IngredientItem = {
  id: number;
  name: string;
};

interface ReturnProps {
  ingredients: IngredientItem[];
  loading: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, { toggle }] = useSet(new Set<string>([])); // list of selected ingredients

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const res = await Api.ingredients.getAll();
        setIngredients(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading, onAddId: toggle, selectedIds };
};
