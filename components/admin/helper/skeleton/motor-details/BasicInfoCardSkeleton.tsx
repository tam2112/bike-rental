import Skeleton from '../Skeleton';

export default function BasicInfoCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-6 w-32" />
            </div>
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className={`h-5 ${i === 1 ? 'w-20' : 'w-32'}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
