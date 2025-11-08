import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React, { FC } from 'react';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: FC<Props> = ({ orderId, items }) => {
  return (
    <div>
      <h1>Спасибо за покупку! 🎉</h1>

      <p>Ваш заказ #{orderId} оплачен. Список товаров:</p>

      <hr />

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.variationItem.product.name} | {item.variationItem.price} ₽ x {item.quantity} шт. ={' '}
            {item.variationItem.price * item.quantity} ₽
          </li>
        ))}
      </ul>
    </div>
  );
};
