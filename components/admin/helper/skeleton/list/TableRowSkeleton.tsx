export default function TableRowSkeleton() {
    return (
        <tr className="animate-pulse">
            <td className="p-4 w-10">
                <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded" />
            </td>
            <td className="px-6 py-4">
                <div className="h-12 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            </td>
            <td className="px-6 py-4">
                <div className="space-y-2">
                    <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                    <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded" />
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
            </td>
            <td className="px-6 py-4">
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
            </td>
            <td className="px-6 py-4">
                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </td>
            <td className="px-6 py-4 text-right">
                <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded ml-auto" />
            </td>
        </tr>
    );
}
