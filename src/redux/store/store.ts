import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../slice/auth-slice";
import messageSlice from "../slice/message-slice";
import userSlice from "../slice/user-slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        message: messageSlice,
        user: userSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
