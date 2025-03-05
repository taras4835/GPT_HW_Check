import { createSlice } from '@reduxjs/toolkit';
import { RESET_STORE } from '../utils/consts';
import { User } from '../models/types';

const initialState: User = {
  id: 0,
  username:"",
  balance: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setUser: (state, action) => {
        state.id = action.payload?.id;
        state.username = action.payload?.username;
        state.balance = action.payload?.balance;

      }
  },
    extraReducers: (builder) => {
        builder.addCase(RESET_STORE, () => initialState);
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
