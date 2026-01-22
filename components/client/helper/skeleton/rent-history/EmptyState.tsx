'use client';

import { useRouter } from 'next/navigation';

import { Motorbike, SearchX } from 'lucide-react';

export default function EmptyState() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in zoom-in duration-500">
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4 shadow-inner">
                <SearchX className="size-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-dark dark:text-white mb-2">Chưa có lịch sử thuê xe</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-62.5 mx-auto mb-6">
                Bạn chưa thực hiện chuyến đi nào. Hãy chọn một chiếc xe và bắt đầu hành trình ngay!
            </p>
            <button
                onClick={() => router.push('/xe-may')}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-105 transition-all"
            >
                <Motorbike size={18} />
                Đặt xe ngay
            </button>
        </div>
    );
}
