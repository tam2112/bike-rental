export default function TableSkeletonRow() {
    return (
        <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-4 px-6">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse shrink-0" />
                    <div className="space-y-2">
                        <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                        <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                    </div>
                </div>
            </td>
            <td className="py-4 px-6">
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </td>
            <td className="py-4 px-6">
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </td>
            <td className="py-4 px-6">
                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
            </td>
            <td className="py-4 px-6">
                <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse ml-auto" />
            </td>
        </tr>
    );
}
