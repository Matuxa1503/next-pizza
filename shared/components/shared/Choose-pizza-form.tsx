'use client';

import { cn } from '@/shared/lib/utils';
import { FC } from 'react';
import { Title } from './Title';
import { Button } from '../ui';
import { Ingredient, Variation } from '@prisma/client';
import { PizzaImage } from './Pizza-image';
import { GroupVariants } from './Group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { IngredientItem } from './Ingredient-item';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variations: Variation[];
  loading?: boolean;
  onSubmit: (variationId: number, ingredients: number[]) => void;
  className?: string;
}

/**
 * Форма выбора пиццы
 */

export const ChoosePizzaForm: FC<Props> = ({ name, variations, imageUrl, ingredients, loading, onSubmit, className }) => {
  const { size, type, selectedIngredients, currentVariationId, availablePizzaSizes, addIngredients, setSize, setType } =
    usePizzaOptions(variations);
  const { totalPrice, textDetaills } = getPizzaDetails(type, size, variations, ingredients, selectedIngredients);

  const handleSubmit = () => {
    if (currentVariationId) {
      onSubmit(currentVariationId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-5 mt-5">
          <GroupVariants variants={availablePizzaSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />
          <GroupVariants variants={pizzaTypes} value={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[320px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((item) => (
              <IngredientItem
                key={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                onClick={() => addIngredients(item.id)}
                active={selectedIngredients.has(item.id)}
              />
            ))}
          </div>
        </div>

        <Button onClick={handleSubmit} loading={loading} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
