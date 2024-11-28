"use client";

import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

import { loginSuccess } from "@/redux/slice/auth-slice";

export default function GetLocalStorage({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const admin = localStorage.getItem("ADMIN");

        if (admin) {
            dispatch(loginSuccess(JSON.parse(admin)));
        }
    }, []);

    return <>{children}</>;
}
