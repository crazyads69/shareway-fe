/* eslint-disable no-nested-ternary */

"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Filter, CalendarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useGetRideList from "@/hooks/ride-list/use-get-ride-list";
import { Card, CardDescription } from "@/components/ui/card";
import { RIDE_STATUS_FILTER_OPTIONS } from "@/utils/constant/constant";
import { clearRideListFilter, setRideListFilter } from "@/redux/slice/ride-slice";
import { RootState } from "@/redux/store/store";
import useDebounce from "@/hooks/use-debounce/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { RideTable } from "@/components/page/ride/ride-table";
import { rideColumns } from "@/components/page/ride/ride-columns";

export default function RidePage() {
    const dispatch = useDispatch();
    const { isLoadingRideList, rideList, getRideList } = useGetRideList();
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    const rideListFilter = useSelector((state: RootState) => state.ride.rideListFilter);
    const [searchFullName, setSearchFullName] = useState<string>(
        rideListFilter.search_full_name as string,
    );
    const [searchRoute, setSearchRoute] = useState<string>(rideListFilter.search_route as string);

    const [searchVehicle, setSearchVehicle] = useState<string>(
        rideListFilter.search_vehicle as string,
    );
    // Debounce for search
    const debouncedSearchFullName = useDebounce(searchFullName, 500);
    const debouncedSearchRoute = useDebounce(searchRoute, 500);
    const debouncedSearchVehicle = useDebounce(searchVehicle, 500);

    // Handle search
    useEffect(() => {
        dispatch(
            setRideListFilter({
                ...rideListFilter,
                search_full_name: debouncedSearchFullName,
                search_route: debouncedSearchRoute,
                search_vehicle: debouncedSearchVehicle,
            }),
        );
    }, [debouncedSearchFullName, debouncedSearchRoute, debouncedSearchVehicle]);

    useEffect(() => {
        // Update filter when date range is selected
        if (date?.from && date?.to) {
            dispatch(
                setRideListFilter({
                    ...rideListFilter,
                    start_date_time: format(date.from, "yyyy-MM-dd"),
                    end_date_time: format(date.to, "yyyy-MM-dd"),
                }),
            );
        }
    }, [date]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <h1 className="select-none self-start p-4 text-2xl font-bold">Danh sách chuyến đi</h1>
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
                            <PopoverContent align="start" className="z-[400] w-auto p-0">
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
                                                                (status) => status !== option.value,
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
                            className="w-60"
                            placeholder="Tìm kiếm theo tên"
                            type="text"
                            value={searchFullName}
                            onChange={(e) => setSearchFullName(e.target.value)}
                        />
                    </div>
                    <div className="h-12 border border-r" />
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-60"
                            placeholder="Tìm kiếm theo địa điểm"
                            type="text"
                            value={searchRoute}
                            onChange={(e) => setSearchRoute(e.target.value)}
                        />
                    </div>
                    <div className="h-12 border border-r" />
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-60"
                            placeholder="Tìm kiếm theo phương tiện"
                            type="text"
                            value={searchVehicle}
                            onChange={(e) => setSearchVehicle(e.target.value)}
                        />
                    </div>
                    {/* Divider */}
                    {/* Reset filter */}
                    {/* Only render when userFilterState change different with inital */}
                    {/* Divider */}
                    {(rideListFilter.search_full_name !== "" ||
                        rideListFilter.search_route !== "" ||
                        rideListFilter.search_vehicle !== "" ||
                        rideListFilter.start_date_time !== "" ||
                        rideListFilter.end_date_time !== "" ||
                        (rideListFilter.ride_status && rideListFilter.ride_status.length > 0)) && (
                        <>
                            <div className="h-12 border border-r" />
                            <div className="gap-2">
                                <Button
                                    className="text-base font-semibold text-red-500"
                                    variant="ghost"
                                    onClick={() => {
                                        dispatch(clearRideListFilter());
                                        setSearchFullName("");
                                        setSearchRoute("");
                                        setSearchVehicle("");
                                        setDate(undefined);
                                    }}
                                >
                                    Xóa bộ lọc
                                </Button>
                            </div>
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
                        <RideTable columns={rideColumns} data={rideList?.rides ?? []} />
                    </div>
                    <div className="mb-4 mt-4 flex w-full flex-row items-center justify-between space-x-4">
                        <h1 className="select-none text-sm font-semibold">
                            Hiển thị {rideList?.rides?.length ?? 0} trong tổng số{" "}
                            {rideList.total_rides} kết quả
                        </h1>
                        <div className="flex w-fit flex-row">
                            <ReactPaginate
                                disableInitialCallback
                                activeClassName="select-none w-[2.125rem] h-[2.125rem] py-[0.5rem] rounded-md font-sans text-[#FFFFFF] bg-blue-500 flex-col flex items-center justify-center"
                                breakClassName=" select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.75rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col  items-center justify-center border-[#DFE4EA]"
                                breakLabel="..."
                                containerClassName="flex flex-row items-center justify-center bg-white border border-[#DFE4EA] rounded-[0.625rem] px-[0.75rem] py-[0.75rem] gap-x-[0.5rem] gap-y-[0.5rem]"
                                forcePage={rideList.current_page - 1}
                                marginPagesDisplayed={1}
                                nextClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.5rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                                nextLabel=">"
                                pageClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.75rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                                pageCount={rideList.total_pages}
                                pageRangeDisplayed={3}
                                previousClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.5rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                                previousLabel="<"
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
