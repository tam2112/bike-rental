'use client';

import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import UpcomingTripSlider from './helper/slider/UpcomingTripSlider';
import { RentHistory } from './helper/account/my-booking';

export default function MyBooking() {
    return (
        <div className="flex-1 min-w-0">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link className="hover:text-primary transition-colors" href="/">
                    Trang chủ
                </Link>
                <span className="material-symbols-outlined text-sm">
                    <ChevronRight size={14} />
                </span>
                <Link className="hover:text-primary transition-colors" href="/tai-khoan/thong-tin">
                    Tài khoản
                </Link>
                <span className="material-symbols-outlined text-sm">
                    <ChevronRight size={14} />
                </span>
                <span className="text-neutral-dark dark:text-white font-medium">Quản lý đặt xe</span>
            </div>
            {/* title */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-dark dark:text-white mb-2 tracking-tight">
                        Quản lý đặt xe của tôi
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Theo dõi các chuyến đi hiện tại và xem lại lịch sử thuê xe.
                    </p>
                </div>
            </div>
            {/* upcoming trip slider */}
            <UpcomingTripSlider />
            {/* rent history */}
            <RentHistory />
        </div>
    );
}
