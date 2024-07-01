import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const getCategories = async () => {
  try {
    const res = await axios.get("/categories");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async ({ page, pageSize }: { page: string; pageSize: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/products?page=${page}&pageSize=${pageSize}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "cart/fetchProductsByCategory",
  async (
    { page, pageSize, category }: { page: string; pageSize: string; category: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `/products?page=${page}&pageSize=${pageSize}&category=${category}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const fetchSearchProduct = async (search: string) => {
  try {
    const res = await axios.get(`/search?search=${search}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchSearchProductByCategory = async (search: string, category: string) => {
  try {
    const res = await axios.get(`/search?search=${search}&category=${category}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
