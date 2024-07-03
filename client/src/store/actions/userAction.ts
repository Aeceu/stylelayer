import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const handleSignup = createAsyncThunk(
  "user/handleSignup",
  async (
    {
      email,
      firstName,
      lastName,
      password,
    }: { email: string; password: string; firstName: string; lastName: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post("/login", { email, password, firstName, lastName });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const handleRefresh = createAsyncThunk(
  "user/handleRefresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/refresh", {
        withCredentials: true,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const handleLogout = createAsyncThunk(
  "user/handleLogout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/logout", {
        withCredentials: true,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
