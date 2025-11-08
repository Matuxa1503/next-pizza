import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/prisma/prisma-client';
import { sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderFailedTemplate, OrderSuccessTemplate } from '@/shared/components/shared/email-templates';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

export async function POST(req: NextRequest) {
  // специальная подпись (stripe-signature), чтобы сервер мог проверить, что запрос пришёл от Stripe и не был подделан.
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();

  let event: Stripe.Event;

  // Stripe проверяет подпись и возвращает объект события (event). Если подпись не совпадает — выбрасывается ошибка
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET! // ключ из Dashboard
    );
  } catch (err: any) {
    console.error('[STRIPE_WEBHOOK] Signature error:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.order_id; // номер заказа который человек создавал

  const order = await prisma.order.findFirst({ where: { id: Number(orderId) } });
  if (!order) return NextResponse.json({ error: 'Order not found' });

  // Обрабатываем успешный платёж
  if (event.type === 'checkout.session.completed') {
    if (!orderId) {
      console.error('[STRIPE_WEBHOOK] No order_id found');
      return NextResponse.json({ received: true });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: OrderStatus.SUCCEEDED,
      },
    });

    const items = order.items as unknown as CartItemDTO[];
    await sendEmail(order.email, 'Next Pizza / Ваш заказ успешно оформлен', OrderSuccessTemplate({ orderId: order.id, items }));
  }

  // отменённый платёж
  if (event.type === 'checkout.session.expired') {
    if (orderId) {
      await prisma.order.update({
        where: { id: Number(orderId) },
        data: { status: OrderStatus.CANCELLED },
      });

      await sendEmail(order.email, 'Next Pizza / Ваш заказ отклонен', OrderFailedTemplate({ orderId: order.id }));
    }
  }
}
