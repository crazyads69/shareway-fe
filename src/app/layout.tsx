import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";

import ReduxProvider from "@/redux/provider/provider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
    title: {
        template: "%s | ShareWay",
        default: "ShareWay",
    },
    description: "ShareWay Admin Panel",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="vi">
            <body className={inter.className}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
