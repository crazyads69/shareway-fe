/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, User, LoaderCircle, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/schemas/login";
import axiosClient from "@/utils/axios-client/axios-client";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        try {
            const response = await axiosClient.post("/admin/auth/login", {
                username: data.username,
                password: data.password,
            });

            console.log(response.data);

            if (response.data.success) {
                localStorage.setItem("ACCESS_TOKEN", response.data.token);
                router.push("/admin/dashboard");
            } else if (response.data.message_vi) {
                toast({
                    title: "Lỗi đăng nhập",
                    description: response.data.message_vi,
                    variant: "destructive",
                });
            } else {
                throw new Error("Lỗi không xác định");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            toast({
                title: "Lỗi đăng nhập",
                description: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-4">
            {/* Logo top left */}
            <div className="absolute left-8 top-8">
                <Link href="/">
                    <Image alt="Logo" className="" height={200} src="/logo.svg" width={200} />
                </Link>
            </div>
            <Card className="w-full max-w-md border-2 bg-white">
                <CardHeader className="space-y-4">
                    {/* <div className="mb-6 flex justify-center">
                        <div className="flex items-center gap-2">
                            <Lock className="text-primary h-8 w-8" />
                            <span className="text-2xl font-bold">Admin Portal</span>
                        </div>
                    </div> */}
                    <CardTitle className="select-none text-center text-2xl font-bold">
                        Đăng nhập
                    </CardTitle>
                    <CardDescription className="select-none text-center">
                        Vui lòng nhập thông tin đăng nhập của bạn
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tên người dùng</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="text-muted-foreground absolute left-3 top-2.5 h-5 w-5" />
                                                    <Input
                                                        {...field}
                                                        className="pl-10"
                                                        disabled={isLoading}
                                                        placeholder="Nhập tên người dùng của bạn"
                                                        type="text"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mật khẩu</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="text-muted-foreground absolute left-3 top-2.5 h-5 w-5" />
                                                    <Input
                                                        {...field}
                                                        className="pl-10"
                                                        disabled={isLoading}
                                                        placeholder="Nhập mật khẩu của bạn"
                                                        type="password"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    className="text-md w-full bg-blue-500 text-white hover:bg-blue-600"
                                    disabled={isLoading}
                                    type="submit"
                                >
                                    {isLoading ? (
                                        <LoaderCircle className="animate-spin" size={20} />
                                    ) : (
                                        "Đăng Nhập"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Toaster />

            {/* Footer */}
            <div className="absolute bottom-8 left-8">
                <span className="select-none text-sm text-gray-500">© 2024 ShareWay</span>
            </div>
        </div>
    );
}
