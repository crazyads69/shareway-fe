/* eslint-disable no-nested-ternary */

import { Skeleton } from "@/components/ui/skeleton";
import useGetGeneralDashboard from "@/hooks/dashboard/use-get-general-dashboard";

import DashboardCard from "../dashboard-card/dashboard-card";

export default function GeneralDashboardResult() {
    const { isLoadingGeneralDashboard, generalDashboard } = useGetGeneralDashboard();

    if (isLoadingGeneralDashboard || !generalDashboard) {
        return (
            <div className="mt-4 flex w-full flex-row space-x-8 p-4">
                <Skeleton className="h-48 w-72 rounded-xl bg-slate-200 2xl:h-56 2xl:w-96" />
                <Skeleton className="h-48 w-72 rounded-xl bg-slate-200 2xl:h-56 2xl:w-96" />
                <Skeleton className="h-48 w-72 rounded-xl bg-slate-200 2xl:h-56 2xl:w-96" />
                <Skeleton className="h-48 w-72 rounded-xl bg-slate-200 2xl:h-56 2xl:w-96" />=
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col items-center justify-between">
            <div className="my-4 flex w-full flex-row items-center justify-between">
                <DashboardCard
                    change={generalDashboard.user_change}
                    changeType="user"
                    iconSrc="/total_user.svg"
                    title="Tổng người dùng"
                    value={generalDashboard.total_users}
                />
                <DashboardCard
                    change={generalDashboard.ride_change}
                    changeType="ride"
                    iconSrc="/total_ride.svg" 
                    title="Tổng chuyến đi"
                    value={generalDashboard.total_rides}
                />
                <DashboardCard
                    change={generalDashboard.transaction_change}
                    changeType="transaction"
                    iconSrc="/total_transaction.svg" 
                    title="Tổng giao dịch"
                    value={generalDashboard.total_transactions}
                />
                <DashboardCard
                    change={generalDashboard.vehicle_change}
                    changeType="vehicle"
                    iconSrc="/total_vehicle.svg" 
                    title="Tổng phương tiện"
                    value={generalDashboard.total_vehicles}
                />
            </div>
        </div>
    );
}
