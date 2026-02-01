import Link from 'next/link';
import Image from 'next/image';
import { formatIDCard, formatPhoneNumberRegex } from '@/lib/utils';

import { Eye } from 'lucide-react';

import { assets } from '@/public/assets';
import { customerPath } from '@/constants/path';

import { UserType } from '@/types/customer';

import StatusBadge from '../StatusBadge';

interface TableProps {
    users: UserType[];
}

export default function Table({ users }: TableProps) {
    return (
        <div className="hidden lg:block bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Hình ảnh</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Họ tên & Email</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Số điện thoại</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">CCCD/CMND</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Trạng thái</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-center">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {users.map((cus) => (
                            <tr
                                key={cus.id}
                                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="h-12 w-16 shrink-0">
                                        <div className="h-12 w-16 rounded-full">
                                            <Image
                                                src={cus.avatar[0]?.url || assets.sample_profile}
                                                alt="img"
                                                width={50}
                                                height={50}
                                                className="rounded-full h-12 object-cover"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col text-sm">
                                            <span className="font-bold text-slate-900 dark:text-white">
                                                {cus.fullName}
                                            </span>
                                            <span className="text-xs text-slate-500">{cus.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col text-sm w-fit">
                                        <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                            {cus.phone ? formatPhoneNumberRegex(cus.phone) : '-----------'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                    {cus.idCard ? formatIDCard(cus.idCard) : '------------'}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={cus.status?.name || ''} />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <Link
                                            href={`${customerPath}/chi-tiet/${cus.id}`}
                                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                                        >
                                            <Eye size={18} />
                                        </Link>
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
