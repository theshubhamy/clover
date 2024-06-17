// authSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const loadAuthState = createAsyncThunk(
  'auth/loadAuthState',
  async () => {
    try {
      const authState = await AsyncStorage.getItem('authState');
      return authState ? JSON.parse(authState) : null;
    } catch (error) {
      console.error('Error loading auth state:', error);
      throw error;
    }
  },
);

export const saveAuthState = createAsyncThunk(
  'auth/saveAuthState',
  async authState => {
    try {
      await AsyncStorage.setItem('authState', JSON.stringify(authState));
    } catch (error) {
      console.error('Error saving auth state:', error);
      throw error;
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/userLogin',
  async (formData, {rejectWithValue, dispatch}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const {data} = await axios.post('/auth/user/login', formData, config);
      await dispatch(saveAuthState(data?.userDetails));
      return data?.userDetails;
    } catch (error) {
      // Return custom error message from the API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/userLogout',
  async (_, {dispatch}) => {
    try {
      // Clear auth state from AsyncStorage
      await AsyncStorage.removeItem('authState');
      // Dispatch action to reset user state
      dispatch(logoutSuccess());
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    logoutSuccess(state) {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAuthState.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadAuthState.fulfilled, (state, action) => {
        const authState = action.payload;
        if (authState) {
          state.user = authState;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadAuthState.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null; // Reset user state
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {loginSuccess, logoutSuccess} = authSlice.actions;

export default authSlice.reducer;
