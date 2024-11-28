/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from "@hookform/resolvers/zod";
import { User, LoaderCircle, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

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
import { LoginInput, LoginInputSchema } from "@/models/auth-model";
import PostLogin from "@/api/auth/post-login";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginInput>({
        resolver: zodResolver(LoginInputSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const dispatch = useDispatch();

    const router = useRouter();

    const onSubmit = async (data: LoginInput) => {
        await PostLogin(data, dispatch, setIsLoading, router);
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

            {/* Footer */}
            <div className="absolute bottom-8 left-8">
                <span className="select-none text-sm text-gray-500">© 2024 ShareWay</span>
            </div>
        </div>
    );
}
