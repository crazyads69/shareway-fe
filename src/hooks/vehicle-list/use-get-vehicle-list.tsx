import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { useEffect } from "react";

import { RootState } from "@/redux/store/store";
import { VehicleListFilter, VehicleListResponse } from "@/models/vehicle-list";
import {
    fetchVehicleList,
    fetchVehicleListCompleted,
    fetchVehicleListSuccess,
} from "@/redux/slice/vehicle-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { showErrorMessage } from "@/redux/slice/message-slice";

export default function useGetVehicleList() {
    const dispatch = useDispatch();
    const vehicleList = useSelector((state: RootState) => state.vehicle.vehicleList);
    const vehicleListFilter = useSelector((state: RootState) => state.vehicle.vehicleListFilter);
    const isLoadingVehicleList = useSelector(
        (state: RootState) => state.vehicle.isLoadingVehicleList,
    );

    const getVehicleList = async (vehicleListFilter: VehicleListFilter) => {
        try {
            // Start loading state
            dispatch(fetchVehicleList());
            // Build query string from filter
            const query = new URLSearchParams();

            // Add page and limit to query
            if (vehicleListFilter.page) {
                query.append("page", vehicleListFilter.page.toString());
            }
            if (vehicleListFilter.limit) {
                query.append("limit", vehicleListFilter.limit.toString());
            }

            // Add start_date and end_date to query
            if (vehicleListFilter.start_date) {
                query.append("start_date", vehicleListFilter.start_date);
            }
            if (vehicleListFilter.end_date) {
                query.append("end_date", vehicleListFilter.end_date);
            }

            // Add search_vehicle_name to query
            if (vehicleListFilter.search_vehicle_name) {
                query.append("search_vehicle_name", vehicleListFilter.search_vehicle_name);
            }

            // Add search_plate to query
            if (vehicleListFilter.search_plate) {
                query.append("search_plate", vehicleListFilter.search_plate);
            }

            // Add search_owner to query
            if (vehicleListFilter.search_owner) {
                query.append("search_owner", vehicleListFilter.search_owner);
            }

            // Add search_cavet to query
            if (vehicleListFilter.search_cavet) {
                query.append("search_cavet", vehicleListFilter.search_cavet);
            }

            // Fetch data
            const response = await axiosClient.get<VehicleListResponse>(
                `/admin/get-vehicle-list?${query.toString()}`,
            );

            if (response.data.success) {
                dispatch(fetchVehicleListSuccess(response.data.data));
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
            dispatch(fetchVehicleListCompleted());
        }
    };

    // Call this function to get vehicle list when component mounted
    useEffect(() => {
        // Handle get vehicle list when filter change (except page change) then reset page to 1
        if (
            vehicleListFilter.start_date !== "" ||
            vehicleListFilter.end_date !== "" ||
            vehicleListFilter.search_vehicle_name !== "" ||
            vehicleListFilter.search_plate !== "" ||
            vehicleListFilter.search_owner !== "" ||
            vehicleListFilter.search_cavet !== ""
        ) {
            // Reset page to 1
            getVehicleList({
                ...vehicleListFilter,
                page: 1,
            });
        } else {
            // Get vehicle list with current filter
            getVehicleList(vehicleListFilter);
        }
    }, [
        vehicleListFilter.page,
        vehicleListFilter.limit,
        vehicleListFilter.start_date,
        vehicleListFilter.end_date,
        vehicleListFilter.search_vehicle_name,
        vehicleListFilter.search_plate,
        vehicleListFilter.search_owner,
        vehicleListFilter.search_cavet,
    ]);

    return { vehicleList, isLoadingVehicleList, getVehicleList };
}
