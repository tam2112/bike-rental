'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { currency, thousandSeparator } from '@/lib/utils';

import { Pocket, Settings, Wind } from 'lucide-react';

import { assets } from '@/public/assets';

import { MotorType } from '@/types/motor';

import StatusBadge from '@/components/admin/helper/StatusBadge';

export default function MotorbikeCard({ bike }: { bike: MotorType }) {
    const router = useRouter();

    return (
        <div className="group bg-white dark:bg-slate-850 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                <div className="absolute top-3 right-3 z-10">
                    <StatusBadge status={bike.status.name} />
                </div>
                <div className="w-full h-full flex items-center justify-center">
                    <Image src={bike.images[0].url || assets.xe_may_2} alt="img" width={400} height={400} />
                </div>
            </div>
            <div className="p-4 flex flex-col gap-3">
                <div>
                    <h3 className="text-lg font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">
                        {bike.name}
                    </h3>
                    <p className="text-xs text-secondary dark:text-gray-400">
                        Đời {bike.year} &bull; Màu {bike.color}
                    </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-secondary dark:text-gray-400 border-y border-gray-100 dark:border-gray-700 py-2">
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                            <Pocket size={14} />
                        </span>
                        <span>{bike.brand}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                            <Settings size={14} />
                        </span>
                        <span>{bike.model}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                            <Wind size={14} />
                        </span>
                        <span>{bike.engineCapacity}</span>
                    </div>
                </div>
                <div className="flex items-end justify-between mt-1">
                    <div>
                        <p className="text-primary font-black text-lg">
                            {thousandSeparator(bike.pricePerDay)}
                            {currency}
                            <span className="text-xs font-normal text-secondary dark:text-gray-400">/ ngày</span>
                        </p>
                    </div>
                    <button
                        disabled={bike.status.name === 'Đang thuê'}
                        onClick={() => router.push(`/xe-may/${bike.slug}`)}
                        className="h-9 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg text-sm font-bold transition-all disabled:cursor-not-allowed disabled:bg-neutral-light disabled:text-gray-400"
                    >
                        Chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
}
