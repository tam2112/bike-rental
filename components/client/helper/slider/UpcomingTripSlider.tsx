'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { ArrowRight, CalendarX, MapPinned } from 'lucide-react';

import { useBookingStore } from '@/store/booking';
import { assets } from '@/public/assets';

import { UpcomingTrip } from '../account/my-booking';
import { UpcomingTripSkeleton } from '../skeleton';

export default function UpcomingTripSlider() {
    const { upcomingTrips, fetchUpcomingTrips, isLoading } = useBookingStore();

    useEffect(() => {
        fetchUpcomingTrips();
    }, [fetchUpcomingTrips]);

    const renderContent = () => {
        // 1. Loading State
        if (isLoading) {
            return <UpcomingTripSkeleton />;
        }

        // 2. Data Exists State
        if (upcomingTrips && upcomingTrips.length > 0) {
            return (
                <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    className="pb-12 upcoming-slider" // Giảm padding bottom một chút cho gọn
                >
                    {upcomingTrips.map((booking) => (
                        <SwiperSlide key={booking.id}>
                            <UpcomingTrip booking={booking} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            );
        }

        // 3. Empty State
        return (
            <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-neutral-light dark:border-slate-700 overflow-hidden p-8 text-center flex flex-col items-center justify-center gap-4 group transition-all hover:shadow-md hover:border-primary/30">
                <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                    <CalendarX size={32} strokeWidth={1.5} />
                </div>

                <div className="space-y-1">
                    <h4 className="text-lg font-bold text-neutral-dark dark:text-white">Chưa có chuyến đi sắp tới</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                        Bạn chưa có lịch trình nào. Hãy lên kế hoạch khám phá Phú Yên ngay hôm nay!
                    </p>
                </div>

                <Link
                    href="/xe-may"
                    className="mt-2 flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:brightness-110 transition-all active:scale-95"
                >
                    <MapPinned size={18} />
                    Đặt xe ngay
                    <ArrowRight size={16} />
                </Link>
            </div>
        );
    };

    return (
        <section className="mb-10">
            <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-4 flex items-center gap-2">
                <Image src={assets.upcomingIcon} alt="upcoming" width={22} height={22} />
                Chuyến đi sắp tới
            </h3>
            {renderContent()}

            {/* Tùy chỉnh CSS cho Swiper Pagination */}
            <style jsx global>{`
                .upcoming-slider .swiper-pagination-bullet-active {
                    background: #4285f4 !important; /* Màu primary của bạn */
                    width: 20px;
                    border-radius: 4px;
                }
                .upcoming-slider .swiper-pagination {
                    bottom: 0px !important;
                }
            `}</style>
        </section>
    );
}
