'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './Choose-pizza-form';
import { ChooseProductForm } from './Choose-product-form';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: FC<Props> = ({ product, onSubmit: _onSubmit, className }) => {
  const { addCartItem, loading } = useCartStore((state) => state);
  const firstItem = product.variations[0];
  const isPizzaForm = Boolean(firstItem.pizzaType); // check product (pizza or not)

  // Added product in cart and server
  const onSubmit = async (variationId?: number, ingredients?: number[]) => {
    try {
      const itemId = variationId ?? firstItem.id; // check pizza or product
      await addCartItem({
        variationId: itemId,
        ingredients,
      });

      toast.success(`${product.name} добавлено в корзину`);
      _onSubmit?.(); // close modal
    } catch (error) {
      console.error(error);
      toast.error(`${product.name} не удалось добавить в корзину`);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        variations={product.variations}
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm imageUrl={product.imageUrl} name={product.name} price={firstItem.price} onSubmit={onSubmit} loading={loading} />
  );
};
