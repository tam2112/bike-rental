'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { formatDateFromNow } from '@/lib/utils';

import { CalendarDays, Edit } from 'lucide-react';

import { adminPath, motorPath } from '@/constants/path';
import { useMotorStore } from '@/store/motor';

import { RecentRent } from './home';
import StatusBadge from './helper/StatusBadge';
import PageHeader from './helper/PageHeader';
import { BasicInfoCard, ImageCard, PriceCard, TechnicalCard } from './helper/motor-details';
import { MotorDetailsSkeleton } from './helper/skeleton';

export default function MotorDetails({ id }: { id: string }) {
    const { motor, motorBookings, fetchMotor, fetchMotorBookings, isLoading } = useMotorStore();

    useEffect(() => {
        fetchMotorBookings(id);
        fetchMotor(id);
    }, [fetchMotorBookings, fetchMotor, id]);

    if (isLoading || !motor) {
        return <MotorDetailsSkeleton />;
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <PageHeader
                breadcrumbs={[
                    { href: adminPath, label: 'Tổng quan' },
                    { href: motorPath, label: 'Kho xe' },
                ]}
                current={`Chi tiết xe`}
            />
            {/* content */}
            <div id="motor-details-container" className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="mx-auto w-full flex flex-col gap-6">
                    {/* heading */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                    {motor.name}
                                </h1>
                                <StatusBadge status={motor.status.name} />
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                <span className="material-symbols-outlined text-[18px]">
                                    <CalendarDays size={18} />
                                </span>
                                <p>Được tạo ra {formatDateFromNow(motor.createdAt)}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 items-center">
                            <Link
                                href={`${motorPath}/cap-nhat/${motor.id}`}
                                className="flex items-center justify-center h-10 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-semibold gap-2 transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    <Edit size={20} />
                                </span>
                                <span>Chỉnh sửa</span>
                            </Link>
                        </div>
                    </div>
                    {/* cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <ImageCard images={motor.images} />
                        </div>
                        <div className="lg:col-span-1 flex flex-col gap-6">
                            <PriceCard price={motor.pricePerDay} />
                            <BasicInfoCard
                                licensePlateNum={motor.licensePlateNum}
                                brand={motor.brand}
                                model={motor.model}
                                situation={motor.situation}
                                maintenanceAt={motor.maintenanceAt}
                            />
                        </div>
                    </div>
                    <TechnicalCard
                        color={motor.color}
                        engineCapacity={motor.engineCapacity}
                        fuelType={motor.fuelType}
                        consume={motor.consume}
                        fuelCapacity={motor.fuelCapacity}
                        weight={motor.weight}
                        odoNum={motor.odoNum}
                        seat={motor.seat}
                    />
                    {/* recent rent */}
                    <div id="motor-bookings">
                        <RecentRent bookings={motorBookings} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
}
