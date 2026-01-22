'use client';

import { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { BookingSchema } from '@/lib/validation/booking.form';
import { formatIDCard, formatPhoneNumberRegex } from '@/lib/utils';

import { User } from 'lucide-react';

import { useUserStore } from '@/store/user';

import { PopupPropsType } from '@/types/popup';
import { CouponType } from '@/types/coupon';
import { BookingType } from '@/types/booking';

interface CustomerInfoProps {
    register: UseFormRegister<BookingSchema>;
    errors: FieldErrors<BookingSchema>;
    watch: UseFormWatch<BookingSchema>;
    setValue: UseFormSetValue<BookingSchema>;
    coupons: CouponType[] | null;
    customerBookings: BookingType[] | null;
    popup: PopupPropsType;
}

export default function CustomerInfo({
    register,
    errors,
    setValue,
    coupons,
    customerBookings,
    popup,
}: CustomerInfoProps) {
    const { currentUser, fetchCurrentUser } = useUserStore();

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    const [inputCoupon, setInputCoupon] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<CouponType | null>(null);

    const handleApplyCoupon = () => {
        const code = inputCoupon.trim();
        if (!code) {
            return popup.error('Vui lòng nhập mã giảm giá');
        }

        const found = coupons?.find((c) => c.code === code);
        if (!found) {
            return popup.error('Mã giảm giá không hợp lệ');
        }

        if (found.expiredAt && new Date() > found.expiredAt) {
            return popup.error('Mã giảm giá đã hết hạn');
        }

        if (found.forNewUser && (customerBookings?.length ?? 0) > 0) {
            return popup.error('Mã giảm giá chỉ dành cho khách hàng mới');
        }

        if (customerBookings?.some((b) => b.coupon === code)) {
            return popup.error('Mã giảm giá đã được sử dụng');
        }

        // Thành công → cập nhật form và state
        setValue('coupon', code); // Chỉ lúc này mới set vào form
        setAppliedCoupon(found);
        setInputCoupon(''); // Clear input
        popup.success(`Áp dụng thành công giảm ${found.discount}%`);
    };

    const handleRemoveCoupon = () => {
        setValue('coupon', ''); // Xóa khỏi form
        setAppliedCoupon(null);
        setInputCoupon('');
        popup.success('Đã xoá mã giảm giá');
    };

    useEffect(() => {
        if (currentUser) {
            setValue('fullName', currentUser.fullName);
            setValue('phone', formatPhoneNumberRegex(currentUser.phone || ''));
            setValue('email', currentUser.email);
            setValue('idCard', formatIDCard(currentUser.idCard || ''));
        }
    }, [currentUser, setValue]);

    return (
        <section className="bg-white dark:bg-slate-850 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-neutral-light dark:bg-slate-800/50">
                <h2 className="text-neutral-dark dark:text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <User />
                    </span>
                    2. Thông tin khách hàng
                </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="text-sm font-medium text-neutral-dark dark:text-slate-300">
                        Họ và tên <span className="text-red-500">*</span>
                    </span>
                    <input
                        className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-neutral-dark dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400 text-sm"
                        placeholder="Nhập họ tên đầy đủ"
                        type="text"
                        {...register('fullName')}
                    />
                    {errors.fullName?.message && (
                        <p className="text-xs text-red-400 max-w-75">{errors.fullName?.message.toString()}</p>
                    )}
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-neutral-dark dark:text-slate-300">
                        Số điện thoại <span className="text-red-500">*</span>
                    </span>
                    <input
                        className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-neutral-dark dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400 text-sm"
                        placeholder="09xx xxx xxx"
                        type="tel"
                        {...register('phone', {
                            onChange: (e) => {
                                // Tự động format khi người dùng gõ
                                e.target.value = formatPhoneNumberRegex(e.target.value);
                            },
                        })}
                    />
                    {errors.phone?.message && (
                        <p className="text-xs text-red-400 max-w-75">{errors.phone?.message.toString()}</p>
                    )}
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-neutral-dark dark:text-slate-300">
                        Email <span className="text-red-500">*</span>
                    </span>
                    <input
                        className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-neutral-dark dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400 text-sm"
                        placeholder="example@email.com"
                        type="email"
                        {...register('email')}
                    />
                    {errors.email?.message && (
                        <p className="text-xs text-red-400 max-w-75">{errors.email?.message.toString()}</p>
                    )}
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-neutral-dark dark:text-slate-300">
                        Số CCCD/CMND <span className="text-red-500">*</span>
                    </span>
                    <input
                        className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-neutral-dark dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400 text-sm"
                        placeholder="09xx xxx xxx xxxx"
                        type="text"
                        {...register('idCard', {
                            onChange: (e) => {
                                e.target.value = formatIDCard(e.target.value);
                            },
                        })}
                    />
                    {errors.idCard?.message && (
                        <p className="text-xs text-red-400 max-w-75">{errors.idCard?.message.toString()}</p>
                    )}
                </label>
                <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-neutral-dark dark:text-slate-300">
                        Mã giảm giá (nếu có)
                    </span>
                    <div className="flex items-center gap-2">
                        <input
                            className="flex-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-neutral-dark dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400 text-sm"
                            placeholder="Nhập mã giảm giá"
                            type="text"
                            value={inputCoupon}
                            onChange={(e) => setInputCoupon(e.target.value)}
                            disabled={!!appliedCoupon}
                        />
                        <button
                            type="button"
                            onClick={handleApplyCoupon}
                            disabled={!!appliedCoupon}
                            className="bg-primary hover:bg-primary-dark transition text-white px-4 py-3 w-fit rounded-lg text-sm disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Áp dụng
                        </button>
                    </div>
                    {/* Hiển thị coupon đã áp dụng */}
                    {appliedCoupon && (
                        <div className="mt-2 text-green-600 flex items-center justify-between">
                            <span>
                                Đã áp dụng: {appliedCoupon.code} (giảm {appliedCoupon.discount}%)
                            </span>
                            <button
                                type="button"
                                onClick={handleRemoveCoupon}
                                className="text-red-500 hover:underline text-sm"
                            >
                                Xoá
                            </button>
                        </div>
                    )}
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                    <span className="text-sm font-medium text-neutral-dark dark:text-slate-300">Ghi chú thêm</span>
                    <textarea
                        className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-neutral-dark dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400 text-sm resize-none"
                        placeholder="Yêu cầu đặc biệt về xe..."
                        rows={3}
                        {...register('note')}
                    ></textarea>
                    {errors.note?.message && (
                        <p className="text-xs text-red-400 max-w-75">{errors.note?.message.toString()}</p>
                    )}
                </label>
            </div>
        </section>
    );
}
