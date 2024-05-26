import { createAsyncThunk, createSlice, Draft } from "@reduxjs/toolkit";
import { BaseEntity } from "../common-types/BaseEntity";
import appAxios from "../shared-features/appAxios";
import { AxiosError } from "axios";

interface BaseState<T extends BaseEntity> {
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
      const response = await appAxios.post(`${endpoint}/${id}`, updateDto);
      return true;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  });

  const deleteOne = createAsyncThunk<T, string>(
    `${name}/deleteOne`,
    async (id, { rejectWithValue }) => {
      try {
        const response = await appAxios.delete(`${endpoint}/${id}`);
        return response.data;
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
      builder.addCase(fetchAllWithParams.pending, (state, action) => {
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
        builder.addCase(fetchAll.pending, (state, action) => {
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
      builder.addCase(fetchById.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      });
      builder.addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      builder
        .addCase(createOne.pending, (state) => {
          state.loading = true;
          state.error = undefined;
        })
        .addCase(createOne.fulfilled, (state, action) => {
          state.items.push(action.payload as Draft<T>);
          state.loading = false;
          state.error = undefined;
        })
        .addCase(createOne.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });

      builder
        .addCase(updateOne.pending, (state) => {
          state.loading = true;
          state.error = undefined;
        })
        .addCase(updateOne.fulfilled, (state, action) => {
          state.loading = false;
          state.error = undefined;
        })
        .addCase(updateOne.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });

      builder
        .addCase(deleteOne.pending, (state) => {
          state.loading = true;
          state.error = undefined;
        })
        .addCase(deleteOne.fulfilled, (state, action) => {
          state.items = state.items.filter(
            (item) => item.id !== (action.payload as T).id
          );
          state.error = undefined;
        })
        .addCase(deleteOne.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });

  return {
    slice: baseSlice,
    actions: { fetchAllWithParams, fetchAll, fetchById },
  };
};

export default createBaseSlice;

// [

//   {
//     "id": "1d4b7604-d88c-4d5b-a6ed-6fd454dda00d",
//     "name": "Music",
//     "parentCategoryId": null,
//     "imageUrl": "image_url10"
//   },
//   {
//     "id": "1d4b7604-d88c-4d5b-a6ed-6fd454dda029",
//     "title": "Fitness Gear",
//     "description": "Essential fitness equipment",
//     "imageUrl": "Fitness_Gear.jpg",
//     "price": 59.99,
//     "categoryId": "1d4b7604-d88c-4d5b-a6ed-6fd454dda009",
//     "products": [],
//     "reviews": []
//   }
// ]
