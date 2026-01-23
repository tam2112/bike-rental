'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { updateBookingSchema, UpdateBookingSchema } from '@/lib/validation/booking.form';
import { cancelBooking, updateBooking } from '@/lib/actions/booking.action';
import { currency, isBookingCancellable, thousandSeparator } from '@/lib/utils';

import { CalendarCheck, CalendarDays, Edit, Loader2, MapPinned, Save, User2, X } from 'lucide-react';

import { usePopup } from '@/hooks/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBookingStore } from '@/store/booking';
import { assets } from '@/public/assets';

import { BookingType } from '@/types/booking';

import StatusBadge from '@/components/admin/helper/StatusBadge';
import EditableField from './EditableField';
import { useMediaQuery } from 'react-responsive';

export default function UpcomingTrip({ booking }: { booking: BookingType }) {
    const {
        id,
        motorbike,
        pickupDate,
        returnDate,
        pickupPoint,
        returnPoint,
        price,
        status,
        isCouponUsed,
        coupon,
        isHelmet,
        isScratch,
        isRaincoat,
    } = booking;

    const [isCancelling, setIsCancelling] = useState(false);
    const [edit, setEdit] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const canModify = isBookingCancellable(pickupDate);
    const showCancelButton = canModify && !edit;
    const showEditButton = !edit && canModify;

    const router = useRouter();

    const { fetchCustomerBookings, fetchUpcomingTrips } = useBookingStore();
    const popup = usePopup();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateBookingSchema>({
        resolver: zodResolver(updateBookingSchema()),
        defaultValues: {
            id,
            motorbikeId: motorbike.id,
            pickupDate: pickupDate.toISOString().slice(0, 16),
            returnDate: returnDate.toISOString().slice(0, 16),
            pickupPoint,
            returnPoint,
            isCouponUsed,
            coupon: coupon || '',
            isHelmet,
            isScratch,
            isRaincoat,
        },
    });

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isProcessed = useRef(false);

    const [state, formAction] = useActionState(updateBooking, {
        success: false,
        error: false,
    });

    const onSubmit = handleSubmit(async (formData) => {
        isProcessed.current = false;
        setHasSubmitted(true);

        // Gửi dữ liệu với danh sách URL thay vì File[]
        const data = { ...formData, id, motorbikeId: motorbike.id };
        startTransition(() => {
            formAction(data);
        });
    });

    useEffect(() => {
        if (!hasSubmitted) return;

        if (state.success && !isProcessed.current) {
            isProcessed.current = true;
            popup.success('Thay đổi thông tin thành công!!');
            router.refresh();

            reset();
            setEdit(false);
            setHasSubmitted(false);
            fetchCustomerBookings();
            fetchUpcomingTrips();
        } else if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Thay đổi thất bại');
        }
    }, [state, router, hasSubmitted, reset, fetchCustomerBookings, fetchUpcomingTrips, popup]);

    const handleCancelBooking = async () => {
        setIsCancelling(true);
        try {
            const response = await cancelBooking(booking.id);
            if (response.success) {
                popup.success('Hủy đặt xe thành công!!');
                fetchCustomerBookings();
                fetchUpcomingTrips();
            } else {
                popup.error(response.message || 'Có lỗi xảy ra khi hủy');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsCancelling(false);
        }
    };

    const confirmCancel = () => {
        popup.confirm(
            `Bạn có chắc chắn muốn hủy đặt xe "${motorbike.name}" không? Hành động này không thể hoàn tác.`,
            () => handleCancelBooking(),
            'Xác nhận hủy',
        );
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-neutral-light dark:border-slate-700 overflow-hidden flex flex-col md:flex-row group transition-all hover:shadow-md hover:border-primary/30">
                    <div className="w-full md:w-64 h-48 md:h-auto relative max-sm:flex max-sm:justify-center">
                        <Image
                            src={motorbike.images[0].url || assets.xe_may_2}
                            alt="img"
                            width={256}
                            height={192}
                            className="translate-y-10 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                            <StatusBadge status={status.name} />
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="p-6 flex flex-col flex-1 justify-between sm:mt-0 mt-10">
                        <div className="flex flex-row justify-between items-start gap-4 mb-4">
                            <div>
                                <div className="flex max-sm:flex-col sm:items-center sm:gap-2 gap-1 mb-1">
                                    <h4 className="text-xl font-bold text-neutral-dark dark:text-white line-clamp-2">
                                        {motorbike.name}
                                    </h4>
                                    <span className="px-2 py-0.5 w-fit bg-neutral-light dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded font-mono font-medium">
                                        {motorbike.licensePlateNum}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Mã đặt xe:{' '}
                                    <span className="font-medium text-neutral-dark dark:text-white">
                                        {id.slice(0, 15)}
                                    </span>
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold text-primary">
                                    {thousandSeparator(price)}
                                    {currency}
                                </span>
                                <p className="text-xs text-slate-400">Tổng thanh toán</p>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-6">
                            <EditableField
                                edit={edit}
                                label="Thời gian nhận xe"
                                icon={<CalendarDays size={18} />}
                                name="pickupDate"
                                type="datetime-local"
                                value={pickupDate}
                                register={register}
                                error={errors.pickupDate}
                            />
                            <EditableField
                                edit={edit}
                                label="Thời gian trả xe"
                                icon={<CalendarCheck size={18} />}
                                name="returnDate"
                                type="datetime-local"
                                value={returnDate}
                                register={register}
                                error={errors.returnDate}
                            />
                            <EditableField
                                edit={edit}
                                label="Địa điểm nhận xe"
                                icon={<CalendarCheck size={18} />}
                                name="pickupPoint"
                                type="text"
                                value={pickupPoint}
                                register={register}
                                error={errors.pickupPoint}
                            />
                            <EditableField
                                edit={edit}
                                label="Địa điểm trả xe (dự kiến)"
                                icon={<MapPinned size={18} />}
                                name="returnPoint"
                                type="text"
                                value={returnPoint}
                                register={register}
                                error={errors.returnPoint}
                            />
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-neutral-light dark:border-slate-700/50">
                            <div className="flex items-center gap-4">
                                {showEditButton && (
                                    <button
                                        type="button"
                                        onClick={() => setEdit(true)}
                                        className="flex items-center gap-2 px-6 py-2 bg-primary text-white hover:bg-primary-dark rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <Edit size={18} /> {!isMobile && 'Chỉnh sửa'}
                                    </button>
                                )}
                                {edit && (
                                    <>
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 px-6 py-2 bg-accent text-white hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            {isPending ? (
                                                <Loader2 size={18} className="animate-spin" />
                                            ) : (
                                                <Save size={18} />
                                            )}
                                            Lưu thay đổi
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEdit(false)}
                                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-neutral-dark dark:text-slate-300 hover:bg-neutral-light dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <X size={18} /> Hủy
                                        </button>
                                    </>
                                )}
                                {!edit && (
                                    <button
                                        type="button"
                                        onClick={() => router.push('/lien-he')}
                                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-neutral-dark dark:text-slate-300 hover:bg-neutral-light dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            <User2 size={18} />
                                        </span>
                                        {!isMobile ? 'Liên hệ hỗ trợ' : 'Hỗ trợ'}
                                    </button>
                                )}
                            </div>
                            {showCancelButton && (
                                <button
                                    type="button"
                                    onClick={confirmCancel}
                                    disabled={isCancelling}
                                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isCancelling ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        'Hủy đặt xe'
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
