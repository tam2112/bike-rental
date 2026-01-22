'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ratingSchema, RatingSchema } from '@/lib/validation/rating.form';
import { createRating } from '@/lib/actions/rating.action';
import { formatDate } from '@/lib/utils';

import { CalendarDays, Loader2, NotebookPen, Send, Star, X } from 'lucide-react';

import { usePopup } from '@/hooks/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';
import { RATING_LABELS } from '@/constants/rating';
import { assets } from '@/public/assets';

interface RatingModalProps {
    userId: string;
    motorbikeId: string;
    bookingId: string;
    motorbikeName: string;
    motorbikeImages: { url: string }[];
    pickupDate: Date;
    returnDate: Date;
    setShowRating: Dispatch<SetStateAction<boolean>>;
    fetchRating: (newRating: number) => void;
}

export default function RatingModal({
    userId,
    motorbikeId,
    bookingId,
    motorbikeName,
    motorbikeImages,
    pickupDate,
    returnDate,
    setShowRating,
    fetchRating,
}: RatingModalProps) {
    const popup = usePopup();
    const [rating, setRating] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<RatingSchema>({
        resolver: zodResolver(ratingSchema()),
        defaultValues: {
            userId,
            motorbikeId,
            bookingId,
            rating: 0,
        },
    });

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isProcessed = useRef(false);

    const [state, formAction] = useActionState(createRating, {
        success: false,
        error: false,
    });

    // eslint-disable-next-line react-hooks/refs
    const onSubmit = handleSubmit(async (formData) => {
        isProcessed.current = false;
        setHasSubmitted(true);

        // Gửi dữ liệu với danh sách URL thay vì File[]
        const data = { ...formData, userId, motorbikeId, bookingId, rating };
        startTransition(() => {
            formAction(data);
        });
        console.log(formData);
    });

    const router = useRouter();

    useEffect(() => {
        if (!hasSubmitted) return;

        if (state.success) {
            isProcessed.current = true;
            popup.success('Đánh giá thành công!!');
            router.refresh();

            reset();
            setHasSubmitted(false);
            setShowRating(false);
            fetchRating(rating);
        } else if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Đánh giá thất bại');
        }
    }, [state, router, hasSubmitted, reset, setShowRating, popup, fetchRating, rating]);

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* backdrop */}
            <div onClick={() => setShowRating(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>
            {/* modal */}
            <form
                onSubmit={onSubmit}
                className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-[#1A2633] shadow-2xl border border-slate-100 dark:border-slate-700 z-10"
            >
                {/* border */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary to-blue-400"></div>
                {/* section */}
                <div className="px-6 pt-8 pb-4 sm:p-8 sm:pb-4">
                    {/* Close Button */}
                    <button
                        onClick={() => setShowRating(false)}
                        className="absolute right-4 top-4 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors"
                    >
                        <span className="material-symbols-outlined font-light text-2xl">
                            <X size={24} />
                        </span>
                    </button>
                    {/* Title & Intro */}
                    <div className="text-center sm:text-left mb-6">
                        <h3
                            className="text-2xl font-bold leading-6 text-text-primary-light dark:text-text-primary-dark mb-2"
                            id="modal-title"
                        >
                            Đánh giá chuyến đi
                        </h3>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi tại Phú Yên. Ý kiến của bạn giúp chúng tôi
                            phục vụ tốt hơn.
                        </p>
                    </div>
                    {/* Vehicle Card (Distinctive Layout) */}
                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 mb-8">
                        <div className="shrink-0 relative w-20 h-20 rounded-lg overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-100/10">
                            <div className="absolute inset-0 bg-cover bg-center">
                                <Image
                                    src={motorbikeImages[0].url || assets.xe_may_2}
                                    alt=""
                                    width={80}
                                    height={80}
                                    className="object-cover h-20"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <p className="text-sm font-medium text-primary mb-0.5 uppercase tracking-wide">Đã thuê</p>
                            <h4 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark truncate">
                                {motorbikeName}
                            </h4>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] align-text-bottom">
                                    <CalendarDays size={14} />
                                </span>
                                {formatDate(pickupDate)} - {formatDate(returnDate)}
                            </p>
                        </div>
                    </div>
                    {/* Rating Section */}
                    <div className="flex flex-col items-center justify-center mb-8">
                        <span className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                            Bạn cảm thấy chiếc xe này thế nào?
                        </span>
                        <div className="flex items-center justify-center mb-4">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    className={`size-8 cursor-pointer ${
                                        rating > i ? 'text-accent fill-current' : 'text-gray-300'
                                    }`}
                                    onClick={() => {
                                        setRating(i + 1);
                                        setValue('rating', i + 1, { shouldValidate: true });
                                    }}
                                />
                            ))}
                        </div>
                        <div className="mt-2 h-5">
                            {rating > 0 && (
                                <p className="text-xs font-medium text-primary text-center animate-in fade-in slide-in-from-top-1">
                                    {RATING_LABELS[rating]}
                                </p>
                            )}
                        </div>
                        <input
                            type="number"
                            {...register('rating', { valueAsNumber: true })}
                            value={rating}
                            className="hidden"
                            min={1}
                            max={5}
                        />
                        {errors.rating && (
                            <p className="text-xs text-red-400 max-w-75 mb-4">{errors.rating.message?.toString()}</p>
                        )}
                    </div>
                    {/* Review Textarea */}
                    <div className="mb-6">
                        <label
                            className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2"
                            htmlFor="review"
                        >
                            Chia sẻ thêm chi tiết (Không bắt buộc)
                        </label>
                        <div className="relative">
                            <textarea
                                className="block w-full rounded-xl border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark shadow-sm focus:border-primary focus:ring-primary sm:text-sm resize-none p-3 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                id="review"
                                placeholder="Xe chạy êm, động cơ khỏe, leo dốc tốt..."
                                rows={4}
                                {...register('review')}
                            ></textarea>
                            {/* Character count or hint icon */}
                            <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500 pointer-events-none">
                                <span className="material-symbols-outlined text-base">
                                    <NotebookPen size={16} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Actions */}
                <div className="bg-gray-50 dark:bg-gray-800/80 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8 border-t border-gray-100 dark:border-gray-700">
                    <button
                        disabled={rating === 0 || isPending}
                        className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover sm:ml-3 sm:w-auto transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                        type="submit"
                    >
                        {isPending ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <span className="material-symbols-outlined text-[18px]">
                                <Send size={18} />
                            </span>
                        )}
                        Gửi đánh giá
                    </button>
                    <button
                        onClick={() => setShowRating(false)}
                        className="mt-3 inline-flex w-full justify-center rounded-lg bg-white dark:bg-transparent px-5 py-2.5 text-sm font-semibold text-text-primary-light dark:text-text-primary-dark shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 sm:mt-0 sm:w-auto transition-all"
                        type="button"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}
