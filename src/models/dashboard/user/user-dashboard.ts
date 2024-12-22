import { z } from "zod";

import { createApiResponseSchema } from "../../api-model";

const userDashboardSchema = z.object({
    user_stats: z.array(
        z.object({
            count: z.number(),
            date: z.string(),
            total: z.number(),
        }),
    ),
});

const getUserDashboardSchema = createApiResponseSchema(userDashboardSchema);

export type UserDashboardResponse = z.infer<typeof getUserDashboardSchema>;
export type UserDashboard = UserDashboardResponse["data"];
