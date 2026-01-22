import Link from 'next/link';
import Image from 'next/image';
import { formatIDCard, formatPhoneNumberRegex } from '@/lib/utils';

import { User } from 'lucide-react';

import { customerPath } from '@/constants/path';
import { assets } from '@/public/assets';

import { BookingType } from '@/types/booking';

export default function CustomerCard({ booking }: { booking: BookingType }) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <User size={22} />
                    </span>
                    Khách hàng
                </h3>
                <Link
                    href={`${customerPath}/chi-tiet/${booking.user.id}`}
                    className="text-primary hover:text-blue-600 text-sm font-medium"
                >
                    Chi tiết
                </Link>
            </div>
            <div className="flex items-center gap-4 py-2">
                <div className="size-14 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">
                    <Image
                        src={booking.user.avatar[0]?.url || assets.sample_profile}
                        alt="profile"
                        width={56}
                        height={56}
                        className="rounded-full h-14 object-cover"
                    />
                </div>
                <div>
                    <p className="font-bold text-slate-900 dark:text-white text-base">
                        {booking.customerInfo[0].fullName}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm capitalize">{booking.user.role.name}</p>
                </div>
            </div>
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400 text-sm">Số điện thoại</span>
                    <Link
                        className="text-slate-900 dark:text-slate-200 font-medium text-sm hover:text-primary"
                        href="tel:0909123456"
                    >
                        {formatPhoneNumberRegex(booking.customerInfo[0].phone)}
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400 text-sm">Email</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium text-sm truncate max-w-45">
                        {booking.customerInfo[0].email}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400 text-sm">CMND/CCCD</span>
                    <span className="text-slate-900 dark:text-slate-200 font-medium text-sm">
                        {formatIDCard(booking.customerInfo[0].idCard)}
                    </span>
                </div>
            </div>
        </div>
    );
}
