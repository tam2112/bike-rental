'use client';

import { ReactNode } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { ChevronDown } from 'lucide-react';

interface SelectFieldProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    isRequired?: boolean;
    data: string[];
    defaultValue?: string;
    icon?: ReactNode;
    className?: string;
    register: UseFormRegister<T>;
    error?: FieldError;
}

export default function SelectField<T extends FieldValues>({
    name,
    label,
    isRequired = false,
    data,
    defaultValue,
    icon,
    className,
    register,
    error,
}: SelectFieldProps<T>) {
    return (
        <div className={`${className} space-y-2`}>
            <label className="text-sm font-semibold text-neutral-dark dark:text-slate-300" htmlFor={name}>
                {label} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <div className="relative flex items-center gap-2">
                {icon}
                <select
                    {...register(name)}
                    defaultValue={defaultValue}
                    className="w-full border px-2.5 mt-1 py-1.5 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-neutral-dark dark:text-white focus:border-primary focus:ring-primary"
                >
                    <option value={''}>Chọn {label}</option>
                    {data.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <span className="absolute right-3 top-5.5 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ChevronDown size={14} />
                </span>
            </div>
            {error?.message && <p className="text-xs text-red-400 max-w-75">{error?.message.toString()}</p>}
        </div>
    );
}
