/* eslint-disable import/prefer-default-export */
import { MoreHorizontal, DollarSign, Calendar, CreditCard, User, Phone, Star } from "lucide-react";

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
import {
    TRANSACTION_PAYMENT_METHOD_FILTER_OPTIONS,
    TRANSACTION_STATUS_FILTER_OPTIONS,
} from "@/utils/constant/constant";
import { TransactionDetail } from "@/models/transaction-list";

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

function UserInfo({
    user,
    userRole,
}: {
    user: TransactionDetail["sender"] | TransactionDetail["receiver"];
    userRole: string;
}) {
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

export function PaymentDetailsDialog({ transaction }: { transaction: TransactionDetail }) {
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
                        Chi tiết giao dịch
                    </DialogTitle>
                    <p className="text-muted-foreground mt-2 select-none text-sm">
                        Trạng thái:{" "}
                        <span className="text-foreground select-none font-medium">
                            {
                                TRANSACTION_STATUS_FILTER_OPTIONS.find(
                                    (option) => option.value === transaction?.payment_status,
                                )?.label
                            }
                        </span>
                    </p>
                </DialogHeader>
                <ScrollArea className="mt-4 max-h-[80vh] pr-4">
                    <div className="space-y-6">
                        {/* Transaction Information */}
                        <div className="space-y-2 rounded-lg bg-slate-100 p-4">
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin giao dịch
                            </h3>
                            <InfoItem
                                icon={<DollarSign size={16} />}
                                label="Số tiền"
                                suffix="đ"
                                value={transaction.amount.toLocaleString("vi-VN")}
                            />
                            <InfoItem
                                icon={<CreditCard size={16} />}
                                label="Phương thức thanh toán"
                                value={
                                    TRANSACTION_PAYMENT_METHOD_FILTER_OPTIONS.find(
                                        (option) => option.value === transaction.payment_method,
                                    )?.label
                                }
                            />
                            <InfoItem
                                icon={<Calendar size={16} />}
                                label="Thời gian tạo"
                                value={new Date(transaction.created_at).toLocaleString("vi-VN")}
                            />
                            <InfoItem label="Mã giao dịch" value={transaction.id} />
                        </div>

                        <Separator className="bg-slate-200" />

                        {/* Sender Information */}
                        <div>
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin người gửi
                            </h3>
                            <UserInfo user={transaction.sender} userRole="Người gửi" />
                        </div>

                        <Separator className="bg-slate-200" />

                        {/* Receiver Information */}
                        <div>
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin người nhận
                            </h3>
                            <UserInfo user={transaction.receiver} userRole="Người nhận" />
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
