'use client';

import { useEffect } from 'react';
import { formatDateCalendar } from '@/lib/utils';

import { CalendarDays } from 'lucide-react';

import { adminPath, orderPath } from '@/constants/path';
import { useBookingStore } from '@/store/booking';

import PageHeader from './helper/PageHeader';
import StatusBadge from './helper/StatusBadge';
import { OrderDetailsSkeleton } from './helper/skeleton';
import { CustomerCard, ExpenseCard, MotorInfoCard, OrderStatusCard, RentScheduleCard } from './helper/order-details';

export default function OrderDetails({ id }: { id: string }) {
    const { booking, fetchBooking, isLoading } = useBookingStore();

    useEffect(() => {
        fetchBooking(id);
    }, [fetchBooking, id]);

    if (isLoading || !booking) {
        return <OrderDetailsSkeleton />;
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <PageHeader
                breadcrumbs={[
                    { href: adminPath, label: 'Tổng quan' },
                    { href: orderPath, label: 'Quản lý đặt xe' },
                ]}
                current={`Chi tiết đơn hàng ${id.slice(0, 15)}`}
            />
            {/* content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="mx-auto w-full flex flex-col gap-6">
                    {/* heading */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                    Đơn hàng {id.slice(0, 15)}
                                </h1>
                                <StatusBadge status={booking.status.name} />
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                <span className="material-symbols-outlined text-[18px]">
                                    <CalendarDays size={18} />
                                </span>
                                <p>Được tạo {formatDateCalendar(booking.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                    {/* cards */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <CustomerCard booking={booking} />
                                <RentScheduleCard booking={booking} />
                            </div>
                            <MotorInfoCard booking={booking} />
                        </div>
                        <div className="flex flex-col gap-6">
                            <ExpenseCard booking={booking} />
                            <OrderStatusCard booking={booking} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
