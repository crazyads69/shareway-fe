/* eslint-disable no-param-reassign */
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import { Message } from "@/models/message-model";

export interface MessageState {
    message: Message | null;
    showMessages: boolean;
}

const initialState: MessageState = {
    message: null,
    showMessages: false,
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        showSuccessMessage(state, action: PayloadAction<string>) {
            state.message = {
                title: "Thành công",
                type: "success",
                message: action.payload,
            };
            state.showMessages = true;
        },
        showErrorMessage(state, action: PayloadAction<string>) {
            state.message = {
                title: "Có lỗi xảy ra",
                type: "error",
                message: action.payload,
            };
            state.showMessages = true;
        },
        showInfoMessage(state, action: PayloadAction<string>) {
            state.message = {
                title: "Thông báo",
                type: "info",
                message: action.payload,
            };
            state.showMessages = true;
        },
        clearMessage(state) {
            state.message = null;
            state.showMessages = false;
        },
    },
});

export const { showSuccessMessage, showErrorMessage, showInfoMessage, clearMessage } =
    messageSlice.actions;
export default messageSlice.reducer;
