'use client';

import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { currency } from '@/lib/utils';

interface PriceFieldProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    isRequired?: boolean;
    type: string;
    placeholder: string;
    className?: string;
    register: UseFormRegister<T>;
    error?: FieldError;
}

export default function PriceField<T extends FieldValues>({
    name,
    label,
    isRequired = false,
    type,
    placeholder,
    className,
    register,
    error,
}: PriceFieldProps<T>) {
    return (
        <div className={`${className} space-y-2`}>
            <label className="text-sm font-semibold text-neutral-dark dark:text-slate-300" htmlFor={name}>
                {label} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <div className="relative rounded-md shadow-sm">
                <input
                    className="block w-full border py-1.5 mt-1 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 pr-12 focus:border-primary focus:ring-primary sm:text-sm text-neutral-dark dark:text-white text-right font-medium"
                    id={name}
                    placeholder={placeholder}
                    type={type}
                    {...register(name)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-slate-500 sm:text-sm">{currency}</span>
                </div>
            </div>
            {error?.message && <p className="text-xs text-red-400 max-w-75">{error?.message.toString()}</p>}
        </div>
    );
}
