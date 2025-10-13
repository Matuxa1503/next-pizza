'use client';

import { FC, PropsWithChildren } from 'react';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { CartDrawerItem } from './Cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';

interface Props {
  className?: string;
}

export const CartDrawer: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">3 товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className="overflow-auto flex-1">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              name="Пицца Маргарита"
              details={getCartItemDetails(1, 30, [{ name: 'Моцарелла' }, { name: 'Помидоры' }, { name: 'Оливки' }])}
              quantity={1}
              price={500}
              imageUrl="/assets/pizza-img/11EE7D610CF7E265B7C72BE5AE757CA7.webp"
            />
          </div>
        </div>

        <SheetFooter className=" bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">500 ₽</span>
            </div>
          </div>

          <Link href="/checkout">
            <Button type="submit" className="w-full h-12 text-base">
              Оформить заказ
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
