export default function NotificationSkeleton() {
    return (
        <div className="animate-pulse flex gap-4 px-6 py-5 border-b border-gray-50 dark:border-gray-700/50">
            <div className="size-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1 space-y-3">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
            </div>
            <div className="w-20 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        </div>
    );
}
