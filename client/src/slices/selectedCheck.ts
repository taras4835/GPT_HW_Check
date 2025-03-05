import { createSlice } from '@reduxjs/toolkit';
import { RESET_STORE } from '../utils/consts';
import { selectedCheck } from '../models/types';

const initialState: selectedCheck = {
  id: 0,
  data:null,
};

export const selectedCheckSlice = createSlice({
  name: 'selectedCheck',
  initialState,
  reducers: {
      setSelectedCheck: (state, action) => {
        state.id = action.payload?.id;
        state.data = action.payload?.data;
      }
  },
    extraReducers: (builder) => {
        builder.addCase(RESET_STORE, () => initialState);
    },
});

export const { setSelectedCheck } = selectedCheckSlice.actions;

export default selectedCheckSlice.reducer;
