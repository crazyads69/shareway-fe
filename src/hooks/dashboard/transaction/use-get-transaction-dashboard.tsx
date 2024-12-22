import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

import axiosClient from "@/utils/axios-client/axios-client";
import { showErrorMessage } from "@/redux/slice/message-slice";
import {
    TransactionDashboard,
    TransactionDashboardResponse,
} from "@/models/dashboard/transaction/transaction-dashboard";

export default function useGetTransactionDashboard() {
    const [transactionDashboardData, setTransactionDashboardData] =
        useState<TransactionDashboard | null>(null);
    const [isLoadingTransactionDashboard, setIsLoadingTransactionDashboard] = useState(false);
    const dispatch = useDispatch();

    const getTransactionDashboard = async (
        filter: string,
        startDate: Date | null,
        endDate: Date | null,
    ) => {
        try {
            setIsLoadingTransactionDashboard(true);
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
            const response = await axiosClient.get<TransactionDashboardResponse>(
                `/admin/get-transaction-dashboard-data?${queryParams.toString()}`,
            );

            if (response.data.success) {
                setTransactionDashboardData(response.data.data);
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
            setIsLoadingTransactionDashboard(false);
        }
    };

    return { transactionDashboardData, isLoadingTransactionDashboard, getTransactionDashboard };
}
