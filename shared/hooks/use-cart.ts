import { useEffect } from 'react';
import { useCartStore } from '../store';
import { CartStateItem } from '../store/cart';
import { CreateCartItemValues } from '../services/dto/cart.dto';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const { items, totalAmount, fetchCartItems, updateItemQuantity, addCartItem, removeCartItem, loading } = useCartStore((state) => state);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return { items, totalAmount, updateItemQuantity, addCartItem, removeCartItem, loading };
};
