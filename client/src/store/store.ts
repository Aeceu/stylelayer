import { configureStore } from "@reduxjs/toolkit";
import cartSlices from "./slices/cartSlices";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
