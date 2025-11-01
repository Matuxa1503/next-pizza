'use client';
import { FC, useEffect, useRef } from 'react';
import { Title } from './Title';
import { cn } from '@/shared/lib/utils';
import { useIntersection } from 'react-use';
import { ProductCard } from './Product-card';
import { useCategoryStore } from '@/shared/store';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: FC<Props> = ({ title, items, listClassName, categoryId, className }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
    threshold: 0.4,
  });

  useEffect(() => {
    // отслеживание текущей категории товаров
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            ingredients={product.ingredients}
            price={product.variations[0].price}
          />
        ))}
      </div>
    </div>
  );
};
