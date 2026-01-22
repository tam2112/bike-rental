export default function MobileUserSkeleton() {
    return (
        <div className="flex flex-col gap-3 pt-2 animate-pulse">
            {/* Profile Card Skeleton */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-1">
                <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
            </div>
            {/* Buttons Skeleton */}
            <div className="h-11 w-full bg-slate-200 dark:bg-slate-700 rounded-xl" />
            <div className="h-11 w-full bg-slate-200 dark:bg-slate-700 rounded-xl" />
        </div>
    );
}
