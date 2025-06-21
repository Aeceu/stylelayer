import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../types/order";
import { handleCreateOrder, handleGetOrders } from "../actions/orderAction";

type TInitialState = {
  orders: TOrder[];
  orderStatus: "idle" | "pending" | "completed" | "failed";
};

const initialState: TInitialState = {
  orders: [],
  orderStatus: "idle"
};

const userSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetOrders.pending, (state) => {
        state.orderStatus = "pending";
      })
      .addCase(handleGetOrders.fulfilled, (state, action) => {
        state.orderStatus = "completed";
        state.orders = action.payload;
      })
      .addCase(handleCreateOrder.pending, (state) => {
        state.orderStatus = "pending";
      })
      .addCase(handleCreateOrder.fulfilled, (state, action) => {
        state.orderStatus = "completed";
        state.orders.push(action.payload.newOrder);
      });
  }
});

export const { setOrder } = userSlice.actions;
export default userSlice.reducer;
