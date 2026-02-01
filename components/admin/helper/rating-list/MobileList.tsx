'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { CheckCircle, Eye, EyeOff, Loader2, Motorbike, Star, Trash2 } from 'lucide-react';

import { ratingPath } from '@/constants/path';
import { assets } from '@/public/assets';

import { RatingType } from '@/types/rating';

import StatusBadge from '../StatusBadge';

interface MobileListProps {
    ratings: RatingType[];
    onPublic: (ratingId: string, isPublic: boolean) => void;
    onDelete: (id: string) => void;
    isAllSelected: boolean;
    toggleSelectAll: () => void;
    selectedIds: string[];
    toggleSelect: (id: string) => void;
    confirmDeleteSelected: () => void;
    isPending: boolean;
}

export default function MobileList({
    ratings,
    onPublic,
    onDelete,
    isAllSelected,
    toggleSelectAll,
    selectedIds,
    toggleSelect,
    confirmDeleteSelected,
    isPending,
}: MobileListProps) {
    return (
        <div className="lg:hidden space-y-4">
            {/* Thanh chọn tất cả trên Mobile */}
            <div
                onClick={!isPending ? toggleSelectAll : undefined}
                className={`flex items-center justify-between bg-white dark:bg-slate-850 p-3 rounded-xl border border-dashed border-slate-300 ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isAllSelected}
                        readOnly
                        className="rounded accent-indigo-600 w-4 h-4"
                    />
                    <span className="text-sm font-medium">Chọn tất cả</span>
                </div>
                <span className="text-xs text-slate-500">Đã chọn: {selectedIds.length}</span>
            </div>
            {/* NÚT XÓA HÀNG LOẠT TRÊN MOBILE */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 0 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden" // Quan trọng: để ẩn nội dung khi đang trượt
                    >
                        <button
                            onClick={confirmDeleteSelected}
                            disabled={isPending}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-all text-sm font-bold mb-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Đang thực hiện xóa...
                                </>
                            ) : (
                                <>
                                    <Trash2 size={18} />
                                    Xóa {selectedIds.length} đánh giá đã chọn
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* cards */}
            <AnimatePresence mode="popLayout">
                {ratings.map((rating) => (
                    <motion.div
                        key={rating.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`relative p-4 rounded-2xl border transition-all ${
                            selectedIds.includes(rating.id)
                                ? 'bg-primary/10 border-primary'
                                : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800'
                        }`}
                    >
                        {/* checkbox */}
                        <div className="absolute top-6.5 right-4">
                            <input
                                type="checkbox"
                                className="h-5 w-5 rounded-full accent-indigo-600"
                                checked={selectedIds.includes(rating.id)}
                                onChange={() => toggleSelect(rating.id)}
                            />
                        </div>
                        <div
                            className="flex justify-between items-center gap-4"
                            onClick={() => toggleSelect(rating.id)}
                        >
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
                            <div className="mr-8">
                                <StatusBadge status={rating.status.name} />
                            </div>
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
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
