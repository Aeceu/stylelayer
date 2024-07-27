import { configureStore } from "@reduxjs/toolkit";
import cartSlices from "./slices/cartSlices";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlices,
    product: productSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
