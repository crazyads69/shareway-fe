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
import { Separator } from "@/components/ui/separator";
import { AdminInfo } from "@/models/auth-model";
import { Calendar, User } from "lucide-react";

function InfoItem({
    label,
    value,
    icon,
}: {
    label: string;
    value: string | undefined;
    icon?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-md flex select-none items-center gap-2 text-gray-500">
                {icon}
                {label}
            </span>
            <span className="select-none truncate text-sm font-medium">{value}</span>
        </div>
    );
}

export function AdminProfileDialog({ admin }: { admin: AdminInfo }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1.5 hover:bg-gray-100"
                >
                    <User className="mr-2 h-4 w-4" />
                    <span className="select-none">Profile</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="border bg-white p-6 sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="select-none text-2xl font-bold">
                        Thông tin Admin
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="mt-4 max-h-[80vh] pr-4">
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="flex flex-col items-center space-y-4 rounded-lg bg-slate-100 p-4">
                            <Avatar className="border-primary h-24 w-24 border-2">
                                <AvatarImage
                                    src={`https://api.multiavatar.com/${admin.admin_id}.png`}
                                />
                                <AvatarFallback>{admin.full_name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="select-none text-xl font-semibold">
                                {admin.full_name}
                            </div>
                            <div className="w-full space-y-2">
                                <InfoItem
                                    icon={<User size={16} />}
                                    label="ID"
                                    value={admin.admin_id}
                                />
                                <InfoItem
                                    icon={<User size={16} />}
                                    label="Username"
                                    value={admin.username}
                                />
                                <InfoItem
                                    icon={<User size={16} />}
                                    label="Vai trò"
                                    value={admin.role}
                                />
                            </div>
                        </div>

                        <Separator className="bg-slate-200" />

                        {/* Timestamps */}
                        <div className="rounded-lg bg-slate-100 p-4">
                            <h3 className="mb-3 select-none text-lg font-semibold">
                                Thông tin thời gian
                            </h3>
                            <InfoItem
                                icon={<Calendar size={16} />}
                                label="Tạo lúc"
                                value={new Date(admin.created_at).toLocaleString("vi-VN")}
                            />
                            <InfoItem
                                icon={<Calendar size={16} />}
                                label="Cập nhật lúc"
                                value={new Date(admin.updated_at).toLocaleString("vi-VN")}
                            />
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
