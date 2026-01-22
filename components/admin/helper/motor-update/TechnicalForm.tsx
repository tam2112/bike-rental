'use client';

import Image from 'next/image';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MotorSchema } from '@/lib/validation/motor.form';

import { assets } from '@/public/assets';
import { fuelTypes } from '@/constants/motorbike';

import { InputField, SelectField, TextareaField } from '../form';

interface TechnicalFormProps {
    register: UseFormRegister<MotorSchema>;
    errors: FieldErrors<MotorSchema>;
}

export default function TechnicalForm({ register, errors }: TechnicalFormProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <h3 className="text-neutral-dark dark:text-white text-lg font-bold mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4285F4]">
                    <Image src={assets.technicsIcon} alt="technics" width={22} height={22} />
                </span>
                Thông số kỹ thuật
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* color */}
                <div className="col-span-1">
                    <InputField
                        name="color"
                        label="Màu xe"
                        type="text"
                        placeholder=""
                        register={register}
                        error={errors.color}
                    />
                </div>
                {/* engine capacity */}
                <div className="col-span-1">
                    <InputField
                        name="engineCapacity"
                        label="Dung tích động cơ (cc)"
                        isRequired
                        type="number"
                        placeholder=""
                        register={register}
                        error={errors.engineCapacity}
                    />
                </div>
                {/* fuel type */}
                <div className="col-span-1">
                    <SelectField
                        name="fuelType"
                        label="Loại nhiên liệu"
                        isRequired
                        data={fuelTypes}
                        register={register}
                        error={errors.fuelType}
                    />
                </div>
                {/* consume */}
                <div className="col-span-1">
                    <InputField
                        name="consume"
                        label="Mức tiêu thụ nhiên liệu"
                        type="text"
                        placeholder="1.87 lít/100km"
                        register={register}
                        error={errors.consume}
                    />
                </div>
                {/* fuel capacity */}
                <div className="col-span-1">
                    <InputField
                        name="fuelCapacity"
                        label="Dung tích bình xăng"
                        type="text"
                        placeholder="150km/lần"
                        register={register}
                        error={errors.fuelCapacity}
                    />
                </div>
                {/* weight */}
                <div className="col-span-1">
                    <InputField
                        name="weight"
                        label="Trọng lượng (kg)"
                        isRequired
                        type="number"
                        placeholder=""
                        register={register}
                        error={errors.weight}
                    />
                </div>
                {/* odo num */}
                <div className="col-span-1">
                    <InputField
                        name="odoNum"
                        label="Số km đã đi"
                        isRequired
                        type="number"
                        placeholder=""
                        register={register}
                        error={errors.odoNum}
                    />
                </div>
                {/* seat */}
                <div className="col-span-1">
                    <InputField
                        name="seat"
                        label="Chỗ ngồi"
                        isRequired
                        type="number"
                        placeholder=""
                        register={register}
                        error={errors.seat}
                    />
                </div>
                {/* description */}
                <div className="col-span-full">
                    <TextareaField
                        name="description"
                        label="Mô tả chi tiết"
                        placeholder=""
                        isRequired
                        register={register}
                        error={errors.description}
                    />
                </div>
            </div>
        </div>
    );
}
