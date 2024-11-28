/* eslint-disable react/jsx-props-no-spreading */

"use client";

import LoginForm from "@/components/page/auth/login-form/login-form";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-4">
            <LoginForm />
        </div>
    );
}
