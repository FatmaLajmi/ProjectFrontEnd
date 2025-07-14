import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./auth.service.js";

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

const initialState = {
  user: user || null,
  token: token || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Signup
export const signup = createAsyncThunk("/signup", async (formData, thunkAPI) => {
  try {
    const data = await authService.signup(formData);
    localStorage.setItem("user", JSON.stringify(data.newUser));
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login
export const login = createAsyncThunk("/login", async ({ email, password }, thunkAPI) => {
  try {
    const data = await authService.login(email, password);
    localStorage.setItem("user", JSON.stringify(data.existingUser));
    localStorage.setItem("token", data.token);
    return {
      user: data.existingUser,
      token: data.token,
    };
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.newUser;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
