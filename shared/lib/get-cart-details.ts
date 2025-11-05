import { CartDTO } from '../services/dto/cart.dto';
import { CartStateItem } from '../store/cart';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

// обработка данных
export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.variationItem.product.name,
    imageUrl: item.variationItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.variationItem.size,
    pizzaType: item.variationItem.pizzaType,
    disabled: false,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];

  return {
    totalAmount: data.totalAmount,
    items,
  };
};
