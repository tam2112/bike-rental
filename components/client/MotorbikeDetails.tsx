'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { formatDateTimeLocal, thousandSeparator } from '@/lib/utils';

import { useMotorStore } from '@/store/motor';

import { BookingInfo, LeftSide, RightSide } from './helper/motorbike-details';
import { MotorbikeDetailsSkeleton } from './helper/skeleton';

interface MotorbikeDetailsProps {
    slug: string;
}

export default function MotorbikeDetails({ slug }: MotorbikeDetailsProps) {
    const { motorBySlug: motor, fetchMotorBySlug, isLoading } = useMotorStore();

    useEffect(() => {
        fetchMotorBySlug(slug);
    }, [fetchMotorBySlug, slug]);

    const [step, setStep] = useState(1);
    const [isFooterVisible, setIsFooterVisible] = useState(true);
    const rightSideRef = useRef<HTMLDivElement>(null);

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const [pickupDatetime, setPickupDatetime] = useState(formatDateTimeLocal(now));
    const [returnDatetime, setReturnDatetime] = useState(formatDateTimeLocal(tomorrow));

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Console log để debug:
                console.log('Đang giao nhau:', entry.isIntersecting);

                // Khi vùng này hiện ra (> 0% diện tích), ẩn footer đi
                setIsFooterVisible(!entry.isIntersecting);
            },
            {
                threshold: 0,
                // Thu hẹp vùng quan sát để nhạy hơn trên mobile
                rootMargin: '0px 0px -50px 0px',
            },
        );

        // 3. Sử dụng ref.current thay vì getElementById
        const currentTarget = rightSideRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [step, motor]);

    if (isLoading) {
        return (
            <div className="min-h-screen">
                <MotorbikeDetailsSkeleton />
            </div>
        );
    }

    if (!motor) return <div className="min-h-screen flex justify-center items-center">Motorbike not found</div>;

    return (
        <div className="min-h-screen">
            {/* Step 1: Chọn xe */}
            {step === 1 && (
                <div className="container flex h-full grow flex-col">
                    <div className="flex flex-1 justify-center py-5 px-4 md:px-10 lg:px-20">
                        <div className="flex flex-col max-w-400 flex-1 gap-6">
                            {/* breadcrumb */}
                            <div className="hidden md:flex flex-wrap gap-2 px-4">
                                <Link
                                    className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary"
                                    href="/"
                                >
                                    Trang chủ
                                </Link>
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">/</span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary">
                                    {motor.model}
                                </span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">/</span>
                                <span className="text-neutral-dark dark:text-slate-100 text-sm font-medium">
                                    {motor.name}
                                </span>
                            </div>
                            {/* content */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 pt-0">
                                <LeftSide motorbike={motor} />
                                <div ref={rightSideRef} id="right-side" className="lg:col-span-1">
                                    <RightSide
                                        motorbike={motor}
                                        setStep={setStep}
                                        pickupDatetime={pickupDatetime}
                                        setPickupDatetime={setPickupDatetime}
                                        returnDatetime={returnDatetime}
                                        setReturnDatetime={setReturnDatetime}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky Mobile Footer */}
            {step === 1 && (
                <div
                    className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-50 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ${
                        isFooterVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
                    }`}
                >
                    <div>
                        <p className="text-xs text-slate-500 font-medium">Tổng cộng</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-primary">
                                {thousandSeparator(motor.pricePerDay)}đ
                            </span>
                            <span className="text-xs text-slate-400">/ngày</span>
                        </div>
                    </div>
                    <ScrollLink
                        to="right-side"
                        offset={-100}
                        smooth
                        spy
                        className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                    >
                        Đặt ngay
                    </ScrollLink>
                </div>
            )}

            {/* Step 2: Thông tin chi tiết đặt xe */}
            {step === 2 && (
                <BookingInfo
                    step={step}
                    setStep={setStep}
                    motorbike={motor}
                    pickupDatetime={pickupDatetime}
                    setPickupDatetime={setPickupDatetime}
                    returnDatetime={returnDatetime}
                    setReturnDatetime={setReturnDatetime}
                />
            )}
        </div>
    );
}
