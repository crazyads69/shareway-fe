/* eslint-disable import/prefer-default-export */

import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1).max(255),
    password: z.string().min(6).max(255),
});
