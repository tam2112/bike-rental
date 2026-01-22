'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MotorSchema } from '@/lib/validation/motor.form';

import { History } from 'lucide-react';

import { CheckboxField } from '../form';

interface StatusCardProps {
    register: UseFormRegister<MotorSchema>;
    errors: FieldErrors<MotorSchema>;
}

export default function StatusCard({ register, errors }: StatusCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-neutral-dark dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <History size={22} />
                    </span>
                    Trạng thái
                </h3>
            </div>
            <div className="space-y-4">
                {/* status */}
                <CheckboxField
                    name="isReady"
                    label="Sẵn sàng cho thuê"
                    description="Hiển thị xe này trên trang chủ"
                    register={register}
                    error={errors.isReady}
                />
            </div>
        </div>
    );
}
