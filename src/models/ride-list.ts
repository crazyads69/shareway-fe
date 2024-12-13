/* eslint-disable import/prefer-default-export */
import { z } from "zod";

import { createApiResponseSchema } from "./api-model";

export const rideListResponseSchema = z.object({
    current_page: z.number(),
    limit: z.number(),
    rides: z
        .array(
            z.object({
                distance: z.number(),
                driver: z.object({
                    avatar_url: z.string(),
                    average_rating: z.number(),
                    balance_in_app: z.number(),
                    full_name: z.string(),
                    gender: z.string(),
                    is_momo_linked: z.boolean(),
                    phone_number: z.string(),
                    user_id: z.string(),
                }),
                driver_current_latitude: z.number(),
                driver_current_longitude: z.number(),
                duration: z.number(),
                encoded_polyline: z.string(),
                end_address: z.string(),
                end_latitude: z.number(),
                end_longitude: z.number(),
                end_time: z.string(),
                fare: z.number(),
                hitcher: z.object({
                    avatar_url: z.string(),
                    average_rating: z.number(),
                    balance_in_app: z.number(),
                    full_name: z.string(),
                    gender: z.string(),
                    is_momo_linked: z.boolean(),
                    phone_number: z.string(),
                    user_id: z.string(),
                }),
                ride_id: z.string(),
                ride_offer_id: z.string(),
                ride_request_id: z.string(),
                rider_current_latitude: z.number(),
                rider_current_longitude: z.number(),
                start_address: z.string(),
                start_latitude: z.number(),
                start_longitude: z.number(),
                start_time: z.string(),
                status: z.string(),
                transaction: z.object({
                    amount: z.number(),
                    payment_method: z.string(),
                    status: z.string(),
                    transaction_id: z.string(),
                }),
                vehicle: z.object({
                    fuel_consumed: z.number(),
                    license_plate: z.string(),
                    name: z.string(),
                    vehicle_id: z.string(),
                }),
                waypoints: z.array(
                    z.object({
                        address: z.string(),
                        lattitude: z.number(),
                        longitude: z.number(),
                        order: z.number(),
                        waypoint_id: z.string(),
                    }),
                ),
            }),
        )
        .optional(),
    total_pages: z.number(),
    total_rides: z.number(),
});

const rideListResponse = createApiResponseSchema(rideListResponseSchema);

export type RideListResponse = z.infer<typeof rideListResponse>;
export type RideList = RideListResponse["data"];

const rideDetail = z
    .object({
        distance: z.number(),
        driver: z.object({
            avatar_url: z.string(),
            average_rating: z.number(),
            balance_in_app: z.number(),
            full_name: z.string(),
            gender: z.string(),
            is_momo_linked: z.boolean(),
            phone_number: z.string(),
            user_id: z.string(),
        }),
        driver_current_latitude: z.number(),
        driver_current_longitude: z.number(),
        duration: z.number(),
        encoded_polyline: z.string(),
        end_address: z.string(),
        end_latitude: z.number(),
        end_longitude: z.number(),
        end_time: z.string(),
        fare: z.number(),
        hitcher: z.object({
            avatar_url: z.string(),
            average_rating: z.number(),
            balance_in_app: z.number(),
            full_name: z.string(),
            gender: z.string(),
            is_momo_linked: z.boolean(),
            phone_number: z.string(),
            user_id: z.string(),
        }),
        ride_id: z.string(),
        ride_offer_id: z.string(),
        ride_request_id: z.string(),
        rider_current_latitude: z.number(),
        rider_current_longitude: z.number(),
        start_address: z.string(),
        start_latitude: z.number(),
        start_longitude: z.number(),
        start_time: z.string(),
        status: z.string(),
        transaction: z.object({
            amount: z.number(),
            payment_method: z.string(),
            status: z.string(),
            transaction_id: z.string(),
        }),
        vehicle: z.object({
            fuel_consumed: z.number(),
            license_plate: z.string(),
            name: z.string(),
            vehicle_id: z.string(),
        }),
        waypoints: z.array(
            z.object({
                address: z.string(),
                lattitude: z.number(),
                longitude: z.number(),
                order: z.number(),
                waypoint_id: z.string(),
            }),
        ),
    })
    .optional();

export type RideDetail = z.infer<typeof rideDetail>;

const userInfo = z.object({
    avatar_url: z.string(),
    average_rating: z.number(),
    balance_in_app: z.number(),
    full_name: z.string(),
    gender: z.string(),
    is_momo_linked: z.boolean(),
    phone_number: z.string(),
    user_id: z.string(),
});

export type UserInfo = z.infer<typeof userInfo>;

const rideListFilterSchema = z.object({
    page: z.number(),
    limit: z.number(),
    start_date_time: z.string().optional(),
    end_date_time: z.string().optional(),
    ride_status: z.array(z.string()).optional(),
    search_full_name: z.string().optional(),
    search_route: z.string().optional(),
    search_vehicle: z.string().optional(),
});

export type RideListFilter = z.infer<typeof rideListFilterSchema>;
