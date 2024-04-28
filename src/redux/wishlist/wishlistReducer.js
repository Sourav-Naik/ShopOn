import { createSlice } from "@reduxjs/toolkit";
let wishlistItems = sessionStorage.getItem("wishlistItems");
wishlistItems = JSON.parse(wishlistItems);

const updateSessionStorage = (items) => {
  sessionStorage.setItem("wishlistItems", JSON.stringify(items));
};

const initialState = {
  items: wishlistItems || [], // Initialize items array as an empty array
};

export const wishlistSlice = createSlice({
  name: "wishlistItems",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      // Assuming action.payload contains the entire item object
      state.items.push(action.payload);
      updateSessionStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      // Assuming action.payload contains the id of the item to remove
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      updateSessionStorage(state.items);
    },
    updateWishlistItem: (state, action) => {
      const { id, updatedProperties } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        Object.assign(itemToUpdate, updatedProperties);
        updateSessionStorage(state.items);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, updateWishlistItem } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
