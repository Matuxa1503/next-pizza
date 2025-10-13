import { useEffect, useState } from 'react';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { Variant } from '../components/shared/Group-variants';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '../lib';
import { Variation } from '@prisma/client';

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availablePizzaSizes: Variant[];
  addIngredients: (id: number) => void;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
}

export const usePizzaOptions = (variations: Variation[]): ReturnProps => {
  // size, type pizzas
  const [size, setSize] = useState<PizzaSize>(30);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredients }] = useSet(new Set<number>([]));
  const availablePizzaSizes = getAvailablePizzaSizes(variations, type);

  // switch available size
  useEffect(() => {
    const isAvailableSize = availablePizzaSizes.find((item) => Number(item.value) === size && !item.disabled);
    const availableFirstSize = availablePizzaSizes.find((item) => !item.disabled);

    if (!isAvailableSize && availableFirstSize) {
      setSize(Number(availableFirstSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availablePizzaSizes,
    addIngredients,
    setSize,
    setType,
  };
};
