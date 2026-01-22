import Skeleton from '../Skeleton';

export default function ExpenseCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <Skeleton className="h-7 w-32 mb-6" />
            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                ))}
                <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
                <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-6 w-32" />
                </div>
            </div>
        </div>
    );
}
