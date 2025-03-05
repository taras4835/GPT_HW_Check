// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../slices/userSlice'
import selectedCheckSlice from '../slices/selectedCheck'
import screenStateSlice from '../slices/screenState'

const store = configureStore({
    reducer: {

        user: userSlice,
        selectedCheck: selectedCheckSlice,
        screenState: screenStateSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
