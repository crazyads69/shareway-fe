import { z } from "zod";

import { createApiResponseSchema } from "../../api-model";

const vehicleDashboardResponseSchema = z.object({
    vehicle_stats: z.array(
        z.object({
            count: z.number(),
            date: z.string(),
            total: z.number(),
        }),
    ),
});

const getVehicleDashboardSchema = createApiResponseSchema(vehicleDashboardResponseSchema);

export type VehicleDashboardResponse = z.infer<typeof getVehicleDashboardSchema>;
export type VehicleDashboard = VehicleDashboardResponse["data"];
