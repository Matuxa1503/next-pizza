import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from './White-block';
import { CheckoutItemDetails } from './Checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../ui';
import { FC } from 'react';

interface Props {
  totalAmount: number;
}

const VAT = 15; // захардкодили данные
const DELIVERY_PRICE = 250; // захардкодили данные

export const CheckoutSidebar: FC<Props> = ({ totalAmount }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4')}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={`${totalAmount} ₽`}
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={`${vatPrice} ₽`}
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={`${DELIVERY_PRICE} ₽`}
      />

      <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
