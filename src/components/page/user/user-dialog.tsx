/* eslint-disable import/prefer-default-export */
import { MoreHorizontal, Mail, Phone, User, CreditCard, Star, Car, Calendar } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserDetail } from "@/models/user-list";

function InfoItem({
    label,
    value,
    suffix,
    icon,
}: {
    label: string;
    value: string | number | undefined;
    suffix?: string;
    icon?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-md flex select-none items-center gap-2 text-gray-500">
                {icon}
                {label}
            </span>
            <span className="select-none truncate text-sm font-medium">
                {value}
                {suffix}
            </span>
        </div>
    );
}

export function UserDetailsDialog({ user }: { user: UserDetail }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="border bg-white p-6 sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="select-none text-2xl font-bold">
                        Chi tiết người dùng
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="mt-4 max-h-[80vh] pr-4">
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="flex flex-col items-center space-y-4 rounded-lg bg-slate-100 p-4">
                            <Avatar className="border-primary h-24 w-24 border-2">
                                <AvatarImage src={user?.avatar_url} />
                                <AvatarFallback>{user?.full_name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="select-none text-xl font-semibold">
                                {user?.full_name}
                            </div>
                            <div className="w-full space-y-2">
                                <InfoItem icon={<User size={16} />} label="ID" value={user?.id} />
                                <InfoItem
                                    icon={<Mail size={16} />}
                                    label="Email"
                                    value={!user?.email ? "Chưa liên kết" : user?.email}
                                />
                                <InfoItem
                                    icon={<Phone size={16} />}
                                    label="Số điện thoại"
                                    value={user?.phone_number}
                                />
                                <InfoItem
                                    icon={<User size={16} />}
                                    label="Giới tính"
                                    value={user?.gender === "male" ? "Nam" : "Nữ"}
                                />
                                <InfoItem
                                    icon={<CreditCard size={16} />}
                                    label="CCCD"
                                    value={user?.cccd_number}
                                />
                                <InfoItem
                                    icon={<User size={16} />}
                                    label="Vai trò"
                                    value={user?.role === "user" ? "Người dùng" : "Admin"}
                                />
                            </div>
                        </div>

                        <Separator className="bg-slate-200" />

                        {/* Status and Statistics */}
                        <div className="space-y-2 rounded-lg bg-slate-100 p-4">
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Trạng thái và Thống kê
                            </h3>
                            <InfoItem
                                label="Trạng thái kích hoạt"
                                value={user?.is_activated ? "Đã kích hoạt" : "Chưa kích hoạt"}
                            />
                            <InfoItem
                                label="Trạng thái xác thực"
                                value={user?.is_verified ? "Đã xác thực" : "Chưa xác thực"}
                            />
                            <InfoItem
                                label="Liên kết Momo"
                                value={user?.is_momo_linked ? "Đã liên kết" : "Chưa liên kết"}
                            />
                            <InfoItem
                                icon={<Star size={16} />}
                                label="Đánh giá trung bình"
                                suffix=" sao"
                                value={user?.average_rating?.toFixed(1)}
                            />
                            <InfoItem label="Tổng số đánh giá" value={user?.total_ratings} />
                            <InfoItem label="Tổng số chuyến đi" value={user?.total_rides} />
                            <InfoItem
                                label="Số dư trong ứng dụng"
                                suffix="đ"
                                value={user?.balance_in_app?.toLocaleString("vi-VN")}
                            />
                            <InfoItem label="Tổng số giao dịch" value={user?.total_transactions} />
                            <InfoItem
                                icon={<Car size={16} />}
                                label="Tổng số phương tiện"
                                value={user?.total_vehicles}
                            />
                        </div>

                        <Separator className="bg-slate-200" />

                        {/* Vehicles Information */}
                        {user?.vehicles && user.vehicles.length > 0 && (
                            <div>
                                <h3 className="mb-3 select-none text-lg font-semibold">
                                    Thông tin phương tiện
                                </h3>
                                <div className="space-y-4">
                                    {user.vehicles.map((vehicle) => (
                                        <div
                                            key={vehicle.vehicle_id}
                                            className="rounded-lg bg-slate-100 p-4"
                                        >
                                            <InfoItem
                                                icon={<Car size={16} />}
                                                label="Tên"
                                                value={vehicle.name}
                                            />
                                            <InfoItem
                                                label="Biển số xe"
                                                value={vehicle.license_plate}
                                            />
                                            <InfoItem
                                                label="Nhiên liệu tiêu thụ"
                                                value={`${vehicle.fuel_consumed}L`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Separator className="bg-slate-200" />

                        {/* Timestamps */}
                        <div className="rounded-lg bg-slate-100 p-4">
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin thời gian
                            </h3>
                            <InfoItem
                                icon={<Calendar size={16} />}
                                label="Tạo lúc"
                                value={new Date(user?.created_at || "").toLocaleString("vi-VN")}
                            />
                            <InfoItem
                                icon={<Calendar size={16} />}
                                label="Cập nhật lúc"
                                value={new Date(user?.updated_at || "").toLocaleString("vi-VN")}
                            />
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
