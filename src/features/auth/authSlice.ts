import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import appAxios from '../../shared-features/appAxios';
import { UserReadDto } from '../users/userDto';
import { RootState } from '../../app/store';

interface AuthState {
  user: UserReadDto| null; 
  token: string | null;
  loading: boolean;
  error?: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error:  undefined
};

interface LoginPayload {
  email: string;
  password: string;
}



export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await appAxios.post('/api/v1/auth/login', payload);
      const { accessToken, user } = response.data;

      localStorage.setItem('token', accessToken);
      return { user, token: accessToken };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data || 'Login failed');
      }
      return rejectWithValue('Login failed');
    }
  }
);
export const fetchUserByToken = createAsyncThunk(
  'auth/fetchUserByToken',
  async (_, { getState, rejectWithValue }) => {
      const state = getState() as RootState; 
      const token = state.auth.token || localStorage.getItem('token');

      if (!token) {
          return rejectWithValue('No token available');
      }

      try {
          const response = await appAxios.get('/api/v1/users/me', {
              headers: { Authorization: `Bearer ${token}` }
          });
          return {user:response.data, token}; 
      } catch (error) {
          return rejectWithValue('Unable to fetch user data');
      }
  }
);



export const rehydrateAuth = createAsyncThunk(
  'auth/rehydrate',
  async (_, { dispatch, getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserByToken());
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); 
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Login error';
      })
      .addCase(fetchUserByToken.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUserByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = undefined;
      })
      .addCase(fetchUserByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Unable to fetch user data';
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;