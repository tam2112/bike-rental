import { ChevronDown, Filter, Search } from 'lucide-react';

import { RatingHooksType } from '@/types/rating';

export default function Filters({ state, actions }: RatingHooksType) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 bg-white dark:bg-slate-850 p-3 lg:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="lg:col-span-5 relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Tìm kiếm theo họ tên, email, tên xe..."
                    type="text"
                    value={state.searchInput}
                    onChange={(e) => {
                        const value = e.target.value;
                        actions.setSearchInput(value);
                        actions.debouncedSearch(value);
                    }}
                />
            </div>
            <div className="lg:col-span-3 relative">
                <select
                    value={state.statusFilter}
                    onChange={(e) => {
                        actions.setStatusFilter(e.target.value);
                        actions.setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none cursor-pointer"
                >
                    <option value={''}>Tất cả trạng thái</option>
                    {state.ratingStatuses &&
                        state.ratingStatuses.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ChevronDown size={14} />
                </span>
            </div>
            <div className="lg:col-span-4 hidden lg:block relative ml-auto">
                <select
                    value={state.sortBy}
                    onChange={(e) => actions.setSortBy(e.target.value)}
                    className="w-52 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none cursor-pointer"
                >
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Filter size={18} />
                </span>
            </div>
        </div>
    );
}
