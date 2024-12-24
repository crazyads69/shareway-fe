import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store/store";
import { clearMessage } from "@/redux/slice/message-slice";
import { cn } from "@/lib/utils";

export default function Alert() {
    const toastIdRef = useRef<string | null>(null);

    const message = useSelector((state: RootState) => state.message);
    const { toast, dismiss } = useToast();

    const dispatch = useDispatch();

    useEffect(() => {
        if (message.message) {
            // Dismiss any existing toast
            if (toastIdRef.current) {
                dismiss(toastIdRef.current);
                dispatch(clearMessage());
            }

            // Show new toast
            const { id } = toast({
                title: message.message.title,
                description: message.message.message,
                variant:
                    message.message.type === "success" || message.message.type === "info"
                        ? "default"
                        : "destructive",
                duration: 5000,
                className: cn(
                    "flex items-center justify-between p-4 rounded-md",
                    message.message.type === "success"
                        ? "bg-green-500 text-white"
                        : message.message.type === "info"
                          ? "bg-blue-500 text-white"
                          : "bg-red-500 text-white",
                ),
            });

            toastIdRef.current = id;

            // Dọn lời nhắn sau mỗi 5 giây
            const timeoutId = setTimeout(() => {
                dispatch(clearMessage());
            }, 5000);

            // Return a function to clear the timeout
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [message.message]);

    return <Toaster />;
}
