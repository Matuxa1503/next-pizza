'use client';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../Product-form';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden', className)}>
        <VisuallyHidden>
          <DialogTitle>Модальное окно</DialogTitle>
        </VisuallyHidden>

        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
