import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

import { UserDashboard, UserDashboardResponse } from "@/models/dashboard/user/user-dashboard";
import axiosClient from "@/utils/axios-client/axios-client";
import { showErrorMessage } from "@/redux/slice/message-slice";

export default function useGetUserDashboard() {
    const [userDashboardData, setUserDashboardData] = useState<UserDashboard | null>(null);
    const [isLoadingUserDashboard, setIsLoadingUserDashboard] = useState(false);
    const dispatch = useDispatch();

    const getUserDashboard = async (
        filter: string,
        startDate: Date | null,
        endDate: Date | null,
    ) => {
        try {
            setIsLoadingUserDashboard(true);
            const queryParams = new URLSearchParams();

            queryParams.append("filter", filter);
            // Kiểm tra xem startDate với endDate có null không và thay đổi định dạng của chúng thành: yyyy-MM-dd
            if (startDate) {
                const startDateString = startDate.toISOString().split("T")[0];

                queryParams.append("start_date", startDateString);
            }

            if (endDate) {
                const endDateString = endDate.toISOString().split("T")[0];

                queryParams.append("end_date", endDateString);
            }

            const response = await axiosClient.get<UserDashboardResponse>(
                `/admin/get-user-dashboard-data?${queryParams.toString()}`,
            );

            if (response.data.success) {
                setUserDashboardData(response.data.data);
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
            setIsLoadingUserDashboard(false);
        }
    };

    return { userDashboardData, isLoadingUserDashboard, getUserDashboard };
}
