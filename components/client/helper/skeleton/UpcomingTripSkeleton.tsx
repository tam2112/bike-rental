export default function UpcomingTripSkeleton() {
    return (
        <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-neutral-light dark:border-slate-700 overflow-hidden flex flex-col md:flex-row animate-pulse">
            {/* Image Section Skeleton */}
            <div className="w-full md:w-64 h-48 md:h-auto bg-slate-200 dark:bg-slate-700 shrink-0 relative">
                <div className="absolute top-3 left-3 w-20 h-6 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
            </div>

            {/* Content Section Skeleton */}
            <div className="p-6 flex flex-col flex-1 justify-between sm:mt-0 mt-4">
                {/* Header: Title & Price */}
                <div className="flex flex-row justify-between items-start gap-4 mb-6">
                    <div className="space-y-2">
                        <div className="h-6 w-40 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="h-6 w-28 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                </div>

                {/* Form Inputs Grid Skeleton */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                            <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        </div>
                    ))}
                </div>

                {/* Actions Footer Skeleton */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="h-9 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                    <div className="h-9 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}
