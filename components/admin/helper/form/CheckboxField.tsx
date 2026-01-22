'use client';

import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface CheckboxFieldProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    isRequired?: boolean;
    description?: string;
    isCoupon?: boolean;
    className?: string;
    register: UseFormRegister<T>;
    error?: FieldError;
}

export default function CheckboxField<T extends FieldValues>({
    name,
    label,
    description,
    isCoupon = false,
    className,
    register,
    error,
}: CheckboxFieldProps<T>) {
    return (
        <>
            <div
                className={`${className} flex items-center ${
                    isCoupon ? 'gap-4 border border-slate-300 dark:border-slate-800 py-3 px-2.5 rounded-lg' : ''
                } justify-between`}
            >
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-dark dark:text-white">{label}</span>
                    <span className="text-xs text-slate-500">{description}</span>
                </div>
                <label className="cursor-pointer group">
                    <div className="relative">
                        <input className="sr-only peer" type="checkbox" {...register(name)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </div>
                </label>
            </div>
            {error?.message && <p className="text-xs text-red-400 max-w-75">{error?.message.toString()}</p>}
        </>
    );
}
