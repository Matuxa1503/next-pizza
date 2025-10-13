import { Ingredient, Variation } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  variations: Variation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`;
  const totalPrice = calcTotalPizzaPrice(type, size, variations, ingredients, selectedIngredients);

  return { textDetaills, totalPrice };
};
