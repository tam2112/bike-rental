import Link from 'next/link';
import Image from 'next/image';

import { CheckCircle, Eye, EyeOff, Star, Trash2 } from 'lucide-react';

import { assets } from '@/public/assets';
import { ratingPath } from '@/constants/path';

import { RatingType } from '@/types/rating';

import StatusBadge from '../StatusBadge';

interface TableProps {
    ratings: RatingType[];
    onPublic: (ratingId: string, isPublic: boolean) => void;
    onDelete: (id: string) => void;
}

export default function Table({ ratings, onPublic, onDelete }: TableProps) {
    return (
        <div className="hidden lg:block bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="overflow-visible">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="p-4 w-10">
                                <input type="checkbox" className="rounded text-indigo-600 accent-indigo-600" />
                            </th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Khách hàng</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Xe thuê</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Đánh giá</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Nội dung</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Trạng thái</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-center">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {ratings &&
                            ratings.map((rating) => (
                                <tr
                                    key={rating.id}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                                >
                                    <td className="p-4">
                                        <input type="checkbox" className="rounded accent-indigo-600" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <Image
                                                    src={rating.user.avatar[0]?.url || assets.sample_profile}
                                                    alt={rating.user.fullName}
                                                    width={32}
                                                    height={32}
                                                    className="rounded-full object-cover h-8"
                                                />
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {rating.user.fullName}
                                                </span>
                                                <span className="text-xs text-slate-500 underline">
                                                    {rating.user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-sm">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                                {rating.motorbike.name}
                                            </span>
                                            <span className="text-[11px] font-bold text-slate-400 tracking-wider">
                                                {rating.motorbike.licensePlateNum}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                        <div className="flex items-center">
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    className={`shrink-0 size-4 fill-current ${rating.rating > i ? 'text-green-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="line-clamp-1 max-w-42 text-slate-700 dark:text-slate-300 text-sm">
                                            {rating.review}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={rating.status.name} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                href={`${ratingPath}/chi-tiet/${rating.id}`}
                                                className="p-2 text-slate-400 hover:text-indigo-600"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            {rating.status.name === 'Hiển thị' ? (
                                                <button
                                                    onClick={() => onPublic(rating.id, false)}
                                                    className="p-2 text-slate-400 hover:text-amber-500"
                                                >
                                                    <EyeOff size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => onPublic(rating.id, true)}
                                                    className="p-2 text-slate-400 hover:text-green-500"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onDelete(rating.id)}
                                                className="p-2 text-slate-400 hover:text-red-500"
                                            >
                                                <Trash2 size={18} />
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
