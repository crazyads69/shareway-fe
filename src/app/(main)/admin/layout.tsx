import Image from "next/image";
import { Metadata } from "next";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store/store";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "",
};
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const admin = useSelector((state: RootState) => state.auth.admin);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            {/* Header with logo on the left and show admin account right */}
            <header className="flex w-full items-center justify-between bg-white px-8 py-4 shadow-sm">
                <div className="flex items-center">
                    <Image alt="Logo" className="h-8 w-auto" src="/logo.svg" />
                    <h1 className="ml-2 text-xl font-bold">Admin Dashboard</h1>
                </div>
                <div className="flex items-center">
                    <Image alt="Admin" className="h-8 w-auto" src="/admin.svg" />
                    <span className="ml-2">{admin?.admin_info.full_name || "Admin tối cao"}</span>
                </div>
            </header>
            {children}
        </div>
    );
}
