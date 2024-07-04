import { createSlice } from "@reduxjs/toolkit";
import { TCartItem } from "../types/cart";
import { getUserCart, handleAddToCart, handleRemoveFromCart } from "../actions/cartActions";

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
      state.cart = state.cart.filter((item) => item.product.name !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.cart = action.payload.cartItem;
      })
      .addCase(handleAddToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleAddToCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleAddToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload.cartItem);
        state.loading = false;
      })
      .addCase(handleRemoveFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload.cartItem.id);
      });
  },
});

export const { setCart, addtoCart, clearCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
