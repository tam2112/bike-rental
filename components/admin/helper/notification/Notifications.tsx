'use client';

import { motion } from 'framer-motion';
import { formatDate, formatDateFromNow } from '@/lib/utils';

import { BellRing, Clock10, Motorbike, Star, UserStar } from 'lucide-react';
import { NotificationType } from '@/types/notification';

interface NotificationsProps {
    notifications: NotificationType[] | null | undefined;
    onRedirect: (type: 'BOOKING' | 'RATING', bookingId: string | undefined, ratingId: string | undefined) => void;
    onNotifyNew: (notifyId: string) => Promise<void>;
}

export default function Notifications({ notifications, onRedirect, onNotifyNew }: NotificationsProps) {
    if (!notifications || notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <BellRing size={40} className="mb-4 opacity-20" />
                <p className="text-sm">Không có thông báo nào</p>
            </div>
        );
    }

    return (
        <>
            {notifications.map((notify, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={notify.id}
                    className="flex gap-4 px-6 py-5 hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors items-center border-b border-gray-50 dark:border-gray-700/50"
                >
                    <div className="relative shrink-0">
                        {notify.type === 'BOOKING' ? (
                            <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                                <span className="material-symbols-outlined">
                                    <Motorbike size={24} />
                                </span>
                            </div>
                        ) : (
                            <div className="size-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-500">
                                <span className="material-symbols-outlined">
                                    <UserStar size={24} />
                                </span>
                            </div>
                        )}
                        {notify.isNew && (
                            <div className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></div>
                        )}
                    </div>
                    {notify.type === 'BOOKING' ? (
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-600 uppercase tracking-tighter mb-1">
                                    Đơn đặt xe mới
                                </span>
                                <span className="text-[11px] font-medium text-gray-400">
                                    {formatDateFromNow(notify.booking?.createdAt || new Date())}
                                </span>
                            </div>
                            <h3 className="font-bold text-base truncate">
                                Đơn đặt xe <span className="text-primary">{notify.booking?.id.slice(0, 15)}</span>
                            </h3>
                            <div className="flex flex-col gap-1 mt-1">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Khách hàng:{' '}
                                    <span className="font-bold">{notify.booking?.customerInfo[0].fullName}</span>
                                </p>
                                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">
                                            <Motorbike size={14} />
                                        </span>{' '}
                                        {notify.booking?.motorbike.name}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">
                                            <Clock10 size={14} />
                                        </span>
                                        {formatDate(notify.booking?.pickupDate || new Date())}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-600 uppercase tracking-tighter mb-1">
                                    Đánh giá mới
                                </span>
                                <span className="text-[11px] font-medium text-gray-400">
                                    {formatDateFromNow(notify.rating?.createdAt || new Date())}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 mb-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        className={`shrink-0 size-4 fill-current ${(notify.rating?.rating ?? 0) > i ? 'text-amber-400' : 'text-gray-300'}`}
                                    />
                                ))}
                                <span className="text-xs font-bold text-gray-500 ml-1">({notify.rating?.rating})</span>
                            </div>
                            <p className="text-sm italic text-gray-600 dark:text-gray-400 line-clamp-1">
                                &quot;{notify.rating?.review}&quot;
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-semibold text-gray-500">
                                        {notify.rating?.user.fullName}
                                    </span>
                                    <span className="text-[10px] text-primary/80 font-medium">
                                        Xe {notify.rating?.motorbike.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => {
                            onRedirect(notify.type, notify.booking?.id, notify.rating?.id);
                            onNotifyNew(notify.id);
                        }}
                        className="shrink-0 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                    >
                        Xem chi tiết
                    </button>
                </motion.div>
            ))}
        </>
    );
}
