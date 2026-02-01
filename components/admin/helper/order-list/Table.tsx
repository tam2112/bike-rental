import Image from 'next/image';
import Link from 'next/link';
import { formatDate, formatPhoneNumberRegex } from '@/lib/utils';

import { Ban, Eye } from 'lucide-react';

import { assets } from '@/public/assets';
import { orderPath } from '@/constants/path';

import { BookingStatusType, BookingType } from '@/types/booking';
import { StatusType } from '@/types/status';

import StatusDropdown from './StatusDropdown';

interface TableProps {
    bookings: BookingType[];
    statuses: StatusType[] | null;
    onUpdateStatus: (id: string, statusId: BookingStatusType, name: string) => void;
    onCancel: (id: string) => void;
}

export default function Table({ bookings, statuses, onUpdateStatus, onCancel }: TableProps) {
    return (
        <div className="hidden lg:block bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="overflow-visible">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Mã đơn</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Khách hàng</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Phương tiện</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Lịch trình</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Trạng thái</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-center">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {bookings &&
                            bookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                                >
                                    <td className="px-6 py-4 font-mono font-bold text-indigo-600">
                                        {booking.id.slice(0, 15)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <Image
                                                    src={booking.user.avatar[0]?.url || assets.sample_profile}
                                                    alt={booking.user.fullName}
                                                    width={32}
                                                    height={32}
                                                    className="rounded-full object-cover h-8"
                                                />
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {booking.customerInfo[0].fullName}
                                                </span>
                                                <span className="text-xs text-slate-500 underline">
                                                    {formatPhoneNumberRegex(booking.customerInfo[0].phone)}
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
                                        {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusDropdown
                                            currentStatus={booking.status.name}
                                            statuses={statuses}
                                            onUpdate={(statusId, statusName) =>
                                                onUpdateStatus(booking.id, statusId, statusName)
                                            }
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={`${orderPath}/chi-tiet/${booking.id}`}
                                                className="p-2 text-slate-400 hover:text-indigo-600"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <button
                                                onClick={() => onCancel(booking.id)}
                                                disabled={
                                                    booking.status.name === 'Đã hủy' ||
                                                    booking.status.name === 'Hoàn thành'
                                                }
                                                className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                <Ban size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
