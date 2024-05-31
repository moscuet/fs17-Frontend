import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import appAxios from "../../shared-features/appAxios";
import { AxiosError } from "axios";
import { UserCreateDto, UserReadDto, UserUpdateDto } from "./userDto";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

interface UserState {
  data: UserReadDto | null;
  loading: boolean;
  error?: string;
  isRegistered: boolean;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: undefined,
  isRegistered: false,
};

export const signup = createAsyncThunk<
  UserReadDto,
  UserCreateDto,
  { rejectValue: string }
>("user/signup", async (UserCreateDto, { rejectWithValue }) => {
  try {
    const response = await appAxios.post(
      "/api/v1/users/register",
      UserCreateDto
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.data) {
      return rejectWithValue(
        JSON.stringify(axiosError.response.data) || "Fetch failed"
      );
    }
    return rejectWithValue("Resigtarion failed");
  }
});

export const fetchCurrentUser = createAsyncThunk<
  UserReadDto,
  void,
  { rejectValue: string }
>("user/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await appAxios.get("/api/v1/users/me");
    toast.success("Account created successfully");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.data) {
      return rejectWithValue(
        JSON.stringify(axiosError.response.data) || "Fetch failed"
      );
    }
    return rejectWithValue("Fetch failed");
  }
});

export const updateCurrentUser = createAsyncThunk<
  boolean,
  UserUpdateDto,
  { rejectValue: string }
>("user/updateCurrentUser", async (updateDto, { rejectWithValue }) => {
  try {
    await appAxios.put("/api/v1/users/me", updateDto);
    return true;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.data) {
      return rejectWithValue(
        JSON.stringify(axiosError.response.data) || "Update failed"
      );
    }
    return rejectWithValue("Update failed");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetRegistrationState(state) {
      state.isRegistered = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      signup.fulfilled,
      (state, action: PayloadAction<UserReadDto>) => {
        state.loading = false;
        state.error = undefined;
        state.isRegistered = true;
      }
    );
    builder.addCase(
      signup.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
        state.isRegistered = false;
      }
    );

    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<UserReadDto>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = undefined;
      }
    );
    builder.addCase(
      fetchCurrentUser.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.loading = false;
        state.data = null;
      }
    );

    builder.addCase(updateCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCurrentUser.fulfilled, (state) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(
      updateCurrentUser.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.loading = false;
      }
    );
  },
});
export const { resetRegistrationState } = userSlice.actions;
export const { reducer: userReducer } = userSlice;
export const userActions = {
  signup,
  fetchCurrentUser,
  updateCurrentUser,
  resetRegistrationState
};
