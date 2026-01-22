export default function SidebarHeaderSkeleton() {
    return (
        <div className="flex items-center gap-4 mb-8 animate-pulse">
            {/* Avatar Skeleton */}
            <div className="shrink-0 rounded-full size-12 bg-slate-200 dark:bg-slate-700" />

            {/* Text Info Skeleton */}
            <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-3 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
        </div>
    );
}
