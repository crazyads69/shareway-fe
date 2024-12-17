import { showErrorMessage, showSuccessMessage } from "@/redux/slice/message-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { AnyAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch } from "react";

export default async function PostLogout(dispatch: Dispatch<AnyAction>, router: AppRouterInstance) {
    try {
        const resonse = await axiosClient.post("/admin/logout");
        if (resonse.data.success) {
            // show success message
            dispatch(showSuccessMessage("Đăng xuất thành công"));
            // Clear the token from local storage
            localStorage.removeItem("ACCESS_TOKEN");
            // Clear the admin data from local storage
            localStorage.removeItem("ADMIN");
            // Replace current route with login page
            router.replace("/login");
        } else {
            throw new Error(resonse.data.message_vi || "Lỗi không xác định");
        }
    } catch (error) {
        let errorMessage = "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.";

        if (error instanceof AxiosError && error.response) {
            errorMessage = error.response.data?.message_vi || errorMessage;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        dispatch(showErrorMessage(errorMessage));
    }
}
