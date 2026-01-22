'use client';

import Image from 'next/image';
import { calculateAverageRating, currency, thousandSeparator } from '@/lib/utils';

import { ArrowLeft, Loader, Lock, Star, User2 } from 'lucide-react';

import { assets } from '@/public/assets';

import { MotorType } from '@/types/motor';
import { CouponType } from '@/types/coupon';

type SummaryProps = {
    motorbike: MotorType;
    days: number;
    rentalPrice: number;
    services: (
        | {
              name: string;
              price: number;
              free: boolean;
          }
        | {
              name: string;
              price: number;
              free?: undefined;
          }
        | null
    )[];
    deliveryFee: number;
    appliedCoupon: CouponType | undefined;
    discountPrice: number;
    totalPrice: number;
    isPending: boolean;
};

export default function Summary({
    motorbike,
    days,
    rentalPrice,
    services,
    deliveryFee,
    appliedCoupon,
    discountPrice,
    totalPrice,
    isPending,
}: SummaryProps) {
    return (
        <div className="w-full lg:w-95 shrink-0">
            <div className="lg:sticky lg:top-24 flex flex-col gap-6">
                <div className="bg-white dark:bg-slate-850 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center p-4">
                        <Image
                            alt="Xe máy Honda Vision"
                            className="relative z-10 w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal rounded-lg"
                            data-alt="Red Honda Vision scooter side profile on clean background"
                            src={motorbike.images[0].url || assets.xe_may_2}
                            width={200}
                            height={200}
                        />
                        <span className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 text-xs font-bold px-2 py-1 rounded text-neutral-dark dark:text-white backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                            {motorbike.model}
                        </span>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-neutral-dark dark:text-white">
                                    {motorbike.name}
                                </h3>
                                <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                                    <span className="material-symbols-outlined text-sm">
                                        <Star size={14} className="fill-current" />
                                    </span>
                                    <span className="font-bold">{calculateAverageRating(motorbike)?.toFixed(1)}</span>
                                    <span className="text-slate-400 font-normal">
                                        ({motorbike.ratings.length} đánh giá)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 py-4 border-t border-slate-100 dark:border-slate-700">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Đơn giá ({days} ngày)</span>
                                <span className="text-neutral-dark dark:text-white font-medium">
                                    {thousandSeparator(rentalPrice)}
                                    {currency}
                                </span>
                            </div>
                            {services.map(
                                (s) =>
                                    s && (
                                        <div key={s.name} className="flex justify-between text-sm">
                                            <span>{s.name}</span>
                                            <span className={s.free ? 'text-green-500' : ''}>
                                                {s.free ? 'Miễn phí' : `${thousandSeparator(s.price)}${currency}`}
                                            </span>
                                        </div>
                                    ),
                            )}
                            {deliveryFee > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span>Phí giao xe</span>
                                    <span>
                                        {thousandSeparator(deliveryFee)}
                                        {currency}
                                    </span>
                                </div>
                            )}
                            {appliedCoupon && (
                                <div className="flex justify-between text-sm text-red-500">
                                    <span>Giảm giá ({appliedCoupon.discount}%)</span>
                                    <span>
                                        -{thousandSeparator(discountPrice)}
                                        {currency}
                                    </span>
                                </div>
                            )}
                            {/* <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Thời gian</span>
                                <span className="text-neutral-dark dark:text-white font-medium">3 ngày</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Phí giao xe</span>
                                <span className="text-neutral-dark dark:text-white font-medium">
                                    {thousandSeparator(deliveryFee)}
                                    {currency}
                                </span>
                            </div> */}
                            {/* <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Mũ bảo hiểm x2</span>
                                <span className="text-accent dark:text-green-500 font-medium">Miễn phí</span>
                            </div> */}
                        </div>
                        <div className="flex flex-col gap-1 py-4 border-t border-slate-100 dark:border-slate-700">
                            <div className="flex justify-between items-end">
                                <span className="text-neutral-dark dark:text-white font-bold text-lg">Tổng cộng</span>
                                <span className="text-primary font-black text-2xl tracking-tight">
                                    {thousandSeparator(totalPrice)}
                                    {currency}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 text-right">Đã bao gồm thuế GTGT</p>
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            <span>{isPending ? 'Đang xử lý...' : 'Hoàn tất đặt xe'}</span>
                            <span className="material-symbols-outlined text-lg">
                                {isPending ? <Loader size={18} className="animate-spin" /> : <ArrowLeft size={18} />}
                            </span>
                        </button>
                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-sm">
                                <Lock size={14} />
                            </span>
                            <span>Bảo mật 100% &amp; Không phí ẩn</span>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-50/50 dark:bg-slate-850 rounded-lg p-4 border border-blue-100 dark:border-slate-700 flex items-start gap-3">
                    <div className="bg-white dark:bg-slate-700 p-2 rounded-full text-primary shrink-0 shadow-sm">
                        <span className="material-symbols-outlined">
                            <User2 size={22} />
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-neutral-dark dark:text-white">Cần hỗ trợ đặt xe?</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Gọi ngay cho chúng tôi để được tư vấn miễn phí 24/7.
                        </p>
                        <a className="text-primary text-sm font-bold mt-1 inline-block hover:underline" href="#">
                            1900 123 456
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
