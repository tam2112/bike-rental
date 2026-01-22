import Skeleton from '../Skeleton';

export default function PersonalInfoCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-6 w-40" /> {/* Title */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-3 w-24" /> {/* Label */}
                        <Skeleton className="h-5 w-full max-w-50" /> {/* Value */}
                    </div>
                ))}
                <div className="space-y-2 md:col-span-2">
                    <Skeleton className="h-3 w-32" /> {/* Address Label */}
                    <Skeleton className="h-5 w-full" /> {/* Address Value */}
                </div>
            </div>
        </div>
    );
}
