/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { VehicleList, VehicleListFilter } from "@/models/vehicle-list";

export interface VehicleState {
    isLoadingVehicleList: boolean;
    vehicleList: VehicleList | null;
    // Filter and pagination
    vehicleListFilter: VehicleListFilter;
}

const initialState: VehicleState = {
    isLoadingVehicleList: true,
    vehicleList: null,
    vehicleListFilter: {
        page: 1,
        limit: 10,
        start_date: "",
        end_date: "",
        search_vehicle_name: "",
        search_plate: "",
        search_owner: "",
        search_cavet: "",
    },
};

const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        fetchVehicleList(state) {
            state.isLoadingVehicleList = true;
        },
        fetchVehicleListSuccess(state, action: PayloadAction<VehicleList>) {
            state.vehicleList = action.payload;
            state.isLoadingVehicleList = false;
        },
        fetchVehicleListCompleted(state) {
            state.isLoadingVehicleList = false;
        },
        setVehicleListFilter(state, action: PayloadAction<VehicleListFilter>) {
            state.vehicleListFilter = action.payload;
        },
        clearVehicleListFilter(state) {
            state.vehicleListFilter = initialState.vehicleListFilter;
        },
    },
});

export const {
    fetchVehicleList,
    fetchVehicleListSuccess,
    fetchVehicleListCompleted,
    setVehicleListFilter,
    clearVehicleListFilter,
} = vehicleSlice.actions;
export default vehicleSlice.reducer;
