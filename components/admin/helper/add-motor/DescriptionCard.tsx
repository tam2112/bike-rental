'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MotorSchema } from '@/lib/validation/motor.form';

import { Notebook } from 'lucide-react';

import { TextareaField } from '../form';

interface DescriptionCardProps {
    register: UseFormRegister<MotorSchema>;
    errors: FieldErrors<MotorSchema>;
}

export default function DescriptionCard({ register, errors }: DescriptionCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-neutral-dark dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <Notebook size={22} />
                    </span>
                    Mô tả chi tiết
                </h3>
            </div>
            {/* description */}
            <TextareaField
                name="description"
                label="Giới thiệu về xe"
                isRequired
                placeholder="Mô tả tình trạng xe, các tính năng nổi bật..."
                description="Mô tả ngắn gọn giúp khách hàng hiểu rõ hơn về chiếc xe này."
                register={register}
                error={errors.description}
            />
        </div>
    );
}
