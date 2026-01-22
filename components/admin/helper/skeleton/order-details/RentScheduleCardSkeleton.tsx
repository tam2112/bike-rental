import Skeleton from '../Skeleton';

export default function RentScheduleCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <Skeleton className="h-7 w-40 mb-2" />
            <div className="flex flex-col gap-6">
                {/* Pickup */}
                <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                        <Skeleton className="size-3 rounded-full" />
                        <Skeleton className="w-0.5 h-12 mt-1" />
                    </div>
                    <div className="space-y-2 w-full">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
                {/* Return */}
                <div className="flex gap-3">
                    <div className="pt-1">
                        <Skeleton className="size-3 rounded-full" />
                    </div>
                    <div className="space-y-2 w-full">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            </div>
            <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-7 w-20 rounded-md" />
            </div>
        </div>
    );
}
