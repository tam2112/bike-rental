'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { ChevronDown, Clock10, RotateCcw, SearchX } from 'lucide-react';

import { useMotorStore } from '@/store/motor';

import Pagination from './helper/Pagination';
import { ActiveFilters, FilterList, MotorbikeCard } from './helper/motorbike-list';
import { SkeletonCard } from './helper/skeleton';

export default function MotorbikeList() {
    const { filteredMotors, filters, isLoading, setFilter, fetchMotors, resetFilters } = useMotorStore();

    const [currentPage, setCurrentPage] = useState(1);
    const listTopRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentPage(1);
    }, [filters]);

    useEffect(() => {
        if (listTopRef.current) {
            listTopRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [currentPage]);

    const itemsPerPage = 6;
    const searchParams = useSearchParams();

    // Tính toán phân trang
    const totalPages = Math.ceil((filteredMotors?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredMotors?.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const model = searchParams.get('model');
        const pickup = searchParams.get('pickupDate');
        const returnDt = searchParams.get('returnDate');

        // Cập nhật các filter từ URL vào store
        if (model) setFilter('models', [model]); // Nếu Hero chọn 1 model cụ thể
        setFilter('pickupDate', pickup);
        setFilter('returnDate', returnDt);

        // Sau khi set xong thì chạy apply
        fetchMotors();
    }, [searchParams, fetchMotors, setFilter]);

    return (
        <div className="min-h-screen">
            {/* heading */}
            <div className="bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
                <div className="px-4 lg:px-10 py-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-neutral-dark dark:text-white">
                                Danh sách xe máy có sẵn
                            </h1>
                            <p className="text-secondary dark:text-gray-400 text-base lg:text-lg">
                                Khám phá Phú Yên với các dòng xe chất lượng, giá tốt.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-800">
                            <span className="material-symbols-outlined">
                                <Clock10 />
                            </span>
                            <div>
                                <span className="block text-xs text-secondary dark:text-gray-400 font-medium">
                                    Giờ hoạt động
                                </span>
                                <span className="font-bold text-sm">7:00 AM - 22:00 PM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* list */}
            <div ref={listTopRef} className="flex-1 mx-auto w-full px-4 lg:px-10 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <FilterList />
                    <div className="w-full lg:w-3/4 flex flex-col gap-6">
                        {/* sort */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-light dark:bg-slate-850 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <p className="text-text-main dark:text-white text-sm font-medium">
                                Hiển thị <span className="font-bold">{isLoading ? '...' : currentData?.length}</span>{' '}
                                trên <span className="font-bold">{filteredMotors?.length || 0}</span> kết quả
                            </p>
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-text-secondary dark:text-gray-400 whitespace-nowrap">
                                    Sắp xếp theo:
                                </label>
                                <div className="relative">
                                    <select
                                        value={filters.sort}
                                        onChange={(e) => setFilter('sort', e.target.value)}
                                        className="h-9 pl-3 pr-8 rounded-lg bg-gray-100 dark:bg-gray-800 border border-slate-200 dark:border-slate-700 focus:ring-1 focus:ring-primary text-sm font-medium text-text-main dark:text-white cursor-pointer"
                                    >
                                        <option>Mới nhất</option>
                                        <option>Cũ nhất</option>
                                        <option>Giá: Thấp đến Cao</option>
                                        <option>Giá: Cao đến Thấp</option>
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <ChevronDown size={18} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* badge */}
                        <ActiveFilters />
                        {/* motorbike cards */}
                        <div className="relative min-h-150">
                            {' '}
                            {/* Giữ chiều cao cố định để tránh nhảy layout */}
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div
                                        key="skeleton-grid"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                    >
                                        {[...Array(itemsPerPage)].map((_, i) => (
                                            <SkeletonCard key={i} />
                                        ))}
                                    </motion.div>
                                ) : filteredMotors && filteredMotors.length > 0 ? (
                                    <motion.div
                                        key={currentPage}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                    >
                                        {currentData &&
                                            currentData.map((bike) => <MotorbikeCard key={bike.id} bike={bike} />)}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800"
                                    >
                                        <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                                            <SearchX size={40} className="text-gray-400 dark:text-slate-500" />
                                        </div>

                                        <h3 className="text-xl font-bold text-neutral-dark dark:text-white mb-2">
                                            Không tìm thấy xe phù hợp
                                        </h3>

                                        <p className="text-secondary dark:text-gray-400 max-w-md mb-8">
                                            Rất tiếc, chúng tôi không tìm thấy chiếc xe nào khớp với bộ lọc của bạn. Hãy
                                            thử thay đổi từ khóa hoặc mở rộng khoảng giá nhé!
                                        </p>

                                        <button
                                            onClick={resetFilters}
                                            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                                        >
                                            <RotateCcw size={18} />
                                            Xóa tất cả bộ lọc
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {/* pagination */}
                        {!isLoading && filteredMotors && filteredMotors.length > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
