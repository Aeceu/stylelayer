import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../types/user";

type TInitialState = {
  user: TUser | null;
  status: "idle" | "pending" | "completed" | "failed";
};

const initialState: TInitialState = {
  user: null,
  status: "idle",
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
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
