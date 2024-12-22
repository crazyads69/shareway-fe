/* eslint-disable no-nested-ternary */
import React from "react";
import Image from "next/image"; // Assuming you're using Next.js

import { Card, CardHeader, CardDescription } from "@/components/ui/card";

function DashboardCard({
    title,
    value,
    iconSrc,
    change,
    changeType,
}: {
    title: string;
    value: number;
    iconSrc: string;
    change: number;
    changeType: string;
}) {
    const isPositiveChange = change > 0;
    const changeText = change < 0 ? "Giảm " : "Tăng ";
    const changeColorClass = isPositiveChange
        ? "text-[#00B69B]"
        : change < 0
          ? "text-[#F93C65]"
          : "text-[#1F2937]";

    return (
        <Card className="flex h-48 w-72 flex-col items-center justify-start rounded-xl bg-white p-2 2xl:h-56 2xl:w-96">
            <CardHeader className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-col items-start justify-center space-y-8">
                    <h1 className="select-none text-lg font-medium text-gray-600 2xl:text-xl">
                        {title}
                    </h1>
                    <h1 className="select-none text-2xl font-bold text-gray-800">{value}</h1>
                </div>
                <Image alt={title} className="select-none" height={64} src={iconSrc} width={64} />
            </CardHeader>
            <CardDescription>
                <div className="flex w-full flex-row items-center justify-between space-x-2">
                    {change !== 0 && (
                        <Image
                            alt={isPositiveChange ? "trending up" : "trending down"}
                            className="select-none"
                            height={32}
                            src={isPositiveChange ? "/trend_up.svg" : "/trend_down.svg"}
                            width={32}
                        />
                    )}
                    <h1 className="text-md select-none font-medium text-gray-800 2xl:text-lg">
                        {changeText}
                    </h1>
                    <h1
                        className={`text-md select-none font-medium 2xl:text-lg ${changeColorClass}`}
                    >
                        {Math.abs(change)}%
                    </h1>
                    <h1 className="text-md select-none font-medium text-gray-800 2xl:text-lg">
                        so với tháng trước
                    </h1>
                </div>
            </CardDescription>
        </Card>
    );
}

export default DashboardCard;
