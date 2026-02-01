'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Delete, DeleteIcon, EyeIcon, EyeOffIcon, Loader2, TicketPercent } from 'lucide-react';

import { CouponType } from '@/types/coupon';

interface MobileListProps {
    coupons: CouponType[];
    onPublic: (couponId: string, isPublic: boolean) => void;
    onDelete: (couponId: string) => void;
    isAllSelected: boolean;
    toggleSelectAll: () => void;
    selectedIds: string[];
    toggleSelect: (id: string) => void;
    confirmDeleteSelected: () => void;
    isPending: boolean;
}

export default function MobileList({
    coupons,
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
                                    <Delete size={18} />
                                    Xóa {selectedIds.length} phiếu đã chọn
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* cards */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {coupons.map((coupon) => (
                        <motion.div
                            key={coupon.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`relative p-4 rounded-2xl border transition-all ${
                                selectedIds.includes(coupon.id)
                                    ? 'bg-primary/10 border-primary'
                                    : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800'
                            }`}
                        >
                            {/* checkbox */}
                            <div className="absolute top-4 right-4">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded-full accent-indigo-600"
                                    checked={selectedIds.includes(coupon.id)}
                                    onChange={() => toggleSelect(coupon.id)}
                                />
                            </div>
                            <div className="flex justify-between items-start" onClick={() => toggleSelect(coupon.id)}>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                                        <TicketPercent size={22} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-indigo-600">{coupon.code}</p>
                                        {coupon.forNewUser && (
                                            <h4 className="font-bold text-slate-900 dark:text-white">
                                                Cho khách hàng mới
                                            </h4>
                                        )}
                                        {coupon.forMember && (
                                            <h4 className="font-bold text-slate-900 dark:text-white">
                                                Cho khách hàng thân thiết
                                            </h4>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                                        Số phần trăm giảm
                                    </p>
                                    <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                        {coupon.discount}%
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Mô tả</p>
                                    <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                        {coupon.description}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {coupon.isPublic ? (
                                    <button
                                        onClick={() => onPublic(coupon.id, false)}
                                        className="py-2 w-full flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg"
                                    >
                                        <EyeOffIcon size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onPublic(coupon.id, true)}
                                        className="py-2 w-full flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg"
                                    >
                                        <EyeIcon size={18} />
                                    </button>
                                )}
                                <button
                                    onClick={() => onDelete(coupon.id)}
                                    className="py-2 w-full flex justify-center bg-red-100 text-red-500 dark:bg-red-900/30 rounded-lg"
                                >
                                    <DeleteIcon size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
