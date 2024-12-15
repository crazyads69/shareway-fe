/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TransactionList, TransactionListFilter } from "@/models/transaction-list";

export interface TransactionState {
    isLoadingTransactionList: boolean;
    transactionList: TransactionList | null;
    // Filter and pagination
    transactionListFilter: TransactionListFilter;
}

const initialState: TransactionState = {
    isLoadingTransactionList: true,
    transactionList: null,
    transactionListFilter: {
        page: 1,
        limit: 10,
        start_date: "",
        end_date: "",
        search_sender: "",
        search_receiver: "",
        payment_method: [],
        payment_status: [],
        min_amount: undefined,
        max_amount: undefined,
    },
};

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        fetchTransactionList(state) {
            state.isLoadingTransactionList = true;
        },
        fetchTransactionListSuccess(state, action: PayloadAction<TransactionList>) {
            state.transactionList = action.payload;
            state.isLoadingTransactionList = false;
        },
        fetchTransactionListCompleted(state) {
            state.isLoadingTransactionList = false;
        },
        setTransactionListFilter(state, action: PayloadAction<TransactionListFilter>) {
            state.transactionListFilter = action.payload;
        },
        clearTransactionListFilter(state) {
            state.transactionListFilter = initialState.transactionListFilter;
        },
    },
});

export const {
    fetchTransactionList,
    fetchTransactionListSuccess,
    fetchTransactionListCompleted,
    setTransactionListFilter,
    clearTransactionListFilter,
} = transactionSlice.actions;
export default transactionSlice.reducer;
