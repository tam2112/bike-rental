'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MotorSchema } from '@/lib/validation/motor.form';

import { Info } from 'lucide-react';

import { brands, models } from '@/constants/motorbike';

import { MotorType } from '@/types/motor';

import { InputField, SelectField } from '../form';

interface BasicInfoFormProps {
    register: UseFormRegister<MotorSchema>;
    errors: FieldErrors<MotorSchema>;
    data: MotorType | null;
}

export default function BasicInfoForm({ register, errors }: BasicInfoFormProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <h3 className="text-neutral-dark dark:text-white text-lg font-bold mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4285F4]">
                    <Info size={22} />
                </span>
                Thông tin cơ bản
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* name */}
                <div className="col-span-1">
                    <InputField
                        name="name"
                        label="Tên xe"
                        isRequired
                        type="text"
                        placeholder=""
                        register={register}
                        error={errors.name}
                    />
                </div>
                {/* brand */}
                <div className="col-span-1">
                    <SelectField
                        name="brand"
                        label="Hãng xe"
                        isRequired
                        data={brands}
                        register={register}
                        error={errors.brand}
                    />
                </div>
                {/* license plate number */}
                <div className="col-span-1">
                    <InputField
                        name="licensePlateNum"
                        label="Biển số xe"
                        isRequired
                        type="text"
                        placeholder=""
                        register={register}
                        error={errors.licensePlateNum}
                    />
                </div>
                {/* model */}
                <div className="col-span-1">
                    <SelectField
                        name="model"
                        label="Loại xe"
                        isRequired
                        data={models}
                        register={register}
                        error={errors.model}
                    />
                </div>
                {/* situation */}
                <div className="col-span-2">
                    <InputField
                        name="situation"
                        label="Tình trạng thực tế"
                        type="text"
                        placeholder="VD: Vết trầy xước, hỏng hóc nhẹ"
                        register={register}
                        error={errors.situation}
                    />
                </div>
            </div>
        </div>
    );
}
