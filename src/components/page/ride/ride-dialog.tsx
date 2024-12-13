/* eslint-disable import/prefer-default-export */
import { MoreHorizontal, MapPin, Clock, DollarSign, Car, User, Phone, Star } from "lucide-react";

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
import { RideDetail, type UserInfo } from "@/models/ride-list";
import {
    RIDE_STATUS_FILTER_OPTIONS,
    TRANSACTION_PAYMENT_METHOD_FILTER_OPTIONS,
    TRANSACTION_STATUS_FILTER_OPTIONS,
} from "@/utils/constant/constant";

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
            <span className="select-none text-sm font-medium">
                {value}
                {suffix}
            </span>
        </div>
    );
}

function UserInfo({ user, userRole }: { user: UserInfo; userRole: string }) {
    return (
        <div className="flex items-center space-x-4 rounded-lg bg-slate-100 p-4">
            <Avatar className="border-primary h-16 w-16 border-2">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <h3 className="select-none text-lg font-semibold">{user.full_name}</h3>
                <p className="flex select-none items-center gap-1 text-sm text-gray-500">
                    <User size={14} />
                    {userRole}
                </p>
                <p className="mt-1 flex select-none items-center gap-1 text-sm text-gray-500">
                    <Phone size={14} />
                    {user.phone_number}
                </p>
                <p className="mt-1 flex select-none items-center gap-1 text-sm text-gray-500">
                    <Star size={14} />
                    {user.average_rating.toFixed(1)} sao
                </p>
            </div>
        </div>
    );
}

export function RideDetailsDialog({ ride }: { ride: RideDetail }) {
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
                        Chi tiết chuyến đi
                    </DialogTitle>
                    <p className="text-muted-foreground mt-2 select-none text-sm">
                        Trạng thái:{" "}
                        <span className="text-foreground select-none font-medium">
                            {
                                RIDE_STATUS_FILTER_OPTIONS.find(
                                    (option) => option.value === ride?.status,
                                )?.label
                            }
                        </span>
                    </p>
                </DialogHeader>
                <ScrollArea className="mt-4 max-h-[80vh] pr-4">
                    <div className="space-y-6">
                        {/* Ride Information */}
                        <div className="space-y-2 rounded-lg bg-slate-100 p-4">
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin chuyến đi
                            </h3>
                            <InfoItem
                                icon={<MapPin size={16} />}
                                label="Điểm đầu"
                                value={ride?.start_address}
                            />
                            <InfoItem
                                icon={<MapPin size={16} />}
                                label="Điểm cuối"
                                value={ride?.end_address}
                            />
                            <InfoItem
                                icon={<Clock size={16} />}
                                label="Thời gian bắt đầu"
                                value={
                                    ride?.start_time
                                        ? new Date(ride.start_time).toLocaleString("vi-VN")
                                        : ""
                                }
                            />
                            <InfoItem
                                icon={<Clock size={16} />}
                                label="Thời gian kết thúc"
                                value={
                                    ride?.end_time
                                        ? new Date(ride.end_time).toLocaleString("vi-VN")
                                        : ""
                                }
                            />
                            <InfoItem
                                icon={<DollarSign size={16} />}
                                label="Giá"
                                suffix="đ"
                                value={ride?.fare.toLocaleString("vi-VN")}
                            />
                            <InfoItem
                                label="Khoảng cách"
                                suffix="km"
                                value={ride?.distance.toFixed(2)}
                            />
                            <InfoItem
                                label="Thời gian di chuyển"
                                suffix=" phút"
                                value={Math.round((ride?.duration ?? 0) / 60)}
                            />
                        </div>

                        <Separator className="bg-slate-200" />

                        {/* Driver Information */}
                        <div>
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin người cho đi nhờ
                            </h3>
                            <UserInfo user={ride?.driver as UserInfo} userRole="Người cho đi nhờ" />
                        </div>

                        <Separator className="bg-slate-200" />

                        {/* Hitcher Information */}
                        <div>
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin người đi nhờ
                            </h3>
                            <UserInfo user={ride?.hitcher as UserInfo} userRole="Người đi nhờ" />
                        </div>

                        <Separator className="bg-slate-200" />

                        {/* Vehicle Information */}
                        <div className="rounded-lg bg-slate-100 p-4">
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin phương tiện
                            </h3>
                            <div className="space-y-2">
                                <InfoItem
                                    icon={<Car size={16} />}
                                    label="Tên xe"
                                    value={ride?.vehicle.name}
                                />
                                <InfoItem label="Biển số" value={ride?.vehicle.license_plate} />
                                <InfoItem
                                    label="Nhiên liệu tiêu thụ"
                                    suffix="L"
                                    value={ride?.vehicle.fuel_consumed.toFixed(2)}
                                />
                            </div>
                        </div>

                        <Separator className="bg-slate-200" />

                        {/* Transaction Information */}
                        <div className="rounded-lg bg-slate-100 p-4">
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin giao dịch
                            </h3>
                            <div className="space-y-2">
                                <InfoItem
                                    label="Mã giao dịch"
                                    value={ride?.transaction.transaction_id}
                                />
                                <InfoItem
                                    label="Số tiền"
                                    suffix="đ"
                                    value={ride?.transaction.amount.toLocaleString("vi-VN")}
                                />
                                <InfoItem
                                    label="Phương thức thanh toán"
                                    value={
                                        TRANSACTION_PAYMENT_METHOD_FILTER_OPTIONS.find(
                                            (option) =>
                                                option.value === ride?.transaction.payment_method,
                                        )?.label
                                    }
                                />
                                <InfoItem
                                    label="Trạng thái"
                                    value={
                                        TRANSACTION_STATUS_FILTER_OPTIONS.find(
                                            (option) => option.value === ride?.transaction.status,
                                        )?.label
                                    }
                                />
                            </div>
                        </div>

                        {/* Waypoints */}
                        {ride?.waypoints && ride?.waypoints.length > 0 && (
                            <>
                                <Separator className="bg-slate-200" />
                                <div>
                                    <h3 className="mb-3 text-lg font-semibold">Điểm dừng</h3>
                                    <div className="space-y-2">
                                        {ride.waypoints.map((waypoint) => (
                                            <div
                                                key={waypoint.waypoint_id}
                                                className="rounded-lg bg-gray-50 p-4"
                                            >
                                                <InfoItem
                                                    label="Địa chỉ"
                                                    value={waypoint.address}
                                                />
                                                <InfoItem label="Thứ tự" value={waypoint.order} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
