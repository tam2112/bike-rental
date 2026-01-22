export default function LineChartSkeleton() {
    return (
        <div className="lg:col-span-2 flex flex-col bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm animate-pulse">
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                    <div className="h-6 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="h-9 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            </div>
            <div className="flex-1 min-h-62.5 w-full bg-slate-200 dark:bg-slate-700 rounded-lg bg-opacity-50" />
        </div>
    );
}
