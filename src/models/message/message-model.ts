import { z } from "zod";

// Message to show toast notification in the UI for admin actions
const Message = z.object({
    title: z.string(),
    type: z.enum(["success", "error", "info"]),
    message: z.string(),
});

export type Message = z.infer<typeof Message>;
