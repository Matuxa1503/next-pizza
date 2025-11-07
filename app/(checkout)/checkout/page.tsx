'use client';

import { Container, Title } from '@/shared/components/shared';
import { useCart } from '@/shared/hooks';
import { CheckoutSidebar } from '@/shared/components/shared/Checkout-sidebar';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from '@/shared/components/shared/checkout';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, totalAmount, updateItemQuantity, addCartItem, removeCartItem, loading } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: { email: '', firstName: '', lastName: '', phone: '', address: '', comment: '' },
  });

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);
      const url = await createOrder(data); // url - ссылка на оплату

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', { icon: '✅' });
      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', { icon: '❌' });
    }
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              {/* 1. Корзина */}
              <CheckoutCart items={items} onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} loading={loading} />

              {/* 2. Персональные данные */}
              <CheckoutPersonalForm className={cn({ 'opacity-40 pointer-events-none': loading })} />

              {/* 3. Адрес доставки */}
              <CheckoutAddressForm className={cn({ 'opacity-40 pointer-events-none': loading })} />
            </div>

            {/* Правая часть */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
