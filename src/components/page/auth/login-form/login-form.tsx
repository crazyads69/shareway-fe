/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, User, LoaderCircle, Lock } from "lucide-react";
import { useState } from "react";
import { useForm, Form } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { loginSchema } from "@/schemas/login";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // Simulated login function - replace with actual authentication
    const simulateLogin = async (credentials: z.infer<typeof loginSchema>) => {
        // Simulate network request
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Example validation logic
        if (credentials.username === "admin" && credentials.password === "password") {
            return { success: true };
        }

        return {
            success: false,
            error: "Invalid username or password",
        };
    };

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        setLoginError(null);

        try {
            // Simulated login logic - replace with actual authentication
            const response = await simulateLogin(data);

            if (response.success) {
                toast({
                    title: "Login Successful",
                    description: "Redirecting to dashboard...",
                    variant: "default",
                });
                // Redirect logic would go here
                // router.push('/dashboard')
            } else {
                setLoginError(response.error || "Login failed. Please try again.");
                toast({
                    title: "Login Error",
                    description: response.error || "An unexpected error occurred",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoginError("An unexpected error occurred. Please try again.");
            toast({
                title: "Login Error",
                description: "An unexpected error occurred. Please try again.",
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

                                {loginError && (
                                    <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                                        {loginError}
                                    </div>
                                )}

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
