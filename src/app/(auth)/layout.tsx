/* eslint-disable react/jsx-no-useless-fragment */
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "Đăng nhập",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
