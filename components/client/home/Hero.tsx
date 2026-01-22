'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { CalendarCheck, CalendarDays, ChevronDown, Motorbike, Search } from 'lucide-react';

import { models } from '@/constants/motorbike';

export default function Hero() {
    const router = useRouter();

    // Hàm format ngày giờ sang chuẩn ISO để input datetime-local hiểu được
    const formatToISO = (date: Date) => {
        const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
        const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
        return localISOTime;
    };

    // Khởi tạo giá trị mặc định
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    const [pickupDate, setPickupDate] = useState(formatToISO(now));
    const [returnDate, setReturnDate] = useState(formatToISO(tomorrow));
    const [minReturnDate, setMinReturnDate] = useState(formatToISO(tomorrow));

    // Cập nhật giá trị Min của ngày trả khi ngày nhận thay đổi
    useEffect(() => {
        const currentPickup = new Date(pickupDate);
        const nextDay = new Date(currentPickup);
        nextDay.setDate(currentPickup.getDate() + 1);

        const nextDayISO = formatToISO(nextDay);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMinReturnDate(nextDayISO);

        // Nếu ngày trả đang chọn nhỏ hơn ngày nhận + 1, thì tự động cập nhật lại ngày trả
        if (new Date(returnDate) <= currentPickup) {
            setReturnDate(nextDayISO);
        }
    }, [pickupDate, returnDate]);

    const [selectedModel, setSelectedModel] = useState(models[0]);

    const onSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (pickupDate) params.append('pickupDate', pickupDate);
        if (returnDate) params.append('returnDate', returnDate);
        if (selectedModel) params.append('model', selectedModel);

        router.push(`/xe-may?${params.toString()}`);
    };

    return (
        <div className="relative w-full">
            <div
                className="relative flex min-h-140 flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-4"
                data-alt="Motorbike rider on a scenic coastal road at sunset"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url(/images/bg/bg-hero.jpg)',
                }}
            >
                <div className="flex flex-col gap-4 text-center max-w-200 mb-12 animate-fade-in">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl drop-shadow-xl">
                        Khám phá Phú Yên - Xứ sở &quot;Hoa Vàng Cỏ Xanh&quot;
                    </h1>
                    <h2 className="text-slate-100 text-lg font-medium leading-normal md:text-xl drop-shadow-md">
                        Dịch vụ cho thuê xe máy uy tín nhất tại Tuy Hòa. Giao xe tận nơi ga tàu, khách sạn.
                    </h2>
                </div>
                <div className="w-full max-w-270 bg-white dark:bg-slate-850 rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in-up border border-slate-100 dark:border-slate-700">
                    <form onSubmit={onSearch} className="flex flex-col lg:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-neutral-dark dark:text-slate-300 mb-2">
                                Loại xe
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                                    <Motorbike size={22} />
                                </span>
                                <select
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    className="w-full h-12 pl-10 pr-10 rounded-lg border border-slate-200 dark:border-slate-600 bg-neutral-light dark:bg-slate-700 text-neutral-dark dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium cursor-pointer outline-none"
                                >
                                    {models.map((model) => (
                                        <option key={model} value={model}>
                                            {model}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    <ChevronDown size={18} />
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-neutral-dark dark:text-slate-300 mb-2">
                                Ngày nhận (Từ 7:00)
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                                    <CalendarDays size={22} />
                                </span>
                                <input
                                    type="datetime-local"
                                    value={pickupDate}
                                    min={formatToISO(now)} // Min là ngày giờ hiện tại
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    onClick={(e) => e.currentTarget.showPicker()}
                                    className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-neutral-light dark:bg-slate-700 text-neutral-dark dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium outline-none cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-neutral-dark dark:text-slate-300 mb-2">
                                Ngày trả (Trước 22:00)
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                                    <CalendarCheck size={22} />
                                </span>
                                <input
                                    type="datetime-local"
                                    value={returnDate}
                                    min={minReturnDate} // Min là Ngày nhận + 1
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    onClick={(e) => e.currentTarget.showPicker()}
                                    className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-neutral-light dark:bg-slate-700 text-neutral-dark dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium outline-none cursor-pointer"
                                />
                            </div>
                        </div>
                        <button
                            className="w-full lg:w-auto h-12 px-8 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                            type="submit"
                        >
                            <span className="material-symbols-outlined">
                                <Search size={22} />
                            </span>
                            Tìm xe ngay
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
