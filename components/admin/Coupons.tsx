'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Delete, Loader2 } from 'lucide-react';

import { useCouponLogic } from '@/hooks/useCouponLogic';
import { adminPath } from '@/constants/path';

import PageHeader from './helper/PageHeader';
import Pagination from './helper/Pagination';
import { AddCouponForm, MobileList, Table } from './helper/coupons';
import { LoadingSkeleton } from './helper/skeleton';

export default function Coupons() {
    const { state, actions } = useCouponLogic();

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <PageHeader breadcrumbs={[{ href: adminPath, label: 'Tổng quan' }]} current="Quản lý phiếu giảm giá" />

            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-400 mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Quản lý phiếu giảm giá
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                <span className="hidden sm:inline">Hiện có</span>{' '}
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                                    {state.rawTotal}
                                </span>{' '}
                                phiếu giảm giá trong hệ thống.
                            </p>
                        </div>
                        {/* NÚT XÓA HÀNG LOẠT TRÊN DESKTOP */}
                        <AnimatePresence>
                            {state.selectedIds.length > 0 && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    onClick={actions.confirmDeleteSelected}
                                    disabled={state.isPending}
                                    className={`flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg transition-all text-sm font-bold max-lg:hidden disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                    {state.isPending ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Đang thực hiện xóa...
                                        </>
                                    ) : (
                                        <>
                                            <Delete size={18} />
                                            Xóa {state.selectedIds.length} phiếu đã chọn
                                        </>
                                    )}
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* add coupon form */}
                    <AddCouponForm fetchCoupons={actions.fetchCoupons} />
                    {/* list coupon */}
                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {state.isPending ? (
                                <LoadingSkeleton key={'loading'} />
                            ) : (
                                <motion.div
                                    key={state.currentPage}
                                    variants={state.pageVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    {/* Mobile View */}
                                    <MobileList
                                        coupons={state.paginatedCoupons}
                                        onPublic={actions.confirmPublic}
                                        onDelete={actions.confirmDelete}
                                        isAllSelected={state.isAllSelected}
                                        toggleSelectAll={actions.toggleSelectAll}
                                        selectedIds={state.selectedIds}
                                        toggleSelect={actions.toggleSelect}
                                        confirmDeleteSelected={actions.confirmDeleteSelected}
                                        isPending={state.isPending}
                                    />
                                    {/* Desktop View */}
                                    <Table
                                        coupons={state.paginatedCoupons}
                                        onPublic={actions.confirmPublic}
                                        onDelete={actions.confirmDelete}
                                        isAllSelected={state.isAllSelected}
                                        toggleSelectAll={actions.toggleSelectAll}
                                        selectedIds={state.selectedIds}
                                        toggleSelect={actions.toggleSelect}
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
                        name="phiếu giảm giá"
                    />
                </div>
            </div>
        </div>
    );
}
