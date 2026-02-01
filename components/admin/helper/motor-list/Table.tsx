import Link from 'next/link';
import Image from 'next/image';
import { currency, thousandSeparator } from '@/lib/utils';

import { Edit2, Eye, XCircle } from 'lucide-react';

import { motorPath } from '@/constants/path';

import { MotorType } from '@/types/motor';

import StatusBadge from '../StatusBadge';

interface TableProps {
    motors: MotorType[];
    onDelete: (id: string, name: string) => void;
    isAllSelected: boolean;
    toggleSelectAll: () => void;
    selectedIds: string[];
    toggleSelect: (id: string) => void;
}

export default function Table({
    motors,
    onDelete,
    isAllSelected,
    toggleSelectAll,
    selectedIds,
    toggleSelect,
}: TableProps) {
    return (
        <div className="hidden lg:block bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                        <th className="p-4 w-10">
                            <input
                                type="checkbox"
                                className="rounded text-indigo-600 accent-indigo-600 h-4 w-4 cursor-pointer"
                                checked={isAllSelected}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Hình ảnh</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Tên xe & Loại</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Biển số</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Giá thuê</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Trạng thái</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {motors.map((motor) => (
                        <tr
                            key={motor.id}
                            className={`${selectedIds.includes(motor.id) ? 'bg-primary/10' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'} transition-colors`}
                        >
                            <td className="p-4">
                                <input
                                    type="checkbox"
                                    className="rounded accent-indigo-600 h-4 w-4 cursor-pointer"
                                    checked={selectedIds.includes(motor.id)}
                                    onChange={() => toggleSelect(motor.id)}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-12 w-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <Image
                                        src={motor.images[0]?.url || ''}
                                        alt="img"
                                        width={64}
                                        height={48}
                                        className="object-cover h-full w-full"
                                    />
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-900 dark:text-white">{motor.name}</span>
                                    <span className="text-xs text-slate-500">{motor.model}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm font-mono font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                    {motor.licensePlateNum}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium">
                                {thousandSeparator(motor.pricePerDay)} {currency}
                            </td>
                            <td className="px-6 py-4">
                                <StatusBadge status={motor.status.name} />
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Link
                                        href={`${motorPath}/chi-tiet/${motor.id}`}
                                        className="p-2 text-slate-400 hover:text-indigo-600"
                                    >
                                        <Eye size={18} />
                                    </Link>
                                    <Link
                                        href={`${motorPath}/cap-nhat/${motor.id}`}
                                        className="p-2 text-slate-400 hover:text-indigo-600"
                                    >
                                        <Edit2 size={18} />
                                    </Link>
                                    <button
                                        onClick={() => onDelete(motor.id, motor.name)}
                                        className="p-2 text-slate-400 hover:text-red-500"
                                    >
                                        <XCircle size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
