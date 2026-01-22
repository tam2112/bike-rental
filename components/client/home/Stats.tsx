import { Clock10, Motorbike, ShieldCheck } from 'lucide-react';

export default function Stats() {
    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-3 p-8 rounded-2xl bg-white dark:bg-slate-850 shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-2">
                    <span className="material-symbols-outlined text-4xl">
                        <ShieldCheck size={32} />
                    </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-dark dark:text-white">Thổ địa Phú Yên</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Am hiểu địa hình, tư vấn lịch trình tham quan Ghềnh Đá Đĩa, Mũi Điện miễn phí.
                </p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-8 rounded-2xl bg-white dark:bg-slate-850 shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-2">
                    <span className="material-symbols-outlined text-4xl">
                        <Motorbike size={32} />
                    </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-dark dark:text-white">Giao xe tận nơi</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Miễn phí giao xe trong nội thành Tuy Hòa. Giao tại sân bay, nhà ga nhanh chóng.
                </p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-8 rounded-2xl bg-white dark:bg-slate-850 shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-1 transition-transform duration-300">
                <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-2">
                    <span className="material-symbols-outlined text-4xl">
                        <Clock10 size={32} />
                    </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-dark dark:text-white">Hỗ trợ 7:00 - 22:00</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Hoạt động tất cả các ngày trong tuần. Sẵn sàng hỗ trợ sự cố trên đường.
                </p>
            </div>
        </section>
    );
}
