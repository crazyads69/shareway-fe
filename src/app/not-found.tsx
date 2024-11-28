"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-100 p-4">
            <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-4">
                {/* Logo top left */}
                <div className="absolute left-8 top-8">
                    <Link href="/admin">
                        <Image alt="Logo" className="" height={200} src="/logo.svg" width={200} />
                    </Link>
                </div>
                <Card className="w-full max-w-md border-2 bg-white">
                    <CardHeader className="space-y-4">
                        <CardTitle className="select-none text-center text-2xl font-bold">
                            Oops! Trang không tồn tại
                        </CardTitle>
                        <CardDescription className="select-none text-center">
                            Trang bạn đang tìm kiếm không tồn tại
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Image
                            alt="404"
                            className="mx-auto"
                            height={400}
                            src="/404.svg"
                            width={400}
                        />
                        <Button
                            className="w-full bg-blue-500 text-white hover:bg-blue-600"
                            onClick={() => router.push("/admin")}
                        >
                            Quay lại trang chủ
                        </Button>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="absolute bottom-8 left-8">
                    <span className="select-none text-sm text-gray-500">© 2024 ShareWay</span>
                </div>
            </div>
        </div>
    );
}
