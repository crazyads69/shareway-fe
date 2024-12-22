import { z } from "zod";

import { createApiResponseSchema } from "../api-model";

// Define the schema for the response

// Define the schema for the entire response
export const adminResponseSchema = z.object({
    admin_info: z.object({
        admin_id: z.string(),
        created_at: z.string(),
        full_name: z.string(),
        role: z.string(),
        updated_at: z.string(),
        username: z.string(),
    }),
    token: z.string(),
});

export const getAdminProfileResponseSchema = z.object({
    admin_info: z.object({
        admin_id: z.string(),
        created_at: z.string(),
        full_name: z.string(),
        role: z.string(),
        updated_at: z.string(),
        username: z.string(),
    }),
});

// Define the schema for the input
export const LoginInputSchema = z.object({
    username: z.string().min(1).max(255),
    password: z.string().min(6).max(255),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

const adminResponse = createApiResponseSchema(adminResponseSchema);
const getAdminProfileResponse = createApiResponseSchema(getAdminProfileResponseSchema);

export type AdminResponse = z.infer<typeof adminResponse>;

export type Admin = z.infer<typeof adminResponseSchema>;

export type AdminInfo = Admin["admin_info"];

export type GetAdminProfileResponse = z.infer<typeof getAdminProfileResponse>;
export type GetAdminProfile = GetAdminProfileResponse["data"];
