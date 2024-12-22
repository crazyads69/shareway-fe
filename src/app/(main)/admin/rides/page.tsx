/* eslint-disable no-nested-ternary */

"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Filter, CalendarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useGetRideList from "@/hooks/ride/use-get-ride-list";
import { Card, CardDescription } from "@/components/ui/card";
import { RIDE_STATUS_FILTER_OPTIONS } from "@/utils/constant/constant";
import { clearRideListFilter, setRideListFilter } from "@/redux/slice/ride-slice";
import { RootState } from "@/redux/store/store";
import useDebounce from "@/hooks/use-debounce/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { rideColumns } from "@/components/page/ride/ride-columns";
import { DataTable } from "@/components/global/data-table/data-table";

export default function RidePage() {
    const dispatch = useDispatch();
    const { isLoadingRideList, rideList, getRideList } = useGetRideList();
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    const rideListFilter = useSelector((state: RootState) => state.ride.rideListFilter);
    const [searchDriver, setSearchDriver] = useState<string>(
        rideListFilter.search_driver as string,
    );
    const [searchHitcher, setSearchHitcher] = useState<string>(
        rideListFilter.search_hitcher as string,
    );
    const [searchRoute, setSearchRoute] = useState<string>(rideListFilter.search_route as string);

    const [searchVehicle, setSearchVehicle] = useState<string>(
        rideListFilter.search_vehicle as string,
    );
    // Debounce for search
    const debouncedSearchDriver = useDebounce(searchDriver, 500);
    const debouncedSearchHitcher = useDebounce(searchHitcher, 500);
    const debouncedSearchRoute = useDebounce(searchRoute, 500);
    const debouncedSearchVehicle = useDebounce(searchVehicle, 500);

    // Handle search
    useEffect(() => {
        dispatch(
            setRideListFilter({
                ...rideListFilter,
                search_driver: debouncedSearchDriver,
                search_hitcher: debouncedSearchHitcher,
                search_route: debouncedSearchRoute,
                search_vehicle: debouncedSearchVehicle,
            }),
        );
    }, [
        debouncedSearchDriver,
        debouncedSearchHitcher,
        debouncedSearchRoute,
        debouncedSearchVehicle,
    ]);

    // useEffect(() => {
    //     // Update filter when date range is selected
    //     if (date?.from && date?.to) {
    //         dispatch(
    //             setRideListFilter({
    //                 ...rideListFilter,
    //                 start_date_time: format(date.from, "yyyy-MM-dd"),
    //                 end_date_time: format(date.to, "yyyy-MM-dd"),
    //             }),
    //         );
    //     }
    // }, [date]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <h1 className="select-none self-start p-4 text-2xl font-bold">Danh sách chuyến đi</h1>
            <Card className="mt-4 flex h-fit w-fit flex-row items-center self-start bg-white p-1 2xl:p-4">
                <CardDescription className="flex w-full flex-row items-center space-x-2 2xl:space-x-4">
                    {/* Filter icon */}
                    <div className="h-12å flex items-center justify-center">
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
                                                setRideListFilter({
                                                    ...rideListFilter,
                                                    start_date_time: format(
                                                        date.from,
                                                        "yyyy-MM-dd",
                                                    ),
                                                    end_date_time: format(date.to, "yyyy-MM-dd"),
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
                                            setRideListFilter({
                                                ...rideListFilter,
                                                start_date_time: undefined,
                                                end_date_time: undefined,
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
                    <div className="gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className="p-1 text-base font-semibold 2xl:p-2"
                                    variant="ghost"
                                >
                                    Trạng thái
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="z-[400] w-fit rounded-lg border bg-white p-4">
                                <div className="flex flex-col space-y-4 p-2">
                                    <h1 className="text-lg font-semibold">Trạng thái chuyến đi</h1>
                                    <div className="flex w-full flex-row items-center space-x-3">
                                        {RIDE_STATUS_FILTER_OPTIONS.map((option) => (
                                            <Button
                                                key={option.value}
                                                className={`w-fit p-2 ${
                                                    rideListFilter.ride_status?.includes(
                                                        option.value,
                                                    )
                                                        ? "bg-blue-500 text-white"
                                                        : ""
                                                }`}
                                                variant="outline"
                                                onClick={() => {
                                                    if (
                                                        rideListFilter.ride_status?.includes(
                                                            option.value,
                                                        )
                                                    ) {
                                                        const newStatus =
                                                            rideListFilter.ride_status.filter(
                                                                (status: string) => status !== option.value,
                                                            );

                                                        dispatch(
                                                            setRideListFilter({
                                                                ...rideListFilter,
                                                                ride_status: newStatus,
                                                            }),
                                                        );
                                                    } else {
                                                        dispatch(
                                                            setRideListFilter({
                                                                ...rideListFilter,
                                                                ride_status: [
                                                                    ...(rideListFilter.ride_status ||
                                                                        []),
                                                                    option.value,
                                                                ],
                                                            }),
                                                        );
                                                    }
                                                }}
                                            >
                                                {option.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="h-12 border border-r" />
                    {/* Search */}
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-52 text-sm 2xl:w-60"
                            placeholder="Tìm theo người cho đi nhờ"
                            type="text"
                            value={searchDriver}
                            onChange={(e) => setSearchDriver(e.target.value)}
                        />
                    </div>
                    <div className="h-12 border border-r" />
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-42 2xl:w-60"
                            placeholder="Tìm theo người đi nhờ"
                            type="text"
                            value={searchHitcher}
                            onChange={(e) => setSearchHitcher(e.target.value)}
                        />
                    </div>
                    <div className="h-12 border border-r" />
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-36 text-sm 2xl:w-60"
                            placeholder="Tìm theo địa điểm"
                            type="text"
                            value={searchRoute}
                            onChange={(e) => setSearchRoute(e.target.value)}
                        />
                    </div>
                    {/* <div className="h-12 border border-r" />
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-60"
                            placeholder="Tìm kiếm theo phương tiện"
                            type="text"
                            value={searchVehicle}
                            onChange={(e) => setSearchVehicle(e.target.value)}
                        />
                    </div> */}
                    {/* Divider */}
                    {/* Reset filter */}
                    {/* Only render when userFilterState change different with inital */}
                    {/* Divider */}
                    {(rideListFilter.search_driver !== "" ||
                        rideListFilter.search_hitcher !== "" ||
                        rideListFilter.search_route !== "" ||
                        rideListFilter.search_vehicle !== "" ||
                        rideListFilter.start_date_time !== "" ||
                        rideListFilter.end_date_time !== "" ||
                        (rideListFilter.ride_status && rideListFilter.ride_status.length > 0)) && (
                        <>
                            <div className="h-12 border border-r" />
                            <Button
                                className="p-1 font-semibold text-red-500 2xl:p-2 2xl:text-base"
                                variant="ghost"
                                onClick={() => {
                                    dispatch(clearRideListFilter());
                                    setSearchDriver("");
                                    setSearchHitcher("");
                                    setSearchRoute("");
                                    setSearchVehicle("");
                                    setDate(undefined);
                                }}
                            >
                                Xóa bộ lọc
                            </Button>
                        </>
                    )}
                </CardDescription>
            </Card>
            {isLoadingRideList || !rideList ? (
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
                        <DataTable columns={rideColumns} data={rideList?.rides ?? []} />
                    </div>
                    <div className="mb-4 mt-4 flex w-full flex-row items-center justify-between space-x-4">
                        <h1 className="select-none text-sm font-semibold">
                            Hiển thị {rideList?.rides?.length ?? 0} trong tổng số{" "}
                            {rideList.total_rides} kết quả
                        </h1>
                        <div className="flex w-fit flex-row">
                            <ReactPaginate
                                disableInitialCallback
                                breakLabel="..."
                                forcePage={rideList.current_page - 1}
                                marginPagesDisplayed={1}
                                nextLabel=">"
                                pageCount={rideList.total_pages}
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
                                        setRideListFilter({
                                            ...rideListFilter,
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
