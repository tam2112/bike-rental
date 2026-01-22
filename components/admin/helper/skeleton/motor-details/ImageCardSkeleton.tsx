export default function ImageCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4 overflow-hidden">
            <div className="relative w-full aspect-video bg-slate-200 dark:bg-slate-700 rounded animate-pulse">
                {/* Badge simulation */}
                <div className="absolute bottom-4 right-4 bg-slate-300 dark:bg-slate-600 w-20 h-8 rounded-lg" />
            </div>
        </div>
    );
}
