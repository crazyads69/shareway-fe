/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Admin } from "@/models/auth-model";

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
        logout(state) {
            state.isAuthenticated = false;
            // Remove the admin data from local storage
            localStorage.removeItem("ADMIN");
            state.admin = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
