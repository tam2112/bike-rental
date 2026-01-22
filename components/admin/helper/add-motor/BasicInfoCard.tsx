'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MotorSchema } from '@/lib/validation/motor.form';

import { Info } from 'lucide-react';

import { brands, models } from '@/constants/motorbike';
import { InputField, SelectField } from '../form';

interface BasicInfoCardProps {
    register: UseFormRegister<MotorSchema>;
    errors: FieldErrors<MotorSchema>;
}

export default function BasicInfoCard({ register, errors }: BasicInfoCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-neutral-dark dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <Info size={22} />
                    </span>
                    Thông tin cơ bản
                </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* motor name */}
                <InputField
                    name="name"
                    label="Tên xe"
                    isRequired
                    type="text"
                    placeholder="Ví dụ: Honda Vision 2023"
                    className="col-span-1 md:col-span-2"
                    register={register}
                    error={errors.name}
                />
                {/* brand */}
                <SelectField
                    name="brand"
                    label="Hãng xe"
                    isRequired
                    data={brands}
                    register={register}
                    error={errors.brand}
                />
                {/* model */}
                <SelectField
                    name="model"
                    label="Loại xe"
                    isRequired
                    data={models}
                    register={register}
                    error={errors.model}
                />
                {/* license plate number */}
                <InputField
                    name="licensePlateNum"
                    label="Biển số xe"
                    isRequired
                    type="text"
                    placeholder="Ví dụ: 78C1-123.45"
                    register={register}
                    error={errors.licensePlateNum}
                />
                {/* year */}
                <InputField
                    name="year"
                    label="Năm sản xuất"
                    isRequired
                    type="number"
                    placeholder="2023"
                    register={register}
                    error={errors.year}
                />
            </div>
        </div>
    );
}
