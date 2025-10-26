'use client';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChooseProductForm } from '../Choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../Choose-pizza-form';
import { useCartStore } from '@/shared/store';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.variations[0];
  const isPizzaForm = Boolean(firstItem.pizzaType); // check product (pizza or not)
  const addCartItem = useCartStore((state) => state.addCartItem);

  const onAddProduct = () => {
    addCartItem({
      variationId: firstItem.id,
    });
  };

  const onAddPizza = (variationId: number, ingredients: number[]) => {
    addCartItem({
      variationId,
      ingredients,
    });
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden', className)}>
        <VisuallyHidden>
          <DialogTitle>Модальное окно</DialogTitle>
        </VisuallyHidden>

        {isPizzaForm ? (
          <ChoosePizzaForm
            variations={product.variations}
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            onSubmit={onAddPizza}
          />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} price={firstItem.price} onSubmit={onAddProduct} />
        )}
      </DialogContent>
    </Dialog>
  );
};
