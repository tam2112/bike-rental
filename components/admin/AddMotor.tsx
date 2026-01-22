'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motorSchema, MotorSchema } from '@/lib/validation/motor.form';
import { createMotor } from '@/lib/actions/motor.action';
import { uploadImagesToCloudinary } from '@/lib/upload';

import { Save } from 'lucide-react';

import { adminPath, motorPath } from '@/constants/path';
import { usePopup } from '@/hooks/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';

import Loading from '../helper/Loading';
import PageHeader from './helper/PageHeader';
import {
    BasicInfoCard,
    DescriptionCard,
    RentPriceCard,
    StatusCard,
    TechnicalCard,
    UploadImageCard,
} from './helper/add-motor';

export default function AddMotor() {
    const popup = usePopup();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<MotorSchema>({
        resolver: zodResolver(motorSchema()),
    });

    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isProcessed = useRef(false);

    const [state, formAction] = useActionState(createMotor, {
        success: false,
        error: false,
    });

    const processFiles = (files: File[]) => {
        if (files.length > 0) {
            const newPreviews = files.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]);
            setImages((prev) => [...prev, ...files]);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        processFiles(files);
    };

    const handleDropFiles = (files: File[]) => {
        processFiles(files);
    };

    const handleRemoveImage = (index: number) => {
        // Giải phóng bộ nhớ của URL cũ để tránh leak
        URL.revokeObjectURL(previews[index]);
        setPreviews((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    // eslint-disable-next-line react-hooks/refs
    const onSubmit = handleSubmit(async (formData) => {
        setHasSubmitted(true);
        isProcessed.current = false;

        let imageUrls: string[] = [];

        // Upload new images to Cloudinary if there are new files
        if (images.length > 0) {
            try {
                imageUrls = await uploadImagesToCloudinary(images);
            } catch (error) {
                console.log(error);
                popup.error('Tải lên hình ảnh thất bại', 'OOPS');
                return;
            }
        }

        // Gửi dữ liệu với danh sách URL thay vì File[]
        const dataWithImageAndFileUrls = { ...formData, imageUrls };
        startTransition(() => {
            formAction(dataWithImageAndFileUrls);
        });
    });

    const router = useRouter();

    useEffect(() => {
        if (!hasSubmitted) return;

        if (state.success && !isProcessed.current) {
            isProcessed.current = true;

            popup.success('Tạo xe máy thành công!!', 'Tuyệt vời');
            router.refresh();

            reset();
            setImages([]);
            setPreviews([]);
            setHasSubmitted(false);
        } else if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Tạo thất bại', 'OOPS');
        }
    }, [state, router, hasSubmitted, reset, popup]);

    if (isPending) return <Loading />;

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <PageHeader
                breadcrumbs={[
                    { href: adminPath, label: 'Tổng quan' },
                    { href: motorPath, label: 'Kho xe' },
                ]}
                current="Thêm mới"
            />

            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <form onSubmit={onSubmit} className="mx-auto w-full flex flex-col gap-6">
                    {/* heading */}
                    <div className="space-y-1 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-dark dark:text-white">Thông tin xe</h1>
                            <p className="text-slate-500 dark:text-slate-400">
                                Điền đầy đủ thông tin chi tiết và địa điểm xe để đưa vào hệ thống.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                            >
                                Hủy bỏ
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-blue-600 transition-all shadow-sm flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    <Save size={18} />
                                </span>
                                Lưu xe mới
                            </button>
                        </div>
                    </div>
                    {/* form cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <BasicInfoCard register={register} errors={errors} />
                            <DescriptionCard register={register} errors={errors} />
                            <UploadImageCard
                                previews={previews}
                                onImageChange={handleImageChange}
                                onDropFiles={handleDropFiles}
                                onRemoveImage={handleRemoveImage}
                            />
                        </div>
                        <div className="lg:col-span-1 space-y-6">
                            <RentPriceCard register={register} errors={errors} />
                            <TechnicalCard register={register} errors={errors} />
                            <StatusCard register={register} errors={errors} />
                        </div>
                    </div>
                    <div className="md:hidden sticky bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] p-4 border-t border-slate-200 dark:border-slate-800 flex gap-3 z-20">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-primary rounded-lg shadow-lg"
                        >
                            Lưu lại
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
