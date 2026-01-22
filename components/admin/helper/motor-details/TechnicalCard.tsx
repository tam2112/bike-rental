import Image from 'next/image';

import { assets } from '@/public/assets';

interface TechnicalCardProps {
    color: string | null;
    engineCapacity: number;
    fuelType: string;
    consume: string | null;
    fuelCapacity: string | null;
    weight: number;
    odoNum: number;
    seat: number;
}

export default function TechnicalCard({
    color,
    engineCapacity,
    fuelType,
    consume,
    fuelCapacity,
    weight,
    odoNum,
    seat,
}: TechnicalCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-6 border-b border-[#e7edf3] dark:border-[#293038] pb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-primary">
                    <Image src={assets.technicsIcon} alt="technics" width={24} height={24} />
                </div>
                <h3 className="text-lg font-bold text-neutral-dark dark:text-white">Thông số kỹ thuật</h3>
            </div>
            <dl className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 gap-x-8 gap-y-6 text-sm">
                <div className="flex justify-between items-center sm:items-start border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                    <dt className="text-[#4c739a] font-medium">Màu xe</dt>
                    <dd className="text-neutral-dark dark:text-white font-semibold">{color}</dd>
                </div>
                <div className="flex justify-between items-center sm:items-start border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                    <dt className="text-[#4c739a] font-medium">Dung tích động cơ (cc)</dt>
                    <dd className="text-neutral-dark dark:text-white font-semibold">{engineCapacity}</dd>
                </div>
                <div className="flex justify-between items-center sm:items-start border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                    <dt className="text-[#4c739a] font-medium">Loại nhiên liệu</dt>
                    <dd className="text-neutral-dark dark:text-white font-semibold">{fuelType}</dd>
                </div>
                <div className="flex justify-between items-center sm:items-start border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                    <dt className="text-[#4c739a] font-medium">Mức tiêu thụ nhiên liệu</dt>
                    <dd className="text-neutral-dark dark:text-white font-semibold">{consume || '-'}</dd>
                </div>
                <div className="flex justify-between items-center sm:items-start border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                    <dt className="text-[#4c739a] font-medium">Dung tích bình xăng</dt>
                    <dd className="text-neutral-dark dark:text-white font-semibold">{fuelCapacity || '-'}</dd>
                </div>
                <div className="flex justify-between items-center sm:items-start border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                    <dt className="text-[#4c739a] font-medium">Trọng lượng (kg)</dt>
                    <dd className="text-neutral-dark dark:text-white font-semibold">{weight}</dd>
                </div>
                <div className="flex justify-between items-center sm:items-start border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                    <dt className="text-[#4c739a] font-medium">Số km đã đi</dt>
                    <dd className="text-neutral-dark dark:text-white font-semibold">{odoNum}</dd>
                </div>
                <div className="flex justify-between items-center sm:items-start border-b border-dashed border-gray-200 dark:border-gray-700 pb-2">
                    <dt className="text-[#4c739a] font-medium">Chỗ ngồi</dt>
                    <dd className="text-neutral-dark dark:text-white font-semibold">{seat}</dd>
                </div>
            </dl>
        </div>
    );
}
