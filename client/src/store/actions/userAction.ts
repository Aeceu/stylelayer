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
      console.log(res.data);
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
      toast.success("Log out successfully!");
      return res.data;
    } catch (error) {
      console.log(error);
      const apiError = handleAPIerror(error);
      return rejectWithValue(apiError);
    }
  }
);

type handleUpdateUserProps = {
  user: string | undefined;
  data:
    | {
        firstName: string | undefined;
        lastName: string | undefined;
        email: string | undefined;
        username: string | undefined;
        phone: string | undefined;
        age: string | undefined;
      }
    | {
        region: string | undefined;
        province: string | undefined;
        city: string | undefined;
        baranggay: string | undefined;
        street: string | undefined;
        other: string | undefined;
      };
};

export const handleUpdateUser = createAsyncThunk(
  "user/handleUpdateUser",
  async ({ data, user }: handleUpdateUserProps, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/user/${user}`, data);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const apiError = handleAPIerror(error);
      return rejectWithValue(apiError);
    }
  }
);

export const handleUpdateUserProfile = createAsyncThunk(
  "user/handleUpdateUserProfile",
  async ({ image, userId }: { userId: string | undefined; image: string }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`/user/image/${userId}`, { data: image });
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.log(error);
      const apiError = handleAPIerror(error);
      return rejectWithValue(apiError);
    }
  }
);
