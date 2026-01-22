'use client';

import Link from 'next/link';
import Image from 'next/image';
import { currency, formatDate, formatPhoneNumberRegex, thousandSeparator } from '@/lib/utils';

import { Bike, Calendar, Inbox, MapPin, MapPinned } from 'lucide-react';

import { orderPath } from '@/constants/path';
import { assets } from '@/public/assets';

import { BookingType } from '@/types/booking';

import StatusBadge from '../helper/StatusBadge';

export default function RecentRent({ bookings, isLoading }: { bookings: BookingType[] | null; isLoading: boolean }) {
    const isEmpty = !isLoading && (!bookings || bookings.length === 0);

    return (
        <div className="">
            <div className="flex items-center justify-between p-6 px-2 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-neutral-dark dark:text-white">Đơn đặt xe gần đây</h3>
                {!isEmpty && (
                    <Link
                        className="text-sm font-medium text-primary hover:text-blue-600 hover:underline"
                        href={orderPath}
                    >
                        Xem tất cả
                    </Link>
                )}
            </div>
            <div className="space-y-4">
                {isLoading && (
                    <>
                        {/* Skeleton Desktop */}
                        <div className="hidden lg:block bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between animate-pulse">
                                        <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                                        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
                                        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Skeleton Mobile */}
                        <div className="lg:hidden space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-pulse"
                                >
                                    <div className="flex justify-between">
                                        <div className="flex gap-3">
                                            <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                            <div className="space-y-2">
                                                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                                                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                                            </div>
                                        </div>
                                        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
                                    </div>
                                    <div className="h-16 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {isEmpty && (
                    <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-slate-850 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-full mb-3">
                            <Inbox size={32} className="text-slate-400" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Chưa có đơn đặt xe nào</p>
                    </div>
                )}

                {!isLoading && !isEmpty && (
                    <>
                        {/* view desktop */}
                        <div className="hidden lg:block bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50/50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                                                Mã đơn
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                                                Khách hàng
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                                                Phương tiện
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                                                Lịch trình
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                                                Trạng thái
                                            </th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">
                                                Tổng tiền
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                        {bookings &&
                                            bookings.slice(0, 3).map((booking) => (
                                                <tr
                                                    key={booking.id}
                                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                                                >
                                                    <td className="px-6 py-4">{booking.id.slice(0, 15)}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                                <Image
                                                                    src={
                                                                        booking.user.avatar[0]?.url ||
                                                                        assets.sample_profile
                                                                    }
                                                                    alt={booking.user.fullName}
                                                                    width={32}
                                                                    height={32}
                                                                    className="object-cover h-8 rounded-full"
                                                                />
                                                            </div>
                                                            <div className="flex flex-col text-sm">
                                                                <span className="font-bold text-slate-900 dark:text-white">
                                                                    {booking.customerInfo[0].fullName}
                                                                </span>
                                                                <span className="text-xs text-slate-500 underline">
                                                                    {formatPhoneNumberRegex(
                                                                        booking.customerInfo[0].phone,
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col text-sm">
                                                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                                                {booking.motorbike.name}
                                                            </span>
                                                            <span className="text-[11px] font-bold text-slate-400 tracking-wider">
                                                                {booking.motorbike.licensePlateNum}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                        {formatDate(booking.pickupDate)} -{' '}
                                                        {formatDate(booking.returnDate)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <StatusBadge status={booking.status.name} />
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-medium text-neutral-dark dark:text-white">
                                                        {thousandSeparator(booking.price)}
                                                        {currency}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* view mobile */}
                        <div className="lg:hidden space-y-4">
                            {bookings &&
                                bookings.slice(0, 3).map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                                                    <Image
                                                        src={booking.user.avatar[0]?.url || assets.sample_profile}
                                                        alt={booking.user.fullName}
                                                        width={40}
                                                        height={40}
                                                        className="object-cover h-10 rounded-full"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-mono font-bold text-indigo-600">
                                                        {booking.id.slice(0, 15)}
                                                    </p>
                                                    <h4 className="font-bold text-slate-900 dark:text-white">
                                                        {booking.customerInfo[0].fullName}
                                                    </h4>
                                                </div>
                                            </div>
                                            <StatusBadge status={booking.status.name} />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 dark:border-slate-800">
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                                    Phương tiện
                                                </p>
                                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    <Bike size={14} className="text-slate-400" />
                                                    {booking.motorbike.name}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                                    Biển số
                                                </p>
                                                <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                                    {booking.motorbike.licensePlateNum}
                                                </span>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                                    Thời gian thuê
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <Calendar size={14} className="text-slate-400" />
                                                    {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-1">
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <MapPin size={12} /> {booking.pickupPoint}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <MapPinned size={12} /> {booking.returnPoint}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
