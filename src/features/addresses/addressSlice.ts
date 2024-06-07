import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import appAxios from "../../shared-features/appAxios";
import { AxiosError } from "axios";
import createBaseSlice from "../../app/baseSlice";
import {
  AddressCreateDto,
  AddressReadDto,
  AddressUpdateDto,
} from "./addressDto";
import { toast } from "react-toastify";
import { AxiosErrorResponse } from "../auth/authSlice";

interface AddressState {
  items: AddressReadDto[];
  loading: boolean;
  error?: string;
}

const initialState: AddressState = {
  items: [],
  loading: false,
  error: undefined,
};

// Create the base slice using createBaseSlice
const { actions: baseActions } = createBaseSlice<
  AddressReadDto,
  AddressCreateDto,
  AddressUpdateDto
>("addresses", "/api/v1/addresses");

// Async thunk for fetching addresses by user ID
export const fetchAddressByUserId = createAsyncThunk<
  AddressReadDto[],
  string,
  { rejectValue: string }
>("addresses/fetchAddressByUserId", async (userId, { rejectWithValue }) => {
  try {
    const response = await appAxios.get(`/api/v1/addresses/user/${userId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<AxiosErrorResponse>;
    if (axiosError.response && axiosError.response.data) {
      const errorMessage = axiosError.response.data.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
    toast.error("Login failed");
    return rejectWithValue("Login failed");
  }
});

// Create the address slice
const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddressByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAddressByUserId.fulfilled,
      (state, action: PayloadAction<AddressReadDto[]>) => {
        state.items = action.payload;
        state.loading = false;
        state.error = undefined;
      }
    );
    builder.addCase(
      fetchAddressByUserId.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload;
        state.loading = false;
        state.items = [];
      }
    );

    builder.addCase(baseActions.updateOne.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(baseActions.updateOne.fulfilled, (state) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(
      baseActions.updateOne.rejected,
      (state, action: ReturnType<typeof baseActions.updateOne.rejected>) => {
        state.error = action.payload as string;
        state.loading = false;
      }
    );
  },
});

export const { reducer: addressReducer } = addressSlice;
export const addressActions = {
  fetchAddressByUserId,
  createAddress: baseActions.createOne,
  updateAddress: baseActions.updateOne,
  deleteAddress: baseActions.deleteOne,
};
