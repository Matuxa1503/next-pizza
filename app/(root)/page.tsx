import { Container, Filters, Title, TopBar } from '@/shared/components/shared';
import { ProductsGroupList } from '@/shared/components/shared/Products-group-list';
import { Suspense } from 'react';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
  const params = await searchParams;
  const categories = await findPizzas(params);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Cписок товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList key={category.id} title={category.name} items={category.products} categoryId={category.id} />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
