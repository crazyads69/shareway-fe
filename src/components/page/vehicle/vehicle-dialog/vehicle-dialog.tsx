/* eslint-disable import/prefer-default-export */
import {
    MoreHorizontal,
    Car,
    User,
    Phone,
    Star,
    Calendar,
    FileText,
    DollarSign,
    Tag,
} from "lucide-react";

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
import { VehicleDetail } from "@/models/vehicle/vehicle-list";

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

function OwnerInfo({ owner }: { owner: VehicleDetail["owner"] }) {
    return (
        <div className="flex items-center space-x-4 rounded-lg bg-slate-100 p-4">
            <Avatar className="border-primary h-16 w-16 border-2">
                <AvatarImage src={owner.avatar_url} />
                <AvatarFallback>{owner.full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <h3 className="select-none text-lg font-semibold">{owner.full_name}</h3>
                <p className="flex select-none items-center gap-1 text-sm text-gray-500">
                    <User size={14} />
                    Chủ sở hữu
                </p>
                <p className="mt-1 flex select-none items-center gap-1 text-sm text-gray-500">
                    <Phone size={14} />
                    {owner.phone_number}
                </p>
                <p className="mt-1 flex select-none items-center gap-1 text-sm text-gray-500">
                    <Star size={14} />
                    {owner.average_rating.toFixed(1)} sao
                </p>
            </div>
        </div>
    );
}

export function VehicleDetailsDialog({ vehicle }: { vehicle: VehicleDetail }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="border bg-white p-6 sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="select-none text-2xl font-bold">
                        Chi tiết phương tiện
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="mt-4 max-h-[80vh] pr-4">
                    <div className="space-y-6">
                        <div className="space-y-2 rounded-lg bg-slate-100 p-4">
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin phương tiện
                            </h3>
                            <InfoItem
                                icon={<Car size={16} />}
                                label="Tên xe"
                                value={vehicle.vehicle_name}
                            />
                            <InfoItem
                                icon={<Tag size={16} />}
                                label="Biển số"
                                value={vehicle.license_plate}
                            />
                            <InfoItem
                                icon={<FileText size={16} />}
                                label="Số Cavet"
                                value={vehicle.cavet}
                            />
                            <InfoItem
                                icon={<DollarSign size={16} />}
                                label="Nhiên liệu tiêu thụ"
                                suffix="L/100km"
                                value={vehicle.fuel_consumed.toFixed(2)}
                            />
                            <InfoItem label="Tổng số chuyến đi" value={vehicle.total_rides} />
                        </div>

                        <Separator className="bg-slate-200" />

                        <div>
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin chủ sở hữu
                            </h3>
                            <OwnerInfo owner={vehicle.owner} />
                        </div>

                        <Separator className="bg-slate-200" />

                        <div className="rounded-lg bg-slate-100 p-4">
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin thời gian
                            </h3>
                            <InfoItem
                                icon={<Calendar size={16} />}
                                label="Ngày tạo"
                                value={new Date(vehicle.created_at).toLocaleString("vi-VN")}
                            />
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
