import Image from 'next/image';

import { Motorbike } from 'lucide-react';

import { assets } from '@/public/assets';

import { BookingType } from '@/types/booking';

import StatusBadge from '../StatusBadge';

export default function MotorInfoCard({ booking }: { booking: BookingType }) {
    const { motorbike } = booking;

    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <Motorbike size={22} />
                    </span>
                    Thông tin xe
                </h3>
                <StatusBadge status={motorbike.status.name} />
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3 aspect-4/3 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900 relative border border-slate-100 dark:border-slate-700">
                    <Image
                        src={motorbike.images[0].url || assets.xe_may_2}
                        alt="img"
                        width={400}
                        height={400}
                        className="translate-y-6"
                    />
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                            Loại xe
                        </p>
                        <p className="text-slate-900 dark:text-white text-lg font-bold">{motorbike.name}</p>
                        <p className="text-slate-500 text-sm">{motorbike.model}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                            Biển số
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800/30 px-2 py-1 rounded font-mono font-bold text-base">
                                {motorbike.licensePlateNum}
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                            Màu sắc
                        </p>
                        <div className="flex items-center gap-2">
                            {/* <div className="size-4 rounded-full bg-blue-600 border border-slate-200"></div> */}
                            <span className="text-slate-900 dark:text-white font-medium">{motorbike.color}</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                            Trọng lượng (kg)
                        </p>
                        <span className="text-slate-900 dark:text-white font-medium">{motorbike.weight}kg</span>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                            Loại nhiên liệu
                        </p>
                        <span className="text-slate-900 dark:text-white font-medium">{motorbike.fuelType}</span>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">
                            Dung tích động cơ (cc)
                        </p>
                        <span className="text-slate-900 dark:text-white font-medium">{motorbike.engineCapacity}cc</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
