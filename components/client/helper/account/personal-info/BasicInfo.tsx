'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { basicInfoSchema, BasicInfoSchema } from '@/lib/validation/user.form';
import { updateBasicInfo } from '@/lib/actions/user.action';
import { uploadImagesToCloudinary } from '@/lib/upload';
import { formatIDCard, formatPhoneNumberRegex } from '@/lib/utils';

import { usePopup } from '@/hooks/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '@/store/user';
import { assets } from '@/public/assets';

import { BasicInfoSkeleton } from '../../skeleton';

export default function BasicInfo() {
    const popup = usePopup();
    const router = useRouter();
    const { currentUser, fetchCurrentUser, isLoading } = useUserStore();

    // 1. State điều khiển chế độ chỉnh sửa
    const [isEditing, setIsEditing] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isProcessed = useRef(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BasicInfoSchema>({
        resolver: zodResolver(basicInfoSchema()),
        defaultValues: {
            fullName: currentUser?.fullName || '',
            phone: formatPhoneNumberRegex(currentUser?.phone || ''),
            idCard: currentUser?.idCard || '',
            location: currentUser?.location || '',
        },
    });

    // Cập nhật giá trị form khi currentUser thay đổi (lần đầu load)
    useEffect(() => {
        if (currentUser) {
            reset({
                fullName: currentUser.fullName,
                phone: formatPhoneNumberRegex(currentUser.phone || ''),
                idCard: formatIDCard(currentUser.idCard || ''),
                location: currentUser.location || '',
                avatarUrls: currentUser.avatar[0]?.url ? [currentUser.avatar[0].url] : [],
            });
        }
    }, [currentUser, reset]);

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    const [state, formAction] = useActionState(updateBasicInfo, {
        success: false,
        error: false,
    });

    // Xử lý khi chọn ảnh
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            setImages([file]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews([reader.result as string]);
            };
            reader.readAsDataURL(file);
        }
    };

    // eslint-disable-next-line react-hooks/refs
    const onSubmit = handleSubmit(async (formData) => {
        isProcessed.current = false;
        setHasSubmitted(true);

        let finalAvatarUrls = formData.avatarUrls || [];
        if (images.length > 0) {
            try {
                finalAvatarUrls = await uploadImagesToCloudinary(images);
            } catch (error) {
                console.error(error);
                popup.error('Tải lên hình ảnh thất bại', 'OOPS');
                setHasSubmitted(false);
                return;
            }
        }

        const data = { ...formData, avatarUrls: finalAvatarUrls };
        startTransition(() => {
            formAction(data);
        });
    });

    useEffect(() => {
        if (!hasSubmitted) return;

        if (state.success && !isProcessed.current) {
            isProcessed.current = true;
            popup.success('Thay đổi thông tin thành công!!');
            setIsEditing(false); // Thoát chế độ chỉnh sửa
            setImages([]);
            setPreviews([]);
            router.refresh();
            fetchCurrentUser();
            setHasSubmitted(false);
        } else if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Thay đổi thông tin thất bại');
        }
    }, [state, router, hasSubmitted, fetchCurrentUser, popup]);

    const handleCancel = () => {
        reset(); // Reset form về defaultValues
        setPreviews([]);
        setImages([]);
        setIsEditing(false);
    };

    if (isLoading || !currentUser) {
        return <BasicInfoSkeleton />;
    }

    return (
        <div className="flex flex-col rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-850 shadow-sm">
            <div className="px-6 py-4 border-b border-[#e7edf3] dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#0d141b] dark:text-white">Thông tin cơ bản</h3>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 text-sm font-semibold rounded-lg transition-colors"
                    >
                        Chỉnh sửa
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="p-6 md:p-8 flex flex-col-reverse md:flex-row gap-8">
                <div className="flex-1">
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Full Name */}
                            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                <label className="text-sm font-medium text-slate-500 dark:text-slate-400 md:text-right">
                                    Họ và tên
                                </label>
                                <div className="md:col-span-3">
                                    <input
                                        disabled={!isEditing}
                                        className={`border px-2.5 py-1.5 w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 ${
                                            !isEditing && 'opacity-70 cursor-not-allowed'
                                        }`}
                                        type="text"
                                        {...register('fullName')}
                                    />
                                    {errors.fullName?.message && (
                                        <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email - Luôn disabled vì không cho sửa trong form này */}
                            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                <label className="text-sm font-medium text-slate-500 dark:text-slate-400 md:text-right">
                                    Email
                                </label>
                                <div className="md:col-span-3">
                                    <span className="text-slate-900 dark:text-white font-medium">
                                        {currentUser?.email}
                                    </span>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                <label className="text-sm font-medium text-slate-500 dark:text-slate-400 md:text-right">
                                    Số điện thoại
                                </label>
                                <div className="md:col-span-3">
                                    <input
                                        disabled={!isEditing}
                                        className={`border px-2.5 py-1.5 w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 ${
                                            !isEditing && 'opacity-70 cursor-not-allowed'
                                        }`}
                                        type="text"
                                        {...register('phone', {
                                            onChange: (e) => {
                                                // Tự động format khi người dùng gõ
                                                e.target.value = formatPhoneNumberRegex(e.target.value);
                                            },
                                        })}
                                    />
                                    {errors.phone?.message && (
                                        <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* ID Card */}
                            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                                <label className="text-sm font-medium text-slate-500 dark:text-slate-400 md:text-right">
                                    Số CCCD/CMND
                                </label>
                                <div className="md:col-span-3">
                                    <input
                                        disabled={!isEditing}
                                        className={`border px-2.5 py-1.5 w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 uppercase ${
                                            !isEditing && 'opacity-70 cursor-not-allowed'
                                        }`}
                                        type="text"
                                        {...register('idCard', {
                                            onChange: (e) => {
                                                e.target.value = formatIDCard(e.target.value);
                                            },
                                        })}
                                    />
                                    {errors.idCard?.message && (
                                        <p className="text-xs text-red-400 mt-1">{errors.idCard.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-2 md:gap-4">
                                <label className="text-sm font-medium text-slate-500 dark:text-slate-400 md:text-right pt-2">
                                    Địa chỉ
                                </label>
                                <div className="md:col-span-3">
                                    <textarea
                                        disabled={!isEditing}
                                        className={`border px-2.5 py-1.5 w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-primary focus:ring-primary/50 resize-none ${
                                            !isEditing && 'opacity-70 cursor-not-allowed'
                                        }`}
                                        rows={3}
                                        {...register('location')}
                                    />
                                </div>
                            </div>

                            {/* Nút điều khiển khi Editing */}
                            {isEditing && (
                                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 mt-4">
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
                    </div>
                </div>

                {/* Phần ảnh đại diện */}
                <div className="flex flex-col items-center justify-start gap-4 md:w-64 border-l border-transparent md:border-slate-100 md:dark:border-slate-700 md:pl-8">
                    <div className="relative group">
                        <div className="aspect-square bg-cover rounded-full h-32 w-32 ring-4 ring-slate-50 dark:ring-slate-700 shadow-sm overflow-hidden relative">
                            <Image
                                src={
                                    previews[0] ||
                                    (typeof currentUser?.avatar?.[0] === 'string'
                                        ? currentUser.avatar[0]
                                        : currentUser?.avatar?.[0]?.url) ||
                                    assets.sample_profile
                                }
                                alt="profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {isEditing && (
                        <>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/jpeg,image/png"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                Chọn ảnh
                            </button>
                            <div className="text-center px-4">
                                <p className="text-xs text-slate-400">Dung lượng file tối đa 1 MB</p>
                                <p className="text-xs text-slate-400">Định dạng: .JPEG, .PNG</p>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
