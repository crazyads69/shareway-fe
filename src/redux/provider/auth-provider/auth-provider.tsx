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

    async function CheckAuth() {
        // Check if the user is authenticated by calling the API to get the user data (profile)
        // If the user is authenticated, set the user to the redux store and navigate to the path
        // If the user is not authenticated, redirect to the login page
        try {
            const response = await axiosClient.get<GetAdminProfileResponse>("/admin/auth/me");

            if (response.data.success) {
                // Set the user data to the redux store
                dispatch(updateProfile(response.data.data.admin_info));
                // Check if the user is accessing the login page although they are already authenticated
                // If so, redirect to the admin page
                if (pathname === "/login") {
                    // Redirect to the admin page if the user is already authenticated
                    router.push("/admin");
                } else {
                    setIsLoading(false);
                }
            }
        } catch (error) {
            // If there is an error, redirect to the login page
            dispatch(logoutSuccess());
            // use replace instead of push to prevent the user from going back to the previous page
            if (pathname !== "/login") {
                router.replace("/login");
            } else {
                setIsLoading(false);
            }
        }
    }

    useLayoutEffect(() => {
        // Call the function to check if the user is authenticated whenever navigating to a new page
        CheckAuth();
    }, []);

    if (isLoading) {
        return <FullPageLoading />;
    }

    return <>{children}</>;
}
