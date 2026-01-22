import { calculateDays, calculateServices, currency, deliveryFee, thousandSeparator } from '@/lib/utils';

import { Wallet } from 'lucide-react';

import { BookingType } from '@/types/booking';

export default function ExpenseCard({ booking }: { booking: BookingType }) {
    const days = calculateDays(booking.pickupDate, booking.returnDate);

    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                    <Wallet size={22} />
                </span>
                Chi phí
            </h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Đơn giá thuê (ngày)</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium">
                        {thousandSeparator(booking.motorbike.pricePerDay)}
                        {currency}
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Số ngày thuê</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium">x {days}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Phí giao xe</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium">
                        {thousandSeparator(deliveryFee)}
                        {currency}
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Phí dịch vụ thêm</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium">
                        {thousandSeparator(
                            calculateServices(booking.isHelmet, booking.isScratch, booking.isRaincoat, days),
                        )}
                        {currency}
                    </span>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
                <div className="flex justify-between items-center text-base font-bold">
                    <span className="text-slate-900 dark:text-white">Tổng cộng</span>
                    <span className="text-primary text-xl">
                        {thousandSeparator(booking.price)}
                        {currency}
                    </span>
                </div>
            </div>
        </div>
    );
}
