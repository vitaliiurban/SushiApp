import { createSlice } from "@reduxjs/toolkit";
import { sushi } from "./sushi";

// Ініціалізуємо початковий стан за допомогою об'єкта, який містить масив sushi
const initialState = {
  sushi,
};

// Створюємо slice (частину) стору Redux з іменем "sushi"
export const sushiSlice = createSlice({
  name: "sushi",
  initialState,
  reducers: {
    // Визначаємо reducer функцію "toggleFavorite", яка змінює властивість "favorites" для елемента sushi з заданим ключем
    toggleFavorite: (state, action) => {
      const updatedItems = state.sushi.map((item) =>
        item.key === action.payload
          ? { ...item, favorites: !item.favorites }
          : item
      );
      return {
        ...state,
        sushi: updatedItems,
      };
    },
  },
});

// Експортуємо reducer функції як названі експорти
export const { toggleFavorite } = sushiSlice.actions;
