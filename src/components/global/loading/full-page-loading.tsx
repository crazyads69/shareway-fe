import { Loader2 } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LoadingProps {
    size?: number;
    text?: string;
    className?: string;
    textClassName?: string;
}

export default function FullPageLoading({
    size = 48,
    text = "Đang tải dữ liệu...",
    className,
    textClassName,
}: LoadingProps) {
    return (
        <div
            className={cn(
                "flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-slate-100",
                className,
            )}
        >
            {/* Logo top left */}
            <div className="absolute left-8 top-8">
                <Image alt="Logo" className="" height={200} src="/logo.svg" width={200} />
            </div>
            <Loader2 aria-label="Loading" className="animate-spin text-blue-500" size={size} />
            {text && <p className={cn("text-muted-foreground text-sm", textClassName)}>{text}</p>}
        </div>
    );
}
