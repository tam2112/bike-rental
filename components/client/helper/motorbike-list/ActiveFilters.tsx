'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { thousandSeparator } from '@/lib/utils';

import { X } from 'lucide-react';

import { useMotorStore } from '@/store/motor';

export default function ActiveFilters() {
    const { filters, setFilter, resetFilters } = useMotorStore();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Hàm helper để xóa params khỏi URL
    const removeParamsFromURL = (keysToRemove: string[]) => {
        const params = new URLSearchParams(searchParams.toString());
        keysToRemove.forEach((key) => params.delete(key));

        // Cập nhật URL mà không reload trang
        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        router.replace(newUrl, { scroll: false });
    };

    const handleResetAll = () => {
        resetFilters();
        router.replace(pathname, { scroll: false });
    };

    // Kiểm tra xem có bộ lọc nào đang hoạt động không
    const hasFilters =
        filters.search !== '' ||
        filters.models.length > 0 ||
        filters.brands.length > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < 1000000 ||
        filters.pickupDate !== null;

    if (!hasFilters) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm font-medium text-secondary dark:text-gray-400 mr-1">Bộ lọc:</span>

            {/* Badge cho Ngày nhận/trả - Xử lý URL */}
            {filters.pickupDate && (
                <FilterBadge
                    label="Theo ngày đã chọn"
                    onRemove={() => {
                        setFilter('pickupDate', null);
                        setFilter('returnDate', null);
                        // Xóa pickupDate và returnDate trên thanh địa chỉ
                        removeParamsFromURL(['pickupDate', 'returnDate']);
                    }}
                />
            )}

            {/* Badge cho Từ khóa tìm kiếm */}
            {filters.search && (
                <FilterBadge label={`Từ khóa: ${filters.search}`} onRemove={() => setFilter('search', '')} />
            )}

            {/* Badge cho Loại xe */}
            {filters.models.map((model) => (
                <FilterBadge
                    key={model}
                    label={model}
                    onRemove={() => {
                        const next = filters.models.filter((m) => m !== model);
                        setFilter('models', next);
                        removeParamsFromURL(['model']); // Xóa param 'model' nếu chỉ chọn 1 cái từ Hero
                    }}
                />
            ))}

            {/* Badge cho Hãng xe */}
            {filters.brands.map((brand) => (
                <FilterBadge
                    key={brand}
                    label={brand}
                    onRemove={() => {
                        const next = filters.brands.filter((b) => b !== brand);
                        setFilter('brands', next);
                    }}
                />
            ))}

            {/* Badge cho Khoảng giá */}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000) && (
                <FilterBadge
                    label={`${thousandSeparator(filters.priceRange[0])} - ${thousandSeparator(filters.priceRange[1])}đ`}
                    onRemove={() => setFilter('priceRange', [0, 1000000])}
                />
            )}

            {/* Nút xóa tất cả */}
            <button onClick={handleResetAll} className="text-sm text-red-500 hover:underline font-bold ml-2">
                Xóa tất cả
            </button>
        </div>
    );
}

// Component con cho từng nhãn
function FilterBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-bold border border-primary/20">
            {label}
            <button onClick={onRemove} className="hover:bg-primary/20 rounded-full p-0.5 transition-colors">
                <X size={14} />
            </button>
        </div>
    );
}
