'use client';

import { cn } from '@/shared/lib/utils';
import { FC } from 'react';
import { Title } from './Title';
import { Button } from '../ui';
import { Ingredient, Variation } from '@prisma/client';
import { PizzaImage } from './Pizza-image';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variations: Variation[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: FC<Props> = ({ name, variations, imageUrl, ingredients, loading, onSubmit, className }) => {
  const textDetaills = '30см, традиционное тесто 30';
  const totalPrice = 250;
  const size = 30;

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetaills}</p>

        <Button loading={loading} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
