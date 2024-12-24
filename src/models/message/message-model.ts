import { z } from "zod";

// Tin nhắn để show thông báo trong phần admin
const Message = z.object({
    title: z.string(),
    type: z.enum(["success", "error", "info"]),
    message: z.string(),
});

export type Message = z.infer<typeof Message>;
