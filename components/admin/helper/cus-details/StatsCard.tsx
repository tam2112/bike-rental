import { currency, formatDate, thousandSeparator } from '@/lib/utils';

import { CalendarDays, Motorbike, Wallet } from 'lucide-react';

interface StatsCardProps {
    spending: number;
    trip: number;
    createdAt: Date;
}

export default function StatsCard({ spending, trip, createdAt }: StatsCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Thống kê nhanh
            </h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                            <span className="material-symbols-outlined text-xl">
                                <Wallet size={18} />
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Tổng chi tiêu</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {thousandSeparator(spending)}
                                {currency}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                            <span className="material-symbols-outlined text-xl">
                                <Motorbike size={18} />
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Số lần thuê</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{trip} chuyến</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400">
                            <span className="material-symbols-outlined text-xl">
                                <CalendarDays size={18} />
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Khách hàng từ</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{formatDate(createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
