export default function SkeletonRow() {
    return (
        <tr className="animate-pulse border-b border-slate-100 dark:border-slate-700 last:border-0">
            <td className="py-4 px-6">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                    <div className="size-10 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                </div>
            </td>
            <td className="py-4 px-6">
                <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </td>
            <td className="py-4 px-6">
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </td>
            <td className="py-4 px-6">
                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            </td>
            <td className="py-4 px-6 text-right">
                <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded ml-auto"></div>
            </td>
        </tr>
    );
}
