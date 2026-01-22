'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { MotorSchema } from '@/lib/validation/motor.form';

import { Wallet } from 'lucide-react';

import { PriceField } from '../form';

interface RentPriceCardProps {
    register: UseFormRegister<MotorSchema>;
    errors: FieldErrors<MotorSchema>;
}

export default function RentPriceCard({ register, errors }: RentPriceCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-neutral-dark dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <Wallet size={22} />
                    </span>
                    Giá thuê
                </h3>
            </div>
            <div className="space-y-4">
                {/* price per day */}
                <PriceField
                    name="pricePerDay"
                    label="Giá thuê theo ngày (VNĐ)"
                    isRequired
                    type="number"
                    placeholder="0"
                    register={register}
                    error={errors.pricePerDay}
                />
            </div>
        </div>
    );
}
