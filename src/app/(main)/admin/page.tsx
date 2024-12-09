/* eslint-disable no-nested-ternary */

"use client";

import React, { useEffect, useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

import GeneralDashboardResult from "@/components/page/dashboard/general-dashboard-result";
import useGetUserDashboard from "@/hooks/dashboard/use-get-user-dashboard";
import { type ChartConfig } from "@/components/ui/chart";
import UserDashboard from "@/components/page/dashboard/user-dashboard";
import RideDashboard from "@/components/page/dashboard/ride-dashboard";
import TransactionDashboard from "@/components/page/dashboard/transaction-dashboard";
import VehicleDashboard from "@/components/page/dashboard/vehicle-dashboard";

import { DASHBOARD_FILTER_OPTIONS } from "../../../utils/constant/constant";

const chartConfig = {
    count: {
        label: "Số lượng",
        color: "#2563eb",
    },
} satisfies ChartConfig;

export default function AdminPage() {
    const { userDashboardData, isLoadingUserDashboard, getUserDashboard } = useGetUserDashboard();
    const [selectedFilter, setSelectedFilter] = useState(DASHBOARD_FILTER_OPTIONS[0].value);
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(Date.now()),
        to: addDays(new Date(), 7),
    });

    useEffect(() => {
        if (selectedFilter === "custom") {
            if (date?.from && date?.to) {
                getUserDashboard(selectedFilter, date.from, date.to);
            }
        } else {
            getUserDashboard(selectedFilter, null, null);
        }
    }, [date, selectedFilter]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <h1 className="self-start p-4 text-2xl font-bold">Dashboard</h1>
            <GeneralDashboardResult />
            <div className="w-full space-y-4">
                <UserDashboard />
                <RideDashboard />
                <TransactionDashboard />
                <VehicleDashboard />
            </div>
        </div>
    );
}
