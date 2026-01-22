import { Info } from 'lucide-react';

interface BasicInfoCardProps {
    licensePlateNum: string;
    brand: string;
    model: string;
    situation: string | null;
    maintenanceAt: Date | null;
}

export default function BasicInfoCard({ licensePlateNum, brand, model, situation, maintenanceAt }: BasicInfoCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4c739a]">
                    <Info size={22} />
                </span>
                <h3 className="font-bold text-neutral-dark dark:text-white">Thông tin cơ bản</h3>
            </div>
            <ul className="space-y-4">
                <li className="flex items-center justify-between">
                    <span className="text-[#4c739a] text-sm">Biển số xe</span>
                    <span className="font-mono font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-neutral-dark dark:text-white">
                        {licensePlateNum}
                    </span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="text-[#4c739a] text-sm">Hãng xe</span>
                    <span className="text-neutral-dark dark:text-white text-sm font-medium">{brand}</span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="text-[#4c739a] text-sm">Loại xe</span>
                    <span className="text-neutral-dark dark:text-white text-sm font-medium">{model}</span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="text-[#4c739a] text-sm">Tình trạng thực tế</span>
                    <span className="text-neutral-dark dark:text-white text-sm font-medium">
                        {situation || 'Bình thường'}
                    </span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="text-[#4c739a] text-sm">Ngày bảo dưỡng gần nhất</span>
                    <span className="text-neutral-dark dark:text-white text-sm font-medium">
                        {maintenanceAt?.toLocaleDateString() || '-'}
                    </span>
                </li>
            </ul>
        </div>
    );
}
