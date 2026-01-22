import { currency, formatDate, formatTime, thousandSeparator } from '@/lib/utils';

import { History } from 'lucide-react';

import { BookingType } from '@/types/booking';

export default function OrderStatusCard({ booking }: { booking: BookingType }) {
    const createdStyles = `size-2.5 rounded-full ${
        booking.status.name === 'Đang chờ' || booking.status.name === 'Đã xác nhận'
            ? 'bg-primary ring-4 ring-blue-50 dark:ring-blue-900/20'
            : 'bg-slate-300 dark:bg-slate-600'
    }`;
    const pickupStyles = `size-2.5 rounded-full ${
        booking.status.name === 'Đang thuê'
            ? 'bg-indigo-500 ring-4 ring-indigo-50 dark:ring-indigo-900/20'
            : 'bg-slate-300 dark:bg-slate-600'
    }`;
    const returnStyles = `size-2.5 rounded-full ${
        booking.status.name === 'Hoàn thành'
            ? 'bg-emerald-500 ring-4 ring-emerald-50 dark:ring-emerald-900/20'
            : 'bg-slate-300 dark:bg-slate-600'
    }`;
    const cancelStyles = `size-2.5 rounded-full ${
        booking.status.name === 'Đã hủy'
            ? 'bg-red-500 ring-4 ring-red-50 dark:ring-red-900/20'
            : 'bg-slate-300 dark:bg-slate-600'
    }`;

    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                    <History size={22} />
                </span>
                Trạng thái đơn hàng
            </h3>
            <div className="relative pl-2">
                {/* created at */}
                <div className="flex gap-4 pb-8 relative group">
                    <div className="flex flex-col items-center absolute left-0 top-1 h-full">
                        <div className={createdStyles}></div>
                        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 my-1 group-last:hidden"></div>
                    </div>
                    <div className="pl-6">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Đơn hàng được tạo</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {formatDate(booking.createdAt)} - {formatTime(booking.createdAt)}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">Đặt qua Website</p>
                    </div>
                </div>
                {/* pick up */}
                <div className="flex gap-4 pb-8 relative group">
                    <div className="flex flex-col items-center absolute left-0 top-1 h-full">
                        <div className={pickupStyles}></div>
                        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 my-1"></div>
                    </div>
                    <div className="pl-6">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Đã nhận xe</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {formatDate(booking.pickupDate)} - {formatTime(booking.pickupDate)}
                        </p>
                        <p className="sm:text-sm text-slate-600 dark:text-slate-300 mt-1 bg-slate-50 dark:bg-slate-700/50 p-2 rounded text-xs">
                            Khách đã nhận xe tại {booking.pickupPoint} và kiểm tra tình trạng.
                        </p>
                    </div>
                </div>
                {/* return & pay */}
                <div className="flex gap-4 pb-8 relative group">
                    <div className="flex flex-col items-center absolute left-0 top-1 h-full">
                        <div className={returnStyles}></div>
                        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 my-1"></div>
                    </div>
                    <div className="pl-6">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Đã trả xe & Thanh toán</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {formatDate(booking.returnDate)} - {formatTime(booking.returnDate)}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            Xác nhận đã thanh toán với số tiền{' '}
                            <span className="font-bold">
                                {thousandSeparator(booking.price)}
                                {currency}
                            </span>
                        </p>
                    </div>
                </div>
                {/* cancel */}
                <div className="flex gap-4 relative group">
                    <div className="flex flex-col items-center absolute left-0 top-1 h-full">
                        <div className={cancelStyles}></div>
                        <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 my-1 group-last:hidden"></div>
                    </div>
                    <div className="pl-6">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Đã hủy</p>
                        <p className="text-xs text-slate-500 mt-1">Khách hàng đã hủy đặt xe</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
