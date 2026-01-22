import Skeleton from '../Skeleton';

export default function PriceCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
            <Skeleton className="h-4 w-24 mb-3" />
            <div className="flex items-baseline gap-2 mb-6">
                <Skeleton className="h-9 w-40" />
                <Skeleton className="h-5 w-12" />
            </div>
            <Skeleton className="h-10 w-full rounded-lg" />
        </div>
    );
}
