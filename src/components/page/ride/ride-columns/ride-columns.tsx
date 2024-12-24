/* eslint-disable import/prefer-default-export */

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { RideDetail } from "@/models/ride/ride-list";
import { RIDE_STATUS_FILTER_OPTIONS } from "@/utils/constant/constant";

import { RideDetailsDialog } from "../ride-dialog/ride-dialog";

export const rideColumns: ColumnDef<RideDetail>[] = [
    {
        accessorKey: "ride_id",
        header: () => {
            return <div className="select-none text-center text-base font-semibold">ID</div>;
        },
        cell: ({ row }) => {
            return (
                <div className="select-none text-center">
                    {(row.getValue("ride_id") as string).slice(0, 8)}
                </div>
            );
        },
    },
    {
        accessorKey: "driver",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">
                    Người cho đi nhờ
                </div>
            );
        },
        cell: ({ row }) => {
            const ride = row.original as RideDetail;

            return <div className="select-none truncate text-center">{ride?.driver.full_name}</div>;
        },
    },
    {
        accessorKey: "hitcher",
        header: () => {
            return (
                <div className="select-none truncate text-center text-base font-semibold">
                    Người đi nhờ
                </div>
            );
        },
        cell: ({ row }) => {
            const ride = row.original as RideDetail;

            return (
                <div className="select-none truncate text-center">{ride?.hitcher.full_name}</div>
            );
        },
    },
    {
        accessorKey: "start_address",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">Điểm bắt đầu</div>
            );
        },
        cell: ({ row }) => {
            const address = row.getValue("start_address") as string;

            return (
                <div className="mx-auto line-clamp-2 max-w-[200px] select-none whitespace-normal text-center">
                    {address}
                </div>
            );
        },
    },
    {
        accessorKey: "end_address",
        header: () => {
            return <div className="select-none text-center text-base font-semibold">Điểm đến</div>;
        },
        cell: ({ row }) => {
            const address = row.getValue("end_address") as string;

            return (
                <div className="mx-auto line-clamp-2 max-w-[240px] select-none whitespace-normal text-center">
                    {address}
                </div>
            );
        },
    },
    {
        accessorKey: "distance",
        header: () => {
            return (
                <div className="select-none truncate text-center text-base font-semibold">
                    Khoảng cách (km)
                </div>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="select-none whitespace-normal text-center">
                    {row.getValue("distance")}
                </div>
            );
        },
    },
    {
        accessorKey: "fare",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">
                    Giá tiền (đồng)
                </div>
            );
        },

        cell: ({ row }) => {
            // Chuyển đơn vị tiền thành VND
            const fare = row.getValue("fare") as number;
            const formattedFare = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(fare);

            return <div className="select-none text-center">{formattedFare}</div>;
        },
    },
    {
        accessorKey: "start_time",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">Thời gian đi</div>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("start_time"));
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
        accessorKey: "status",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">Trạng thái</div>
            );
        },
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            // Chuyển trạng thái thành Vietnamese
            const statusMap = RIDE_STATUS_FILTER_OPTIONS.find((option) => option.value === status);

            return <div className="select-none text-center">{statusMap?.label}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const ride = row.original as RideDetail;

            return <RideDetailsDialog ride={ride} />;
        },
    },
];
