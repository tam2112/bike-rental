export default function CardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="space-y-2">
                        <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                    </div>
                </div>
                <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 dark:border-slate-800">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 bg-slate-100 dark:bg-slate-800 rounded" />
                ))}
            </div>
        </div>
    );
}
