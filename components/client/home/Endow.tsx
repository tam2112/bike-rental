'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';

import { Loader2 } from 'lucide-react';

import { usePopup } from '@/hooks/usePopup';
import { newbieCoupon } from '@/constants/coupon';
import { assets } from '@/public/assets';
import { useRouter } from 'next/navigation';

export default function Endow() {
    const popup = usePopup();

    const [isClaiming, setIsClaiming] = useState(false);

    const router = useRouter();

    const handleClaim = useCallback(async () => {
        if (isClaiming) return;

        setIsClaiming(true);

        try {
            await navigator.clipboard.writeText(newbieCoupon);
            popup.success(`Mã giảm giá: ${newbieCoupon} đã được sao chép!`);
        } catch (error) {
            console.error('Không thể sao chép mã giảm giá:', error);
            popup.error('Không thể sao chép mã giảm giá. Vui lòng thử lại!');
        }

        setTimeout(() => {
            setIsClaiming(false);
        }, 1500);
    }, [isClaiming, popup]);

    const buttonContent = isClaiming ? (
        <span className="flex items-center space-x-2">
            <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            <Loader2 size={20} className="animate-spin" />
        </span>
    ) : (
        'Nhận mã ngay'
    );

    return (
        <section className="w-full flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-neutral-dark dark:text-white tracking-tight">
                Ưu đãi dành riêng cho Phú Yên
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative rounded-2xl overflow-hidden min-h-55 flex items-center p-8 shadow-md group hover:shadow-lg transition-all">
                    <Image
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Abstract colorful light streaks on dark background"
                        src={assets.bolide}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent"></div>
                    <div className="relative z-10 text-white max-w-sm">
                        <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block shadow-sm">
                            MÙA DU LỊCH
                        </span>
                        <h3 className="text-2xl font-bold mb-2">Giảm 10% khi check-in</h3>
                        <p className="text-sm text-slate-200 mb-6 font-medium">
                            Check-in tại cửa hàng hoặc các điểm du lịch Phú Yên cùng xe của Aitho.
                        </p>
                        <button
                            onClick={handleClaim}
                            disabled={isClaiming}
                            className="bg-white text-neutral-dark hover:bg-neutral-light text-sm font-bold py-2 px-5 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {buttonContent}
                        </button>
                    </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden min-h-55 flex items-center p-8 shadow-md group hover:shadow-lg transition-all">
                    <Image
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        alt="Motorbike on a mountain road with mountains in background"
                        src={assets.bg_bike}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-primary/90 to-primary/40"></div>
                    <div className="relative z-10 text-white max-w-sm">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block border border-white/20">
                            COMBO
                        </span>
                        <h3 className="text-2xl font-bold mb-2">Thuê 3 ngày tặng Xăng</h3>
                        <p className="text-sm text-slate-100 mb-6 font-medium">
                            Tặng ngay 1 lít xăng và 2 áo mưa tiện lợi khi thuê xe từ 3 ngày trở lên.
                        </p>
                        <button
                            onClick={() => router.push('/xe-may')}
                            className="bg-white text-primary hover:bg-neutral-light text-sm font-bold py-2 px-5 rounded-lg transition-colors"
                        >
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
