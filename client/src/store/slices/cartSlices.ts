import { createSlice } from "@reduxjs/toolkit";
import { TCartItem } from "../types/cart";

type TInitialState = {
  cart: TCartItem[];
  loading: boolean;
  status: "idle" | "pending" | "completed" | "failed";
};

const initialState: TInitialState = {
  cart: [],
  loading: false,
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addtoCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.item.productName !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setCart, addtoCart, clearCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
