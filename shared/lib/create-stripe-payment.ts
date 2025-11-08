import Stripe from 'stripe';

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

// Stripe - аналог Юкассы
export const createStripePayment = async (details: Props) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-10-29.clover',
  });

  // Допустим, курс доллара — 0.012 (1 рубль = 0.012 доллара)
  const usdAmount = details.amount * 0.012;

  // Stripe принимает сумму в центах → умножаем на 100 и округляем
  const unitAmount = Math.round(usdAmount * 100);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd', // валюта платежа
          product_data: {
            name: details.description, // описание заказа
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      order_id: details.orderId,
    },
    success_url: process.env.STRIPE_SUCCESS_URL!, // url после оплаты
    cancel_url: process.env.STRIPE_CANCEL_URL!, // url после отказа
  });

  return session;
};
