/* eslint-disable import/prefer-default-export */

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TransactionDetail } from "@/models/transaction/transaction-list";
import {
    TRANSACTION_PAYMENT_METHOD_FILTER_OPTIONS,
    TRANSACTION_STATUS_FILTER_OPTIONS,
} from "@/utils/constant/constant";

import { PaymentDetailsDialog } from "./payment-dialog";

export const paymentColumns: ColumnDef<TransactionDetail>[] = [
    {
        accessorKey: "id",
        header: () => {
            return <div className="select-none text-center text-base font-semibold">ID</div>;
        },
        cell: ({ row }) => {
            return (
                <div className="select-none text-center">
                    {(row.getValue("id") as string).slice(0, 8)}
                </div>
            );
        },
    },
    {
        accessorKey: "sender",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">
                    Người gửi tiền
                </div>
            );
        },
        cell: ({ row }) => {
            const transaction = row.original as TransactionDetail;

            return <div className="select-none text-center">{transaction.sender.full_name}</div>;
        },
    },
    {
        accessorKey: "receiver",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">
                    Người nhận tiền
                </div>
            );
        },
        cell: ({ row }) => {
            const transaction = row.original as TransactionDetail;

            return <div className="select-none text-center">{transaction.receiver.full_name}</div>;
        },
    },
    {
        accessorKey: "amount",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">Số tiền (VND)</div>
            );
        },
        cell: ({ row }) => {
            // Format the amount to vnd
            const amount = row.getValue("amount") as number;
            const formattedAmount = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(amount);

            return <div className="select-none text-center">{formattedAmount}</div>;
        },
    },
    {
        accessorKey: "created_at",
        header: () => {
            return <div className="select-none text-center text-base font-semibold">Ngày tạo</div>;
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"));
            const formattedDate = date
                .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })
                .replace(/\//g, "/");

            return <div className="select-none text-center">{formattedDate}</div>;
        },
    },
    {
        accessorKey: "payment_method",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">
                    Phương thức thanh toán
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="select-none text-center">
                    {
                        TRANSACTION_PAYMENT_METHOD_FILTER_OPTIONS.find((option) => {
                            return option.value === row.getValue("payment_method");
                        })?.label
                    }
                </div>
            );
        },
    },
    {
        accessorKey: "payment_status",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">
                    Trạng thái giao dịch
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="select-none text-center">
                    {
                        TRANSACTION_STATUS_FILTER_OPTIONS.find((option) => {
                            return option.value === row.getValue("payment_status");
                        })?.label
                    }
                </div>
            );
        },
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const transaction = row.original as TransactionDetail;

            return <PaymentDetailsDialog transaction={transaction} />;
        },
    },
];
