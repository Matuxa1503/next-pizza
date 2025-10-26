import { Cart, CartItem, Ingredient, Product, Variation } from '@prisma/client';

// схема получения данных из api/cart
export type CartItemDTO = CartItem & {
  variationItem: Variation & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  variationId: number;
  ingredients?: number[];
}
