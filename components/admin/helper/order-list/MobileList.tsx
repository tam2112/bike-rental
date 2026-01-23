import Link from 'next/link';
import Image from 'next/image';
import { formatDateCalendar10Days } from '@/lib/utils';

import { Ban, Calendar, Eye, Motorbike } from 'lucide-react';

import { orderPath } from '@/constants/path';
import { assets } from '@/public/assets';

import { BookingStatusType, BookingType } from '@/types/booking';
import { StatusType } from '@/types/status';

import StatusDropdown from './StatusDropdown';

interface MobileListProps {
    bookings: BookingType[];
    statuses: StatusType[] | null;
    onUpdateStatus: (id: string, statusId: BookingStatusType, name: string) => void;
    onCancel: (id: string) => void;
}

export default function MobileList({ bookings, statuses, onUpdateStatus, onCancel }: MobileListProps) {
    return (
        <div className="lg:hidden space-y-4">
            {bookings.map((booking) => (
                <div
                    key={booking.id}
                    className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                                <Image
                                    src={booking.user.avatar[0]?.url || assets.sample_profile}
                                    alt={booking.customerInfo[0].fullName}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover h-10"
                                />
                            </div>
                            <div>
                                <p className="text-xs font-mono font-bold text-indigo-600">{booking.id.slice(0, 15)}</p>
                                <h4 className="font-bold text-slate-900 dark:text-white max-sm:max-w-30 max-sm:line-clamp-1">
                                    {booking.customerInfo[0].fullName}
                                </h4>
                            </div>
                        </div>
                        <StatusDropdown
                            currentStatus={booking.status.name}
                            statuses={statuses}
                            onUpdate={(statusId, statusName) => onUpdateStatus(booking.id, statusId, statusName)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Phương tiện</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                <Motorbike size={14} className="text-slate-400" />
                                {booking.motorbike.name}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Biển số</p>
                            <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                {booking.motorbike.licensePlateNum}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Thời gian thuê</p>
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                <Calendar size={14} className="text-slate-400" />
                                {formatDateCalendar10Days(booking.pickupDate)} -{' '}
                                {formatDateCalendar10Days(booking.returnDate)}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            href={`${orderPath}/chi-tiet/${booking.id}`}
                            className="py-2 flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg"
                        >
                            <Eye size={18} />
                        </Link>
                        <button
                            disabled={booking.status.name === 'Đã hủy' || booking.status.name === 'Hoàn thành'}
                            onClick={() => onCancel(booking.id)}
                            className="py-2 flex justify-center bg-red-100 text-red-500 dark:bg-red-900/30 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Ban size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
