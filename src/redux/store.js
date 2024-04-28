import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartReducer";
import wishlistReducer from "./wishlist/wishlistReducer";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
