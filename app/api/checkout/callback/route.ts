import { PaymentCallbackData } from '@/@types/yookassa';
import { prisma } from '@/prisma/prisma-client';
import { OrderSuccessTemplate } from '@/shared/components/shared/email-templates';
import { OrderFailedTemplate } from '@/shared/components/shared/email-templates/order-failed';
import { sendEmail } from '@/shared/lib';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// запрос от Юкассы после выполнения оплаты (не подключена)
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData; // запрос от Юкассы

    // получаем заказ
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';

    // обновляем статус заказа
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    if (isSucceeded) {
      // передаем список товаров из заказа
      const items = JSON.parse(order.items as string) as CartItemDTO[];
      await sendEmail(order.email, 'Next Pizza / Ваш заказ успешно оформлен', OrderSuccessTemplate({ orderId: order.id, items }));
    } else {
      await sendEmail(order.email, 'Next Pizza / Ваш заказ отклонен', OrderFailedTemplate({ orderId: order.id }));
    }
  } catch (err) {
    console.log('[CHECKOUT_CALLBACK] Server error', err);
    return NextResponse.json({ error: 'Server error' });
  }

  return NextResponse.json({ received: true });
}
