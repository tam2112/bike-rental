import Skeleton from '../Skeleton';

export default function MotorInfoCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-7 w-24 rounded-full" />
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Image placeholder */}
                <Skeleton className="w-full md:w-1/3 aspect-4/3 rounded-lg" />

                {/* Details Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i}>
                            <Skeleton className="h-3 w-20 mb-2" />
                            <Skeleton className="h-5 w-full max-w-35" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
