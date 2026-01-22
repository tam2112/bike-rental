import { MapPin, Store } from 'lucide-react';

export default function LocationCard() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#4c739a]">
                    <Store size={22} />
                </span>
                <h3 className="font-bold text-neutral-dark dark:text-white">Địa điểm xe</h3>
            </div>
            <div className="flex items-start gap-3 mb-4">
                <div className="mt-1 min-w-5">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                        <MapPin size={20} />
                    </span>
                </div>
                <div>
                    <p className="text-sm font-semibold text-neutral-dark dark:text-white">Kho xe Trung Tâm Tuy Hòa</p>
                    <p className="text-xs text-[#4c739a] mt-0.5">288 Nguyễn Huệ, Phường 7, TP. Tuy Hòa, Tỉnh Phú Yên</p>
                </div>
            </div>
            {/* <div className="relative w-full h-32 bg-[#e7edf3] dark:bg-[#293038] rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer border border-[#e7edf3] dark:border-[#323b45]">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: 'radial-gradient(#4285F4 1px, transparent 1px)',
                        backgroundSize: '10px 10px',
                    }}
                ></div>
                <div className="z-10 bg-white dark:bg-[#1a222b] px-3 py-1.5 rounded-full shadow-sm text-xs font-medium text-primary flex items-center gap-1 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[16px]">
                        <Map size={16} />
                    </span>{' '}
                    Xem bản đồ
                </div>
            </div> */}
            <div className="mt-4 pt-4 border-t border-[#e7edf3] dark:border-[#293038]">
                <p className="text-xs text-[#4c739a] text-center">
                    Giờ hoạt động: <span className="font-medium text-neutral-dark dark:text-white">07:00 - 22:00</span>
                </p>
            </div>
        </div>
    );
}
