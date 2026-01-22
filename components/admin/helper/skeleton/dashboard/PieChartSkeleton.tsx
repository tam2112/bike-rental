export default function PieChartSkeleton() {
    return (
        <div className="flex flex-col bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-pulse h-full">
            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-8" />

            {/* Donut Chart Skeleton */}
            <div className="relative h-64 w-full flex items-center justify-center mb-4">
                <div className="h-40 w-40 rounded-full border-16 border-slate-200 dark:border-slate-700" />
            </div>

            {/* Legend Skeleton */}
            <div className="flex flex-col gap-3 mt-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                        </div>
                        <div className="h-4 w-8 bg-slate-200 dark:bg-slate-700 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
