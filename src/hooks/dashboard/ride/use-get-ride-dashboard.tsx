import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

import axiosClient from "@/utils/axios-client/axios-client";
import { showErrorMessage } from "@/redux/slice/message-slice";
import { RideDashboard, RideDashboardResponse } from "@/models/dashboard/ride/ride-dashboard";

export default function useGetRideDashboard() {
    const [rideDashboardData, setRideDashboardData] = useState<RideDashboard | null>(null);
    const [isLoadingRideDashboard, setIsLoadingRideDashboard] = useState(false);
    const dispatch = useDispatch();

    const getRideDashboard = async (
        filter: string,
        startDate: Date | null,
        endDate: Date | null,
    ) => {
        try {
            setIsLoadingRideDashboard(true);
            // Xây dựng query param
            const queryParams = new URLSearchParams();

            queryParams.append("filter", filter);
            // Kiểm tra xem ngày bắt đầu có null không
            if (startDate) {
                // Thay đổi định dạng startDate thành: yyyy-MM-dd
                const startDateString = startDate.toISOString().split("T")[0];

                queryParams.append("start_date", startDateString);
            }

            // Kiểm tra xem ngày kết thúc có null không
            if (endDate) {
                // Thay đổi định dạng ngày kết thúc thành: yyyy-MM-dd
                const endDateString = endDate.toISOString().split("T")[0];

                queryParams.append("end_date", endDateString);
            }

            // Call API
            const response = await axiosClient.get<RideDashboardResponse>(
                `/admin/get-ride-dashboard-data?${queryParams.toString()}`,
            );

            if (response.data.success) {
                setRideDashboardData(response.data.data);
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
            setIsLoadingRideDashboard(false);
        }
    };

    return { rideDashboardData, isLoadingRideDashboard, getRideDashboard };
}
