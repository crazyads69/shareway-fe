/* eslint-disable import/prefer-default-export */
import { Home, Users, Car, CreditCard, UserCog, Settings, LogIn, MapPin } from "lucide-react";

export const ROUTES = {
    HOME: {
        path: "/admin",
        name: "Trang chủ",
        icon: Home,
    },
    LOGIN: {
        path: "/login",
        name: "Đăng nhập",
        icon: LogIn,
    },

    // User Management
    USERS: {
        path: "/admin/users",
        name: "Người dùng",
        icon: Users,
    },

    // Ride Management
    RIDES: {
        path: "/admin/rides",
        name: "Chuyến đi",
        icon: MapPin,
    },

    // Vehicle Management
    VEHICLES: {
        path: "/admin/vehicles",
        name: "Phương tiện",
        icon: Car,
    },

    // Payment Management
    PAYMENTS: {
        path: "/admin/payments",
        name: "Thanh toán",
        icon: CreditCard,
    },

    // Admin Account Management
    ADMIN_ACCOUNTS: {
        path: "/admin/accounts",
        name: "Tài khoản",
        icon: UserCog,
    },

    // System Configuration
    SETTINGS: {
        path: "/admin/settings",
        name: "Cài đặt",
        icon: Settings,
    },
};
