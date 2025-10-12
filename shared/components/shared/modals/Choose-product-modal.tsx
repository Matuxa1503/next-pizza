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

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.variations[0].pizzaType); // check product (pizza or not)

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
        <VisuallyHidden>
          <DialogTitle>Модальное окно</DialogTitle>
        </VisuallyHidden>

        {isPizzaForm ? (
          <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
