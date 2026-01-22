'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { bookingSchema, BookingSchema } from '@/lib/validation/booking.form';
import { createBooking } from '@/lib/actions/booking.action';
import { deliveryFee, raincoatFee, scratchInsurance } from '@/lib/utils';

import { usePopup } from '@/hooks/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCouponStore } from '@/store/coupon';
import { useBookingStore } from '@/store/booking';

import { MotorType } from '@/types/motor';

import RentDetails from './services/RentDetails';
import CustomerInfo from './services/CustomerInfo';
import Additional from './services/Additional';
import Summary from './Summary';

type BookingInfoProps = {
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
    motorbike: MotorType;
    pickupDatetime: string;
    setPickupDatetime: React.Dispatch<React.SetStateAction<string>>;
    returnDatetime: string;
    setReturnDatetime: React.Dispatch<React.SetStateAction<string>>;
};

export default function BookingInfo({
    setStep,
    motorbike,
    pickupDatetime,
    setPickupDatetime,
    returnDatetime,
    setReturnDatetime,
}: BookingInfoProps) {
    const popup = usePopup();

    const { coupons, fetchCoupons } = useCouponStore();
    const { customerBookings, fetchCustomerBookings } = useBookingStore();

    useEffect(() => {
        fetchCoupons();
        fetchCustomerBookings();
    }, [fetchCoupons, fetchCustomerBookings]);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm<BookingSchema>({
        resolver: zodResolver(bookingSchema()),
        defaultValues: {
            motorbikeId: motorbike.id,
            isHelmet: true,
        },
    });

    // Đồng bộ datetime từ parent → form
    useEffect(() => {
        setValue('pickupDate', pickupDatetime);
        setValue('returnDate', returnDatetime);
    }, [pickupDatetime, returnDatetime, setValue]);

    // Hidden fields
    useEffect(() => {
        setValue('motorbikeId', motorbike.id);
    }, [motorbike.id, setValue]);

    // Watch values để tính toán
    const watchedValues = useWatch({ control });

    // Tính toán động cho Summary
    let days = 0;
    let rentalPrice = 0;
    let additionalPrice = 0;
    let discountPrice = 0;
    let totalPrice = 0;

    if (watchedValues.pickupDate && watchedValues.returnDate) {
        const start = new Date(watchedValues.pickupDate);
        const end = new Date(watchedValues.returnDate);
        if (end > start) {
            days = Math.ceil((end.getTime() - start.getTime()) / 86400000);
            rentalPrice = motorbike.pricePerDay * days;

            if (watchedValues.isScratch) additionalPrice += scratchInsurance * days;
            if (watchedValues.isRaincoat) additionalPrice += raincoatFee;

            const subtotal = rentalPrice + additionalPrice + deliveryFee;

            const couponCode = watchedValues.coupon || '';
            const appliedCoupon = coupons?.find((c) => c.code === couponCode);
            if (appliedCoupon) {
                discountPrice = subtotal * (appliedCoupon.discount / 100);
            }

            totalPrice = subtotal - discountPrice;
        }
    }

    const services = [
        { name: 'Mũ bảo hiểm chất lượng cao (x2)', price: 0, free: true },
        watchedValues.isScratch ? { name: 'Bảo hiểm trầy xước', price: scratchInsurance * days } : null,
        watchedValues.isRaincoat ? { name: 'Áo mưa tiện lợi (x2)', price: raincoatFee } : null,
    ].filter(Boolean);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isProcessed = useRef(false);

    const [state, formAction] = useActionState(createBooking, {
        success: false,
        error: false,
        message: '',
    });

    const onSubmit = handleSubmit(
        // eslint-disable-next-line react-hooks/refs
        async (formData) => {
            isProcessed.current = false;
            setHasSubmitted(true);

            const data = { ...formData, motorbikeId: motorbike.id };
            startTransition(() => {
                formAction(data);
            });
        },
        (validationErrors) => {
            console.error('Validation failed:', validationErrors);
            // Có thể dùng toast hoặc popup để báo cho user biết họ điền thiếu
            popup.error('Vui lòng kiểm tra lại thông tin còn thiếu');
        },
    );

    const router = useRouter();

    useEffect(() => {
        if (!hasSubmitted) return;

        if (state.success && !isProcessed.current) {
            isProcessed.current = true;
            popup.success('Đăt xe thành công!!');
            router.push('/tai-khoan/dat-xe');

            reset();
            setHasSubmitted(false);
        } else if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Tạo thất bại');
        }
    }, [state, router, hasSubmitted, reset, popup]);

    useEffect(() => {
        if (totalPrice > 0) {
            setValue('price', totalPrice);
        }
    }, [totalPrice, setValue]);

    return (
        <div className="min-h-screen">
            <div className="container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center py-8 px-4 md:px-10 lg:px-20">
                    <div className="flex flex-col max-w-400 flex-1 gap-8">
                        {/* steps */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-neutral-dark dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                                    Hoàn tất đặt xe
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                                    Vui lòng điền thông tin chi tiết để giữ xe {motorbike.name} tại Phú Yên.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <div
                                    onClick={() => setStep(1)}
                                    className="flex items-center gap-2 text-slate-400 hover:text-primary transition cursor-pointer"
                                >
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600">
                                        1
                                    </span>
                                    <span>Chọn xe</span>
                                </div>
                                <div className="w-8 h-px bg-slate-300 dark:bg-slate-600"></div>
                                <div className="flex items-center gap-2 text-primary">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white">
                                        2
                                    </span>
                                    <span>Thông tin</span>
                                </div>
                                {/* <div className="w-8 h-px bg-slate-300 dark:bg-slate-600"></div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600">
                                        3
                                    </span>
                                    <span>Thanh toán</span>
                                </div> */}
                            </div>
                        </div>
                        <form onSubmit={onSubmit} className="flex flex-col lg:flex-row gap-8 relative">
                            {/* services */}
                            <div className="flex-1 flex flex-col gap-8">
                                <RentDetails
                                    register={register}
                                    errors={errors}
                                    pickupDatetime={pickupDatetime}
                                    setPickupDatetime={setPickupDatetime}
                                    returnDatetime={returnDatetime}
                                    setReturnDatetime={setReturnDatetime}
                                />
                                <CustomerInfo
                                    register={register}
                                    errors={errors}
                                    watch={watch}
                                    setValue={setValue}
                                    coupons={coupons}
                                    customerBookings={customerBookings}
                                    popup={popup}
                                />
                                <Additional register={register} errors={errors} />
                            </div>
                            {/* summary */}
                            <Summary
                                motorbike={motorbike}
                                days={days}
                                rentalPrice={rentalPrice}
                                services={services}
                                deliveryFee={deliveryFee}
                                appliedCoupon={coupons?.find((c) => c.code === watchedValues.coupon)}
                                discountPrice={discountPrice}
                                totalPrice={totalPrice}
                                isPending={isPending}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
