import { formatDateFromNow } from '@/lib/utils';

import { DeleteIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

import { CouponType } from '@/types/coupon';

interface TableProps {
    coupons: CouponType[];
    onPublic: (couponId: string, isPublic: boolean) => void;
    onDelete: (couponId: string) => void;
    isAllSelected: boolean;
    toggleSelectAll: () => void;
    selectedIds: string[];
    toggleSelect: (id: string) => void;
}

export default function Table({
    coupons,
    onPublic,
    onDelete,
    isAllSelected,
    toggleSelectAll,
    selectedIds,
    toggleSelect,
}: TableProps) {
    return (
        <div className="hidden lg:block bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="p-4 w-10">
                                <input
                                    type="checkbox"
                                    className="rounded text-indigo-600 accent-indigo-600 h-4 w-4 cursor-pointer"
                                    checked={isAllSelected}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Mã</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Mô tả</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Số % giảm</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Ngày hết hạn</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Cho khách hàng mới</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                                Cho khách hàng thân thiết
                            </th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-center">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {coupons?.map((coupon) => (
                            <tr
                                key={coupon.code}
                                className={`${selectedIds.includes(coupon.id) ? 'bg-primary/10' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'} transition-colors`}
                            >
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        className="rounded accent-indigo-600 h-4 w-4 cursor-pointer"
                                        checked={selectedIds.includes(coupon.id)}
                                        onChange={() => toggleSelect(coupon.id)}
                                    />
                                </td>
                                <td className="px-6 py-4">{coupon.code}</td>
                                <td className="px-6 py-4">{coupon.description}</td>
                                <td className="px-6 py-4">{coupon.discount}%</td>
                                <td className="px-6 py-4">
                                    {coupon.expiredAt ? formatDateFromNow(coupon.expiredAt) : 'Vĩnh viễn'}
                                </td>
                                <td className="px-6 py-4">{coupon.forNewUser ? 'Có' : 'Không'}</td>
                                <td className="px-6 py-4">{coupon.forMember ? 'Có' : 'Không'}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-4">
                                        {coupon.isPublic ? (
                                            <EyeOffIcon
                                                onClick={() => onPublic(coupon.id, false)}
                                                className="text-slate-400 hover:text-orange-500 cursor-pointer"
                                            />
                                        ) : (
                                            <EyeIcon
                                                onClick={() => onPublic(coupon.id, true)}
                                                className="text-slate-400 hover:text-green-500 cursor-pointer"
                                            />
                                        )}
                                        <DeleteIcon
                                            onClick={() => onDelete(coupon.id)}
                                            className="text-slate-400 hover:text-red-500 cursor-pointer"
                                        />
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
