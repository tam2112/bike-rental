'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Slider from '@radix-ui/react-slider';
import { thousandSeparator } from '@/lib/utils';

import { Filter, RotateCcw, Search, X } from 'lucide-react';

import { brands, models } from '@/constants/motorbike';
import { useMotorStore } from '@/store/motor';

export default function FilterList() {
    const { filters, setFilter, resetFilters, applyFilters } = useMotorStore();

    // 1. State nội bộ cho ô search
    const [searchTerm, setSearchTerm] = useState(filters.search);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // 2. Logic Debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setFilter('search', searchTerm);
        }, 500); // Chờ 500ms sau khi ngừng gõ

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, setFilter]);

    useEffect(() => {
        applyFilters();
    }, [filters.search, filters.priceRange, applyFilters]);

    // Variants cho hiệu ứng Stagger (xuất hiện lần lượt)
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    const filterContent = () => (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6">
            {/* Search */}
            <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-slate-850 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800"
            >
                <label className="block mb-2 text-sm font-bold dark:text-white">Tìm kiếm</label>
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        className="w-full h-10 pl-10 pr-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                        placeholder="Tên xe..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </motion.div>

            {/* Price Slider */}
            <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-slate-850 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800"
            >
                <label className="block text-sm font-bold mb-4 dark:text-white">
                    Giá: {thousandSeparator(filters.priceRange[0])} - {thousandSeparator(filters.priceRange[1])}
                </label>
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={filters.priceRange}
                    max={1000000}
                    step={50000}
                    onValueChange={(v) => setFilter('priceRange', v as [number, number])}
                >
                    <Slider.Track className="bg-slate-100 dark:bg-slate-700 relative grow rounded-full h-1.5">
                        <Slider.Range className="absolute bg-primary rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-6 h-6 bg-white border-[3px] border-primary shadow-md rounded-full focus:outline-none hover:scale-110 active:scale-90 transition-transform cursor-pointer" />
                    <Slider.Thumb className="block w-6 h-6 bg-white border-[3px] border-primary shadow-md rounded-full focus:outline-none hover:scale-110 active:scale-90 transition-transform cursor-pointer" />
                </Slider.Root>
            </motion.div>

            {/* Checkboxes */}
            {[
                { label: 'Hãng xe', data: brands, type: 'brands' as const },
                { label: 'Loại xe', data: models, type: 'models' as const },
            ].map((section) => (
                <motion.div
                    key={section.label}
                    variants={itemVariants}
                    className="bg-white dark:bg-slate-850 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800"
                >
                    <label className="block mb-3 text-sm font-bold dark:text-white">{section.label}</label>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                        {section.data.map((item) => (
                            <motion.label
                                key={item}
                                whileTap={{ scale: 0.95 }} // Hiệu ứng nhấn vào checkbox
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer accent-primary"
                                    checked={filters[section.type].includes(item)}
                                    onChange={() => {
                                        const current = filters[section.type];
                                        const next = current.includes(item)
                                            ? current.filter((i) => i !== item)
                                            : [...current, item];
                                        setFilter(section.type, next);
                                    }}
                                />
                                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
                                    {item}
                                </span>
                            </motion.label>
                        ))}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );

    return (
        <>
            {/* 1. MOBILE TRIGGER BUTTON */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileOpen(true)}
                    className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30"
                >
                    <Filter size={24} />
                </motion.button>
            </div>

            {/* MOBILE DRAWER */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 z-50 w-full bg-slate-50 dark:bg-slate-900 shadow-2xl lg:hidden flex flex-col"
                        >
                            <div className="p-4 flex justify-between items-center bg-white dark:bg-slate-850 border-b border-slate-300 dark:border-slate-800">
                                <h2 className="font-bold text-lg dark:text-white">Bộ lọc tìm kiếm</h2>
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                >
                                    <X size={24} className="dark:text-white" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">{filterContent()}</div>

                            <div className="p-4 bg-white dark:bg-slate-850 border-t border-slate-300 dark:border-slate-800 grid grid-cols-2 gap-4">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={resetFilters}
                                    className="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-slate-600 dark:text-slate-300"
                                >
                                    <RotateCcw size={16} /> Đặt lại
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="h-12 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20"
                                >
                                    Áp dụng
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:flex w-1/4 flex-col gap-6 sticky top-24">
                {filterContent()}
                <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                >
                    <RotateCcw size={14} /> Xóa tất cả bộ lọc
                </button>
            </aside>
        </>
    );
}
