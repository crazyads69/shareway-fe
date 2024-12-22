/* eslint-disable import/prefer-default-export */
import { z } from "zod";

import { createApiResponseSchema } from "../api-model";

export const generalDashboardResponseSchema = z.object({
    ride_change: z.number(),
    total_rides: z.number(),
    total_transactions: z.number(),
    total_users: z.number(),
    total_vehicles: z.number(),
    transaction_change: z.number(),
    user_change: z.number(),
    vehicle_change: z.number(),
});

const getGeneralDashboardResponse = createApiResponseSchema(generalDashboardResponseSchema);

export type GeneralDashboardResponse = z.infer<typeof getGeneralDashboardResponse>;
export type GeneralDashboard = GeneralDashboardResponse["data"];
