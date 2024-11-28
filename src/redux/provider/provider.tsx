"use client";

import { Provider } from "react-redux";

import store from "../store/store";

import GetLocalStorage from "./get-local-storage/get-local-storage";

interface ReduxProviderProps {
    children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return (
        <Provider store={store}>
            <GetLocalStorage>{children}</GetLocalStorage>
        </Provider>
    );
}
