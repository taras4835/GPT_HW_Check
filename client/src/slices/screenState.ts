import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RESET_STORE } from '../utils/consts';

const initialState: string = "main"

export const screenStateSlice = createSlice({
  name: 'screenState',
  initialState,
  reducers: {
      setScreenState: (state, action: PayloadAction<string>) => {
        return action.payload
      }
  },
    extraReducers: (builder) => {
        builder.addCase(RESET_STORE, () => initialState);
    },
});

export const { setScreenState } = screenStateSlice.actions;

export default screenStateSlice.reducer;
