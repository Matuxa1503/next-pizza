'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components/shared';
import { CheckoutFormValues } from '@/shared/constants';
import { createPayment, createStripePayment, sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    // Находим корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            variationItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Если корзина не найдена возращаем ошибку */
    if (!userCart) {
      throw new Error('Cart not found');
    }

    /* Если корзина пустая возращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: userCart.items, // prisma сама превращает это в JSON
      },
    });

    // очистка totalAmount корзины
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // удаляем товары из корзины
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // не работает Юкасса т.к проблема с регистрацией (18:39:00) ---------------------------
    // создаем новый платеж
    // const paymentData = await createPayment({
    //   amount: order.totalAmount,
    //   orderId: order.id,
    //   description: 'Оплата заказа #' + order.id,
    // });

    // if (!paymentData) {
    //   throw new Error('Payment data not found');
    // }

    // await prisma.order.update({
    //   where: {
    //     id: order.id,
    //   },
    //   data: {
    //     paymentId: paymentData.id, // id юкассы (Для возврата денег при отмене заказа)
    //   },
    // });
    // const paymentUrl = paymentData.confirmation.confirmation_url;

    // отправка письма на почту и редирект на Юкассу
    // await sendEmail(
    //   data.email,
    //   'Next pizza / оплатите заказ #' + order.id,
    //   PayOrderTemplate({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl })
    // );
    // --------------------------------------------------------------------------------------

    // Stripe (аналог Юкассы)
    const session = await createStripePayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата заказа #' + order.id,
    });

    if (!session) {
      throw new Error('Session not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: session.id, // id stripe
      },
    });
    const paymentUrl = session.url!;

    await sendEmail(
      data.email,
      'Next pizza / оплатите заказ #' + order.id,
      PayOrderTemplate({ orderId: order.id, totalAmount: order.totalAmount, paymentUrl })
    );

    return paymentUrl;
  } catch (err) {
    console.log('[Create Order]', err);
  }
}
