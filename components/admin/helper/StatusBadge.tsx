'use client';

export default function StatusBadge({ status }: { status: string }) {
    const configs: Record<string, { label: string; color: string }> = {
        'Chưa sẵn sàng': { label: 'Chưa sẵn sàng', color: 'bg-slate-50 text-slate-700 ring-slate-600/20' },
        'Sẵn sàng': { label: 'Sẵn sàng', color: 'bg-green-50 text-green-700 ring-green-600/20' },
        'Bảo dưỡng': { label: 'Bảo dưỡng', color: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
        'Đang chờ': { label: 'Đang chờ', color: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
        'Đã xác nhận': { label: 'Đã xác nhận', color: 'bg-blue-50 text-blue-700 ring-blue-600/20' },
        'Đang thuê': { label: 'Đang thuê', color: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20 animate-pulse' },
        'Hoàn thành': { label: 'Hoàn thành', color: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
        'Đã hủy': { label: 'Đã hủy', color: 'bg-red-50 text-red-600 ring-red-500/10' },
        'Đang hoạt động': { label: 'Đang hoạt động', color: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
        'Ngoại tuyến': { label: 'Ngoại tuyến', color: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
        'Đã ẩn': { label: 'Đã ẩn', color: 'bg-slate-50 text-slate-700 ring-slate-600/20' },
        'Hiển thị': { label: 'Hiển thị', color: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
    };
    const config = configs[status];

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset ${config.color}`}
        >
            {config.label}
        </span>
    );
}
