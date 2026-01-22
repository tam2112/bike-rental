'use client';

import Image from 'next/image';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MotorSchema } from '@/lib/validation/motor.form';

import { Palette, Weight, Wind } from 'lucide-react';

import { assets } from '@/public/assets';
import { fuelTypes } from '@/constants/motorbike';

import { InputField, SelectField } from '../form';

interface TechnicalCardProps {
    register: UseFormRegister<MotorSchema>;
    errors: FieldErrors<MotorSchema>;
}

export default function TechnicalCard({ register, errors }: TechnicalCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-neutral-dark dark:text-white flex items-center gap-2">
                    <Image src={assets.technicsIcon} alt="technics" width={22} height={22} />
                    Thông số kỹ thuật
                </h3>
            </div>
            <div className="space-y-4">
                {/* seat */}
                <InputField
                    name="seat"
                    label="Chỗ ngồi"
                    type="number"
                    placeholder="2"
                    defaultValue={2}
                    icon={<Image src={assets.seatSlateIcon} alt="seat" width={14} height={14} />}
                    className="text-sm"
                    register={register}
                    error={errors.seat}
                />
                {/* color */}
                <InputField
                    name="color"
                    label="Màu sắc"
                    type="text"
                    placeholder="Trắng, Đỏ, Đen..."
                    icon={
                        <span className="material-symbols-outlined text-slate-400">
                            <Palette size={14} />
                        </span>
                    }
                    className="text-sm"
                    register={register}
                    error={errors.color}
                />
                {/* engine capacity */}
                <InputField
                    name="engineCapacity"
                    label="Dung tích động cơ (cc)"
                    type="number"
                    placeholder="50, 100, 115, 120..."
                    icon={<Image src={assets.machineIcon} alt="machine" width={14} height={14} />}
                    className="text-sm"
                    register={register}
                    error={errors.engineCapacity}
                />
                {/* fuel type */}
                <SelectField
                    name="fuelType"
                    label="Loại nhiên liệu"
                    isRequired
                    data={fuelTypes}
                    icon={<Image src={assets.gasSlateIcon} alt="gas slate" width={14} height={14} />}
                    className="text-sm"
                    register={register}
                    error={errors.fuelType}
                />
                {/* consume */}
                <InputField
                    name="consume"
                    label="Mức tiêu hao nhiên liệu"
                    type="text"
                    placeholder="1.87 lít/100km"
                    icon={
                        <span className="material-symbols-outlined text-slate-400">
                            <Wind size={14} />
                        </span>
                    }
                    className="text-sm"
                    register={register}
                    error={errors.consume}
                />
                {/* fuel capacity */}
                <InputField
                    name="fuelCapacity"
                    label="Dung tích bình xăng"
                    type="text"
                    placeholder="150km/lần"
                    icon={<Image src={assets.gasTankIcon} alt="gas tank" width={14} height={14} />}
                    className="text-sm"
                    register={register}
                    error={errors.fuelCapacity}
                />
                {/* weight */}
                <InputField
                    name="weight"
                    label="Trọng lượng xe (kg)"
                    type="number"
                    placeholder="10"
                    icon={
                        <span className="material-symbols-outlined text-slate-400">
                            <Weight size={14} />
                        </span>
                    }
                    className="text-sm"
                    register={register}
                    error={errors.weight}
                />
                {/* odu num */}
                <InputField
                    name="odoNum"
                    label="Số Km đã đi"
                    type="number"
                    placeholder="1200"
                    icon={<Image src={assets.speedSlateIcon} alt="speed slate" width={14} height={14} />}
                    className="text-sm"
                    register={register}
                    error={errors.odoNum}
                />
                {/* situation */}
                <InputField
                    name="situation"
                    label="Tình trạng thực tế"
                    type="text"
                    placeholder="Vết trầy xước, hỏng hóc nhẹ"
                    icon={<Image src={assets.incidentIcon} alt="incident" width={14} height={14} />}
                    className="text-sm"
                    register={register}
                    error={errors.situation}
                />
            </div>
        </div>
    );
}
