import { Variation } from '@prisma/client';
import { pizzaSizes, PizzaType } from '../constants/pizza';
import { Variant } from '../components/shared/Group-variants';

export const getAvailablePizzaSizes = (variations: Variation[], type: PizzaType): Variant[] => {
  const filteredPizzasByType = variations.filter((item) => item.pizzaType === type);

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
  }));
};
