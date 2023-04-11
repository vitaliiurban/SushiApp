import { createSlice } from "@reduxjs/toolkit";

// Ініціалізація початкового стану порожнім масивом
const initialState = [];

// Створення фрагмента магазину Redux під назвою обране
export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Визначення функції скорочення під назвою "addFavorite", яка додає новий елемент до масиву стану
    addFavorite(state, action) {
      state.push(action.payload);
    },
    // Визначення функції редуктора під назвою "removeFavorite", яка видаляє елемент із масиву стану на основі його ключа
    removeFavorite(state, action) {
      return state.filter((item) => item.key !== action.payload);
    },
    // Визначення функції редуктора під назвою "updateItemFavorite", яка оновлює елемент у масиві стану, щоб перемикати його властивість "favorites"
    updateItemFavorite(state, action) {
      const updatedItems = state.map((item) =>
        item.key === action.payload
          ? {
              ...item,
              favorites: !item.favorites,
            }
          : item
      );
      return updatedItems;
    },
  },
});

// Експорт функцій редуктора як іменований експорт
export const { addFavorite, removeFavorite, updateItemFavorite } =
  favoritesSlice.actions;
