export default function NoteCard() {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                    Ghi chú nội bộ
                </h3>
                <button className="text-xs text-primary hover:text-blue-600 font-medium hover:underline">Sửa</button>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                <p className="leading-relaxed">
                    Khách địa phương, nhà gần khu vực Núi Nhạn. Thường thuê xe tay ga đi công việc trong tỉnh. Uy tín,
                    trả xe đúng giờ.
                </p>
            </div>
        </div>
    );
}
