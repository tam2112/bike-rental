import Skeleton from '../Skeleton';

export default function AvatarCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-6 flex flex-col items-center">
            <div className="relative mb-4">
                <Skeleton className="h-32 w-32 rounded-full" />
            </div>
            <Skeleton className="h-6 w-48 mb-2" /> {/* Name */}
            <Skeleton className="h-4 w-32 mb-4" /> {/* Email */}
            <Skeleton className="h-6 w-20 rounded-full" /> {/* Role badge */}
        </div>
    );
}
