import { createAsyncThunk, createSlice, Draft } from "@reduxjs/toolkit";
import { BaseEntity } from "../common-types/BaseEntity";
import appAxios from "../shared-features/appAxios";
import { AxiosError } from "axios";

export interface BaseState<T extends BaseEntity> {
  items: T[];
  loading: boolean;
  error?: string;
  selectedItem?: T;
}

export const createBaseSlice = <T extends BaseEntity, TCreateDto, TUpdateDto>(
  name: string,
  endpoint: string
) => {
  const initialState: BaseState<T> = {
    items: [],
    loading: false,
  };
  
  const fetchAllWithParams = createAsyncThunk<T[], { [key: string]: any }>(
    `${name}/fetchAllWithParams`,
    async (params, { rejectWithValue }) => {
      try {
        const response = await appAxios.get(endpoint, { params });
        return response.data;
      } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const fetchAll = createAsyncThunk<T[], void>(
    `${name}/fetchAll`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await appAxios.get(endpoint);
        return response.data;
      } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const fetchByUserId = createAsyncThunk<T, string>(
    `${name}/fetchByUserId`,
    async (userId, { rejectWithValue }) => {
      try {
        const response = await appAxios.get(`${endpoint}/user/${userId}`);
        return response.data;
      } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const createOne = createAsyncThunk<T, TCreateDto>(
    `${name}/createOne`,
    async (createDto, { rejectWithValue }) => {
      try {
        const response = await appAxios.post(endpoint, createDto);
        return response.data;
      } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const updateOne = createAsyncThunk<
    boolean,
    { id: string; updateDto: TUpdateDto }
  >(`${name}/updateOne`, async ({ id, updateDto }, { rejectWithValue }) => {
    try {
       await appAxios.put(`${endpoint}/${id}`, updateDto);
      return true;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  });

  const deleteOne = createAsyncThunk<string, string>(
    `${name}/deleteOne`,
    async (id, { rejectWithValue }) => {
      try {
         await appAxios.delete(`${endpoint}/${id}`);
        return id;
      } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const fetchById = createAsyncThunk<T, string>(
    `${name}/fetchById`,
    async (id, { rejectWithValue }) => {
      try {
        const response = await appAxios.get(`${endpoint}/${id}`);
        return response.data;
      } catch (e) {
        const error = e as AxiosError;
        return rejectWithValue(error.response?.data);
      }
    }
  );

  const baseSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // Fetch all with params
      builder.addCase(fetchAllWithParams.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.items = action.payload as Draft<T>[];
      });
      builder.addCase(fetchAllWithParams.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      });
      builder.addCase(fetchAllWithParams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      // Fetch all without params
      builder.addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.items = action.payload as Draft<T>[];
      });
      builder.addCase(fetchAll.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      });
      builder.addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      // Fetch by id
      builder.addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.selectedItem = action.payload as Draft<T>;
      });
      builder.addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      });
      builder.addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      // Fetch by user id
      builder.addCase(fetchByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.selectedItem = action.payload as Draft<T>;
      });
      builder.addCase(fetchByUserId.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      });
      builder.addCase(fetchByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      // Create one
      builder.addCase(createOne.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      });
      builder.addCase(createOne.fulfilled, (state, action) => {
        state.items.push(action.payload as Draft<T>);
        state.loading = false;
        state.error = undefined;
      });
      builder.addCase(createOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      // Update one
      builder.addCase(updateOne.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      });
      builder.addCase(updateOne.fulfilled, (state) => {
        state.loading = false;
        state.error = undefined;
      });
      builder.addCase(updateOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      // Delete one
      builder.addCase(deleteOne.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      });
      builder.addCase(deleteOne.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload); 
        state.error = undefined;
      });
      builder.addCase(deleteOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    },
  });

  return {
    slice: baseSlice,
    actions: { fetchAllWithParams, fetchAll, fetchById, fetchByUserId, createOne, updateOne, deleteOne },
  };
};

export default createBaseSlice;
