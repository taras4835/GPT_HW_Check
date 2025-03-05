// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../slices/userSlice'
import selectedCheckSlice from '../slices/selectedCheck'

const store = configureStore({
    reducer: {

        user: userSlice,
        selectedCheck: selectedCheckSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
