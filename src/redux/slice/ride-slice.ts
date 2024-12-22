/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RideList, RideListFilter } from "@/models/ride/ride-list";

export interface RideState {
    isLoadingRideList: boolean;
    rideList: RideList | null;
    // Filter and pagination
    rideListFilter: RideListFilter;
}

const initialState: RideState = {
    isLoadingRideList: true,
    rideList: null,
    rideListFilter: {
        page: 1,
        limit: 10,
        start_date_time: "",
        end_date_time: "",
        search_driver: "",
        search_hitcher: "",
        search_route: "",
        search_vehicle: "",
        ride_status: [], // Empty array means all status
    },
};

const rideSlice = createSlice({
    name: "ride",
    initialState,
    reducers: {
        fetchRideList(state) {
            state.isLoadingRideList = true;
        },
        fetchRideListSuccess(state, action: PayloadAction<RideList>) {
            state.rideList = action.payload;
            state.isLoadingRideList = false;
        },
        fetchRideListCompleted(state) {
            state.isLoadingRideList = false;
        },
        setRideListFilter(state, action: PayloadAction<RideListFilter>) {
            state.rideListFilter = action.payload;
        },
        clearRideListFilter(state) {
            state.rideListFilter = initialState.rideListFilter;
        },
    },
});

export const {
    fetchRideList,
    fetchRideListSuccess,
    fetchRideListCompleted,
    setRideListFilter,
    clearRideListFilter,
} = rideSlice.actions;

export default rideSlice.reducer;
