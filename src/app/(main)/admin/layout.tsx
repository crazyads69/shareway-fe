"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuCheckboxItemProps,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { User, LogOut } from "lucide-react";
import React, { useState } from "react";

import { RootState } from "@/redux/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROUTES } from "@/utils/constant/constant";
import { cn } from "@/lib/utils";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const admin = useSelector((state: RootState) => state.auth.admin);
    const pathname = usePathname();

    const [showStatusBar, setShowStatusBar] = useState<Checked>(true);

    const sidebarItems = [
        ROUTES.HOME,
        ROUTES.USERS,
        ROUTES.RIDES,
        ROUTES.VEHICLES,
        ROUTES.PAYMENTS,
        ROUTES.ADMIN_ACCOUNTS,
        ROUTES.SETTINGS,
    ];

    return (
        <div className="flex min-h-screen flex-col bg-slate-100">
            <header className="sticky top-0 z-40 w-full border-b bg-white">
                <div className="flex h-16 w-full flex-row items-center justify-between px-4 sm:px-8">
                    <div className="flex items-center space-x-4">
                        <Image
                            alt="Logo"
                            className="h-8 w-auto"
                            height={32}
                            src="/shareway.svg"
                            width={32}
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex cursor-pointer items-center space-x-4 rounded-md border-2 px-4 py-1 transition-colors hover:bg-gray-100">
                                <Avatar>
                                    <AvatarImage
                                        alt="Admin Avatar"
                                        src={`https://api.multiavatar.com/${admin?.admin_info.admin_id}.png`}
                                    />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="select-none text-sm font-semibold">
                                        {admin?.admin_info.username || "Admin"}
                                    </span>
                                    <span className="select-none text-xs text-gray-500">
                                        {admin?.admin_info.full_name || "Admin tối cao"}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="mt-2 w-56 border bg-white p-2">
                            <DropdownMenuLabel className="px-2 py-1.5 text-sm font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="select-none font-medium">
                                        {admin?.admin_info.username || "Admin"}
                                    </p>
                                    <p className="select-none text-xs text-gray-500">
                                        {admin?.admin_info.full_name || "Admin tối cao"}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="my-1 border" />
                            <DropdownMenuItem className="flex cursor-pointer flex-row items-center px-2 py-1.5 hover:bg-gray-100 hover:outline-none">
                                <User className="mr-2 h-4 w-4" />
                                <span className="select-none">Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex cursor-pointer flex-row items-center px-2 py-1.5 hover:bg-gray-100 hover:outline-none">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span className="select-none">Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex min-h-screen w-full">
                <nav className="fixed min-h-screen flex-col justify-between space-y-4 bg-white p-4">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.path}
                            className={cn(
                                "text-md flex items-center rounded-lg px-3 py-2 font-medium",
                                pathname === item.path
                                    ? "bg-blue-700 text-white"
                                    : "text-black hover:bg-blue-600 hover:text-white",
                            )}
                            href={item.path}
                        >
                            {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                            {item.name}
                        </Link>
                    ))}
                    {/* Footer */}
                    <div className="absolute bottom-20 w-full">
                        <span className="select-none text-sm text-gray-500">© 2024 ShareWay</span>
                    </div>
                </nav>
                <div className="ml-52 mr-6 min-h-screen w-full">{children}</div>
            </main>
        </div>
    );
}
