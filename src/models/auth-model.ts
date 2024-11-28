import { z } from "zod";

import { createApiResponseSchema } from "./api-model";

// Define the schema for the response

// Define the schema for the entire response
export const adminResponseSchema = z.object({
    data: z.object({
        admin_info: z.object({
            admin_id: z.string(),
            created_at: z.string(),
            full_name: z.string(),
            role: z.string(),
            updated_at: z.string(),
            username: z.string(),
        }),
        token: z.string(),
    }),
});

const adminResponse = createApiResponseSchema(adminResponseSchema);

export type AdminResponse = z.infer<typeof adminResponse>;

export type Admin = z.infer<typeof adminResponseSchema>["data"];
