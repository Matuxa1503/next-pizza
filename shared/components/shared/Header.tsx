'use client';

import { cn } from '@/shared/lib/utils';
import { FC, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import { Container } from './Container';
import Link from 'next/link';
import { SearchInput } from './Search-input';
import { CartButton } from './Cart-button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  // хук только для получения search param "paid" чтобы показать тостер об успехе заказа
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.has('paid')) {
      toast.success('Заказ успешно оплачен! Информация отправлена на почту.');
    }

    // очищаем URL без перезагрузки
    router.replace(pathname);
  }, [searchParams, router, pathname]);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
