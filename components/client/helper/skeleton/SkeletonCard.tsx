export default function SkeletonCard() {
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-pulse">
            <div className="h-48 w-full bg-slate-200 dark:bg-slate-700" />
            <div className="p-4 flex flex-col gap-3">
                <div className="space-y-2">
                    <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="flex gap-4 py-2 border-y border-gray-100 dark:border-gray-700">
                    <div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="flex justify-between items-center mt-1">
                    <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-9 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                </div>
            </div>
        </div>
    );
}
