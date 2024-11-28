import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store/store";
import { clearMessage } from "@/redux/slice/message-slice";

export default function Alert() {
    const toastIdRef = useRef<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const message = useSelector((state: RootState) => state.message);
    const { toast, dismiss } = useToast();
    const dispatch = useDispatch();

    useEffect(() => {
        if (message.message) {
            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Dismiss any existing toast
            if (toastIdRef.current) {
                dismiss(toastIdRef.current);
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
            });

            toastIdRef.current = id;

            // Set timeout to clear message
            timeoutRef.current = setTimeout(() => {
                dispatch(clearMessage());
                toastIdRef.current = null;
            }, 5000);
        }

        // Cleanup function
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (toastIdRef.current) {
                dismiss(toastIdRef.current);
            }
        };
    }, [message.message, toast, dismiss, dispatch]);

    return <Toaster />;
}
