/* eslint-disable no-nested-ternary */

"use client";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Filter, CalendarIcon, DollarSign } from "lucide-react";
import ReactPaginate from "react-paginate";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import useGetTransactionList from "@/hooks/transaction-list/use-get-transaction-list";
import { RootState } from "@/redux/store/store";
import useDebounce from "@/hooks/use-debounce/use-debounce";
import {
    clearTransactionListFilter,
    setTransactionListFilter,
} from "@/redux/slice/transaction-slice";
import { Card, CardDescription } from "@/components/ui/card";
import {
    TRANSACTION_PAYMENT_METHOD_FILTER_OPTIONS,
    TRANSACTION_STATUS_FILTER_OPTIONS,
} from "@/utils/constant/constant";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentTable } from "@/components/page/payment/payment-table";
import { paymentColumns } from "@/components/page/payment/payment-columns";

interface AmountRange {
    min: number | undefined;
    max: number | undefined;
}

const formatCurrency = (value: string) => {
    const number = parseInt(value.replace(/\D/g, ""), 10);

    return Number.isNaN(number) ? "" : number.toLocaleString("vi-VN");
};

export default function PaymentPage() {
    const dispatch = useDispatch();
    const { isLoadingTransactionList, transactionList, getTransactionList } =
        useGetTransactionList();
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    const transactionListFilter = useSelector(
        (state: RootState) => state.transaction.transactionListFilter,
    );

    const [searchSender, setSearchSender] = useState<string>(
        transactionListFilter.search_sender as string,
    );
    const [searchReceiver, setSearchReceiver] = useState<string>(
        transactionListFilter.search_receiver as string,
    );
    const [amountRange, setAmountRange] = useState<{
        min: string;
        max: string;
    }>({
        min: transactionListFilter.min_amount?.toLocaleString("vi-VN") || "",
        max: transactionListFilter.max_amount?.toLocaleString("vi-VN") || "",
    });

    // Debounce search
    const debouncedSearchSender = useDebounce(searchSender, 500);
    const debouncedSearchReceiver = useDebounce(searchReceiver, 500);

    // Handle debounced search
    useEffect(() => {
        dispatch(
            setTransactionListFilter({
                ...transactionListFilter,
                search_sender: debouncedSearchSender,
                search_receiver: debouncedSearchReceiver,
            }),
        );
    }, [debouncedSearchSender, debouncedSearchReceiver]);

    // Handle date range change after selecting and update filter
    // useEffect(() => {
    //     // Update filter when date range is selected
    //     if (date?.from && date?.to) {
    //         dispatch(
    //             setTransactionListFilter({
    //                 ...transactionListFilter,
    //                 start_date: format(date.from, "yyyy-MM-dd"),
    //                 end_date: format(date.to, "yyyy-MM-dd"),
    //             }),
    //         );
    //     }
    // }, [date]);

    // Handle amount range change after selecting and update filter
    // useEffect(() => {
    //     const minAmount = parseInt(amountRange.min.replace(/\D/g, ""), 10);
    //     const maxAmount = parseInt(amountRange.max.replace(/\D/g, ""), 10);

    //     if (!Number.isNaN(minAmount) || !Number.isNaN(maxAmount)) {
    //         dispatch(
    //             setTransactionListFilter({
    //                 ...transactionListFilter,
    //                 min_amount: !Number.isNaN(minAmount) ? minAmount : undefined,
    //                 max_amount: !Number.isNaN(maxAmount) ? maxAmount : undefined,
    //             }),
    //         );
    //     }
    // }, [amountRange]);

    const handleAmountChange = (type: "min" | "max", value: string) => {
        const formattedValue = formatCurrency(value);
        const numericValue = parseInt(formattedValue.replace(/\D/g, ""), 10);

        if (type === "min") {
            setAmountRange((prev) => ({
                ...prev,
                min: formattedValue,
                max:
                    !Number.isNaN(numericValue) &&
                    prev.max !== "" &&
                    numericValue > parseInt(prev.max.replace(/\D/g, ""), 10)
                        ? formattedValue
                        : prev.max,
            }));
        } else {
            setAmountRange((prev) => ({
                ...prev,
                max: formattedValue,
                min:
                    !Number.isNaN(numericValue) &&
                    prev.min !== "" &&
                    numericValue < parseInt(prev.min.replace(/\D/g, ""), 10)
                        ? formattedValue
                        : prev.min,
            }));
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-start">
            <h1 className="select-none self-start p-4 text-2xl font-bold">Danh sách giao dịch</h1>
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
                                                    setTransactionListFilter({
                                                        ...transactionListFilter,
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
                                                setTransactionListFilter({
                                                    ...transactionListFilter,
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
                    <div className="gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="text-base font-semibold" variant="ghost">
                                    Trạng thái
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="z-[400] w-fit rounded-lg border bg-white p-4">
                                <div className="flex flex-col space-y-4 p-2">
                                    <h1 className="text-lg font-semibold">Trạng thái giao dịch</h1>
                                    <div className="flex w-full flex-row items-center space-x-3">
                                        {TRANSACTION_STATUS_FILTER_OPTIONS.map((option) => (
                                            <Button
                                                key={option.value}
                                                className={`w-fit p-2 ${
                                                    transactionListFilter.payment_status?.includes(
                                                        option.value,
                                                    )
                                                        ? "bg-blue-500 text-white"
                                                        : ""
                                                }`}
                                                variant="outline"
                                                onClick={() => {
                                                    if (
                                                        transactionListFilter.payment_status?.includes(
                                                            option.value,
                                                        )
                                                    ) {
                                                        const newStatus =
                                                            transactionListFilter.payment_status.filter(
                                                                (status) => status !== option.value,
                                                            );

                                                        dispatch(
                                                            setTransactionListFilter({
                                                                ...transactionListFilter,
                                                                payment_status: newStatus,
                                                            }),
                                                        );
                                                    } else {
                                                        dispatch(
                                                            setTransactionListFilter({
                                                                ...transactionListFilter,
                                                                payment_status: [
                                                                    ...(transactionListFilter.payment_status ||
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
                    <div className="gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="text-base font-semibold" variant="ghost">
                                    Phương thức
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="z-[400] w-fit rounded-lg border bg-white p-4">
                                <div className="flex flex-col space-y-4 p-2">
                                    <h1 className="text-lg font-semibold">
                                        Phương thức thanh toán
                                    </h1>
                                    <div className="flex w-full flex-row items-center space-x-3">
                                        {TRANSACTION_PAYMENT_METHOD_FILTER_OPTIONS.map((option) => (
                                            <Button
                                                key={option.value}
                                                className={`w-fit p-2 ${
                                                    transactionListFilter.payment_method?.includes(
                                                        option.value,
                                                    )
                                                        ? "bg-blue-500 text-white"
                                                        : ""
                                                }`}
                                                variant="outline"
                                                onClick={() => {
                                                    if (
                                                        transactionListFilter.payment_method?.includes(
                                                            option.value,
                                                        )
                                                    ) {
                                                        const newPaymentMethod =
                                                            transactionListFilter.payment_method.filter(
                                                                (status) => status !== option.value,
                                                            );

                                                        dispatch(
                                                            setTransactionListFilter({
                                                                ...transactionListFilter,
                                                                payment_method: newPaymentMethod,
                                                            }),
                                                        );
                                                    } else {
                                                        dispatch(
                                                            setTransactionListFilter({
                                                                ...transactionListFilter,
                                                                payment_method: [
                                                                    ...(transactionListFilter.payment_method ||
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
                    {/* Search */}
                    <div className="h-12 border border-r" />
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-60"
                            placeholder="Tìm kiếm theo tên người gửi"
                            type="text"
                            value={searchSender}
                            onChange={(e) => setSearchSender(e.target.value)}
                        />
                    </div>
                    <div className="h-12 border border-r" />
                    <div className="flex flex-row items-center space-x-2">
                        <Input
                            className="w-60"
                            placeholder="Tìm kiếm theo tên người nhận"
                            type="text"
                            value={searchReceiver}
                            onChange={(e) => setSearchReceiver(e.target.value)}
                        />
                    </div>
                    <div className="h-12 border border-r" />
                    <div className="gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className="justify-start text-left font-normal"
                                    id="amount"
                                    variant="ghost"
                                >
                                    <DollarSign />
                                    {amountRange && amountRange.min ? (
                                        amountRange.max ? (
                                            <>
                                                {amountRange.min}đ - {amountRange.max}đ
                                            </>
                                        ) : (
                                            `${amountRange.min}đ trở lên`
                                        )
                                    ) : (
                                        <span className="select-none text-base font-semibold">
                                            Chọn khoảng cước phí
                                        </span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align="start"
                                className="z-[400] w-auto rounded-lg border bg-white p-0"
                            >
                                <div className="flex flex-col space-y-4 p-4">
                                    <h1 className="text-lg font-semibold">Khoảng cước phí</h1>
                                    <div className="flex flex-row space-x-2">
                                        <Input
                                            className="w-40"
                                            placeholder="Từ"
                                            type="text"
                                            value={amountRange.min}
                                            onChange={(e) =>
                                                handleAmountChange("min", e.target.value)
                                            }
                                        />
                                        <Input
                                            className="w-40"
                                            placeholder="Đến"
                                            type="text"
                                            value={amountRange.max}
                                            onChange={(e) =>
                                                handleAmountChange("max", e.target.value)
                                            }
                                        />
                                    </div>
                                    {/* Apply button */}
                                    <div className="flex flex-row items-center space-x-4">
                                        <Button
                                            className="bg-blue-500 text-base font-semibold text-white"
                                            variant="default"
                                            onClick={() => {
                                                const minAmount = parseInt(
                                                    amountRange.min.replace(/\D/g, ""),
                                                    10,
                                                );
                                                const maxAmount = parseInt(
                                                    amountRange.max.replace(/\D/g, ""),
                                                    10,
                                                );

                                                if (
                                                    !Number.isNaN(minAmount) ||
                                                    !Number.isNaN(maxAmount)
                                                ) {
                                                    dispatch(
                                                        setTransactionListFilter({
                                                            ...transactionListFilter,
                                                            min_amount: !Number.isNaN(minAmount)
                                                                ? minAmount
                                                                : undefined,
                                                            max_amount: !Number.isNaN(maxAmount)
                                                                ? maxAmount
                                                                : undefined,
                                                        }),
                                                    );
                                                    // Close popover
                                                    const popoverTrigger =
                                                        document.getElementById("amount");

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
                                                setAmountRange({
                                                    min: "",
                                                    max: "",
                                                });
                                                // Reset filter
                                                dispatch(
                                                    setTransactionListFilter({
                                                        ...transactionListFilter,
                                                        min_amount: undefined,
                                                        max_amount: undefined,
                                                    }),
                                                );
                                                // Close popover
                                                const popoverTrigger =
                                                    document.getElementById("amount");

                                                if (popoverTrigger instanceof HTMLElement) {
                                                    popoverTrigger.click();
                                                }
                                            }}
                                        >
                                            Hủy
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {/* Divider */}
                    {/* Reset filter */}
                    {/* Only render when filter change different with inital */}
                    {/* Divider */}
                    {(transactionListFilter.start_date !== "" ||
                        transactionListFilter.end_date !== "" ||
                        transactionListFilter.search_sender !== "" ||
                        transactionListFilter.search_receiver !== "" ||
                        (transactionListFilter.payment_method &&
                            transactionListFilter.payment_method.length > 0) ||
                        (transactionListFilter.payment_status &&
                            transactionListFilter.payment_status.length > 0) ||
                        transactionListFilter.min_amount ||
                        transactionListFilter.max_amount) && (
                        <>
                            <div className="h-12 border border-r" />
                            <div className="gap-2">
                                <Button
                                    className="text-base font-semibold text-red-500"
                                    variant="ghost"
                                    onClick={() => {
                                        dispatch(clearTransactionListFilter());
                                        setAmountRange({
                                            min: "",
                                            max: "",
                                        });
                                        // Reset search
                                        setSearchSender("");
                                        setSearchReceiver("");
                                        // Reset date
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
            {isLoadingTransactionList || !transactionList ? (
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
                        <PaymentTable
                            columns={paymentColumns}
                            data={transactionList.transactions ?? []}
                        />
                    </div>
                    <div className="mb-4 mt-4 flex w-full flex-row items-center justify-between space-x-4">
                        <h1 className="select-none text-sm font-semibold">
                            Hiển thị {transactionList.transactions?.length ?? 0} trong tổng số{" "}
                            {transactionList.total_transactions} kết quả
                        </h1>
                        <div className="flex w-fit flex-row">
                            <ReactPaginate
                                disableInitialCallback
                                activeClassName="select-none w-[2.125rem] h-[2.125rem] py-[0.5rem] rounded-md font-sans text-[#FFFFFF] bg-blue-500 flex-col flex items-center justify-center"
                                breakClassName=" select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.75rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col  items-center justify-center border-[#DFE4EA]"
                                breakLabel="..."
                                containerClassName="flex flex-row items-center justify-center bg-white border border-[#DFE4EA] rounded-[0.625rem] px-[0.75rem] py-[0.75rem] gap-x-[0.5rem] gap-y-[0.5rem]"
                                forcePage={transactionList.current_page - 1}
                                marginPagesDisplayed={1}
                                nextClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.5rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                                nextLabel=">"
                                pageClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.75rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                                pageCount={transactionList.total_pages}
                                pageRangeDisplayed={3}
                                previousClassName="hover:bg-gray-200 select-none w-[2.125rem] h-[2.125rem] rounded-md px-[0.5rem] py-[0.5rem] border font-sans text-[#637381] flex flex-col items-center justify-center border-[#DFE4EA]"
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                                onPageChange={({ selected }) => {
                                    dispatch(
                                        setTransactionListFilter({
                                            ...transactionListFilter,
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
