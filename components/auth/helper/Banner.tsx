import Image from 'next/image';

import { CalendarDays } from 'lucide-react';

import { assets } from '@/public/assets';

interface BannerProps {
    backgroundImage: string;
    text1: string;
    text2: string;
    description: string;
}

export default function Banner({ backgroundImage, text1, text2, description }: BannerProps) {
    return (
        <div
            className="hidden md:flex md:w-5/12 lg:w-1/2 relative flex-col justify-end p-8 lg:p-12 text-white bg-cover bg-center group"
            style={{
                backgroundImage,
            }}
        >
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10"></div>
            <div className="relative z-20 flex flex-col gap-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2">
                    <Image src={assets.compassIcon} alt="compass" width={22} height={22} />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                    {text1}
                    <br />
                    {text2}
                </h1>
                <p className="text-slate-200 text-sm lg:text-base font-medium max-w-sm">{description}</p>
                <div className="mt-6 flex items-center gap-3 text-xs font-medium text-slate-300 bg-black/40 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                    <span className="material-symbols-outlined text-[16px]">
                        <CalendarDays size={16} />
                    </span>
                    <span>Hỗ trợ: 07:00 - 22:00 hàng ngày</span>
                </div>
            </div>
        </div>
    );
}
