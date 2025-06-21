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
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const handleGetOrderById = async (orderId: string) => {
  try {
    const res = await axios.get(`/order/${orderId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

type THandleGetOrderByStatus = {
  userId: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED";
};

export const HandleGetOrderByStatus = createAsyncThunk(
  "order/HandleGetOrderByStatus",
  async ({ status, userId }: THandleGetOrderByStatus, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/order/status/${userId}`, { status });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
