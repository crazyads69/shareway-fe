/* eslint-disable import/prefer-default-export */
import { Home, Users, Car, CreditCard, LogIn, MapPin } from "lucide-react";

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
        name: "Giao dịch",
        icon: CreditCard,
    },

    // // Admin Account Management
    // ADMIN_ACCOUNTS: {
    //     path: "/admin/accounts",
    //     name: "Tài khoản",
    //     icon: UserCog,
    // },

    // // System Configuration
    // SETTINGS: {
    //     path: "/admin/settings",
    //     name: "Cài đặt",
    //     icon: Settings,
    // },
};

const FILTER_DASHBOARD_OPTIONS = {
    ALL_TIME: {
        value: "all_time",
        label: "Tất cả",
    },
    LAST_WEEK: {
        value: "last_week",
        label: "Tuần trước",
    },
    LAST_MONTH: {
        value: "last_month",
        label: "Tháng trước",
    },
    CUSTOM: {
        value: "custom",
        label: "Tùy chỉnh",
    },
};

const FILTER_RIDE_STATUS_OPTIONS = {
    scheduled: {
        value: "scheduled",
        label: "Đã lên lịch",
    },
    ongoing: {
        value: "ongoing",
        label: "Đang diễn ra",
    },
    completed: {
        value: "completed",
        label: "Đã hoàn thành",
    },
    cancelled: {
        value: "cancelled",
        label: "Đã hủy",
    },
};

const FILTER_TRANSACTION_STATUS_OPTIONS = {
    // pending, completed, refunded
    pending: {
        value: "pending",
        label: "Chờ xử lý",
    },
    completed: {
        value: "completed",
        label: "Đã hoàn thành",
    },
    refunded: {
        value: "refunded",
        label: "Đã hoàn tiền",
    },
};

const FILTER_TRANSACTION_PAYMENT_METHOD_OPTIONS = {
    // momo, cash
    momo: {
        value: "momo",
        label: "Momo",
    },
    cash: {
        value: "cash",
        label: "Tiền mặt",
    },
};

export const DASHBOARD_FILTER_OPTIONS = Object.values(FILTER_DASHBOARD_OPTIONS);
export const RIDE_STATUS_FILTER_OPTIONS = Object.values(FILTER_RIDE_STATUS_OPTIONS);
export const TRANSACTION_STATUS_FILTER_OPTIONS = Object.values(FILTER_TRANSACTION_STATUS_OPTIONS);
export const TRANSACTION_PAYMENT_METHOD_FILTER_OPTIONS = Object.values(
    FILTER_TRANSACTION_PAYMENT_METHOD_OPTIONS,
);
