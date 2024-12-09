import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

import { GeneralDashboard, GeneralDashboardResponse } from "@/models/dashboard-model";
import axiosClient from "@/utils/axios-client/axios-client";
import { showErrorMessage } from "@/redux/slice/message-slice";

export default function useGetGeneralDashboard() {
    const [isLoadingGeneralDashboard, setIsLoadingGeneralDashboard] = useState(false);
    const [generalDashboard, setGeneralDashboard] = useState<GeneralDashboard | null>(null);
    const dispatch = useDispatch();

    const getGeneralDashboard = async () => {
        try {
            setIsLoadingGeneralDashboard(true);
            // Call API
            const response = await axiosClient.get<GeneralDashboardResponse>(
                "/admin/get-dashboard-general-data",
            );

            if (response.data.success) {
                setGeneralDashboard(response.data.data);
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
            setIsLoadingGeneralDashboard(false);
        }
    };

    // Run API call when mount component
    useEffect(() => {
        getGeneralDashboard();
    }, []);

    return { isLoadingGeneralDashboard, generalDashboard };
}
