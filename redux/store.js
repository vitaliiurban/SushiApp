import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { favoritesSlice } from "./favoritesSlice";
import { sushiSlice } from "./sushiSlice";

export const store = configureStore({
  reducer: {
    sushi: sushiSlice.reducer,
    favorites: favoritesSlice.reducer,
    cart: cartSlice.reducer,
  },
});
