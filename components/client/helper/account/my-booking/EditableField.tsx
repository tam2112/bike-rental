import { ReactNode } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { formatDateCalendar } from '@/lib/utils';

interface EditableFieldProps<T extends FieldValues> {
    edit: boolean;
    label: string;
    icon: ReactNode;
    name: Path<T>;
    type?: string;
    value: string | Date;
    register: UseFormRegister<T>;
    error?: FieldError;
}

export default function EditableField<T extends FieldValues>({
    edit,
    label,
    icon,
    name,
    type = 'text',
    value,
    register,
}: EditableFieldProps<T>) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1.5 bg-primary/10 rounded-lg text-primary">{icon}</div>
            <div className="flex-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
                {edit ? (
                    <input
                        type={type}
                        {...register(name)}
                        onClick={(e) => e.currentTarget.showPicker()}
                        className="w-full border text-sm px-2.5 max-sm:px-3 py-1 max-sm:py-2 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-neutral-dark dark:text-white focus:border-primary focus:ring-primary"
                    />
                ) : (
                    <p className="text-sm font-medium text-neutral-dark dark:text-white">
                        {value instanceof Date ? formatDateCalendar(value) : value}
                    </p>
                )}
            </div>
        </div>
    );
}
