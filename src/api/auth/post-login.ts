import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { AdminResponse, LoginInput } from "@/models/auth/auth-model";
import axiosClient from "@/utils/axios-client/axios-client";
import { loginSuccess } from "@/redux/slice/auth-slice";
import { showErrorMessage } from "@/redux/slice/message-slice";

export default async function PostLogin(
    data: LoginInput,
    dispatch: Dispatch<AnyAction>,
    setIsLoading: (isLoading: boolean) => void,
    router: AppRouterInstance,
) {
    setIsLoading(true);
    try {
        const response = await axiosClient.post<AdminResponse>("/admin/auth/login", {
            username: data.username,
            password: data.password,
        });

        if (response.data.success) {
            dispatch(loginSuccess(response.data.data));
            // Save the token to local storage
            localStorage.setItem("ACCESS_TOKEN", response.data.data.token);
            // Redirect to the admin page
            router.push("/admin");
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
        setIsLoading(false);
    }
}
