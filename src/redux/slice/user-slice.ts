/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserList, UserListFilter } from "@/models/user-list";

export interface UserState {
    userList: UserList | null;
    isLoadingUserList: boolean;
    // Filter and pagination
    userListFilter: UserListFilter;
}

const initialState: UserState = {
    userList: null,
    isLoadingUserList: true,
    userListFilter: {
        page: 1,
        limit: 10,
        start_date: "",
        end_date: "",
        search_full_name: "",
        is_activated: undefined,
        is_verified: undefined,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUserList(state) {
            state.isLoadingUserList = true;
        },
        fetchUserListSuccess(state, action: PayloadAction<UserList>) {
            state.userList = action.payload;
            state.isLoadingUserList = false;
        },
        fetchUserListCompleted(state) {
            state.isLoadingUserList = false;
        },
        setUserListFilter(state, action: PayloadAction<UserListFilter>) {
            state.userListFilter = action.payload;
        },
        clearUserListFilter(state) {
            state.userListFilter = initialState.userListFilter;
        },
    },
});

export const {
    fetchUserList,
    fetchUserListSuccess,
    fetchUserListCompleted,
    setUserListFilter,
    clearUserListFilter,
} = userSlice.actions;
export default userSlice.reducer;
