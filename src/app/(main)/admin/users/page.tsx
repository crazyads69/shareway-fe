/* eslint-disable no-nested-ternary */

"use client";

import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";

import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/store";
import useGetUserList from "@/hooks/user-list/use-get-user-list";
import { Card, CardDescription } from "@/components/ui/card";
import { clearUserListFilter, setUserListFilter } from "@/redux/slice/user-slice";
import { Input } from "@/components/ui/input";
import { UserTable } from "@/components/page/user/user-table";
import { userColumns } from "@/components/page/user/user-columns";
import { Skeleton } from "@/components/ui/skeleton";
import useDebounce from "@/hooks/use-debounce/use-debounce";
import { DataTable } from "@/components/global/data-table/data-table";

export default function UserPage() {
    const { isLoadingUserList, userList, getUserList } = useGetUserList();
    const userListFilter = useSelector((state: RootState) => state.user.userListFilter);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState(userListFilter.search_full_name);
    const debouncedSearchTerm = useDebounce(searchTerm as string, 500);

    useEffect(() => {
        dispatch(
            setUserListFilter({
                ...userListFilter,
                search_full_name: debouncedSearchTerm,
            }),
        );
    }, [debouncedSearchTerm]);

    const [date, setDate] = useState<DateRange | undefined>(undefined);

    // useEffect(() => {
    //     // Update filter when date range is selected
    //     if (date?.from && date?.to) {
    //         dispatch(
    //             setUserListFilter({
    //                 ...userListFilter,
    //                 start_date: format(date.from, "yyyy-MM-dd"),
    //                 end_date: format(date.to, "yyyy-MM-dd"),
    //             }),
    //         );
    //     }
    // }, [date]);

    // // Render loading skeleton when fetching data
    // if (isLoadingUserList || !userList) {
    //     return (
    //         <div className="mt-4 flex min-h-screen w-full flex-col items-center justify-start">
    //             <h1 className="select-none self-start p-4 text-2xl font-bold">
    //                 Danh sách người dùng
    //             </h1>
    //             <Skeleton className="mt-4 h-20 w-[45%] self-start bg-slate-200 p-4" />
    //             <div className="mt-4 flex w-full flex-col items-center justify-center">
    //                 {/* Render 10 skeleton rows */}
    //                 {[...Array(10)].map((_, index) => (
    //                     <Skeleton
    //                         key={crypto.randomUUID()}
    //                         className="mt-1 h-16 w-full self-start bg-slate-200 p-4"
    //                     />
    //                 ))}
    //             </div>
    //             <div className="mb-4 mt-4 flex w-full flex-row items-center justify-between space-x-4">
    //                 <Skeleton className="h-12 w-48 bg-slate-200 p-4" />
    //                 <Skeleton className="h-12 w-36 bg-slate-200 p-4" />
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <h1 className="select-none self-start p-4 text-2xl font-bold">Danh sách người dùng</h1>
            {/* Filter */}
            <Card className="mt-4 flex h-fit w-fit flex-row items-center self-start bg-white p-1 2xl:p-4">
                <CardDescription className="flex w-full flex-row items-center space-x-2 2xl:space-x-4">
                    {/* Filter icon */}
                    <div className="flex h-12 w-12 items-center justify-center">
                        <Filter size={32} />
                    </div>
                    {/* Filter description */}
                    <div className="hidden w-full items-center 2xl:flex">
                        <span className="select-none text-base font-semibold">Bộ lọc</span>
                    </div>
                    {/* Divider */}
                    <div className="h-12 border border-r" />
                    {/* Filter button */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="justify-start p-1 text-left font-normal 2xl:p-2"
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
                        <PopoverContent
                            align="start"
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
                                            day.getTime() === date.from.getTime()) ||
                                        (date?.to != null && day.getTime() === date.to.getTime()),
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
                            {/* Apply button */}
                            <Separator className="bg-slate-300" />
                            <div className="flex flex-row items-center space-x-4 p-4">
                                <Button
                                    className="bg-blue-500 text-base font-semibold text-white"
                                    variant="default"
                                    onClick={() => {
                                        if (date?.from && date?.to) {
                                            dispatch(
                                                setUserListFilter({
                                                    ...userListFilter,
                                                    start_date: format(date.from, "yyyy-MM-dd"),
                                                    end_date: format(date.to, "yyyy-MM-dd"),
                                                }),
                                            );
                                            // Close popover
                                            const popoverTrigger = document.getElementById("date");

                                            if (popoverTrigger instanceof HTMLElement) {
                                                popoverTrigger.click();
                                            }
                                        }
                                    }}
                                >
                                    Áp dụng
                                </Button>
                                {/* Reset button */}
                                <Button
                                    className="bg-red-500 text-base font-semibold text-white"
                                    variant="default"
                                    onClick={() => {
                                        setDate(undefined);
                                        // Reset filter
                                        dispatch(
                                            setUserListFilter({
                                                ...userListFilter,
                                                start_date: undefined,
                                                end_date: undefined,
                                            }),
                                        );
                                        // Close popover
                                        const popoverTrigger = document.getElementById("date");

                                        if (popoverTrigger instanceof HTMLElement) {
                                            popoverTrigger.click();
                                        }
                                    }}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <div className="h-12 border border-r" />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="p-1 text-base font-semibold 2xl:p-2" variant="ghost">
                                Trạng thái
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="z-[400] w-fit rounded-lg border bg-white p-4">
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
                    <div className="h-12 border border-r" />
                    {/* Search */}
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-40 2xl:w-60"
                            placeholder="Tìm kiếm theo tên"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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

                            <Button
                                className="p-1 text-base font-semibold text-red-500 2xl:p-2"
                                variant="ghost"
                                onClick={() => {
                                    dispatch(clearUserListFilter());
                                    setSearchTerm("");
                                    setDate(undefined);
                                }}
                            >
                                Xóa bộ lọc
                            </Button>
                        </>
                    )}
                </CardDescription>
            </Card>
            {isLoadingUserList || !userList ? (
                <>
                    <div className="mt-4 flex w-full flex-col items-center justify-center">
                        {/* Render 10 skeleton rows */}
                        {[...Array(9)].map((_, index) => (
                            <Skeleton
                                key={crypto.randomUUID()}
                                className="mt-1 h-16 w-full self-start bg-slate-200 p-4"
                            />
                        ))}
                    </div>
                    <div className="mb-4 mt-4 flex w-full flex-row items-center justify-between space-x-4">
                        <Skeleton className="h-12 w-48 bg-slate-200 p-4" />
                        <Skeleton className="h-12 w-36 bg-slate-200 p-4" />
                    </div>
                </>
            ) : (
                <>
                    <div className="mt-4 flex w-full flex-col items-center justify-center space-y-4">
                        <DataTable columns={userColumns} data={userList?.users} />
                    </div>
                    <div className="mb-4 mt-4 flex w-full flex-row items-center justify-between space-x-4">
                        <h1 className="select-none text-sm font-semibold">
                            Hiển thị {userList?.users.length} trong tổng số {userList?.total_users}{" "}
                            kết quả
                        </h1>
                        <div className="flex w-fit flex-row">
                            <ReactPaginate
                                disableInitialCallback
                                breakLabel="..."
                                forcePage={userListFilter.page - 1}
                                marginPagesDisplayed={1}
                                nextLabel=">"
                                pageCount={userList.total_pages}
                                pageRangeDisplayed={3}
                                previousLabel="<"
                                containerClassName="flex flex-row items-center justify-center bg-white border border-[#DFE4EA] rounded-[0.625rem] px-[0.75rem] py-[0.75rem] gap-x-[0.5rem] gap-y-[0.5rem]"
                                activeClassName="select-none w-[2.125rem] h-[2.125rem] py-[0.5rem] rounded-md font-sans text-[#FFFFFF] bg-blue-500 flex-col flex items-center justify-center"
                                pageLinkClassName="w-full h-full flex items-center justify-center"
                                previousLinkClassName="w-full h-full flex items-center justify-center"
                                nextLinkClassName="w-full h-full flex items-center justify-center"
                                breakLinkClassName="w-full h-full flex items-center justify-center"
                                pageClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md border font-sans text-[#637381] border-[#DFE4EA]"
                                previousClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md border font-sans text-[#637381] border-[#DFE4EA]"
                                nextClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md border font-sans text-[#637381] border-[#DFE4EA]"
                                breakClassName="select-none w-[2.125rem] h-[2.125rem] rounded-md border font-sans text-[#637381] border-[#DFE4EA]"
                                renderOnZeroPageCount={null}
                                onPageChange={({ selected }) => {
                                    dispatch(
                                        setUserListFilter({
                                            ...userListFilter,
                                            page: selected + 1,
                                        }),
                                    );
                                }}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
