import { handleAPIerror } from "@/lib/HandleAPIError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import toast from "react-hot-toast";

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/cart/${userId}`);
      return res.data;
    } catch (error) {
      console.log(error);
      const apiError = handleAPIerror(error);
      return rejectWithValue(apiError);
    }
  }
);

export const handleAddToCart = createAsyncThunk(
  "cart/handleAddToCart",
  async (
    {
      userId,
      productId,
      quantity,
      variants,
    }: {
      userId: string | null;
      productId: string;
      variants: { name: string; option: string }[];
      quantity: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`/cart/${userId}`, {
        productId,
        quantity,
        variants,
      });
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.log(error);
      const apiError = handleAPIerror(error);
      toast.error("Error adding item to cart!");
      return rejectWithValue(apiError);
    }
  }
);

export const handleRemoveFromCart = createAsyncThunk(
  "cart/handleRemoveFromCart",
  async (cartItemId: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/cart/${cartItemId}`);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.log(error);
      const apiError = handleAPIerror(error);
      toast.error("Error from item from cart!");
      return rejectWithValue(apiError);
    }
  }
);
