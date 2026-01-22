'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { adminPath } from '@/constants/path';
import { useRatingLogic } from '@/hooks/useRatingLogic';

import PageHeader from './helper/PageHeader';
import Pagination from './helper/Pagination';
import { Filters, MobileList, Table } from './helper/rating-list';
import { LoadingSkeleton } from './helper/skeleton';

export default function RatingList() {
    const { state, actions } = useRatingLogic();

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <PageHeader breadcrumbs={[{ href: adminPath, label: 'Tổng quan' }]} current="Quản lý đánh giá xe" />

            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-400 mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Quản lý đánh giá xe
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                <span className="hidden sm:inline">Hiện có</span>{' '}
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                                    {state.rawTotal}
                                </span>{' '}
                                đánh giá trong hệ thống.
                            </p>
                        </div>
                        {/* <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all active:scale-95">
                            <Plus size={18} />
                            <span>Tạo đánh giá</span>
                        </button> */}
                    </div>

                    {/* Filter */}
                    <Filters state={state} actions={actions} />

                    {/* Content Section */}
                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {state.isPending ? (
                                <LoadingSkeleton key={'loading'} />
                            ) : (
                                <motion.div
                                    key={state.currentPage + state.sortBy + state.searchTerm}
                                    variants={state.pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    {/* Mobile View */}
                                    <MobileList
                                        ratings={state.paginatedRatings}
                                        onPublic={actions.confirmPublic}
                                        onDelete={actions.confirmDelete}
                                    />
                                    {/* Desktop View */}
                                    <Table
                                        ratings={state.paginatedRatings}
                                        onPublic={actions.confirmPublic}
                                        onDelete={actions.confirmDelete}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* Pagination */}
                    <Pagination
                        currentPage={state.currentPage}
                        totalPages={state.totalPages}
                        totalCount={state.totalCount}
                        itemsOnPage={5}
                        actions={actions}
                        name="đánh giá"
                    />
                </div>
            </div>
        </div>
    );
}
