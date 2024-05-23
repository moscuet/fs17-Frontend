import { createAsyncThunk, createSlice, Draft } from "@reduxjs/toolkit";
import { BaseEntity } from "../common-types/BaseEntity";
import appAxios from "../shared-features/appAxios";
import { AxiosError } from "axios";

interface BaseState<T extends BaseEntity> {
    items: T[];
    loading: boolean;
    error?: string;
    selectedItem?: T
}

export const createBaseSlice = <T extends BaseEntity, TCreateDto, TUpdateDto>(name: string, endpoint: string) => {
    const initialState: BaseState<T> =
    {
        items: [],
        loading: false,
    }

    const fetchAll = createAsyncThunk<T[]>(
        `${name}/fetchAll`,
        async (_, { rejectWithValue}) => {
            try {
                const response = await appAxios.get(endpoint)
                return response.data
            } catch (e) {
                const error = e as AxiosError
                return rejectWithValue(error.response?.data)
            }
        }
    )

    const createOne = createAsyncThunk<T, TCreateDto>(
        `${name}/createOne`,
        async (createDto, { rejectWithValue }) => {
            try {
                const response = await appAxios.post(endpoint, createDto)
                return response.data
            } catch (e) {
                const error = e as AxiosError
                return rejectWithValue(error.response?.data)
            }
        }
    )

    const updateOne = createAsyncThunk<boolean, {id: string, updateDto: TUpdateDto}>(
        `${name}/updateOne`,
        async ({id, updateDto}, { rejectWithValue }) => {
            try {
                const response = await appAxios.post(`${endpoint}/${id}`, updateDto)
                return response.data
            } catch (e) {
                const error = e as AxiosError
                return rejectWithValue(error.response?.data)
            }
        }
    )

    const fetchById = createAsyncThunk<T, string>(
        `${name}/fetchById`,
        async (id, { rejectWithValue }) => {
            try {
                const response = await appAxios.get(`${endpoint}/${id}`)
                return response.data
            } catch (e) {
                const error = e as AxiosError
                return rejectWithValue(error.response?.data)
            }
        }
    )

    const baseSlice = createSlice({
        name,
        initialState,
        reducers: {},
        extraReducers: (builder) => {

            // Fetch all
            builder.addCase(fetchAll.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.items = action.payload as Draft<T>[] // only happen with generics in redux TS
            })
            builder.addCase(fetchAll.pending, (state, action) => {
                state.loading = true
                state.error = undefined
            })
            builder.addCase(fetchAll.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // Fetch by id
            builder.addCase(fetchById.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.selectedItem = action.payload as Draft<T>
            })
            builder.addCase(fetchById.pending, (state, action) => {
                state.loading = true
                state.error = undefined
            })
            builder.addCase(fetchById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

        }
    })

    return {
        slice: baseSlice,
        actions: {fetchAll, fetchById}
    }

}

export default createBaseSlice