import Skeleton from '../Skeleton';

export default function CustomerCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-4 py-2">
                <Skeleton className="size-14 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                ))}
            </div>
        </div>
    );
}
