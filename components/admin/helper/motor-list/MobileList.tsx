import Link from 'next/link';
import Image from 'next/image';
import { currency, thousandSeparator } from '@/lib/utils';

import { Coins, Edit2, Eye, XCircle } from 'lucide-react';

import { motorPath } from '@/constants/path';

import { MotorType } from '@/types/motor';

import StatusBadge from '../StatusBadge';

interface MobileListProps {
    motors: MotorType[];
    onDelete: (id: string, name: string) => void;
}

export default function MobileList({ motors, onDelete }: MobileListProps) {
    return (
        <div className="lg:hidden space-y-4">
            {motors.map((motor) => (
                <div
                    key={motor.id}
                    className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <Image
                                src={motor.images[0]?.url || ''}
                                alt="img"
                                width={40}
                                height={40}
                                className="rounded-full h-10 w-10 object-cover"
                            />
                            <div>
                                <p className="text-xs font-bold text-indigo-600">{motor.model}</p>
                                <h4 className="font-bold text-slate-900 dark:text-white max-sm:max-w-30 max-sm:line-clamp-1">
                                    {motor.name}
                                </h4>
                            </div>
                        </div>
                        <StatusBadge status={motor.status.name} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 dark:border-slate-800">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Biển số</p>
                            <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                {motor.licensePlateNum}
                            </span>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Giá thuê</p>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Coins size={14} className="text-slate-400" />
                                {thousandSeparator(motor.pricePerDay)} {currency}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <Link
                            href={`${motorPath}/chi-tiet/${motor.id}`}
                            className="py-2 flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg"
                        >
                            <Eye size={18} />
                        </Link>
                        <Link
                            href={`${motorPath}/cap-nhat/${motor.id}`}
                            className="py-2 flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg"
                        >
                            <Edit2 size={18} />
                        </Link>
                        <button
                            onClick={() => onDelete(motor.id, motor.name)}
                            className="py-2 flex justify-center bg-red-100 text-red-500 dark:bg-red-900/30 rounded-lg"
                        >
                            <XCircle size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
