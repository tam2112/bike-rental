'use client';

import { ReactNode, useState } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    type: string;
    icon: ReactNode;
    placeholder: string;
    className?: string;
    disabled?: boolean;
    register: UseFormRegister<T>;
    error?: FieldError;
}

export default function InputField<T extends FieldValues>({
    name,
    label,
    type,
    icon,
    placeholder,
    className,
    disabled,
    register,
    error,
}: InputFieldProps<T>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            {name === 'password' ||
            name === 'confirmPassword' ||
            name === 'newPassword' ||
            name === 'confirmNewPassword' ? (
                <div className="flex flex-col gap-2">
                    <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold" htmlFor={name}>
                        {label}
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 text-[20px]">{icon}</span>
                        </div>
                        <input
                            className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400"
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
                <div className="flex flex-col gap-2">
                    <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold" htmlFor={name}>
                        {label}
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 text-[20px]">{icon}</span>
                        </div>
                        <input
                            className={`w-full h-12 pl-10 pr-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400 ${className}`}
                            id={name}
                            placeholder={placeholder}
                            disabled={disabled}
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
