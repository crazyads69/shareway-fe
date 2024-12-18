import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { useEffect } from "react";

import { RootState } from "@/redux/store/store";
import { RideListFilter, RideListResponse } from "@/models/ride-list";
import {
    fetchRideList,
    fetchRideListCompleted,
    fetchRideListSuccess,
} from "@/redux/slice/ride-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { showErrorMessage } from "@/redux/slice/message-slice";

export default function useGetRideList() {
    const dispatch = useDispatch();
    const rideList = useSelector((state: RootState) => state.ride.rideList);
    const rideListFilter = useSelector((state: RootState) => state.ride.rideListFilter);
    const isLoadingRideList = useSelector((state: RootState) => state.ride.isLoadingRideList);

    const getRideList = async (rideListFilter: RideListFilter) => {
        try {
            // Start loading state
            dispatch(fetchRideList());
            // Build query string from filter
            const query = new URLSearchParams();

            // Add page and limit to query
            if (rideListFilter.page) {
                query.append("page", rideListFilter.page.toString());
            }

            if (rideListFilter.limit) {
                query.append("limit", rideListFilter.limit.toString());
            }

            // Add start_date_time and end_date_time to query
            if (rideListFilter.start_date_time) {
                query.append("start_date_time", rideListFilter.start_date_time);
            }

            if (rideListFilter.end_date_time) {
                query.append("end_date_time", rideListFilter.end_date_time);
            }

            // Add search_driver to query
            if (rideListFilter.search_driver) {
                query.append("search_driver", rideListFilter.search_driver);
            }

            // Add search_hitcher to query
            if (rideListFilter.search_hitcher) {
                query.append("search_hitcher", rideListFilter.search_hitcher);
            }

            // Add search_route to query
            if (rideListFilter.search_route) {
                query.append("search_route", rideListFilter.search_route);
            }

            // Add search_vehicle to query
            if (rideListFilter.search_vehicle) {
                query.append("search_vehicle", rideListFilter.search_vehicle);
            }

            // Add ride_status to query
            if (rideListFilter.ride_status && rideListFilter.ride_status.length > 0) {
                // Ride status is an array, so we need to join it to a string before adding to query
                query.append("ride_status", rideListFilter.ride_status.join(","));
            }

            // Fetch data
            const response = await axiosClient.get<RideListResponse>(
                `/admin/get-ride-list?${query.toString()}`,
            );

            // Check if response is successful
            if (response.data.success) {
                // Dispatch fetchRideListSuccess action with data
                dispatch(fetchRideListSuccess(response.data.data));
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
            dispatch(fetchRideListCompleted());
        }
    };

    // Call API to get ride list when component mounted
    useEffect(() => {
        // Handle whenever have filter change (except page change) then reset page to 1
        if (
            rideListFilter.search_driver !== "" ||
            rideListFilter.search_hitcher !== "" ||
            rideListFilter.search_route !== "" ||
            rideListFilter.search_vehicle !== "" ||
            rideListFilter.start_date_time !== "" ||
            rideListFilter.end_date_time !== "" ||
            (rideListFilter.ride_status && rideListFilter.ride_status.length > 0)
        ) {
            // Reset page to 1
            getRideList({
                ...rideListFilter,
                page: 1,
            });
        } else {
            // Get ride list with current filter
            getRideList(rideListFilter);
        }
    }, [
        rideListFilter.page,
        rideListFilter.limit,
        rideListFilter.start_date_time,
        rideListFilter.end_date_time,
        rideListFilter.search_driver,
        rideListFilter.search_hitcher,
        rideListFilter.search_route,
        rideListFilter.search_vehicle,
        rideListFilter.ride_status,
    ]);

    return { rideList, isLoadingRideList, getRideList };
}
