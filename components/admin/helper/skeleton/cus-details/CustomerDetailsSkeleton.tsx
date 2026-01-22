import Skeleton from '../Skeleton';
import AvatarCardSkeleton from './AvatarCardSkeleton';
import PersonalInfoCardSkeleton from './PersonalInfoCardSkeleton';
import StatsCardSkeleton from './StatsCardSkeleton';

export default function CustomerDetailsSkeleton() {
    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            {/* Header Skeleton */}
            <div className="p-4 lg:p-8 pb-0">
                <Skeleton className="h-5 w-48 mb-4" />
                <Skeleton className="h-10 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="mx-auto w-full flex flex-col gap-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
                            <AvatarCardSkeleton />
                            <StatsCardSkeleton />
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                            <PersonalInfoCardSkeleton />
                            <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 h-64">
                                <Skeleton className="h-6 w-40 mb-6" />
                                <div className="space-y-4">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
