import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { AppDispatch } from "../store";
import { setProducts } from "../slices/productSlice";
import { TProduct } from "../types/product";

export const pageSize = 12;

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
  async ({ page }: { page: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `/products?page=${page}&pageSize=${pageSize}`
      );
      console.log(res.data);
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
    { page, category }: { page: string; category: string },
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

export const fetchSearchProductByCategory = async (
  search: string,
  category: string
) => {
  try {
    const res = await axios.get(
      `/search?search=${search}&category=${category}`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const sortProductsByPrice = (
  sort: string | null,
  category: string | null,
  rate: string | null,
  products: TProduct[],
  dispatch: AppDispatch
) => {
  let prod = [...products];

  if (sort) {
    prod =
      sort === "price-low"
        ? prod.sort((a, b) => a.price - b.price)
        : prod.sort((a, b) => b.price - a.price);
  }

  if (category) {
    prod = prod.filter((item) => item.category === category);
  }

  dispatch(setProducts(prod));
};
