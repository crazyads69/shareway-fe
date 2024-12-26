import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { useEffect } from "react";

import { RootState } from "@/redux/store/store";
import { TransactionListFilter, TransactionListResponse } from "@/models/transaction/transaction-list";
import {
    fetchTransactionList,
    fetchTransactionListCompleted,
    fetchTransactionListSuccess,
} from "@/redux/slice/transaction-slice";
import axiosClient from "@/utils/axios-client/axios-client";
import { showErrorMessage } from "@/redux/slice/message-slice";

export default function useGetTransactionList() {
    const dispatch = useDispatch();
    const isLoadingTransactionList = useSelector(
        (state: RootState) => state.transaction.isLoadingTransactionList,
    );
    const transactionList = useSelector((state: RootState) => state.transaction.transactionList);
    const transactionListFilter = useSelector(
        (state: RootState) => state.transaction.transactionListFilter,
    );

    const getTransactionList = async (transactionListFilter: TransactionListFilter) => {
        try {
            dispatch(fetchTransactionList());
            const query = new URLSearchParams();

            if (transactionListFilter.page) {
                query.append("page", transactionListFilter.page.toString());
            }

            if (transactionListFilter.limit) {
                query.append("limit", transactionListFilter.limit.toString());
            }

            if (transactionListFilter.start_date) {
                query.append("start_date", transactionListFilter.start_date);
            }

            if (transactionListFilter.end_date) {
                query.append("end_date", transactionListFilter.end_date);
            }

            if (transactionListFilter.search_sender) {
                query.append("search_sender", transactionListFilter.search_sender);
            }

            if (transactionListFilter.search_receiver) {
                query.append("search_receiver", transactionListFilter.search_receiver);
            }

            if (
                transactionListFilter.payment_method &&
                transactionListFilter.payment_method.length > 0
            ) {
                query.append("payment_method", transactionListFilter.payment_method.join(","));
            }

            if (
                transactionListFilter.payment_status &&
                transactionListFilter.payment_status.length > 0
            ) {
                query.append("payment_status", transactionListFilter.payment_status.join(","));
            }

            if (transactionListFilter.min_amount) {
                query.append("min_amount", transactionListFilter.min_amount.toString());
            }

            if (transactionListFilter.max_amount) {
                query.append("max_amount", transactionListFilter.max_amount.toString());
            }

            // Fetch data
            const response = await axiosClient.get<TransactionListResponse>(
                `/admin/get-transaction-list?${query.toString()}`,
            );

            if (response.data.success) {
                dispatch(fetchTransactionListSuccess(response.data.data));
            } else {
                throw new Error(response.data.message_vi || "Lỗi không xác định");
            }
        } catch (error) {
            let errorMessage = "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.";

            if (error instanceof AxiosError && error.response) {
                errorMessage = error.response.data?.message_vi || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            dispatch(showErrorMessage(errorMessage));
        } finally {
            dispatch(fetchTransactionListCompleted());
        }
    };

    // Call function to get transaction list when component mounted
    useEffect(() => {
        // Handle get transaction list when filter change (except page change) then reset page to 1
        if (
            transactionListFilter.start_date !== "" ||
            transactionListFilter.end_date !== "" ||
            transactionListFilter.search_sender !== "" ||
            transactionListFilter.search_receiver !== "" ||
            (transactionListFilter.payment_method &&
                transactionListFilter.payment_method.length > 0) ||
            (transactionListFilter.payment_status &&
                transactionListFilter.payment_status.length > 0) ||
            transactionListFilter.min_amount !== undefined ||
            transactionListFilter.max_amount !== undefined
        ) {
            getTransactionList({ ...transactionListFilter, page: 1 });
        } else {
            getTransactionList(transactionListFilter);
        }
    }, [
        transactionListFilter.page,
        transactionListFilter.limit,
        transactionListFilter.start_date,
        transactionListFilter.end_date,
        transactionListFilter.search_sender,
        transactionListFilter.search_receiver,
        transactionListFilter.payment_method,
        transactionListFilter.payment_status,
        transactionListFilter.min_amount,
        transactionListFilter.max_amount,
    ]);

    return {
        isLoadingTransactionList,
        transactionList,
        getTransactionList,
    };
}
