import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
  const sizes = params.sizes?.split(',').map(Number);
  const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
  const ingredientsIdArr = params.ingredients?.split(',').map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsIdArr
            ? {
                some: {
                  id: {
                    in: ingredientsIdArr, // some означает: “хотя бы один элемент в массиве ingredients удовлетворяет условию”. проверка: id ингредиента находится в массиве ingredientsIdArr.
                  },
                },
              }
            : undefined,
          variations: {
            some: {
              size: {
                in: sizes, // такая же проверка только на размеры пицц.
              },
              pizzaType: {
                in: pizzaTypes, // такая же проверка только на типы пицц.
              },
              price: {
                gte: minPrice, // gte(большего или равно) minPrice
                lte: maxPrice, // lte(меньше или равно) maxPrice
              },
            },
          },
        },
        include: {
          ingredients: true,
          variations: {
            where: {
              price: {
                // проверка на цену в заданном диапазоне (от и до) на range
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc', // сортировка доступнх цен у productItem от самого дешевого до самого дорогого
            },
          },
        },
      },
    },
  });

  return categories;
};
