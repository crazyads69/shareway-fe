/* eslint-disable import/prefer-default-export */

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { VehicleDetail } from "@/models/vehicle/vehicle-list";

import { VehicleDetailsDialog } from "../vehicle-dialog/vehicle-dialog";

export const vehicleColumns: ColumnDef<VehicleDetail>[] = [
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
        accessorKey: "vehicle_name",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">
                    Tên phương tiện
                </div>
            );
        },
        cell: ({ row }) => {
            return <div className="select-none text-center">{row.getValue("vehicle_name")}</div>;
        },
    },
    {
        accessorKey: "owner",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">Chủ sở hữu</div>
            );
        },
        cell: ({ row }) => {
            const vehicle = row.original as VehicleDetail;

            return <div className="select-none text-center">{vehicle.owner.full_name}</div>;
        },
    },
    {
        accessorKey: "fuel_consumed",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">
                    Nhiên liệu tiêu thụ (L/100km)
                </div>
            );
        },
        cell: ({ row }) => {
            return <div className="select-none text-center">{row.getValue("fuel_consumed")}</div>;
        },
    },
    {
        accessorKey: "license_plate",
        header: () => {
            return (
                <div className="select-none text-center text-base font-semibold">Biển số xe</div>
            );
        },
        cell: ({ row }) => {
            return <div className="select-none text-center">{row.getValue("license_plate")}</div>;
        },
    },
    {
        accessorKey: "cavet",
        header: () => {
            return <div className="select-none text-center text-base font-semibold">Số cà vẹt</div>;
        },
        cell: ({ row }) => {
            return <div className="select-none text-center">{row.getValue("cavet")}</div>;
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
        id: "actions",
        cell: ({ row }) => {
            const vehicle = row.original as VehicleDetail;

            return <VehicleDetailsDialog vehicle={vehicle} />;
        },
    },
];
