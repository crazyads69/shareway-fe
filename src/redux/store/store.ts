import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../slice/auth-slice";
import messageSlice from "../slice/message-slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        message: messageSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
