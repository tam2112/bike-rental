'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { ratingFeedbackSchema, RatingFeedbackSchema } from '@/lib/validation/rating.form';
import { sendFeedback } from '@/lib/actions/rating.action';

import { CheckCircle, Loader2, SendHorizonal, Sparkle } from 'lucide-react';

import { usePopup } from '@/hooks/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';

import { RatingType } from '@/types/rating';

import { TextareaField } from '../form';

export default function FeedbackCard({
    rating,
    fetchRating,
}: {
    rating: RatingType;
    fetchRating: (id: string) => Promise<void>;
}) {
    const popup = usePopup();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RatingFeedbackSchema>({
        resolver: zodResolver(ratingFeedbackSchema()),
        defaultValues: {
            id: rating.id,
            feedback: rating.feedback || '',
            isPublic: rating.isPublic || false,
        },
    });

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isProcessed = useRef(false);

    const [state, formAction] = useActionState(sendFeedback, {
        success: false,
        error: false,
    });

    // eslint-disable-next-line react-hooks/refs
    const onSubmit = handleSubmit(async (formData) => {
        isProcessed.current = false;
        setHasSubmitted(true);

        // Gửi dữ liệu với danh sách URL thay vì File[]
        const data = { ...formData, id: rating.id };
        startTransition(() => {
            formAction(data);
        });
    });

    const router = useRouter();

    useEffect(() => {
        if (!hasSubmitted) return;

        if (state.success && !isProcessed.current) {
            isProcessed.current = true;
            popup.success('Gửi phản hồi & phê duyệt hiển thị/ẩn thành công!!');
            router.refresh();

            reset();
            setHasSubmitted(false);
            fetchRating(rating.id);
        } else if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Tạo thất bại');
        }
    }, [state, router, hasSubmitted, reset, fetchRating, popup, rating.id]);

    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-6">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <Sparkle size={22} />
                    </span>
                    Phản hồi & Kiểm duyệt
                </h3>
            </div>
            <form onSubmit={onSubmit} className="py-2 flex flex-col gap-2">
                <TextareaField
                    name="feedback"
                    label=""
                    placeholder="Nhập câu trả lời của bạn tới khách hàng..."
                    register={register}
                    error={errors.feedback}
                />
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2 pt-4 border-t border-slate-300 dark:border-slate-700">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <label className="flex items-center gap-2 cursor-pointer select-none group">
                            <div className="relative">
                                <input {...register('isPublic')} className="peer sr-only" type="checkbox" />
                                <div className="block h-8 w-14 rounded-full bg-gray-200 dark:bg-gray-700 peer-checked:bg-green-500 transition-colors"></div>
                                <div className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform peer-checked:translate-x-6 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[14px] text-green-600 opacity-0 peer-checked:opacity-100 transition-opacity">
                                        <CheckCircle size={14} />
                                    </span>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-text-main dark:text-white group-hover:text-primary transition-colors">
                                Phê duyệt hiển thị
                            </span>
                        </label>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 md:flex-none px-8 h-11 rounded-xl bg-primary text-white font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <span className="material-symbols-outlined text-lg">
                                    <SendHorizonal size={18} />
                                </span>
                            )}
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
