'use client';

import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { currency, thousandSeparator } from '@/lib/utils';

import { Coins, Edit2, Eye, Loader2, XCircle } from 'lucide-react';

import { motorPath } from '@/constants/path';

import { MotorType } from '@/types/motor';

import StatusBadge from '../StatusBadge';

interface MobileListProps {
    motors: MotorType[];
    onDelete: (id: string, name: string) => void;
    isAllSelected: boolean;
    toggleSelectAll: () => void;
    selectedIds: string[];
    toggleSelect: (id: string) => void;
    confirmDeleteSelected: () => void;
    isPending: boolean;
}

export default function MobileList({
    motors,
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
                                    <XCircle size={18} />
                                    Xóa {selectedIds.length} xe đã chọn
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* cards */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {motors.map((motor) => (
                        <motion.div
                            key={motor.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`relative p-4 rounded-2xl border transition-all ${
                                selectedIds.includes(motor.id)
                                    ? 'bg-primary/10 border-primary'
                                    : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800'
                            }`}
                        >
                            {/* checkbox */}
                            <div className="absolute top-5 right-4">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded-full accent-indigo-600"
                                    checked={selectedIds.includes(motor.id)}
                                    onChange={() => toggleSelect(motor.id)}
                                />
                            </div>
                            <div className="flex justify-between items-start" onClick={() => toggleSelect(motor.id)}>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={motor.images[0]?.url || ''}
                                        alt="img"
                                        width={40}
                                        height={40}
                                        className="rounded-full h-10 w-10 object-cover"
                                    />
                                    <div>
                                        <p className="text-xs font-bold text-indigo-600">{motor.model}</p>
                                        <h4 className="font-bold text-slate-900 dark:text-white max-sm:max-w-30 max-sm:line-clamp-1">
                                            {motor.name}
                                        </h4>
                                    </div>
                                </div>
                                <div className="mr-8">
                                    <StatusBadge status={motor.status.name} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Biển số</p>
                                    <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                        {motor.licensePlateNum}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Giá thuê</p>
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <Coins size={14} className="text-slate-400" />
                                        {thousandSeparator(motor.pricePerDay)} {currency}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Link
                                    href={`${motorPath}/chi-tiet/${motor.id}`}
                                    className="py-2 flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg"
                                >
                                    <Eye size={18} />
                                </Link>
                                <Link
                                    href={`${motorPath}/cap-nhat/${motor.id}`}
                                    className="py-2 flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg"
                                >
                                    <Edit2 size={18} />
                                </Link>
                                <button
                                    onClick={() => onDelete(motor.id, motor.name)}
                                    className="py-2 flex justify-center bg-red-100 text-red-500 dark:bg-red-900/30 rounded-lg"
                                >
                                    <XCircle size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
