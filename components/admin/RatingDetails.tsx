'use client';

import { useEffect } from 'react';
import { formatDateCalendar } from '@/lib/utils';

import { CalendarDays } from 'lucide-react';

import { useRatingStore } from '@/store/rating';
import { adminPath, ratingPath } from '@/constants/path';

import StatusBadge from './helper/StatusBadge';
import PageHeader from './helper/PageHeader';
import { CustomerCard, FeedbackCard, MotorbikeCard, ReviewCard } from './helper/rating-details';
import { RatingDetailsSkeleton } from './helper/skeleton';

export default function RatingDetails({ id }: { id: string }) {
    const { rating, fetchRating, isLoading } = useRatingStore();

    useEffect(() => {
        fetchRating(id);
    }, [fetchRating, id]);

    if (isLoading || !rating) {
        return <RatingDetailsSkeleton />;
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <PageHeader
                breadcrumbs={[
                    { href: adminPath, label: 'Tổng quan' },
                    { href: ratingPath, label: 'Quản lý đánh giá xe' },
                ]}
                current={`Chi tiết đánh giá`}
            />
            {/* content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="mx-auto w-full flex flex-col gap-6">
                    {/* heading */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                    Chi tiết đánh giá
                                </h1>
                                <StatusBadge status={rating.status.name} />
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                <span className="material-symbols-outlined text-[18px]">
                                    <CalendarDays size={18} />
                                </span>
                                <p>Được tạo {formatDateCalendar(rating.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                    {/* cards */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-6">
                            <CustomerCard rating={rating} />
                            <MotorbikeCard rating={rating} />
                        </div>
                        <div className="xl:col-span-2 flex flex-col gap-6">
                            <ReviewCard rating={rating} />
                            <FeedbackCard key={rating.id} rating={rating} fetchRating={fetchRating} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
