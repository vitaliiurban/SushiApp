import { createSlice } from "@reduxjs/toolkit";
// Ініціалізуємо початковий стан за допомогою порожнього масиву
const initialState = [];
// Створюємо slice (частину) стору Redux з іменем "cart"
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Визначаємо reducer функцію "addToCart", яка додає елемент до кошика
    addToCart(state, action) {
      state.push(action.payload);
    },
    // Визначаємо reducer функцію "removeFromCart", яка видаляє елемент з кошика
    removeFromCart(state, action) {
      return state.filter((item) => item.key !== action.payload);
    },
    // Визначаємо reducer функцію "updateItemCart", яка оновлює властивості елемента кошика з заданим ключем
    updateItemCart(state, action) {
      const { item, quantity } = action.payload;
      const currentItem = item;
      const updatedItems = state.map((item) =>
        item.key === currentItem.key
          ? {
              ...item,
              quantity: quantity,
              total: item.price * quantity,
              cart: true,
            }
          : item
      );
      return updatedItems;
    },
    // Визначаємо reducer функцію "clearCart", яка очищає кошик
    clearCart() {
      return [];
    },
  },
});
// Експортуємо reducer функції як названі експорти
export const { addToCart, removeFromCart, updateItemCart, clearCart } =
  cartSlice.actions;
