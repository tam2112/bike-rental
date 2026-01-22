import Link from 'next/link';
import Image from 'next/image';

import { CheckCircle, Eye, EyeOff, Motorbike, Star, Trash2 } from 'lucide-react';

import { ratingPath } from '@/constants/path';
import { assets } from '@/public/assets';

import { RatingType } from '@/types/rating';

import StatusBadge from '../StatusBadge';

interface MobileListProps {
    ratings: RatingType[];
    onPublic: (ratingId: string, isPublic: boolean) => void;
    onDelete: (id: string) => void;
}

export default function MobileList({ ratings, onPublic, onDelete }: MobileListProps) {
    return (
        <div className="lg:hidden space-y-4">
            {ratings.map((rating) => (
                <div
                    key={rating.id}
                    className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                                <Image
                                    src={rating.user.avatar[0]?.url || assets.sample_profile}
                                    alt={rating.user.fullName}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover h-10"
                                />
                            </div>
                            <div>
                                <p className="text-xs font-mono font-bold text-indigo-600">{rating.user.email}</p>
                                <h4 className="font-bold text-slate-900 dark:text-white">{rating.user.fullName}</h4>
                            </div>
                        </div>
                        <StatusBadge status={rating.status.name} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Phương tiện</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                <Motorbike size={14} className="text-slate-400" />
                                {rating.motorbike.name}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Số sao</p>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            className={`shrink-0 size-4 fill-current ${rating.rating > i ? 'text-green-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs">({rating.rating})</p>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Nội dung</p>
                            <p className="text-slate-700 dark:text-slate-300 text-sm line-clamp-1">
                                {rating.review || '-'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <Link
                            href={`${ratingPath}/chi-tiet/${rating.id}`}
                            className="py-2 flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg"
                        >
                            <Eye size={18} />
                        </Link>
                        {rating.status.name === 'Hiển thị' ? (
                            <button
                                onClick={() => onPublic(rating.id, false)}
                                className="py-2 flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg"
                            >
                                <EyeOff size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={() => onPublic(rating.id, true)}
                                className="py-2 flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg"
                            >
                                <CheckCircle size={18} />
                            </button>
                        )}
                        <button
                            onClick={() => onDelete(rating.id)}
                            className="py-2 flex justify-center bg-red-100 text-red-500 dark:bg-red-900/30 rounded-lg"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
