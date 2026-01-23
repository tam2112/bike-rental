import Skeleton from '../Skeleton';
import CustomerCardSkeleton from './CustomerCardSkeleton';
import MotorbikeCardSkeleton from './MotorbikeCardSkeleton';
import ReviewCardSkeleton from './ReviewCardSkeleton';

export default function RatingDetailsSkeleton() {
    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            {/* Header Skeleton */}
            <div className="p-4 lg:p-8 pb-0">
                <Skeleton className="h-6 w-48 mb-4" />
            </div>
            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="mx-auto w-full flex flex-col gap-6">
                    {/* Heading Skeleton */}
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-10 w-64" />
                        <Skeleton className="h-4 w-48" />
                    </div>

                    {/* Cards Skeleton Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-6">
                            <CustomerCardSkeleton />
                            <MotorbikeCardSkeleton />
                        </div>
                        <div className="xl:col-span-2 flex flex-col gap-6">
                            <ReviewCardSkeleton />
                            {/* Skeleton cho FeedbackCard (giả lập form) */}
                            <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
                                <Skeleton className="h-6 w-48" />
                                <Skeleton className="h-32 w-full" />
                                <div className="flex justify-between items-center pt-4 border-t border-slate-300 dark:border-slate-700">
                                    <Skeleton className="h-8 w-40" />
                                    <Skeleton className="h-11 w-32 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
