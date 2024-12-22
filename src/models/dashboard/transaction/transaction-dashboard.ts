import { z } from "zod";

import { createApiResponseSchema } from "../../api-model";

const transactionDashboardResponseSchema = z.object({
    transaction_stats: z.array(
        z.object({
            count: z.number(),
            date: z.string(),
            total: z.number(),
        }),
    ),
});

const getTransactionDashboardSchema = createApiResponseSchema(transactionDashboardResponseSchema);

export type TransactionDashboardResponse = z.infer<typeof getTransactionDashboardSchema>;
export type TransactionDashboard = TransactionDashboardResponse["data"];
