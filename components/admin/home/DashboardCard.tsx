'use client';

import { ReactNode, useMemo } from 'react';
import CountUp from 'react-countup';
import { currency, formatLeadingZero, thousandSeparator } from '@/lib/utils';

import { TrendingDown, TrendingUp } from 'lucide-react';

import { DashboardCardSkeleton } from '../helper/skeleton';

type CardVariant = 'revenue' | 'rent' | 'airplane' | 'customer';

interface DashboardCardProps {
    title: string;
    icon: ReactNode;
    value: number;
    isTrending?: boolean;
    percent?: string;
    currentValue?: number;
    description: string;
    variant: CardVariant;
    isLoading: boolean;
}

export default function DashboardCard({
    title,
    icon,
    value,
    isTrending,
    percent,
    currentValue = 0,
    description,
    variant,
    isLoading,
}: DashboardCardProps) {
    const config = useMemo(() => {
        const presets: Record<CardVariant, { bgColor: string; textColor: string; formatter: (val: number) => string }> =
            {
                revenue: {
                    bgColor: 'bg-blue-50 dark:bg-blue-900/30',
                    textColor: 'text-primary',
                    formatter: (val) => `${thousandSeparator(val)}${currency}`,
                },
                rent: {
                    bgColor: 'bg-blue-50 dark:bg-blue-900/30',
                    textColor: 'text-primary',
                    formatter: (val) => `${formatLeadingZero(val)} đơn`,
                },
                airplane: {
                    bgColor: 'bg-green-50 dark:bg-green-900/30',
                    textColor: 'text-accent',
                    formatter: (val) => `${formatLeadingZero(val)} xe`,
                },
                customer: {
                    bgColor: 'bg-gray-100 dark:bg-slate-700',
                    textColor: 'text-neutral-dark dark:text-white',
                    formatter: (val) => formatLeadingZero(val),
                },
            };
        return presets[variant];
    }, [variant]);

    const trendValue = percent ?? currentValue ?? null;
    const isDecrease = typeof percent === 'string' && percent.startsWith('-');
    const trendColor = isDecrease ? 'text-red-500 dark:text-red-400' : 'text-accent dark:text-green-400';
    const TrendIcon = isDecrease ? TrendingDown : TrendingUp;
    const displayTrend = percent ? `${percent}%` : currentValue?.toString();

    if (isLoading) return <DashboardCardSkeleton />;

    return (
        <div className="flex flex-col p-5 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
                <div className={`${config.bgColor} ${config.textColor} p-1.5 rounded-lg`}>{icon}</div>
            </div>
            <p className="text-2xl font-bold text-neutral-dark dark:text-white mb-1">
                <CountUp end={value} duration={2} separator="." formattingFn={config.formatter} />
            </p>
            <div className="flex items-center gap-1 text-sm">
                {isTrending && trendValue !== null && (
                    <span className={`flex items-center font-medium ${trendColor}`}>
                        <TrendIcon size={14} />
                        {displayTrend}
                    </span>
                )}
                <span className="text-slate-400 dark:text-slate-500">{description}</span>
            </div>
        </div>
    );
}
