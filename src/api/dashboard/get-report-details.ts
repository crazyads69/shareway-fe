import { GetReportDetailsInput } from "@/models/dashboard/report/report-details";
import { showErrorMessage, showSuccessMessage } from "@/redux/slice/message-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import saveAs from "file-saver";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function GetReportDetails(
    data: GetReportDetailsInput,
    dispatch: Dispatch<AnyAction>,
    setIsLoading: (isLoading: boolean) => void,
) {
    setIsLoading(true);
    try {
        const response = await axiosClient.get("/admin/get-report-details", {
            params: {
                start_date: data.start_date,
                end_date: data.end_date,
            },
            responseType: "blob", // Quan trọng: Đặt responseType là 'blob' để nhận dữ liệu dưới dạng file
        });

        // Xuất tên file từ Content-Disposition header
        const contentDisposition = response.headers["content-disposition"];
        let fileName = "report.zip"; // Tên file mặc định

        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i);
            if (fileNameMatch && fileNameMatch[1]) {
                fileName = fileNameMatch[1];
            }
        }

        // Dùng file-saver để tải file
        saveAs(new Blob([response.data]), fileName);
        dispatch(showSuccessMessage("Báo cáo đã được tải xuống thành công."));
    } catch (error) {
        let errorMessage = "Đã xảy ra lỗi khi tải báo cáo. Vui lòng thử lại.";

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
