import Skeleton from '../Skeleton';

export default function MotorbikeCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-6 w-24" />
                </div>
            </div>
            <Skeleton className="w-full aspect-4/3 rounded-b-[0.8rem]" />
        </div>
    );
}
