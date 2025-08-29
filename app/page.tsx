import { Container, Filters, Title, TopBar } from '@/components/shared';
import { ProductsGroupList } from '@/components/shared/Products-group-list';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Cписок товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 6,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={1}
              />

              <ProductsGroupList
                title="Комбо"
                items={[
                  {
                    id: 1,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 6,
                    name: 'Чизбургер-пицца',
                    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0196d9b2e34b71aea9285add35216a14.avif',
                    price: 500,
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
