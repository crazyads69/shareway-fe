import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quản lí người dùng",
    description: "Quản lí người dùng",
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
