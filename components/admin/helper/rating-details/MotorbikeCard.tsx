import Link from 'next/link';
import Image from 'next/image';

import { Motorbike } from 'lucide-react';

import { motorPath } from '@/constants/path';
import { assets } from '@/public/assets';

import { RatingType } from '@/types/rating';

export default function MotorbikeCard({ rating }: { rating: RatingType }) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="p-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">
                            <Motorbike size={22} />
                        </span>
                        Xe được thuê
                    </h3>
                    <Link
                        href={`${motorPath}/chi-tiet/${rating.motorbike.id}`}
                        className="text-primary hover:text-blue-600 text-sm font-medium"
                    >
                        Chi tiết
                    </Link>
                </div>
                <div className="flex justify-between items-start mt-2">
                    <div>
                        <p className="font-semibold dark:text-white leading-tight">{rating.motorbike.name}</p>
                        <div className="mt-2 inline-flex items-center">
                            <span className="text-sm font-mono font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                {rating.motorbike.licensePlateNum}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full aspect-4/3 rounded-b-[0.8rem] bg-cover bg-center relative">
                <Image
                    src={rating.motorbike.images[0].url || assets.xe_may_2}
                    alt="profile"
                    width={400}
                    height={200}
                    className="size-full object-cover rounded-b-[0.8rem]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent rounded-b-[0.8rem]"></div>
                <div className="absolute bottom-3 left-4 text-white text-xs font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">
                    {rating.motorbike.model}
                </div>
            </div>
        </div>
    );
}
