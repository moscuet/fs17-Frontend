import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import appAxios from "../../shared-features/appAxios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AxiosErrorResponse } from "../auth/authSlice";
import { ProductCreateDto, ProductReadDto, ProductUpdateDto, QueryProductReadDto } from "./productDto";
import createBaseSlice, { BaseState } from "../../app/baseSlice";

interface ProductState extends BaseState<ProductReadDto> {
  data: QueryProductReadDto | null;

}

const initialState: ProductState = {
  data: null,
  items: [],
  loading: false
};

// Create the base slice using createBaseSlice
const { actions: baseActions } = createBaseSlice<
  ProductReadDto,
  ProductCreateDto,
  ProductUpdateDto
>("products", "/api/v1/products");

export const fetchAllWithQuery= createAsyncThunk<
  QueryProductReadDto,
  { [key: string]: any },
  { rejectValue: string }
>("products/fetchAllWithQuery", async (params, { rejectWithValue }) => {
  try {
    const response = await appAxios.get<QueryProductReadDto>("/api/v1/products", { params });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<AxiosErrorResponse>;
    if (axiosError.response && axiosError.response.data) {
      const errorMessage = axiosError.response.data.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
    toast.error("Failed to fetch products");
    return rejectWithValue("Failed to fetch products");
  }
});

// Create the products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllWithQuery.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllWithQuery.fulfilled, (state, action: PayloadAction<QueryProductReadDto>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchAllWithQuery.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
      state.loading = false;
      state.data = null;
    });

    builder.addCase(baseActions.fetchById.fulfilled, (state, action: PayloadAction<ProductReadDto>) => {
      state.selectedItem = action.payload; 
      state.loading = false;
    })
    builder.addCase(baseActions.fetchById.pending, (state) => {
      state.loading = true;
    })

    builder.addCase(baseActions.fetchById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });    
  },
});

export const { reducer: productsReducer } = productsSlice;
export const productsActions = {
  fetchAllWithQuery,
  createProduct: baseActions.createOne,
  updateProduct: baseActions.updateOne,
  deleteProduct: baseActions.deleteOne,
  fetchById: baseActions.fetchById,
};

export default productsReducer;
