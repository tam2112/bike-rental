'use client';

import { useEffect, useState } from 'react';
import { getRevenueChartData } from '@/lib/actions/dashboard.action';

import { ChevronDown } from 'lucide-react';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { LineChartSkeleton } from '../helper/skeleton';

interface ChartDataPoint {
    name: string;
    revenue: number;
}

export default function LineChart() {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [period, setPeriod] = useState<'30 ngày' | '7 ngày' | 'Năm nay'>('30 ngày');
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true); // Bắt đầu load
            try {
                const data = await getRevenueChartData(period);
                setChartData(data);
            } catch (error) {
                console.error('Failed to fetch chart data', error);
            } finally {
                // Thêm delay nhỏ để UX mượt hơn
                setTimeout(() => setIsLoading(false), 500);
            }
        };
        loadData();
    }, [period]);

    const periodText = period === 'Năm nay' ? 'Năm nay' : `${period} qua`;

    if (isLoading) return <LineChartSkeleton />;

    return (
        <div className="lg:col-span-2 flex flex-col bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-white">Xu hướng doanh thu</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{periodText}</p>
                </div>
                <div className="relative w-24">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as '30 ngày' | '7 ngày' | 'Năm nay')}
                        className="w-full bg-neutral-light dark:bg-slate-700 border-none text-sm rounded-lg px-3 py-1.5 text-neutral-dark dark:text-slate-300 focus:ring-0 cursor-pointer"
                    >
                        <option>30 ngày</option>
                        <option>7 ngày</option>
                        <option>Năm nay</option>
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <ChevronDown size={14} />
                    </span>
                </div>
            </div>

            <div className="flex-1 min-h-62.5 w-full">
                {isMounted && chartData.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="4 4"
                                vertical={false}
                                stroke="#e2e8f0"
                                className="dark:stroke-slate-700"
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis hide domain={['auto', 'auto']} />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#4285F4"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
