import Skeleton from '../Skeleton';

export default function StatsCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
            <Skeleton className="h-4 w-32 mb-4" /> {/* Title */}
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 w-full">
                            <Skeleton className="h-10 w-10 rounded-lg" /> {/* Icon */}
                            <div className="space-y-1 flex-1">
                                <Skeleton className="h-3 w-20" /> {/* Label */}
                                <Skeleton className="h-4 w-28" /> {/* Value */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
