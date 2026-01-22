export default function DashboardCardSkeleton() {
    return (
        <div className="flex flex-col p-5 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
            <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            </div>
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
    );
}
