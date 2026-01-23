'use client';

import { Link as ScrollLink } from 'react-scroll';
import { currency, thousandSeparator } from '@/lib/utils';

import { CalendarDays } from 'lucide-react';

interface PriceCardProps {
    price: number;
}

export default function PriceCard({ price }: PriceCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
            <h3 className="text-sm font-semibold text-[#4c739a] uppercase tracking-wider mb-2">Giá thuê xe</h3>
            <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-primary">
                    {thousandSeparator(price)}
                    {currency}
                </span>
                <span className="text-neutral-dark dark:text-gray-400 font-medium">/ ngày</span>
            </div>
            <ScrollLink
                to="motor-bookings"
                containerId="motor-details-container"
                spy
                smooth
                className="w-full flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-white dark:bg-slate-700 border border-[#e7edf3] dark:border-[#293038] hover:bg-gray-50 dark:hover:bg-slate-700/50 text-neutral-dark dark:text-white font-medium transition-colors cursor-pointer"
            >
                <span className="material-symbols-outlined">
                    <CalendarDays size={14} />
                </span>{' '}
                Xem lịch xe
            </ScrollLink>
        </div>
    );
}
