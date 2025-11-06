'use client';

import { FC } from 'react';
import { WhiteBlock } from '../White-block';
import { FormTextarea } from '../form-components';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../Error-text';
import dynamic from 'next/dynamic';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  // импортируем без SSR. Криво работает из за гидрации. Прыгает инпут но состояние в react-hook-form сохраняется
  const AddressInput = dynamic(() => import('../Address-input').then((m) => m.AddressInput), { ssr: false });

  return (
    <WhiteBlock className={className} title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        {/* Controller из react-hook-form для валидации левых компонент которые не валидируются */}
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />
        <FormTextarea rows={5} className="text-base" placeholder="Комментарий к заказу" name="comment" />
      </div>
    </WhiteBlock>
  );
};
