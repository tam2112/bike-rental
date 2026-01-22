import { DeleteIcon, EyeIcon, EyeOffIcon, TicketPercent } from 'lucide-react';

import { CouponType } from '@/types/coupon';

interface MobileListProps {
    coupons: CouponType[];
    onPublic: (couponId: string, isPublic: boolean) => void;
    onDelete: (couponId: string) => void;
}

export default function MobileList({ coupons, onPublic, onDelete }: MobileListProps) {
    return (
        <div className="lg:hidden space-y-4">
            {coupons.map((coupon) => (
                <div
                    key={coupon.id}
                    className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
                                <TicketPercent size={22} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-indigo-600">{coupon.code}</p>
                                {coupon.forNewUser && (
                                    <h4 className="font-bold text-slate-900 dark:text-white">Cho khách hàng mới</h4>
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
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Số phần trăm giảm</p>
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
                </div>
            ))}
        </div>
    );
}
