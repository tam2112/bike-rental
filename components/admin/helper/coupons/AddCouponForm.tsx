'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { couponSchema, CouponSchema } from '@/lib/validation/coupon.form';
import { createCoupon } from '@/lib/actions/coupon.action';
import { today } from '@/lib/utils';

import { usePopup } from '@/hooks/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2, TicketPercent } from 'lucide-react';

import { CheckboxField, InputField } from '../form';

interface AddCouponFormProps {
    fetchCoupons: () => Promise<void>;
}

export default function AddCouponForm({ fetchCoupons }: AddCouponFormProps) {
    const popup = usePopup();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CouponSchema>({
        resolver: zodResolver(couponSchema()),
    });

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isProcessed = useRef(false);

    const [state, formAction] = useActionState(createCoupon, {
        success: false,
        error: false,
    });

    // eslint-disable-next-line react-hooks/refs
    const onSubmit = handleSubmit(async (formData) => {
        isProcessed.current = false;
        setHasSubmitted(true);

        // Gửi dữ liệu với danh sách URL thay vì File[]
        const data = { ...formData };
        startTransition(() => {
            formAction(data);
        });
    });

    const router = useRouter();

    useEffect(() => {
        if (!hasSubmitted) return;

        if (state.success && !isProcessed.current) {
            isProcessed.current = true;
            popup.success('Tạo mã giảm giá thành công!!');
            router.refresh();

            reset();
            setHasSubmitted(false);
            fetchCoupons();
        } else if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Tạo thất bại');
        }
    }, [state, router, hasSubmitted, reset, fetchCoupons, popup]);

    return (
        <form onSubmit={onSubmit} className="max-w-5xl flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-neutral-dark dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">
                            <TicketPercent size={22} />
                        </span>
                        Thông tin phiếu
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* code */}
                    <InputField
                        name="code"
                        label="Mã giảm giá"
                        isRequired
                        type="text"
                        placeholder="VD: NEW20, MEM20, .."
                        register={register}
                        error={errors.code}
                    />
                    {/* discount */}
                    <InputField
                        name="discount"
                        label="Số phần trăm giảm (%)"
                        isRequired
                        type="number"
                        placeholder="10"
                        register={register}
                        error={errors.discount}
                    />
                    {/* description */}
                    <InputField
                        name="description"
                        label="Mô tả"
                        isRequired
                        type="text"
                        placeholder="VD: cho khách hàng mới, cho thành viên, ..."
                        register={register}
                        error={errors.description}
                    />
                    {/* expired at */}
                    <div className={`space-y-2`}>
                        <label
                            className="text-sm font-semibold text-neutral-dark dark:text-slate-300"
                            htmlFor="expiredAt"
                        >
                            Ngày hết hạn
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                className="w-full border px-2.5 mt-1 py-1.5 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-neutral-dark dark:text-white focus:border-primary focus:ring-primary cursor-pointer"
                                id="expiredAt"
                                min={today}
                                type="date"
                                onClick={(e) => e.currentTarget.showPicker()}
                                {...register('expiredAt')}
                            />
                        </div>
                        {errors.expiredAt?.message && (
                            <p className="text-xs text-red-400 max-w-75">{errors.expiredAt?.message.toString()}</p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CheckboxField
                        name="forNewUser"
                        label="Cho khách hàng mới"
                        isCoupon
                        register={register}
                        error={errors.forNewUser}
                    />
                    <CheckboxField
                        name="forMember"
                        label="Cho khách hàng thân thiết"
                        isCoupon
                        register={register}
                        error={errors.forMember}
                    />
                    <CheckboxField
                        name="isPublic"
                        label="Công khai"
                        isCoupon
                        register={register}
                        error={errors.isPublic}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-fit px-4 py-3 text-sm font-semibold text-white bg-primary rounded-lg shadow-lg flex items-center justify-center mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    Thêm mã giảm giá {isPending && <Loader2 size={14} className="ml-1 animate-spin" />}
                </button>
            </div>
        </form>
    );
}
