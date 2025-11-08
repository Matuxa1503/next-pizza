import React, { FC } from 'react';

interface Props {
  orderId: number;
}

export const OrderFailedTemplate: FC<Props> = ({ orderId }) => {
  return (
    <div>
      <h1>Неудача! </h1>

      <p>Ваш заказ #{orderId} отклонен.</p>
    </div>
  );
};
