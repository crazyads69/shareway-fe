/* eslint-disable import/prefer-default-export */

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { UserDetail } from "@/models/user/user-list";

import { UserDetailsDialog } from "../user-dialog/user-dialog";

export const userColumns: ColumnDef<UserDetail>[] = [
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
        accessorKey: "full_name",
        header: () => {
            return <div className="select-none text-center text-base font-semibold">Họ và tên</div>;
        },
        cell: ({ row }) => {
            return <div className="select-none text-center">{row.getValue("full_name")}</div>;
        },
    },
    {
        accessorKey: "email",
        header: () => {
            return <div className="select-none text-center text-base font-semibold">Email</div>;
        },
        cell: ({ row }) => {
            return (
                <div className="select-none text-center">
                    {!(row.getValue("email") as string) ? "Chưa cập nhật" : row.getValue("email")}
                </div>
            );
        },
    },
    {
        accessorKey: "phone_number",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">Số điện thoại</div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="select-none text-center">
                    {!(row.getValue("phone_number") as string)
                        ? "Chưa cập nhật"
                        : row.getValue("phone_number")}
                </div>
            );
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
        accessorKey: "is_activated",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">
                    Trạng thái kích hoạt
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="select-none text-center">
                    {row.getValue("is_activated") ? "Đã kích hoạt" : "Chưa kích hoạt"}
                </div>
            );
        },
    },
    {
        accessorKey: "is_verified",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">
                    Trạng thái xác thực
                </div>
            );
        },

        cell: ({ row }) => {
            return (
                <div className="select-none text-center">
                    {row.getValue("is_verified") ? "Đã xác thực" : "Chưa xác thực"}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original as UserDetail;

            return <UserDetailsDialog user={user} />;
        },
    },
];
