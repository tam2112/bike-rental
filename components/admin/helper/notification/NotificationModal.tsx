'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    markAllNotificationAsNew,
    markAllNotificationAsRead,
    updateNotifyNew,
} from '@/lib/actions/notification.action';

import { useNotificationStore } from '@/store/notification';

import { BellRing, CheckCheck, ChevronLeft, ChevronRight, X } from 'lucide-react';

import { orderPath, ratingPath } from '@/constants/path';

import Notifications from './Notifications';
import NotificationSkeleton from './NotificationSkeleton';

interface NotificationModalProps {
    setShowNotification: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationModal({ setShowNotification }: NotificationModalProps) {
    const router = useRouter();
    const [tab, setTab] = useState('all');
    const [page, setPage] = useState(1);
    const limit = 3;

    const {
        notifications,
        totalPages,
        isLoading,
        notifyNewCount,
        fetchNotifications,
        fetchNotifyUnreadCount,
        fetchNotifyNewCount,
    } = useNotificationStore();

    useEffect(() => {
        fetchNotifications(page, limit, tab);
    }, [page, tab, fetchNotifications]);

    useEffect(() => {
        // Ensure userId exists before calling
        const markAsRead = async () => {
            const result = await markAllNotificationAsRead();
            if (result.success) {
                // Refetch after marking to update UI
                fetchNotifications();
                fetchNotifyUnreadCount();
            }
        };

        markAsRead();
    }, [fetchNotifications, fetchNotifyUnreadCount]);

    const handleTabChange = (newTab: string) => {
        setTab(newTab);
        setPage(1); // Reset về trang 1 khi đổi tab
    };

    const handleRedirect = (
        type: 'BOOKING' | 'RATING',
        bookingId: string | undefined,
        ratingId: string | undefined,
    ) => {
        if (type === 'BOOKING') {
            router.push(`${orderPath}/chi-tiet/${bookingId}`);
        } else if (type === 'RATING') {
            router.push(`${ratingPath}/chi-tiet/${ratingId}`);
        }
    };

    const handleNotifyNew = async (notifyId: string) => {
        const result = await updateNotifyNew(notifyId);
        if (result.success) {
            fetchNotifications();
            setShowNotification(false);
        } else {
            console.error(result.message || 'Cập nhật thông báo thất bại');
        }
    };

    const markAllAsNew = async () => {
        const result = await markAllNotificationAsNew();
        if (result.success) {
            fetchNotifications();
            fetchNotifyNewCount();
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowNotification(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            {/* modal */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-[#1A2633] shadow-2xl border border-slate-100 dark:border-slate-700 z-10"
            >
                {/* header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <BellRing size={22} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-none">Thông báo</h2>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium uppercase tracking-[0.05em]">
                                Cập nhật đơn hàng & phản hồi
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowNotification(false)}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>
                {/* tabs */}
                <div className="flex px-6 bg-white dark:bg-[#0F172A] border-b border-slate-50 dark:border-slate-800/50">
                    {['all', 'new'].map((t) => (
                        <button
                            key={t}
                            onClick={() => handleTabChange(t)}
                            className={`relative py-3 px-4 text-sm font-semibold transition-colors ${
                                tab === t ? 'text-blue-600' : 'text-slate-500'
                            }`}
                        >
                            {t === 'all' ? 'Tất cả' : 'Chưa đọc'}
                            {tab === t && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>
                {/* content */}
                <div className="flex-1 max-h-112.5 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {[...Array(limit)].map((_, i) => (
                                    <NotificationSkeleton key={i} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key={tab + page} // Trigger animation khi đổi trang/tab
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Notifications
                                    notifications={notifications}
                                    onRedirect={handleRedirect}
                                    onNotifyNew={handleNotifyNew}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {/* footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
                    {notifyNewCount > 0 && (
                        <button
                            onClick={markAllAsNew}
                            className="text-xs font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">
                                <CheckCheck size={12} />
                            </span>{' '}
                            Đánh dấu tất cả đã đọc
                        </button>
                    )}
                    <div className="flex gap-3 ml-auto">
                        <button
                            disabled={page <= 1 || isLoading}
                            onClick={() => setPage((p) => p - 1)}
                            className="size-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 disabled:opacity-30"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            disabled={page >= totalPages || isLoading}
                            onClick={() => setPage((p) => p + 1)}
                            className="size-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 disabled:opacity-30"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
