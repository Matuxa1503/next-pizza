import { prisma } from '@/prisma/prisma-client';
import { findOrCreateCart } from '@/shared/lib/find-or-create-cart';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    // find user for token and return data
    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            variationItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as CreateCartItemValues;

    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        variationId: data.variationId,
        ingredients: {
          every: {
            id: { in: data.ingredients }, // check ingredients in CartItem. Prisma не умеет правильно обрабатывать этот запрос. Поэтому только через костыль можно решить проблему
          },
        },
      },
    });

    // Если товар был выбран в UI еще раз, делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      // Если товар не был найден, создаем
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          variationId: data.variationId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((id) => ({ id })),
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedUserCart);
    response.cookies.set('cartToken', token);
    return response;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}
