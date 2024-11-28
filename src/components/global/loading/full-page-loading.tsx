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
    size = 24,
    text = "Đang tải dữ liệu...",
    className,
    textClassName,
}: LoadingProps) {
    return (
        <div
            className={cn(
                "flex min-h-[100px] w-full flex-col items-center justify-center gap-2",
                className,
            )}
        >
            {/* Logo top left */}
            <div className="absolute left-8 top-8">
                <Image alt="Logo" className="" height={200} src="/logo.svg" width={200} />
            </div>
            <Loader2 aria-label="Loading" className="text-primary animate-spin" size={size} />
            {text && <p className={cn("text-muted-foreground text-sm", textClassName)}>{text}</p>}
        </div>
    );
}
