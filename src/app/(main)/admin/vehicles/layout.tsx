import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quản lí phương tiện",
    description: "Quản lí phương tiện",
};

export default function VehicleLayout({ children }: { children: React.ReactNode }) {
    return children;
}
