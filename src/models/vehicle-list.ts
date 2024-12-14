/* eslint-disable import/prefer-default-export */
import { z } from "zod";

import { createApiResponseSchema } from "./api-model";

export const vehicleListResponseSchema = z.object({
    current_page: z.number(),
    limit: z.number(),
    total_pages: z.number(),
    total_vehicles: z.number(),
    vehicles: z
        .array(
            z.object({
                cavet: z.string(),
                created_at: z.string(),
                fuel_consumed: z.number(),
                id: z.string(),
                license_plate: z.string(),
                owner: z.object({
                    avatar_url: z.string(),
                    average_rating: z.number(),
                    balance_in_app: z.number(),
                    full_name: z.string(),
                    gender: z.string(),
                    is_momo_linked: z.boolean(),
                    phone_number: z.string(),
                    user_id: z.string(),
                }),
                total_rides: z.number(),
                vehicle_name: z.string(),
            }),
        )
        .optional(),
});

const vehicleListResponse = createApiResponseSchema(vehicleListResponseSchema);

export type VehicleListResponse = z.infer<typeof vehicleListResponse>;
export type VehicleList = VehicleListResponse["data"];

const vehicleDetail = z.object({
    cavet: z.string(),
    created_at: z.string(),
    fuel_consumed: z.number(),
    id: z.string(),
    license_plate: z.string(),
    owner: z.object({
        avatar_url: z.string(),
        average_rating: z.number(),
        balance_in_app: z.number(),
        full_name: z.string(),
        gender: z.string(),
        is_momo_linked: z.boolean(),
        phone_number: z.string(),
        user_id: z.string(),
    }),
    total_rides: z.number(),
    vehicle_name: z.string(),
});

export type VehicleDetail = z.infer<typeof vehicleDetail>;

const vehicleListFilterSchema = z.object({
    page: z.number(),
    limit: z.number(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    search_vehicle_name: z.string().optional(),
    search_plate: z.string().optional(),
    search_owner: z.string().optional(),
    search_cavet: z.string().optional(),
});

export type VehicleListFilter = z.infer<typeof vehicleListFilterSchema>;
