import Skeleton from '../Skeleton';

export default function ReviewCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-5 w-40" />
            </div>
            <div className="space-y-2 py-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}
