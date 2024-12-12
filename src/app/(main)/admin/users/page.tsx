/* eslint-disable no-nested-ternary */

"use client";

import { useDispatch, useSelector } from "react-redux";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/store";
import useGetUserList from "@/hooks/user-list/use-get-user-list";
import { Card, CardDescription } from "@/components/ui/card";
import { clearUserListFilter, setUserListFilter } from "@/redux/slice/user-slice";
import { Input } from "@/components/ui/input";

export default function UserPage() {
    const { isLoadingUserList, userList, getUserList } = useGetUserList();
    const userListFilter = useSelector((state: RootState) => state.user.userListFilter);
    const dispatch = useDispatch();

    // const [date, setDate] = useState<DateRange | undefined>({
    //     from: new Date(Date.now()),
    //     to: addDays(new Date(), 7),
    // });
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    useEffect(() => {
        // Update filter when date range is selected
        if (date?.from && date?.to) {
            dispatch(
                setUserListFilter({
                    ...userListFilter,
                    start_date: format(date.from, "yyyy-MM-dd"),
                    end_date: format(date.to, "yyyy-MM-dd"),
                }),
            );
        }
    }, [date]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <h1 className="select-none self-start p-4 text-2xl font-bold">Danh sách người dùng</h1>
            {/* Filter */}
            <Card className="mt-4 flex h-fit w-fit flex-row items-center self-start bg-white p-4">
                <CardDescription className="flex w-full flex-row items-center space-x-4">
                    {/* Filter icon */}
                    <div className="flex h-12 w-12 items-center justify-center">
                        <Filter size={32} />
                    </div>
                    {/* Filter description */}
                    <div className="flex flex-col items-center">
                        <span className="select-none text-base font-semibold">Bộ lọc</span>
                    </div>
                    {/* Divider */}
                    <div className="h-12 border border-r" />
                    {/* Filter button */}
                    <div className="gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className="justify-start text-left font-normal"
                                    id="date"
                                    variant="ghost"
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
                                        <span className="select-none text-base font-semibold">
                                            Chọn khoảng ngày
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-auto p-0">
                                <Calendar
                                    initialFocus
                                    className="w-auto rounded-lg border bg-white"
                                    defaultMonth={date?.from}
                                    mode="range"
                                    modifiers={{
                                        selected: (day: Date) =>
                                            (date?.from != null &&
                                                day.getTime() === date.from.getTime()) ||
                                            (date?.to != null &&
                                                day.getTime() === date.to.getTime()),
                                    }}
                                    modifiersStyles={{
                                        selected: {
                                            backgroundColor: "#3b82f6", // bg-blue-500
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
                    <div className="h-12 border border-r" />
                    <div className="gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="text-base font-semibold" variant="ghost">
                                    Trạng thái
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-fit rounded-lg border bg-white p-4">
                                <div className="flex flex-col space-y-4 p-2">
                                    <h1 className="text-lg font-semibold">Trạng thái tài khoản</h1>
                                    <div className="flex w-full flex-row items-center space-x-3">
                                        <Button
                                            className={`w-fit p-2 ${userListFilter.is_activated ? "bg-blue-500 text-white" : ""}`}
                                            variant="outline"
                                            onClick={() => {
                                                dispatch(
                                                    setUserListFilter({
                                                        ...userListFilter,
                                                        is_activated: true,
                                                    }),
                                                );
                                            }}
                                        >
                                            Đã kích hoạt
                                        </Button>
                                        <Button
                                            className={`w-fit p-2 ${userListFilter.is_activated === false ? "bg-blue-500 text-white" : ""}`}
                                            variant="outline"
                                            onClick={() => {
                                                dispatch(
                                                    setUserListFilter({
                                                        ...userListFilter,
                                                        is_activated: false,
                                                    }),
                                                );
                                            }}
                                        >
                                            Chưa kích hoạt
                                        </Button>
                                        <Button
                                            className={`w-fit p-2 ${userListFilter.is_verified ? "bg-blue-500 text-white" : ""}`}
                                            variant="outline"
                                            onClick={() => {
                                                dispatch(
                                                    setUserListFilter({
                                                        ...userListFilter,
                                                        is_verified: true,
                                                    }),
                                                );
                                            }}
                                        >
                                            Đã xác thực
                                        </Button>
                                        <Button
                                            className={`w-fit p-2 ${userListFilter.is_verified === false ? "bg-blue-500 text-white" : ""}`}
                                            variant="outline"
                                            onClick={() => {
                                                dispatch(
                                                    setUserListFilter({
                                                        ...userListFilter,
                                                        is_verified: false,
                                                    }),
                                                );
                                            }}
                                        >
                                            Chưa xác thực
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="h-12 border border-r" />
                    {/* Search */}
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-60"
                            placeholder="Tìm kiếm theo tên"
                            type="text"
                            onChange={(e) => {
                                const { value } = e.target;

                                if (value === "") {
                                    dispatch(
                                        setUserListFilter({
                                            ...userListFilter,
                                            search_full_name: "",
                                        }),
                                    );

                                    return;
                                }

                                const timeoutId = setTimeout(() => {
                                    dispatch(
                                        setUserListFilter({
                                            ...userListFilter,
                                            search_full_name: value,
                                        }),
                                    );
                                }, 1500);

                                () => clearTimeout(timeoutId);
                            }}
                        />
                    </div>
                    {/* Divider */}
                    {/* Reset filter */}
                    {/* Only render when userFilterState change different with inital */}
                    {(userListFilter.start_date !== "" ||
                        userListFilter.end_date !== "" ||
                        userListFilter.is_activated !== undefined ||
                        userListFilter.search_full_name !== "" ||
                        userListFilter.is_verified !== undefined) && (
                        <>
                            <div className="h-12 border border-r" />
                            <div className="gap-2">
                                <Button
                                    className="text-base font-semibold text-red-500"
                                    variant="ghost"
                                    onClick={() => {
                                        dispatch(clearUserListFilter());
                                        setDate(undefined);
                                    }}
                                >
                                    Reset bộ lọc
                                </Button>
                            </div>
                        </>
                    )}
                </CardDescription>
            </Card>
        </div>
    );
}
