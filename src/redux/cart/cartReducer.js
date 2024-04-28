import { createSlice } from "@reduxjs/toolkit";
let cartItems = sessionStorage.getItem("cartItems");
cartItems = JSON.parse(cartItems);

const updateSessionStorage = (items) => {
  sessionStorage.setItem("cartItems", JSON.stringify(items));
};

const initialState = {
  items: cartItems || [], // Initialize items array as an empty array
};

export const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Assuming action.payload contains the entire item object
      state.items.push(action.payload);
      updateSessionStorage(state.items);
    },
    removeFromCart: (state, action) => {
      // Assuming action.payload contains the id of the item to remove
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      updateSessionStorage(state.items);
    },
    updateCartItem: (state, action) => {
      const { id, updatedProperties } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        Object.assign(itemToUpdate, updatedProperties);
        updateSessionStorage(state.items);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem } = cartSlice.actions;

export default cartSlice.reducer;
