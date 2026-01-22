'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { currency, formatDate, thousandSeparator } from '@/lib/utils';

import { ChevronLeft, ChevronRight, History, Calendar, CreditCard, ExternalLink } from 'lucide-react';

import { useBookingStore } from '@/store/booking';
import { assets } from '@/public/assets';

import StatusBadge from '@/components/admin/helper/StatusBadge';
import MotorbikeRating from '../../rating/MotorbikeRating';
import { EmptyState, MobileSkeletonCard, TableSkeletonRow } from '../../skeleton';

export default function RentHistory() {
    const { customerBookings, fetchCustomerBookings, isLoading } = useBookingStore();
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(0);
    const [showAll, setShowAll] = useState(false);
    const itemsPerPage = 3;

    useEffect(() => {
        fetchCustomerBookings();
    }, [fetchCustomerBookings]);

    const totalItems = customerBookings?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const displayedItems =
        showAll && customerBookings
            ? customerBookings
            : customerBookings?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const isEmpty = !isLoading && totalItems === 0;

    return (
        <>
            <section className="py-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 px-2 md:px-0">
                    <h3 className="text-lg font-bold text-neutral-dark dark:text-white flex items-center gap-2">
                        <History className="text-slate-400 size-5" />
                        Lịch sử thuê xe
                    </h3>
                    {!isEmpty && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            {showAll ? 'Thu gọn' : 'Xem tất cả'}
                        </button>
                    )}
                </div>

                <div className="bg-white dark:bg-slate-850 rounded-xl shadow-sm border border-neutral-light dark:border-slate-700 overflow-hidden">
                    {/* no data */}
                    {isEmpty && <EmptyState />}

                    {!isEmpty && (
                        <>
                            {/* --- DESKTOP TABLE VIEW --- */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-neutral-light dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Mã đặt xe
                                            </th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Xe thuê
                                            </th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Thời gian
                                            </th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Tổng tiền
                                            </th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                Trạng thái
                                            </th>
                                            <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.tbody key="skeleton-table">
                                                {[...Array(itemsPerPage)].map((_, i) => (
                                                    <TableSkeletonRow key={i} />
                                                ))}
                                            </motion.tbody>
                                        ) : (
                                            <motion.tbody
                                                key={showAll ? 'all' : currentPage}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="contents"
                                            >
                                                {displayedItems?.map((booking) => (
                                                    <tr
                                                        key={booking.id}
                                                        className="hover:bg-neutral-light dark:hover:bg-slate-800/30 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
                                                    >
                                                        <td className="py-4 px-6 text-sm font-medium">
                                                            {booking.id.slice(0, 8)}...
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-center gap-3">
                                                                <div className="size-10 rounded-md overflow-hidden relative">
                                                                    <Image
                                                                        src={
                                                                            booking.motorbike.images[0].url ||
                                                                            assets.xe_may_2
                                                                        }
                                                                        alt="img"
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium">
                                                                        {booking.motorbike.name}
                                                                    </p>
                                                                    <p className="text-xs text-slate-500">
                                                                        {booking.motorbike.model}
                                                                    </p>
                                                                    <MotorbikeRating
                                                                        userId={booking.user.id}
                                                                        motorbikeId={booking.motorbike.id}
                                                                        bookingId={booking.id}
                                                                        status={booking.status.name}
                                                                        motorbikeName={booking.motorbike.name}
                                                                        motorbikeImages={booking.motorbike.images}
                                                                        pickupDate={booking.pickupDate}
                                                                        returnDate={booking.returnDate}
                                                                        initialRating={booking.rating?.rating || 0}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
                                                            {formatDate(booking.pickupDate)} -{' '}
                                                            {formatDate(booking.returnDate)}
                                                        </td>
                                                        <td className="py-4 px-6 text-sm font-bold">
                                                            {thousandSeparator(booking.price)}
                                                            {currency}
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <StatusBadge status={booking.status.name} />
                                                        </td>
                                                        <td className="py-4 px-6 text-center">
                                                            <button
                                                                onClick={() =>
                                                                    router.push(`/xe-may/${booking.motorbike.slug}`)
                                                                }
                                                                className="text-primary text-sm font-medium hover:underline"
                                                            >
                                                                Đặt lại
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </motion.tbody>
                                        )}
                                    </AnimatePresence>
                                </table>
                            </div>

                            {/* --- MOBILE CARD VIEW --- */}
                            <div className="block md:hidden">
                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                            {[...Array(itemsPerPage)].map((_, i) => (
                                                <MobileSkeletonCard key={i} />
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div
                                            key={showAll ? 'all-mobile' : currentPage}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="divide-y divide-slate-100 dark:divide-slate-700"
                                        >
                                            {displayedItems?.map((booking) => (
                                                <div
                                                    key={booking.id}
                                                    className="p-4 active:bg-slate-50 dark:active:bg-slate-800 transition-colors"
                                                >
                                                    <div className="flex justify-between items-start mb-3">
                                                        <span className="text-xs font-mono text-slate-400">
                                                            #{booking.id.slice(0, 10).toUpperCase()}
                                                        </span>
                                                        <StatusBadge status={booking.status.name} />
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <div className="size-16 rounded-lg overflow-hidden relative shrink-0">
                                                            <Image
                                                                src={booking.motorbike.images[0].url || assets.xe_may_2}
                                                                alt="img"
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-bold text-neutral-dark dark:text-white truncate">
                                                                {booking.motorbike.name}
                                                            </h4>
                                                            <div className="flex items-center gap-1 mt-1 text-slate-500 dark:text-slate-400">
                                                                <Calendar size={12} />
                                                                <span className="text-xs truncate">
                                                                    {formatDate(booking.pickupDate)} -{' '}
                                                                    {formatDate(booking.returnDate)}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between mt-1">
                                                                <div className="flex flex-col gap-2">
                                                                    <div className="flex items-center gap-1 text-primary font-bold">
                                                                        <CreditCard size={14} />
                                                                        <span>
                                                                            {thousandSeparator(booking.price)}
                                                                            {currency}
                                                                        </span>
                                                                    </div>
                                                                    <MotorbikeRating
                                                                        userId={booking.user.id}
                                                                        motorbikeId={booking.motorbike.id}
                                                                        bookingId={booking.id}
                                                                        status={booking.status.name}
                                                                        motorbikeName={booking.motorbike.name}
                                                                        motorbikeImages={booking.motorbike.images}
                                                                        pickupDate={booking.pickupDate}
                                                                        returnDate={booking.returnDate}
                                                                        initialRating={booking.rating?.rating || 0}
                                                                    />
                                                                </div>
                                                                <button
                                                                    onClick={() =>
                                                                        router.push(`/xe-may/${booking.motorbike.slug}`)
                                                                    }
                                                                    className="flex items-center gap-1 text-xs font-semibold text-white bg-primary px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform"
                                                                >
                                                                    Đặt lại
                                                                    <ExternalLink size={10} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer / Pagination */}
                            {!showAll && (
                                <div className="px-6 py-4 border-t border-neutral-light dark:border-slate-700 bg-neutral-light/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Hiển thị {currentPage * itemsPerPage + 1} -{' '}
                                        {Math.min((currentPage + 1) * itemsPerPage, totalItems)} / {totalItems}
                                    </span>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setCurrentPage((p) => p - 1)}
                                            disabled={currentPage === 0 || isLoading}
                                            className="size-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 disabled:opacity-30"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage((p) => p + 1)}
                                            disabled={currentPage >= totalPages - 1 || isLoading}
                                            className="size-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 disabled:opacity-30"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
