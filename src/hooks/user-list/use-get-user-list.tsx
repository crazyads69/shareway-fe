import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { useEffect } from "react";

import { RootState } from "@/redux/store/store";
import { UserListFilter, UserListResponse } from "@/models/user-list";
import {
    fetchUserList,
    fetchUserListCompleted,
    fetchUserListSuccess,
} from "@/redux/slice/user-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { showErrorMessage } from "@/redux/slice/message-slice";

export default function useGetUserList() {
    const dispatch = useDispatch();
    const isLoadingUserList = useSelector((state: RootState) => state.user.isLoadingUserList);
    const userList = useSelector((state: RootState) => state.user.userList);
    const userListFilter = useSelector((state: RootState) => state.user.userListFilter);

    const getUserList = async (userListFilter: UserListFilter) => {
        try {
            // Start loading
            dispatch(fetchUserList());
            // Build query string from filter
            const query = new URLSearchParams();

            if (userListFilter.page) {
                query.append("page", userListFilter.page.toString());
            }

            if (userListFilter.limit) {
                query.append("limit", userListFilter.limit.toString());
            }

            if (userListFilter.start_date) {
                query.append("start_date", userListFilter.start_date);
            }

            if (userListFilter.end_date) {
                query.append("end_date", userListFilter.end_date);
            }

            if (userListFilter.search_full_name) {
                query.append("search_full_name", userListFilter.search_full_name);
            }

            if (userListFilter.is_activated !== undefined) {
                query.append("is_activated", userListFilter.is_activated.toString());
            }

            if (userListFilter.is_verified !== undefined) {
                query.append("is_verified", userListFilter.is_verified.toString());
            }

            // Fetch data
            const response = await axiosClient.get<UserListResponse>(
                `/admin/get-user-list?${query.toString()}`,
            );

            if (response.data.success) {
                dispatch(fetchUserListSuccess(response.data.data));
            } else {
                throw new Error(response.data.message_vi || "Lỗi không xác định");
            }
        } catch (error) {
            let errorMessage = "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.";

            if (error instanceof AxiosError && error.response) {
                errorMessage = error.response.data?.message_vi || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch(showErrorMessage(errorMessage));
        } finally {
            dispatch(fetchUserListCompleted());
        }
    };

    // Call API to get user list when component mounted
    useEffect(() => {
        // Handle whenever have filter change (except page change) then reset page to 1
        if (
            userListFilter.start_date !== "" ||
            userListFilter.end_date !== "" ||
            userListFilter.is_activated !== undefined ||
            userListFilter.search_full_name !== "" ||
            userListFilter.is_verified !== undefined
        ) {
            // Reset page to 1
            getUserList({
                ...userListFilter,
                page: 1,
            });
        } else {
            // Get user list with current filter
            getUserList(userListFilter);
        }
    }, [
        userListFilter.page,
        userListFilter.limit,
        userListFilter.start_date,
        userListFilter.end_date,
        userListFilter.search_full_name,
        userListFilter.is_activated,
        userListFilter.is_verified,
    ]);

    return { userList, isLoadingUserList, getUserList };
}
