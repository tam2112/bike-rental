'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatDateTimeLocal } from '@/lib/utils';

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

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const [pickupDatetime, setPickupDatetime] = useState(formatDateTimeLocal(now));
    const [returnDatetime, setReturnDatetime] = useState(formatDateTimeLocal(tomorrow));

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
                            <div className="flex flex-wrap gap-2 px-4">
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
