/* eslint-disable no-nested-ternary */

"use client";

import React, { useState } from "react";

import GeneralDashboardResult from "@/components/page/dashboard/general-dashboard-result";
import UserDashboard from "@/components/page/dashboard/user-dashboard";
import RideDashboard from "@/components/page/dashboard/ride-dashboard";
import TransactionDashboard from "@/components/page/dashboard/transaction-dashboard";
import VehicleDashboard from "@/components/page/dashboard/vehicle-dashboard";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import {
    TRANSACTION_STATUS_FILTER_OPTIONS,
    TRANSACTION_PAYMENT_METHOD_FILTER_OPTIONS,
} from "@/utils/constant/constant";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { DollarSign, CreditCard, CalendarIcon, Loader2, X, LoaderCircle } from "lucide-react";
import { setRideListFilter } from "@/redux/slice/ride-slice";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { showErrorMessage } from "@/redux/slice/message-slice";
import { GetReportDetailsInput } from "@/models/dashboard/report/report-details";
import GetReportDetails from "@/api/dashboard/get-report-details";

export default function AdminPage() {
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    // Loading state for get report details api
    const [isLoadReport, setIsLoadReport] = useState(false);
    const dispatch = useDispatch();

    const handleDownloadReport = async (date: DateRange | undefined) => {
        // Validate date range
        // There is 2 case, both date.from and date.to are null or not null, nor case is invalid
        if ((date?.from && date?.to) || date === undefined) {
            const data: GetReportDetailsInput = {
                start_date: date?.from ? format(date.from, "yyyy-MM-dd") : undefined,
                end_date: date?.to ? format(date.to, "yyyy-MM-dd") : undefined,
            };
            // Call get report details api
            await GetReportDetails(data, dispatch, setIsLoadReport);
            // Close dialog after download report successfully
            const dialog = document.getElementById("report");
            if (dialog) {
                dialog.click();
            }
            setDate(undefined);
        } else {
            // Invalid date range
            dispatch(showErrorMessage("Khoảng ngày không hợp lệ"));
            setDate(undefined);
            // Close dialog
            const dialog = document.getElementById("report");
            if (dialog) {
                dialog.click();
            }
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <div className="flex w-full flex-row items-center justify-between p-4">
                <h1 className="p-4 text-2xl font-bold">Tổng quan</h1>
                {/*Export report button*/}
                {/* This button when clicked will appear a modal that allows user to select date range and export report */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="default"
                            id="report"
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Xuất báo cáo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="fixed left-1/2 top-1/2 z-[500] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white p-6 shadow-lg sm:max-w-md">
                        <DialogHeader className="flex items-center justify-between">
                            <div className="flex w-full flex-row items-center justify-between">
                                <DialogTitle className="select-none text-2xl font-bold">
                                    Xuất báo cáo chi tiết
                                </DialogTitle>
                            </div>
                        </DialogHeader>
                        <ScrollArea className="max-h-[60vh] pr-4">
                            <div className="space-y-6">
                                <div className="flex flex-col space-y-4 rounded-lg bg-slate-100 p-6">
                                    <div>
                                        <h3 className="select-none text-lg font-semibold">
                                            Chọn khoảng ngày mong muốn
                                        </h3>
                                        <span className="select-none text-sm text-gray-600">
                                            Hoặc để trống theo mặc định
                                        </span>
                                    </div>
                                    {/* Date range filter */}
                                    <div className="gap-2">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    className="w-full justify-start bg-white text-left font-normal"
                                                    id="date"
                                                    variant="outline"
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date?.from ? (
                                                        date.to ? (
                                                            <>
                                                                {format(date.from, "dd/MM/yyyy")} -{" "}
                                                                {format(date.to, "dd/MM/yyyy")}
                                                            </>
                                                        ) : (
                                                            format(date.from, "dd/MM/yyyy")
                                                        )
                                                    ) : (
                                                        <span className="select-none text-base font-semibold">
                                                            Chọn khoảng ngày
                                                        </span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                align="center"
                                                className="z-[400] w-auto rounded-lg border bg-white p-0"
                                            >
                                                <Calendar
                                                    initialFocus
                                                    className="w-auto"
                                                    defaultMonth={date?.from}
                                                    mode="range"
                                                    modifiers={{
                                                        selected: (day: Date) =>
                                                            (date?.from != null &&
                                                                day.getTime() ===
                                                                    date.from.getTime()) ||
                                                            (date?.to != null &&
                                                                day.getTime() ===
                                                                    date.to.getTime()),
                                                    }}
                                                    modifiersStyles={{
                                                        selected: {
                                                            backgroundColor: "#3b82f6",
                                                            color: "white",
                                                        },
                                                    }}
                                                    numberOfMonths={2}
                                                    selected={date}
                                                    showOutsideDays={false}
                                                    onSelect={setDate}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    {/* Download report button */}
                                    <Button
                                        className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        onClick={() => {
                                            handleDownloadReport(date);
                                        }}
                                        disabled={isLoadReport}
                                    >
                                        {isLoadReport ? (
                                            <>
                                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin bg-white" />
                                                Đang tải...
                                            </>
                                        ) : (
                                            "Tải báo cáo"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
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
