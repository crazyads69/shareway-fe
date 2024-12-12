/* eslint-disable no-nested-ternary */

"use client";

import React from "react";

import GeneralDashboardResult from "@/components/page/dashboard/general-dashboard-result";
import UserDashboard from "@/components/page/dashboard/user-dashboard";
import RideDashboard from "@/components/page/dashboard/ride-dashboard";
import TransactionDashboard from "@/components/page/dashboard/transaction-dashboard";
import VehicleDashboard from "@/components/page/dashboard/vehicle-dashboard";

export default function AdminPage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <h1 className="self-start p-4 text-2xl font-bold">Tổng quan</h1>
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
