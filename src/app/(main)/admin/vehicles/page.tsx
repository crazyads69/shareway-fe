/* eslint-disable no-nested-ternary */

"use client";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Filter, CalendarIcon } from "lucide-react";
import ReactPaginate from "react-paginate";

import { Separator } from "@/components/ui/separator";
import useGetVehicleList from "@/hooks/vehicle-list/use-get-vehicle-list";
import { RootState } from "@/redux/store/store";
import useDebounce from "@/hooks/use-debounce/use-debounce";
import { clearVehicleListFilter, setVehicleListFilter } from "@/redux/slice/vehicle-slice";
import { Card, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleTable } from "@/components/page/vehicle/vehicle-table";
import { vehicleColumns } from "@/components/page/vehicle/vehicle-columns";

export default function VehiclePage() {
    const dispatch = useDispatch();
    const { isLoadingVehicleList, vehicleList, getVehicleList } = useGetVehicleList();
    const vehicleListFilter = useSelector((state: RootState) => state.vehicle.vehicleListFilter);
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    // Define state for search
    const [searchVehicleName, setSearchVehicleName] = useState<string>(
        vehicleListFilter.search_vehicle_name as string,
    );
    const [searchPlate, setSearchPlate] = useState<string>(
        vehicleListFilter.search_plate as string,
    );
    const [searchOwner, setSearchOwner] = useState<string>(
        vehicleListFilter.search_owner as string,
    );
    const [searchCavet, setSearchCavet] = useState<string>(
        vehicleListFilter.search_cavet as string,
    );

    // Debounce search
    const debouncedSearchVehicleName = useDebounce(searchVehicleName, 500);
    const debouncedSearchPlate = useDebounce(searchPlate, 500);
    const debouncedSearchOwner = useDebounce(searchOwner, 500);
    const debouncedSearchCavet = useDebounce(searchCavet, 500);

    // Handle debounced search
    useEffect(() => {
        dispatch(
            setVehicleListFilter({
                ...vehicleListFilter,
                search_vehicle_name: debouncedSearchVehicleName,
                search_plate: debouncedSearchPlate,
                search_owner: debouncedSearchOwner,
                search_cavet: debouncedSearchCavet,
            }),
        );
    }, [
        debouncedSearchVehicleName,
        debouncedSearchPlate,
        debouncedSearchOwner,
        debouncedSearchCavet,
    ]);

    // // Handle date filter when selected range date complete
    // useEffect(() => {
    //     // Update filter when date range is selected
    //     if (date?.from && date?.to) {
    //         dispatch(
    //             setVehicleListFilter({
    //                 ...vehicleListFilter,
    //                 start_date: format(date.from, "yyyy-MM-dd"),
    //                 end_date: format(date.to, "yyyy-MM-dd"),
    //             }),
    //         );
    //     }
    // }, [date]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <h1 className="select-none self-start p-4 text-2xl font-bold">Danh sách phương tiện</h1>
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
                                {/* Apply button */}
                                <Separator className="bg-slate-300" />
                                <div className="flex flex-row items-center space-x-4 p-4">
                                    <Button
                                        className="bg-blue-500 text-base font-semibold text-white"
                                        variant="default"
                                        onClick={() => {
                                            if (date?.from && date?.to) {
                                                dispatch(
                                                    setVehicleListFilter({
                                                        ...vehicleListFilter,
                                                        start_date: format(date.from, "yyyy-MM-dd"),
                                                        end_date: format(date.to, "yyyy-MM-dd"),
                                                    }),
                                                );
                                                // Close popover
                                                const popoverTrigger =
                                                    document.getElementById("date");

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
                                                setVehicleListFilter({
                                                    ...vehicleListFilter,
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
                    </div>
                    <div className="h-12 border border-r" />
                    {/* <div className="gap-2">
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
                    <div className="h-12 border border-r" /> */}
                    {/* Search */}
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-60"
                            placeholder="Tìm kiếm theo tên phương tiện"
                            type="text"
                            value={searchVehicleName}
                            onChange={(e) => setSearchVehicleName(e.target.value)}
                        />
                    </div>
                    <div className="h-12 border border-r" />
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-60"
                            placeholder="Tìm kiếm theo biển số"
                            type="text"
                            value={searchPlate}
                            onChange={(e) => setSearchPlate(e.target.value)}
                        />
                    </div>
                    <div className="h-12 border border-r" />
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-60"
                            placeholder="Tìm kiếm theo chủ sở hữu"
                            type="text"
                            value={searchOwner}
                            onChange={(e) => setSearchOwner(e.target.value)}
                        />
                    </div>
                    <div className="h-12 border border-r" />
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-60"
                            placeholder="Tìm kiếm theo số cà vẹt"
                            type="text"
                            value={searchCavet}
                            onChange={(e) => setSearchCavet(e.target.value)}
                        />
                    </div>
                    {/* Divider */}
                    {/* Reset filter */}
                    {/* Only render when userFilterState change different with inital */}
                    {/* Divider */}
                    {(vehicleListFilter.start_date !== "" ||
                        vehicleListFilter.end_date !== "" ||
                        vehicleListFilter.search_vehicle_name !== "" ||
                        vehicleListFilter.search_plate !== "" ||
                        vehicleListFilter.search_owner !== "" ||
                        vehicleListFilter.search_cavet !== "") && (
                        <>
                            <div className="h-12 border border-r" />
                            <div className="gap-2">
                                <Button
                                    className="text-base font-semibold text-red-500"
                                    variant="ghost"
                                    onClick={() => {
                                        dispatch(clearVehicleListFilter());
                                        setSearchVehicleName("");
                                        setSearchPlate("");
                                        setSearchOwner("");
                                        setSearchCavet("");
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
            {/* Table and Pagination */}
            {isLoadingVehicleList || !vehicleList ? (
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
                        <VehicleTable columns={vehicleColumns} data={vehicleList.vehicles ?? []} />
                    </div>
                    <div className="mb-4 mt-4 flex w-full flex-row items-center justify-between space-x-4">
                        <h1 className="select-none text-sm font-semibold">
                            Hiển thị {vehicleList?.vehicles?.length ?? 0} trong tổng số{" "}
                            {vehicleList.total_vehicles} kết quả
                        </h1>
                        <div className="flex w-fit flex-row">
                            <ReactPaginate
                                disableInitialCallback
                                activeClassName="select-none w-[2.125rem] h-[2.125rem] py-[0.5rem] rounded-md font-sans text-[#FFFFFF] bg-blue-500 flex-col flex items-center justify-center"
                                breakClassName=" select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.75rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col  items-center justify-center border-[#DFE4EA]"
                                breakLabel="..."
                                containerClassName="flex flex-row items-center justify-center bg-white border border-[#DFE4EA] rounded-[0.625rem] px-[0.75rem] py-[0.75rem] gap-x-[0.5rem] gap-y-[0.5rem]"
                                forcePage={vehicleList.current_page - 1}
                                marginPagesDisplayed={1}
                                nextClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.5rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                                nextLabel=">"
                                pageClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.75rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                                pageCount={vehicleList.total_pages}
                                pageRangeDisplayed={3}
                                previousClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.5rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                                onPageChange={({ selected }) => {
                                    dispatch(
                                        setVehicleListFilter({
                                            ...vehicleListFilter,
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