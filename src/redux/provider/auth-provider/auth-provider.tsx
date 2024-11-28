"use client";

import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

import axiosClient from "@/utils/axios-client/axios-client";
import { GetAdminProfileResponse } from "@/models/auth-model";
import { logoutSuccess, updateProfile } from "@/redux/slice/auth-slice";
import FullPageLoading from "@/components/global/loading/full-page-loading";

export default function AuthProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();

    useLayoutEffect(() => {
        const checkAuth = async () => {
            try {
                const { status, data } =
                    await axiosClient.get<GetAdminProfileResponse>("/admin/get-profile");

                if (status === 200) {
                    dispatch(updateProfile(data.data.admin_info));
                    pathname === "/login" ? router.replace("/admin") : setIsLoading(false);
                } else {
                    throw new Error("Failed to get profile");
                }
            } catch (error) {
                dispatch(logoutSuccess());
                pathname !== "/login" ? router.replace("/login") : setIsLoading(false);
            }
        };

        checkAuth();
    }, [pathname, dispatch, router]);

    return isLoading ? <FullPageLoading /> : <>{children}</>;
}
