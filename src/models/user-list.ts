import { z } from "zod";

import { createApiResponseSchema } from "./api-model";

const userListResponseSchema = z.object({
    current_page: z.number(),
    limit: z.number(),
    total_pages: z.number(),
    total_users: z.number(),
    users: z.array(
        z
            .object({
                avatar_url: z.string(),
                average_rating: z.number(),
                balance_in_app: z.number(),
                cccd_number: z.string(),
                created_at: z.string(),
                email: z.string(),
                full_name: z.string(),
                gender: z.string(),
                id: z.string(),
                is_activated: z.boolean(),
                is_momo_linked: z.boolean(),
                is_verified: z.boolean(),
                phone_number: z.string(),
                role: z.string(),
                total_ratings: z.number(),
                total_rides: z.number(),
                total_transactions: z.number(),
                total_vehicles: z.number(),
                updated_at: z.string(),
                vehicles: z
                    .array(
                        z.object({
                            fuel_consumed: z.number(),
                            license_plate: z.string(),
                            name: z.string(),
                            vehicle_id: z.string(),
                        }),
                    )
                    .optional(),
            })
            .optional(),
    ),
});

const userListResponse = createApiResponseSchema(userListResponseSchema);

export type UserListResponse = z.infer<typeof userListResponse>;
export type UserList = UserListResponse["data"];

const userListFilterSchema = z.object({
    page: z.number(),
    limit: z.number(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    search_full_name: z.string().optional(),
    is_activated: z.boolean().optional(),
    is_verified: z.boolean().optional(),
});

export type UserListFilter = z.infer<typeof userListFilterSchema>;
