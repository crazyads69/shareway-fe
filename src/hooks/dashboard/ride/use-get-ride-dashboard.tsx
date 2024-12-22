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
            // Build query params
            const queryParams = new URLSearchParams();

            queryParams.append("filter", filter);
            // Check if startDate is not null
            if (startDate) {
                // Convert startDate to formart: yyyy-MM-dd
                const startDateString = startDate.toISOString().split("T")[0];

                queryParams.append("start_date", startDateString);
            }

            // Check if endDate is not null
            if (endDate) {
                // Convert endDate to formart: yyyy-MM-dd
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
