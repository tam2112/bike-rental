'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MotorSchema } from '@/lib/validation/motor.form';

import { History, Save } from 'lucide-react';

import { useStatusStore } from '@/store/status';

import { PriceField, StatusField } from '../form';

interface StatusAndPriceFormProps {
    register: UseFormRegister<MotorSchema>;
    errors: FieldErrors<MotorSchema>;
}

export default function StatusAndPriceForm({ register, errors }: StatusAndPriceFormProps) {
    const router = useRouter();

    const { motorStatuses, fetchMotorStatuses } = useStatusStore();

    useEffect(() => {
        fetchMotorStatuses();
    }, [fetchMotorStatuses]);

    if (!motorStatuses) return 'Status not found';

    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-4 p-6 shadow-sm sticky top-24">
            <h3 className="text-neutral-dark dark:text-white text-lg font-bold mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4285F4]">
                    <History size={22} />
                </span>
                Trạng thái &amp; Giá
            </h3>
            <div className="flex flex-col gap-5">
                {/* status */}
                <StatusField
                    name="statusId"
                    label="Trạng thái hiện tại"
                    data={motorStatuses}
                    register={register}
                    error={errors.statusId}
                />
                <div className="h-px bg-gray-100 dark:bg-gray-700 my-2"></div>
                {/* price per day */}
                <PriceField
                    name="pricePerDay"
                    label="Giá thuê (VND/ngày)"
                    placeholder=""
                    type="number"
                    register={register}
                    error={errors.pricePerDay}
                />
                {/* submit button */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-3">
                    <button
                        type="submit"
                        className="w-full bg-[#4285F4] hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/30 transition-all flex justify-center items-center gap-2"
                    >
                        <span className="material-symbols-outlined">
                            <Save size={14} />
                        </span>{' '}
                        Cập nhật
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-neutral-dark dark:text-slate-300 font-semibold py-3 rounded-lg transition-colors"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}
