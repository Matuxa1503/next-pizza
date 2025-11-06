import { FC } from 'react';
import { WhiteBlock } from '../White-block';
import { getCartItemDetails } from '@/shared/lib';
import { CartStateItem } from '@/shared/store/cart';
import { CheckoutItem } from '../Checkout-item';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CheckoutItemSkeleton } from '../Checkout-item-skeleton';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: FC<Props> = ({ items, onClickCountButton, removeCartItem, loading, className }) => {
  return (
    <WhiteBlock title="1. Корзина">
      <div className="flex flex-col gap-5">
        {loading && [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)}
        {!loading &&
          items.length > 0 &&
          items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              quantity={item.quantity}
              details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
              disabled={item.disabled}
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}
      </div>
    </WhiteBlock>
  );
};
