import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { handleAPIerror } from "@/lib/HandleAPIError";
import toast from "react-hot-toast";

export const handleSignup = createAsyncThunk(
  "user/handleSignup",
  async (
    {
      email,
      firstName,
      lastName,
      password,
      navigate,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      navigate: (path: string) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post("/signup", { email, password, firstName, lastName });
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/login");
      return res.data;
    } catch (error) {
      console.log(error);
      const apiError = handleAPIerror(error);
      return rejectWithValue(apiError);
    }
  }
);

export const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async (
    {
      email,
      password,
      navigate,
    }: { email: string; password: string; navigate: (path: string) => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      toast.success(res.data.message);
      navigate("/");
      return res.data;
    } catch (error) {
      console.log(error);
      const apiError = handleAPIerror(error);
      return rejectWithValue(apiError);
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
      return res.data;
    } catch (error) {
      console.log(error);
      const apiError = handleAPIerror(error);
      return rejectWithValue(apiError);
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
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.log(error);
      const apiError = handleAPIerror(error);
      return rejectWithValue(apiError);
    }
  }
);
