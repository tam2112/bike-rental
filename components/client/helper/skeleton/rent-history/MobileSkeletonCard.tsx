export default function MobileSkeletonCard() {
    return (
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <div className="flex justify-between items-center mb-3">
                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
            </div>
            <div className="flex gap-4">
                <div className="size-20 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse shrink-0" />
                <div className="flex-1 space-y-3 py-1">
                    <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    <div className="flex justify-between items-center pt-1">
                        <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
