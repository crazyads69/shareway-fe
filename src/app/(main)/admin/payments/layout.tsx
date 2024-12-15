import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quản lí giao dịch",
    description: "Quản lí giao dịch",
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
    return children;
}
