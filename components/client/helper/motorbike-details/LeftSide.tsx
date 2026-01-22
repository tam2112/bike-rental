import Image from 'next/image';
import React from 'react';
import { calculateAverageRating, formatDateFromNow } from '@/lib/utils';

import { Star, Weight } from 'lucide-react';

import { assets } from '@/public/assets';

import { MotorType } from '@/types/motor';

export default function LeftSide({ motorbike }: { motorbike: MotorType }) {
    const totalRatings = motorbike.ratings.length;
    const avgRating = calculateAverageRating(motorbike) ?? 0;

    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
        const count = motorbike.ratings.filter((r) => r.rating === star).length;
        const percentage = totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;
        return { star, percentage };
    });

    return (
        <div className="lg:col-span-2 flex flex-col gap-8">
            {/* title */}
            <div className="flex flex-col gap-3">
                <h1 className="text-neutral-dark dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                    {motorbike.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400 text-sm md:text-base font-normal">
                    <span className="flex items-center gap-1 text-neutral-dark dark:text-slate-300 font-medium">
                        <span className="material-symbols-outlined text-lg text-primary">
                            <Star size={18} className="fill-current" />
                        </span>
                        {avgRating} ({totalRatings} đánh giá)
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                    <span>{motorbike.bookings.length} chuyến đi</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                    <span>{motorbike.licensePlateNum}</span>
                </div>
            </div>
            {/* images */}
            <div className="grid grid-cols-4 gap-2 h-75 md:h-100 rounded-xl overflow-hidden shadow-sm">
                <div
                    className={`${
                        motorbike.images.length === 1
                            ? 'row-span-full col-span-full'
                            : 'row-span-2 col-span-4 md:col-span-3'
                    } relative group cursor-pointer bg-white dark:bg-slate-850`}
                >
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-105 flex justify-center items-center">
                        <Image
                            src={motorbike.images[0].url || assets.xe_may_2}
                            alt="img"
                            width={600}
                            height={600}
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg backdrop-blur-sm text-sm font-medium">
                        Ảnh bìa
                    </div>
                </div>
                {motorbike.images.length > 1 && (
                    <div className="hidden md:block col-span-1 row-span-1 relative group cursor-pointer bg-white dark:bg-slate-850">
                        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105 flex justify-center items-center">
                            <Image
                                src={motorbike.images[1].url}
                                alt="img"
                                width={200}
                                height={200}
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}
                {motorbike.images.length > 2 && (
                    <div className="hidden md:block col-span-1 row-span-1 relative group cursor-pointer bg-white dark:bg-slate-850">
                        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105 flex justify-center items-center">
                            <Image
                                src={motorbike.images[2].url}
                                alt="img"
                                width={200}
                                height={200}
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}
            </div>
            {/* description */}
            <div className="flex flex-col gap-4">
                <h3 className="text-neutral-dark dark:text-white text-xl font-bold">Đặc điểm xe</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-colors">
                        <Image src={assets.gasIcon} alt="gas" width={30} height={30} className="mb-2" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                            Loại nhiên liệu
                        </p>
                        <p className="font-bold text-neutral-dark dark:text-white mt-1">{motorbike.fuelType}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-colors">
                        <span className="material-symbols-outlined text-primary text-3xl mb-2">
                            <Weight size={30} />
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                            Trọng lượng
                        </p>
                        <p className="font-bold text-neutral-dark dark:text-white mt-1">{motorbike.weight}kg</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-colors">
                        <Image src={assets.speedIcon} alt="gas" width={30} height={30} className="mb-2" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                            Dung tích
                        </p>
                        <p className="font-bold text-neutral-dark dark:text-white mt-1">{motorbike.engineCapacity}cc</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-850 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-colors">
                        <Image src={assets.seatIcon} alt="gas" width={30} height={30} className="mb-2" />
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">
                            Chỗ ngồi
                        </p>
                        <p className="font-bold text-neutral-dark dark:text-white mt-1">{motorbike.seat} Người</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-neutral-dark dark:text-white text-xl font-bold">Mô tả chi tiết</h3>
                <div className="bg-white dark:bg-slate-850 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <p className="text-neutral-dark dark:text-slate-300 text-base leading-relaxed">
                        {motorbike.description}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-neutral-dark dark:text-white text-xl font-bold">Đánh giá từ khách hàng</h3>
                <div className="bg-white dark:bg-slate-850 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex flex-wrap gap-x-8 gap-y-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-neutral-dark dark:text-white text-5xl font-black leading-tight">
                                {avgRating.toFixed(1)}
                            </p>
                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={`shrink-0 fill-current ${avgRating > i ? 'text-primary' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                                {totalRatings} đánh giá
                            </p>
                        </div>
                        <div className="grid min-w-50 flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-2">
                            {ratingDistribution.map((item) => (
                                <React.Fragment key={item.star}>
                                    <p className="text-neutral-dark dark:text-slate-300 text-sm font-medium">
                                        {item.star}
                                    </p>
                                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 mx-2">
                                        <div
                                            className="rounded-full bg-primary transition-all duration-500"
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium text-right">
                                        {item.percentage}%
                                    </p>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6 space-y-8">
                        {motorbike.ratings.map((rating) => (
                            <div key={rating.id} className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-600">
                                    <Image
                                        src={rating.user.avatar[0]?.url || assets.sample_profile}
                                        alt="profile"
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover h-10"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-neutral-dark dark:text-white">
                                            {rating.user.fullName}
                                        </p>
                                        <span className="text-xs text-slate-400">
                                            {formatDateFromNow(rating.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={`shrink-0 fill-current ${rating.rating > i ? 'text-primary' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-neutral-dark dark:text-slate-300 mt-1">{rating.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
