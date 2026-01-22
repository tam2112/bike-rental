'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { calculateAverageRating, currency, thousandSeparator } from '@/lib/utils';

import { ArrowRight, Star } from 'lucide-react';

import { useMotorStore } from '@/store/motor';
import { assets } from '@/public/assets';

import SkeletonCard from '../helper/skeleton/SkeletonCard';

export default function OutstandingBike() {
    const { motors, fetchMotors, isLoading } = useMotorStore();

    useEffect(() => {
        fetchMotors();
    }, [fetchMotors]);

    const router = useRouter();

    return (
        <section className="w-full flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-neutral-dark dark:text-white tracking-tight">
                        Xe máy nổi bật tại Tuy Hòa
                    </h2>
                    <p className="text-slate-500 mt-2 text-sm">
                        Các dòng xe mới nhất, phù hợp địa hình đèo dốc Phú Yên
                    </p>
                </div>
                <Link
                    className="text-primary font-bold hover:text-blue-600 transition-colors flex items-center gap-1"
                    href="/xe-may"
                >
                    Xem tất cả{' '}
                    <span className="material-symbols-outlined text-sm font-bold">
                        <ArrowRight size={14} />
                    </span>
                </Link>
            </div>
            <div className="">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {Array.from({ length: 4 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {motors?.slice(0, 4).map((bike) => (
                                <div
                                    key={bike.id}
                                    className="group bg-white dark:bg-slate-850 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200 dark:hover:shadow-black/50 transition-all border border-slate-100 dark:border-slate-700 flex flex-col"
                                >
                                    <div className="h-52 overflow-hidden bg-neutral-light dark:bg-slate-800/50 relative">
                                        <Image
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            alt={bike.name}
                                            src={bike.images[0].url || assets.xe_may_2}
                                            width={208}
                                            height={208}
                                        />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur dark:bg-slate-900/90 px-2 py-1 rounded text-xs font-bold shadow-sm text-neutral-dark dark:text-white flex items-center gap-1">
                                            <span className="text-yellow-500 material-symbols-outlined text-[14px]">
                                                <Star size={14} className="fill-current" />
                                            </span>{' '}
                                            {calculateAverageRating(bike)}
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-1">
                                            {bike.name}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-4 font-medium">
                                            Đời {bike.year} &bull; Màu {bike.color}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <div>
                                                <span className="text-primary text-xl font-bold">
                                                    {thousandSeparator(bike.pricePerDay)}
                                                    {currency}
                                                </span>
                                                <span className="text-xs text-slate-500 font-medium">/ngày</span>
                                            </div>
                                            <button
                                                onClick={() => router.push(`/xe-may/${bike.slug}`)}
                                                className="bg-accent/10 hover:bg-accent text-accent hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300"
                                            >
                                                Đặt ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
