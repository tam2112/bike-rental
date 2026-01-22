'use client';

import { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { currency, thousandSeparator } from '@/lib/utils';

import { Filter, Search } from 'lucide-react';

import { brands, models } from '@/constants/motorbike';
import { useMotorStore } from '@/store/motor';

export default function FilterList() {
    const { filters, setFilter, resetFilters, applyFilters } = useMotorStore();

    const handleCheckboxChange = (type: 'models' | 'brands', value: string) => {
        const current = filters[type];
        const next = current.includes(value) ? current.filter((i) => i !== value) : [...current, value];
        setFilter(type, next);
    };

    // 1. State nội bộ cho ô search
    const [searchTerm, setSearchTerm] = useState(filters.search);

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

    return (
        <aside className="w-full lg:w-1/4 flex flex-col gap-6">
            <button className="lg:hidden flex items-center justify-between w-full bg-white dark:bg-slate-850 p-4 rounded-lg border border-gray-200 dark:border-gray-700 font-bold text-neutral-dark">
                <span className="text-neutral-dark dark:text-white">Bộ lọc tìm kiếm</span>
                <span className="material-symbols-outlined text-neutral-dark dark:text-white">
                    <Filter size={22} />
                </span>
            </button>
            <div className="hidden lg:flex flex-col gap-6 sticky top-24">
                <div className="bg-white dark:bg-slate-850 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                    <label className="block mb-2 text-sm font-bold text-neutral-dark dark:text-white">Tìm kiếm</label>
                    <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-secondary">
                            <Search size={18} />
                        </span>
                        <input
                            className="w-full h-10 pl-10 pr-3 rounded-lg bg-gray-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary text-sm placeholder:text-secondary dark:text-white"
                            placeholder="Tìm tên xe..."
                            value={searchTerm} // Dùng state nội bộ
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-850 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-bold text-neutral-dark dark:text-white">
                            Khoảng giá {thousandSeparator(filters.priceRange[0])} -{' '}
                            {thousandSeparator(filters.priceRange[1])}
                        </label>
                    </div>
                    <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-5"
                        value={filters.priceRange}
                        max={1000000}
                        min={0}
                        step={50000}
                        onValueChange={(value) => setFilter('priceRange', value as [number, number])}
                    >
                        <Slider.Track className="bg-slate-200 dark:bg-slate-700 relative grow rounded-full h-1">
                            <Slider.Range className="absolute bg-primary rounded-full h-full" />
                        </Slider.Track>

                        {/* Nút kéo Min */}
                        <Slider.Thumb
                            className="block w-5 h-5 bg-white border-2 border-primary shadow-lg rounded-[10px] hover:scale-110 focus:outline-none transition-transform cursor-grab active:cursor-grabbing"
                            aria-label="Min Price"
                        />
                        {/* Nút kéo Max */}
                        <Slider.Thumb
                            className="block w-5 h-5 bg-white border-2 border-primary shadow-lg rounded-[10px] hover:scale-110 focus:outline-none transition-transform cursor-grab active:cursor-grabbing"
                            aria-label="Max Price"
                        />
                    </Slider.Root>

                    <div className="flex justify-between mt-2 text-xs text-secondary font-medium">
                        <span>
                            {thousandSeparator(0)}
                            {currency}
                        </span>
                        <span>
                            {thousandSeparator(1000000)}
                            {currency}
                        </span>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-850 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                    <label className="block mb-3 text-sm font-bold text-neutral-dark dark:text-white">Loại xe</label>
                    <div className="space-y-2">
                        {models.map((model) => (
                            <label key={model} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="w-4 h-4 rounded accent-primary border-slate-200 text-primary focus:ring-primary dark:bg-slate-800/50 dark:border-slate-600"
                                    type="checkbox"
                                    checked={filters.models.includes(model)}
                                    onChange={() => handleCheckboxChange('models', model)}
                                />
                                <span className="select-none text-sm text-neutral-dark dark:text-slate-300 group-hover:text-primary transition-colors">
                                    {model}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-850 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
                    <label className="block mb-3 text-sm font-bold text-neutral-dark dark:text-white">Hãng xe</label>
                    <div className="space-y-2">
                        {brands.map((brand) => (
                            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="w-4 h-4 rounded accent-primary border-slate-200 text-primary focus:ring-primary dark:bg-slate-800/50 dark:border-slate-600"
                                    type="checkbox"
                                    checked={filters.brands.includes(brand)}
                                    onChange={() => handleCheckboxChange('brands', brand)}
                                />
                                <span className="select-none text-sm text-neutral-dark dark:text-slate-300 group-hover:text-primary transition-colors">
                                    {brand}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <button onClick={resetFilters} className="text-xs text-primary underline">
                Xóa bộ lọc
            </button>
        </aside>
    );
}
