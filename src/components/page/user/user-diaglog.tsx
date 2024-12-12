/* eslint-disable import/prefer-default-export */
import { MoreHorizontal } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

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
}: {
    label: string;
    value: string | number | undefined;
    suffix?: string;
}) {
    return (
        <div className="flex justify-between">
            <span className="select-none font-semibold">{label}:</span>
            <span className="select-none">
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
            <DialogContent className="border bg-white p-4 sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Chi tiết người dùng</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[80vh] pr-4">
                    <div className="space-y-4">
                        {/* Basic Information */}
                        <div className="flex flex-col items-center space-y-2">
                            <Avatar className="h-24 w-24">
                                <AvatarImage
                                    src={
                                        user?.avatar_url ||
                                        `https://api.multiavatar.com/${user?.id}.png`
                                    }
                                />
                                <AvatarFallback>{user?.full_name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="select-none text-lg font-semibold">
                                {user?.full_name}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <InfoItem label="ID" value={user?.id} />
                            <InfoItem
                                label="Email"
                                value={!user?.email ? "Chưa liên kết" : user?.email}
                            />
                            <InfoItem label="Số điện thoại" value={user?.phone_number} />
                            <InfoItem
                                label="Giới tính"
                                value={user?.gender === "male" ? "Nam" : "Nữ"}
                            />
                            <InfoItem label="CCCD" value={user?.cccd_number} />
                            <InfoItem
                                label="Vai trò"
                                value={user?.role === "user" ? "Người dùng" : "Admin"}
                            />
                        </div>
                        <Separator />
                        {/* Status and Statistics */}
                        <div className="space-y-2">
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
                                label="Đánh giá trung bình"
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
                            <InfoItem label="Tổng số phương tiện" value={user?.total_vehicles} />
                        </div>

                        {/* Vehicles Information */}
                        {user?.vehicles && user.vehicles.length > 0 && (
                            <div>
                                <h3 className="mb-2 select-none font-semibold">
                                    Thông tin phương tiện
                                </h3>
                                <div className="space-y-2">
                                    {user.vehicles.map((vehicle) => (
                                        <div
                                            key={vehicle.vehicle_id}
                                            className="rounded-lg border p-2"
                                        >
                                            <InfoItem label="Tên" value={vehicle.name} />
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

                        {/* Timestamps */}
                        <div className="text-muted-foreground select-none text-sm">
                            <div>
                                Tạo lúc: {new Date(user?.created_at || "").toLocaleString("vi-VN")}
                            </div>
                            <div>
                                Cập nhật lúc:{" "}
                                {new Date(user?.updated_at || "").toLocaleString("vi-VN")}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
