import { createAsyncThunk } from "@reduxjs/toolkit";
import { TNewOrder } from "../types/order";
import axios from "../api/axios";

export const handleCreateOrder = createAsyncThunk(
  "order/handleCreateOrder",
  async ({ address, cartItem, userId }: TNewOrder, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/order/${userId}`, { cartItem, address });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const handleGetOrders = createAsyncThunk(
  "order/handleGetOrders",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/order/user/${userId}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const handleGetOrderById = createAsyncThunk(
  "order/handleGetOrderById",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/order/${orderId}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
