import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../types/product";
import { fetchProducts, fetchProductsByCategory } from "../actions/productActions";

type TInitialState = {
  products: TProduct[];
  status: "idle" | "pending" | "completed" | "failed";
  totalPage: number;
};

const initialState: TInitialState = {
  products: [],
  status: "idle",
  totalPage: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.status = "idle";
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "completed";
        state.products = action.payload.products;
        state.totalPage = action.payload.totalPages;
        state.status = "idle";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "completed";
        state.products = action.payload.products;
        state.totalPage = action.payload.totalPages;
        state.status = "idle";
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clearProducts, setTotalPage } = productSlice.actions;
export default productSlice.reducer;
