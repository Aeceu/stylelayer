/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../types/user";
import {
  handleLogin,
  handleLogout,
  handleRefresh,
  handleSignup,
  handleUpdateUser,
  handleUpdateUserProfile,
} from "../actions/userAction";

type TInitialState = {
  user: TUser | null;
  accessToken: string;
  pageLoading: boolean;
  status: "idle" | "pending" | "completed" | "failed";
  error: any | null;
};

const initialState: TInitialState = {
  user: null,
  accessToken: "",
  status: "idle",
  pageLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.accessToken = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = "completed";
        state.error = null;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(handleSignup.pending, (state) => {
        state.status = "pending";
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = "completed";
      })
      .addCase(handleSignup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(handleRefresh.pending, (state) => {
        state.pageLoading = true;
      })
      .addCase(handleRefresh.fulfilled, (state, action) => {
        state.pageLoading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(handleRefresh.rejected, (state) => {
        state.pageLoading = false;
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = "";
      })
      .addCase(handleUpdateUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(handleUpdateUser.fulfilled, (state, action) => {
        state.status = "completed";
        state.user = action.payload.user;
      })
      .addCase(handleUpdateUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(handleUpdateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
