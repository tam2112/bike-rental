import { PaginationHooksType } from '@/types/common';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    itemsOnPage: number;
    actions: PaginationHooksType;
    name: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    totalCount,
    itemsOnPage,
    actions,
    name,
}: PaginationProps) {
    // Tính toán khoảng hiển thị (Ví dụ: 1 - 5 / 8)
    const from = totalCount === 0 ? 0 : (currentPage - 1) * itemsOnPage + 1;
    const to = Math.min(currentPage * itemsOnPage, totalCount);

    // Logic để ẩn bớt số trang
    const getPaginationRange = () => {
        const delta = 1; // Số trang hiển thị bên cạnh trang hiện tại (Trái 1, Phải 1)
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // Luôn hiện trang đầu
                i === totalPages || // Luôn hiện trang cuối
                (i >= currentPage - delta && i <= currentPage + delta) // Hiện xung quanh trang hiện tại
            ) {
                range.push(i);
            }
        }

        for (const i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const paginationRange = getPaginationRange();

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-sm text-slate-500">
                Hiển thị{' '}
                <span className="font-bold text-slate-900 dark:text-white">
                    {from} - {to}
                </span>{' '}
                / {totalCount} {name}
            </p>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => actions.triggerLoading(() => actions.setCurrentPage((p) => Math.max(1, p - 1)))}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50"
                >
                    <ChevronLeft size={18} />
                </button>
                {paginationRange.map((page, index) => {
                    if (page === '...') {
                        return (
                            <div
                                key={`dots-${index}`}
                                className="w-10 h-10 flex items-center justify-center text-slate-400"
                            >
                                <MoreHorizontal size={18} />
                            </div>
                        );
                    }

                    return (
                        <button
                            key={`page-${page}`}
                            onClick={() => actions.triggerLoading(() => actions.setCurrentPage(Number(page)))}
                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                                currentPage === page
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}
                <button
                    onClick={() =>
                        actions.triggerLoading(() => actions.setCurrentPage((p) => Math.min(totalPages, p + 1)))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}
