import { z } from "zod";

// Define request schema input for get report details api
const getReportDetailsInput = z.object({
    start_date: z.string().optional(),
    end_date: z.string().optional(),
});

export type GetReportDetailsInput = z.infer<typeof getReportDetailsInput>;
