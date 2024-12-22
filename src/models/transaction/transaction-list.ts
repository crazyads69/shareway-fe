/* eslint-disable import/prefer-default-export */
import { z } from "zod";

import { createApiResponseSchema } from "../api-model";

export const transactionListResponseSchema = z.object({
    current_page: z.number(),
    limit: z.number(),
    total_pages: z.number(),
    total_transactions: z.number(),
    transactions: z
        .array(
            z.object({
                amount: z.number(),
                created_at: z.string(),
                id: z.string(),
                payment_method: z.string(),
                payment_status: z.string(),
                receiver: z.object({
                    avatar_url: z.string(),
                    average_rating: z.number(),
                    balance_in_app: z.number(),
                    full_name: z.string(),
                    gender: z.string(),
                    is_momo_linked: z.boolean(),
                    phone_number: z.string(),
                    user_id: z.string(),
                }),
                sender: z.object({
                    avatar_url: z.string(),
                    average_rating: z.number(),
                    balance_in_app: z.number(),
                    full_name: z.string(),
                    gender: z.string(),
                    is_momo_linked: z.boolean(),
                    phone_number: z.string(),
                    user_id: z.string(),
                }),
            }),
        )
        .optional(),
});

const transactionListResponse = createApiResponseSchema(transactionListResponseSchema);

export type TransactionListResponse = z.infer<typeof transactionListResponse>;
export type TransactionList = TransactionListResponse["data"];

const transactionDetail = z.object({
    amount: z.number(),
    created_at: z.string(),
    id: z.string(),
    payment_method: z.string(),
    payment_status: z.string(),
    receiver: z.object({
        avatar_url: z.string(),
        average_rating: z.number(),
        balance_in_app: z.number(),
        full_name: z.string(),
        gender: z.string(),
        is_momo_linked: z.boolean(),
        phone_number: z.string(),
        user_id: z.string(),
    }),
    sender: z.object({
        avatar_url: z.string(),
        average_rating: z.number(),
        balance_in_app: z.number(),
        full_name: z.string(),
        gender: z.string(),
        is_momo_linked: z.boolean(),
        phone_number: z.string(),
        user_id: z.string(),
    }),
});

export type TransactionDetail = z.infer<typeof transactionDetail>;

const transactionListFilterSchema = z.object({
    page: z.number(),
    limit: z.number(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    search_sender: z.string().optional(),
    search_receiver: z.string().optional(),
    payment_method: z.array(z.string()).optional(),
    payment_status: z.array(z.string()).optional(),
    min_amount: z.number().optional(),
    max_amount: z.number().optional(),
});

export type TransactionListFilter = z.infer<typeof transactionListFilterSchema>;
