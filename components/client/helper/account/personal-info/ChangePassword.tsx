'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { changePasswordSchema, ChangePasswordSchema } from '@/lib/validation/user.form';
import { changePassword } from '@/lib/actions/user.action';

import { Eye, EyeOff } from 'lucide-react';

import { usePopup } from '@/hooks/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ChangePassword() {
    const popup = usePopup();

    const [isEditing, setIsEditing] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isProcessed = useRef(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // 1. State để quản lý ẩn/hiện cho từng trường
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema()),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const [state, formAction] = useActionState(changePassword, {
        success: false,
        error: false,
    });

    // eslint-disable-next-line react-hooks/refs
    const onSubmit = handleSubmit((formData) => {
        isProcessed.current = false;
        setHasSubmitted(true);
        startTransition(() => {
            formAction({ ...formData });
        });
    });

    useEffect(() => {
        if (!hasSubmitted) return;

        if (state.success && !isProcessed.current) {
            isProcessed.current = true;
            popup.success('Đổi mật khẩu thành công!');
            reset();
            setIsEditing(false);
            setHasSubmitted(false);
            // Reset trạng thái ẩn hiện về mặc định
            setShowOldPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        } else if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Đổi mật khẩu thất bại');
        }
    }, [state, hasSubmitted, reset, popup]);

    const handleCancel = () => {
        reset();
        setIsEditing(false);
        setShowOldPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    return (
        <div className="flex flex-col rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-850 shadow-sm">
            <div className="px-6 py-4 border-b border-[#e7edf3] dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#0d141b] dark:text-white">Đổi mật khẩu</h3>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 text-sm font-semibold rounded-lg transition-colors"
                    >
                        Chỉnh sửa
                    </button>
                )}
            </div>

            <div className="p-6 md:p-8">
                <form onSubmit={onSubmit} className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-6 md:w-[calc(100%-18rem-2rem)]">
                        {/* Mật khẩu hiện tại */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <label className="text-sm font-medium text-slate-500 dark:text-slate-400 md:text-right">
                                Mật khẩu hiện tại
                            </label>
                            <div className="md:col-span-3 relative">
                                <input
                                    disabled={!isEditing}
                                    className={`px-2.5 py-1.5 pr-10 border w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 transition-all ${
                                        !isEditing ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''
                                    } ${errors.oldPassword ? 'border-red-400' : ''}`}
                                    placeholder={isEditing ? 'Nhập mật khẩu hiện tại' : '••••••••'}
                                    type={showOldPassword ? 'text' : 'password'}
                                    {...register('oldPassword')}
                                />
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                )}
                                {errors.oldPassword && (
                                    <p className="text-xs text-red-400 mt-1">{errors.oldPassword.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Mật khẩu mới */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <label className="text-sm font-medium text-slate-500 dark:text-slate-400 md:text-right">
                                Mật khẩu mới
                            </label>
                            <div className="md:col-span-3 relative">
                                <input
                                    disabled={!isEditing}
                                    className={`px-2.5 py-1.5 pr-10 border w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 transition-all ${
                                        !isEditing ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''
                                    } ${errors.newPassword ? 'border-red-400' : ''}`}
                                    placeholder={isEditing ? 'Nhập mật khẩu mới' : '••••••••'}
                                    type={showNewPassword ? 'text' : 'password'}
                                    {...register('newPassword')}
                                />
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                )}
                                {errors.newPassword && (
                                    <p className="text-xs text-red-400 mt-1">{errors.newPassword.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Xác nhận mật khẩu mới */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            <label className="text-sm font-medium text-slate-500 dark:text-slate-400 md:text-right">
                                Xác nhận mật khẩu mới
                            </label>
                            <div className="md:col-span-3 relative">
                                <input
                                    disabled={!isEditing}
                                    className={`px-2.5 py-1.5 pr-10 border w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 transition-all ${
                                        !isEditing ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''
                                    } ${errors.confirmNewPassword ? 'border-red-400' : ''}`}
                                    placeholder={isEditing ? 'Nhập lại mật khẩu mới' : '••••••••'}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirmNewPassword')}
                                />
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                )}
                                {errors.confirmNewPassword && (
                                    <p className="text-xs text-red-400 mt-1">{errors.confirmNewPassword.message}</p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 mt-2">
                                <div className="md:col-start-2 md:col-span-3 flex gap-4">
                                    <button
                                        disabled={isPending}
                                        className="px-6 py-2.5 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50"
                                        type="submit"
                                    >
                                        {isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 font-medium rounded-lg transition-colors"
                                        type="button"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
