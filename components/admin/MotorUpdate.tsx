'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { motorSchema, MotorSchema } from '@/lib/validation/motor.form';
import { getMotorById, updateMotor } from '@/lib/actions/motor.action';
import { uploadImagesToCloudinary } from '@/lib/upload';

import { Trash2 } from 'lucide-react';

import { adminPath, motorPath } from '@/constants/path';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePopup } from '@/hooks/usePopup';

import { MotorType } from '@/types/motor';

import PageHeader from './helper/PageHeader';
import Loading from '../helper/Loading';
import { BasicInfoForm, ImageForm, StatusAndPriceForm, TechnicalForm } from './helper/motor-update';

export default function MotorUpdate({ id, data }: { id: string; data: MotorType | null }) {
    const popup = usePopup();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<MotorSchema>({
        resolver: zodResolver(motorSchema()),
        defaultValues: {
            id,
        },
    });

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [images, setImages] = useState<(File | null)[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();
    const isProcessed = useRef(false);

    const [state, formAction] = useActionState(updateMotor, {
        success: false,
        error: false,
    });

    useEffect(() => {
        const fetchMotorData = async () => {
            if (!id) return;

            try {
                const motor = await getMotorById(id);
                if (!motor) {
                    popup.error('Không tìm thấy xe máy', 'Lỗi');
                    return;
                }

                // Set form values
                setValue('name', motor.name);
                setValue('brand', motor.brand);
                setValue('model', motor.model);
                setValue('year', motor.year);
                setValue('licensePlateNum', motor.licensePlateNum);
                setValue('color', motor.color!);
                setValue('engineCapacity', motor.engineCapacity);
                setValue('fuelType', motor.fuelType);
                setValue('consume', motor.consume || '');
                setValue('fuelCapacity', motor.fuelCapacity || '');
                setValue('weight', motor.weight);
                setValue('pricePerDay', motor.pricePerDay);
                setValue('description', motor.description);
                setValue('odoNum', motor.odoNum);
                setValue('seat', motor.seat);
                setValue('situation', motor.situation || '');
                setValue('statusId', motor.statusId);

                // Set images
                if (motor.images && motor.images.length > 0) {
                    const urls = motor.images.map((img) => img.url);
                    setPreviews(urls);
                    setImages(new Array(urls.length).fill(null)); // Khởi tạo mảng images bằng null
                }
            } catch (error) {
                console.error('Error fetching course:', error);
                popup.error('Tải thất bại', 'Lỗi');
            }
        };

        fetchMotorData();
    }, [id, setValue, popup]);

    // Xử lý chung cho cả input và drop
    const addFiles = (files: File[]) => {
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviews]);
        setImages((prev) => [...prev, ...files]);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        addFiles(files);
    };

    const handleRemoveImage = (index: number) => {
        // Nếu là ảnh mới (blob), thu hồi URL để tránh leak bộ nhớ
        if (previews[index].startsWith('blob:')) {
            URL.revokeObjectURL(previews[index]);
        }
        setPreviews((prev) => prev.filter((_, i) => i !== index));
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    // eslint-disable-next-line react-hooks/refs
    const onSubmit = handleSubmit(async (formData) => {
        setHasSubmitted(true);
        isProcessed.current = false;

        try {
            const finalImageUrls: string[] = [...previews];

            // Tìm các file cần upload (những vị trí trong mảng images là File object)
            const filesToUpload: File[] = [];
            const uploadMap: { fileIdx: number; finalIdx: number }[] = [];

            images.forEach((item, index) => {
                if (item instanceof File) {
                    filesToUpload.push(item);
                    uploadMap.push({ fileIdx: filesToUpload.length - 1, finalIdx: index });
                }
            });

            if (filesToUpload.length > 0) {
                const uploadedUrls = await uploadImagesToCloudinary(filesToUpload);
                uploadMap.forEach((map) => {
                    finalImageUrls[map.finalIdx] = uploadedUrls[map.fileIdx];
                });
            }

            // Lọc bỏ các URL blob (nếu có lỗi) hoặc các giá trị rỗng
            const cleanImageUrls = finalImageUrls.filter((url) => url && !url.startsWith('blob:'));

            const dataWithImage = {
                ...formData,
                id,
                imageUrls: cleanImageUrls,
            };

            startTransition(() => {
                formAction(dataWithImage);
            });
        } catch (error) {
            console.error(error);
            popup.error('Lỗi khi tải ảnh lên Cloudinary', 'Lỗi');
            setHasSubmitted(false);
        }
    });

    const router = useRouter();

    useEffect(() => {
        if (!hasSubmitted) return;

        if (state.success && !isProcessed.current) {
            router.back();
            isProcessed.current = true;
            popup.success('Cập nhật xe máy thành công!!', 'Tuyệt vời');
        } else if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Cập nhật thất bại');
            setHasSubmitted(false);
        }
    }, [state, router, hasSubmitted, popup]);

    if (isPending) {
        return <Loading />;
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            <PageHeader
                breadcrumbs={[
                    { href: adminPath, label: 'Tổng quan' },
                    { href: motorPath, label: 'Kho xe' },
                ]}
                current={`Chỉnh sửa xe`}
            />
            {/* form */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="mx-auto w-full flex flex-col gap-6">
                    {/* heading */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                    Chỉnh sửa thông tin xe
                                </h1>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                <p>
                                    Cập nhật thông tin chi tiết cho xe{' '}
                                    <span className="text-primary">
                                        {data?.name} &bull; {data?.licensePlateNum}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 items-center">
                            <button className="flex items-center justify-center h-10 px-4 rounded-lg border border-red-300 dark:border-red-600 bg-white dark:bg-red-800 text-red-700 dark:text-red-200 hover:bg-red-50 dark:hover:bg-red-700 text-sm font-semibold gap-2 transition-all">
                                <span className="material-symbols-outlined text-[20px]">
                                    <Trash2 size={20} />
                                </span>
                                <span>Xóa xe</span>
                            </button>
                        </div>
                    </div>
                    {/* cards */}
                    <form onSubmit={onSubmit} className="flex flex-col gap-8">
                        <ImageForm
                            previews={previews}
                            onImageChange={handleImageChange}
                            onDropFiles={addFiles}
                            onRemoveImage={handleRemoveImage}
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 flex flex-col gap-8">
                                <BasicInfoForm register={register} errors={errors} data={data} />
                                <TechnicalForm register={register} errors={errors} />
                            </div>
                            <div className="lg:col-span-1 flex flex-col gap-8">
                                <StatusAndPriceForm register={register} errors={errors} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
