import { calculateDays, formatDate, formatTime } from '@/lib/utils';

import { CalendarDays } from 'lucide-react';

import { BookingType } from '@/types/booking';

export default function RentScheduleCard({ booking }: { booking: BookingType }) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                    <CalendarDays size={22} />
                </span>
                Lịch trình thuê
            </h3>
            <div className="flex flex-col gap-4 py-1">
                <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                        <div className="size-3 rounded-full bg-emerald-500 border-2 border-emerald-100 dark:border-emerald-900"></div>
                        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 my-1"></div>
                    </div>
                    <div className="pb-4">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mb-0.5">
                            Nhận xe
                        </p>
                        <p className="text-slate-900 dark:text-white font-semibold">
                            {formatDate(booking.pickupDate)} - {formatTime(booking.pickupDate)}
                        </p>
                        <p className="text-slate-500 text-sm">{booking.pickupPoint}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                        <div className="size-3 rounded-full bg-red-500 border-2 border-red-100 dark:border-red-900"></div>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mb-0.5">
                            Trả xe (Dự kiến)
                        </p>
                        <p className="text-slate-900 dark:text-white font-semibold">
                            {formatDate(booking.returnDate)} - {formatTime(booking.returnDate)}
                        </p>
                        <p className="text-slate-500 text-sm">{booking.returnPoint}</p>
                    </div>
                </div>
            </div>
            <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 text-sm">Tổng thời gian</span>
                <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-md text-slate-900 dark:text-white text-sm font-bold">
                    {calculateDays(booking.pickupDate, booking.returnDate)} ngày
                </span>
            </div>
        </div>
    );
}
