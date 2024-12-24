import { z } from "zod";

// Function tạo schema
export function createApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
    return z.object({
        data: dataSchema,
        error: z.string(),
        message_en: z.string(),
        message_vi: z.string(),
        success: z.boolean(),
    });
}

// Đưa schema vào response
export function parseApiResponse<T extends z.ZodTypeAny>(
    response: unknown,
    schema: z.ZodType<{
        data: z.infer<T>;
        error: string;
        message_en: string;
        message_vi: string;
        success: boolean;
    }>,
) {
    return schema.parse(response);
}
