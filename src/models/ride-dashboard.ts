import { z } from "zod";

import { createApiResponseSchema } from "./api-model";

const rideDashboardResponseSchema = z.object({
    ride_stats: z.array(
        z.object({
            count: z.number(),
            date: z.string(),
            total: z.number(),
        }),
    ),
});

const getRideDashboardSchema = createApiResponseSchema(rideDashboardResponseSchema);

export type RideDashboardResponse = z.infer<typeof getRideDashboardSchema>;
export type RideDashboard = RideDashboardResponse["data"];
