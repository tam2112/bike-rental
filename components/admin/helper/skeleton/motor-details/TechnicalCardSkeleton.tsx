import Skeleton from '../Skeleton';

export default function TechnicalCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                <Skeleton className="size-10 rounded-lg" />
                <Skeleton className="h-7 w-48" />
            </div>
            {/* Grid matches the real TechnicalCard to avoid layout shift */}
            <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 gap-x-8 gap-y-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                        key={i}
                        className="flex justify-between items-center sm:items-start border-b border-dashed border-slate-200 dark:border-slate-700 pb-2"
                    >
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                ))}
            </div>
        </div>
    );
}
