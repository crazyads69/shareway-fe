/* eslint-disable no-nested-ternary */
import { addDays, format } from "date-fns";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { CartesianGrid, XAxis, YAxis, AreaChart, Area } from "recharts";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DASHBOARD_FILTER_OPTIONS } from "@/utils/constant/constant";
import { Card, CardHeader } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import useGetTransactionDashboard from "@/hooks/dashboard/transaction/use-get-transaction-dashboard";

const chartConfig = {
    total: {
        label: "Tổng tiền: ",
        color: "#2563eb",
    },
} satisfies ChartConfig;

export default function TransactionDashboard() {
    const { isLoadingTransactionDashboard, transactionDashboardData, getTransactionDashboard } =
        useGetTransactionDashboard();
    const [selectedFilter, setSelectedFilter] = useState(DASHBOARD_FILTER_OPTIONS[0].value);
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(Date.now()),
        to: addDays(new Date(), 7),
    });

    useEffect(() => {
        if (selectedFilter === "custom") {
            if (date?.from && date?.to) {
                getTransactionDashboard(selectedFilter, date.from, date.to);
            }
        } else {
            setDate(undefined);
            getTransactionDashboard(selectedFilter, null, null);
        }
    }, [date, selectedFilter]);

    if (isLoadingTransactionDashboard || !transactionDashboardData) {
        return (
            <div className="w-full p-4">
                <Skeleton className="h-60 min-h-40 w-full bg-slate-200" />
            </div>
        );
    }

    return (
        <Card className="w-full bg-white p-4">
            <CardHeader className="flex items-center justify-between">
                <div className="flex w-full flex-row items-center justify-between">
                    <h2 className="select-none text-xl font-bold">Tổng giá trị giao dịch</h2>
                    <div className="flex flex-row items-center space-x-4 self-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="rounded-lg border p-2 hover:bg-slate-200 hover:outline-none hover:ring-0 focus:outline-none focus:ring-0">
                                {
                                    DASHBOARD_FILTER_OPTIONS.find(
                                        (option) => option.value === selectedFilter,
                                    )?.label
                                }
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white">
                                {DASHBOARD_FILTER_OPTIONS.map((option) => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        className="p-2 hover:bg-slate-200 hover:outline-none"
                                        onClick={() => setSelectedFilter(option.value)}
                                    >
                                        {option.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {selectedFilter === "custom" && (
                            <div className="gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            className="w-[300px] justify-start text-left font-normal"
                                            id="date"
                                            variant="outline"
                                        >
                                            <CalendarIcon />
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
                                                <span className="select-none">
                                                    Chọn khoảng ngày
                                                </span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="start" className="w-auto p-0">
                                        <Calendar
                                            initialFocus
                                            className="w-auto bg-white"
                                            defaultMonth={date?.from}
                                            mode="range"
                                            modifiers={{
                                                selected: (day) =>
                                                    (date?.from != null &&
                                                        day.getTime() === date.from.getTime()) ||
                                                    (date?.to != null &&
                                                        day.getTime() === date.to.getTime()),
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
                        )}
                    </div>
                </div>
            </CardHeader>
            {!transactionDashboardData.transaction_stats ? (
                <div className="flex h-40 items-center justify-center">
                    <h1 className="select-none text-xl font-bold">Không có dữ liệu</h1>
                </div>
            ) : (
                <ChartContainer className="max-h-60 min-h-40 w-full" config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={transactionDashboardData.transaction_stats}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    labelKey="date"
                                    nameKey="total"
                                />
                            }
                        />
                        <XAxis
                            axisLine
                            dataKey="date"
                            tickFormatter={(value) => {
                                const date = new Date(value);

                                return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
                            }}
                            tickLine={false}
                            tickMargin={10}
                        />
                        <YAxis
                            axisLine
                            tickLine
                            allowDecimals={false}
                            dataKey="total"
                            tickMargin={10}
                        />
                        <Area dataKey="total" fill="#2563eb" radius={0.5} />
                    </AreaChart>
                </ChartContainer>
            )}
        </Card>
    );
}
