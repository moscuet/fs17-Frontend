import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import appAxios from "../../shared-features/appAxios";
import { AxiosError } from "axios";
import { UserReadDto, UserUpdateDto } from "./userDto";

interface UserState {
  data: UserReadDto | null;
  loading: boolean;
  error?: string;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: undefined,
};

export const fetchCurrentUser = createAsyncThunk<UserReadDto, void, { rejectValue: string }>(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await appAxios.get("/api/v1/users/me"); 
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(JSON.stringify(axiosError.response.data) || 'Fetch failed');
      }
      return rejectWithValue("Fetch failed");
    }
  }
);

export const updateCurrentUser = createAsyncThunk<boolean, UserUpdateDto, { rejectValue: string }>(
  'user/updateCurrentUser',
  async (updateDto, { rejectWithValue }) => {
    try {
      await appAxios.put("/api/v1/users/me", updateDto);
      return true;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(JSON.stringify(axiosError.response.data) || 'Update failed');
      }
      return rejectWithValue("Update failed");
    }
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<UserReadDto>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
      state.loading = false;
      state.data = null;
    });

    builder.addCase(updateCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCurrentUser.fulfilled, (state) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(updateCurrentUser.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { reducer: userReducer } = userSlice;
export const userActions = {
  fetchCurrentUser,
  updateCurrentUser, 
};
