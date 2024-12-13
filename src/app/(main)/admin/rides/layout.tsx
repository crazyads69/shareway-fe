import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quản lí chuyến đi",
    description: "Quản lí chuyến đi",
};

export default function RideLayout({ children }: { children: React.ReactNode }) {
    return children;
}
