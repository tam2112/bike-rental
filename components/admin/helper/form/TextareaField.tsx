'use client';

import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface TextareaFieldProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    isRequired?: boolean;
    placeholder: string;
    description?: string;
    className?: string;
    register: UseFormRegister<T>;
    error?: FieldError;
}

export default function TextareaField<T extends FieldValues>({
    name,
    label,
    isRequired = false,
    placeholder,
    description,
    className,
    register,
    error,
}: TextareaFieldProps<T>) {
    return (
        <div className={`${className} space-y-2`}>
            <label className="text-sm font-semibold text-neutral-dark dark:text-slate-300" htmlFor={name}>
                {label} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <textarea
                {...register(name)}
                className="w-full border px-2.5 py-1.5 mt-1 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-neutral-dark dark:text-white focus:border-primary focus:ring-primary"
                placeholder={placeholder}
                rows={4}
            ></textarea>
            {error?.message && <p className="text-xs text-red-400 max-w-75">{error?.message.toString()}</p>}
            {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
    );
}
