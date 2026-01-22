import Skeleton from '../Skeleton';

export default function OrderStatusCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <Skeleton className="h-7 w-48 mb-6" />
            <div className="relative pl-2 space-y-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-4 relative">
                        {/* Timeline line */}
                        {i !== 4 && (
                            <div className="absolute left-1.25 top-3 h-full w-0.5 bg-slate-200 dark:bg-slate-700" />
                        )}
                        <Skeleton className="size-2.5 rounded-full mt-1.5 shrink-0 z-10" />
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-48" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
