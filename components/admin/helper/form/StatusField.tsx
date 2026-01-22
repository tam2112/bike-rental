'use client';

import { ReactNode } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { Expand } from 'lucide-react';

interface StatusFieldProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    data: Array<{ id: string; name: string }>;
    defaultValue?: string;
    icon?: ReactNode;
    className?: string;
    register: UseFormRegister<T>;
    error?: FieldError;
}

export default function StatusField<T extends FieldValues>({
    name,
    label,
    data,
    defaultValue,
    className,
    register,
    error,
}: StatusFieldProps<T>) {
    return (
        <div className={className}>
            <label className="block text-sm font-semibold text-neutral-dark dark:text-slate-300 mb-2">{label}</label>
            <div className="relative">
                <select
                    {...register(name)}
                    defaultValue={defaultValue}
                    className="w-full border py-1.5 rounded-lg border-slate-300 dark:border-slate-600 bg-green-50 dark:bg-[#34A853]/10 text-[#34A853] dark:text-[#34A853] font-bold focus:border-[#34A853] focus:ring-[#34A853] pl-4 pr-10"
                >
                    {data.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#34A853] dark:text-[#34A853]">
                    <span className="material-symbols-outlined">
                        <Expand size={14} />
                    </span>
                </span>
            </div>
            {error?.message && <p className="text-xs text-red-400 max-w-75">{error?.message.toString()}</p>}
        </div>
    );
}
