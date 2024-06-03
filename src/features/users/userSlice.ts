import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import appAxios from "../../shared-features/appAxios";
import { AxiosError } from "axios";
import { UserCreateDto, UserReadDto, UserUpdateDto } from "./userDto";
import { logout } from "../auth/authSlice";
import { toast } from "react-toastify";

interface UserState {
  loading: boolean;
  error?: string;
}

const initialState: UserState = {
  loading: false,
  error: undefined,
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



export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await appAxios.delete("/api/v1/users/me");
      toast.success("Your account deleted! We hope to get you back soon!");
      dispatch(logout()); 
      return;
    }  catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(
          JSON.stringify(axiosError.response.data) || "Update failed"
        );
      }
      return rejectWithValue("Delete failed");
    }
  }
);


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      signup.fulfilled,
      (state, action: PayloadAction<UserReadDto>) => {
        state.loading = false;
        state.error = undefined;
      }
    );
    builder.addCase(
      signup.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
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

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.error = undefined;
    });


  },
});
export const { reducer: userReducer } = userSlice;
export const userActions = {
  signup,
  deleteUser,
  updateCurrentUser,
};
