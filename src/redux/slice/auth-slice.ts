/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Admin, AdminInfo } from "@/models/auth-model";

export interface AuthState {
    isAuthenticated: boolean;
    admin: Admin | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    admin: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<Admin>) {
            state.isAuthenticated = true;
            // Save the admin data to local storage
            localStorage.setItem("ADMIN", JSON.stringify(action.payload));
            state.admin = action.payload;
        },
        logoutSuccess(state) {
            state.isAuthenticated = false;
            // Remove the admin data from local storage
            localStorage.removeItem("ADMIN");
            localStorage.removeItem("ACCESS_TOKEN");
            state.admin = null;
        },
        updateProfile(state, action: PayloadAction<AdminInfo>) {
            // Update the admin data in the redux store and local storage
            if (state.admin) {
                state.admin = {
                    ...state.admin,
                    ...action.payload,
                };
                localStorage.setItem("ADMIN", JSON.stringify(state.admin));
                state.isAuthenticated = true;
            }
        },
    },
});

export const { loginSuccess, logoutSuccess, updateProfile } = authSlice.actions;
export default authSlice.reducer;
