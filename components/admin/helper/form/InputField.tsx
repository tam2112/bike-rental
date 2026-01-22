'use client';

import { ReactNode, useState } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    isRequired?: boolean;
    type: string;
    placeholder: string;
    min?: number | string;
    max?: number | string;
    defaultValue?: string | number;
    className?: string;
    icon?: ReactNode;
    register: UseFormRegister<T>;
    error?: FieldError;
}

export default function InputField<T extends FieldValues>({
    name,
    label,
    isRequired = false,
    type,
    placeholder,
    min,
    max,
    defaultValue,
    className,
    icon,
    register,
    error,
}: InputFieldProps<T>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            {name === 'password' || name === 'confirmPassword' ? (
                <div className={`${className} space-y-2`}>
                    <label className="text-sm font-semibold text-neutral-dark dark:text-slate-300" htmlFor={name}>
                        {label} {isRequired && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative group">
                        <input
                            className="w-full border px-2.5 mt-1 py-1.5 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-neutral-dark dark:text-white focus:border-primary focus:ring-primary placeholder:text-slate-400"
                            id={name}
                            placeholder={placeholder}
                            type={showPassword ? 'text' : 'password'}
                            {...register(name)}
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </span>
                        </button>
                    </div>
                    {error?.message && <p className="text-xs text-red-400 max-w-75">{error?.message.toString()}</p>}
                </div>
            ) : (
                <div className={`${className} space-y-2`}>
                    <label className="text-sm font-semibold text-neutral-dark dark:text-slate-300" htmlFor={name}>
                        {label} {isRequired && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex items-center gap-2">
                        {icon}
                        <input
                            className="w-full border px-2.5 mt-1 py-1.5 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-neutral-dark dark:text-white focus:border-primary focus:ring-primary"
                            id={name}
                            placeholder={placeholder}
                            min={min}
                            max={max}
                            defaultValue={defaultValue}
                            type={type}
                            {...register(name)}
                        />
                    </div>
                    {error?.message && <p className="text-xs text-red-400 max-w-75">{error?.message.toString()}</p>}
                </div>
            )}
        </>
    );
}
