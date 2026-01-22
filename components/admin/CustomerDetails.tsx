'use client';

import { useEffect } from 'react';

import { useUserStore } from '@/store/user';
import { useBookingStore } from '@/store/booking';

import { adminPath, customerPath } from '@/constants/path';

import { RecentRent } from './home';
import PageHeader from './helper/PageHeader';
import { AvatarCard, PersonalInfoCard, StatsCard } from './helper/cus-details';
import { CustomerDetailsSkeleton } from './helper/skeleton';

export default function CustomerDetails({ id }: { id: string }) {
    const { userById, fetchUserById, isLoading: isUserLoading } = useUserStore();
    const {
        userSpending,
        userBookingCount,
        userBookings,
        fetchUserSpending,
        fetchUserBookingCount,
        fetchUserBookings,
        isLoading: isBookingLoading,
    } = useBookingStore();

    useEffect(() => {
        fetchUserById(id);
        fetchUserSpending(id);
        fetchUserBookingCount(id);
        fetchUserBookings(id);
    }, [fetchUserById, fetchUserSpending, fetchUserBookingCount, fetchUserBookings, id]);

    if (!userById || isUserLoading) {
        return <CustomerDetailsSkeleton />;
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <PageHeader
                breadcrumbs={[
                    { href: adminPath, label: 'Tổng quan' },
                    { href: customerPath, label: 'Quản lý khách hàng' },
                ]}
                current={`Chi tiết khách hàng`}
            />
            {/* content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="mx-auto w-full flex flex-col gap-6">
                    {/* heading */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                    Chi tiết hồ sơ
                                </h1>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                <p>Thông tin khách hàng và lịch sử thuê xe</p>
                            </div>
                        </div>
                    </div>
                    {/* cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
                            <AvatarCard
                                avatar={userById.avatar}
                                fullName={userById.fullName}
                                email={userById.email}
                                isActive={userById.isActive}
                                status={userById.status?.name}
                                role={userById.role.name}
                            />
                            <StatsCard spending={userSpending} trip={userBookingCount} createdAt={userById.createdAt} />
                        </div>
                        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                            <PersonalInfoCard
                                fullName={userById.fullName}
                                email={userById.email}
                                phone={userById.phone}
                                idCard={userById.idCard}
                                location={userById.location}
                            />
                            <RecentRent bookings={userBookings} isLoading={isBookingLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
