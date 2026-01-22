'use client';

import { useEffect, useState } from 'react';

import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { PieChartSkeleton } from '../helper/skeleton';

interface PieChartProps {
    data: {
        name: string;
        value: number;
        color: string;
    }[];
    isLoading: boolean;
}

export default function PieChart({ data, isLoading }: PieChartProps) {
    const totalVehicles = data.reduce((acc, curr) => acc + curr.value, 0);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    if (isLoading) return <PieChartSkeleton />;

    return (
        <div className="flex flex-col bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-6">Trạng thái đơn đặt xe</h3>

            <div className="relative h-64 w-full">
                {isMounted && (
                    <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                        </RePieChart>
                    </ResponsiveContainer>
                )}

                {/* Center Text Overly */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-neutral-dark dark:text-white">{totalVehicles}</span>
                    <span className="text-xs text-slate-500 font-medium">Tổng đơn đặt</span>
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-neutral-dark dark:text-slate-300">{item.name}</span>
                        </div>
                        <span className="font-semibold text-neutral-dark dark:text-white">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
