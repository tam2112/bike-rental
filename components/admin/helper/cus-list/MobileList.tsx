import Image from 'next/image';
import Link from 'next/link';
import { formatIDCard, formatPhoneNumberRegex } from '@/lib/utils';

import { Eye, MapPin, PhoneCall } from 'lucide-react';

import { customerPath } from '@/constants/path';
import { assets } from '@/public/assets';

import { UserType } from '@/types/customer';

import StatusBadge from '../StatusBadge';

interface MobileListProps {
    users: UserType[];
}

export default function MobileList({ users }: MobileListProps) {
    return (
        <div className="lg:hidden space-y-4">
            {users.map((cus) => (
                <div
                    key={cus.id}
                    className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                                <Image
                                    src={cus.avatar[0]?.url || assets.sample_profile}
                                    alt="img"
                                    width={40}
                                    height={40}
                                    className="rounded-full h-10 object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-indigo-600 max-sm:max-w-30 max-sm:line-clamp-1">
                                    {cus.email}
                                </p>
                                <h4 className="font-bold text-slate-900 dark:text-white max-sm:max-w-30 max-sm:line-clamp-1">
                                    {cus.fullName}
                                </h4>
                            </div>
                        </div>
                        <StatusBadge status={cus.status?.name || ''} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">CCCD/CMND</p>
                            <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                {cus.idCard ? formatIDCard(cus.idCard) : '-'}
                            </span>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Số điện thoại</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                <PhoneCall size={14} className="text-slate-400" />
                                {cus.phone ? formatPhoneNumberRegex(cus.phone) : '-'}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={12} /> {cus.location || '-'}
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href={`${customerPath}/chi-tiet/${cus.id}`}
                                className="p-2 text-slate-500 bg-slate-50 dark:bg-slate-800 rounded-lg"
                            >
                                <Eye size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
