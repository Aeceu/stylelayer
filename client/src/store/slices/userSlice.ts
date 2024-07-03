import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../types/user";
import { handleLogin, handleLogout, handleRefresh, handleSignup } from "../actions/userAction";

type TInitialState = {
  user: TUser | null;
  accessToken: string;
  pageLoading: boolean;
  status: "idle" | "pending" | "completed" | "failed";
};

const initialState: TInitialState = {
  user: null,
  accessToken: "",
  status: "idle",
  pageLoading: false,
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
  extraReducers(builder) {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = "completed";
      })
      .addCase(handleLogin.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(handleSignup.pending, (state) => {
        state.status = "pending";
      })
      .addCase(handleSignup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.status = "completed";
      })
      .addCase(handleSignup.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(handleRefresh.pending, (state) => {
        state.pageLoading = true;
      })
      .addCase(handleRefresh.fulfilled, (state) => {
        state.pageLoading = false;
      })
      .addCase(handleLogout.pending, (state) => {
        state.status = "pending";
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.status = "completed";
        state.user = null;
        state.accessToken = "";
      })
      .addCase(handleLogout.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
