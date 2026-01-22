'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BookingSchema } from '@/lib/validation/booking.form';

import { CalendarDays, Info } from 'lucide-react';

interface RentDetailsProps {
    register: UseFormRegister<BookingSchema>;
    errors: FieldErrors<BookingSchema>;
    pickupDatetime: string;
    setPickupDatetime: React.Dispatch<React.SetStateAction<string>>;
    returnDatetime: string;
    setReturnDatetime: React.Dispatch<React.SetStateAction<string>>;
}

export default function RentDetails({
    register,
    errors,
    pickupDatetime,
    setPickupDatetime,
    returnDatetime,
    setReturnDatetime,
}: RentDetailsProps) {
    const getDatePart = (dt: string) => (dt ? dt.slice(0, 10) : '');
    const getTimePart = (dt: string) => (dt ? dt.slice(11, 16) : '');

    return (
        <section className="bg-white dark:bg-slate-850 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-neutral-light dark:bg-slate-800/50">
                <h2 className="text-neutral-dark dark:text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <CalendarDays size={22} />
                    </span>
                    1. Chi tiết thuê xe
                </h2>
            </div>
            <div className="p-6 flex flex-col gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3 items-start">
                    <span className="material-symbols-outlined text-primary mt-0.5">
                        <Info size={22} />
                    </span>
                    <div className="text-sm">
                        <p className="font-bold text-neutral-dark dark:text-white mb-1">Giờ hoạt động giao nhận xe</p>
                        <p className="text-slate-600 dark:text-slate-300">
                            Chúng tôi hỗ trợ giao nhận xe từ{' '}
                            <span className="font-bold text-primary">7:00 AM đến 22:00 PM</span> hàng ngày. Vui lòng
                            chọn thời gian trong khung giờ này.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="text-neutral-dark dark:text-white text-sm font-bold">Thời gian thuê</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-slate-500 font-medium">Ngày nhận xe</span>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-800/50 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                                    <input
                                        className="bg-transparent border-none p-0 text-neutral-dark dark:text-white focus:ring-0 w-full text-sm font-medium"
                                        type="date"
                                        onClick={(e) => e.currentTarget.showPicker()}
                                        value={getDatePart(pickupDatetime)}
                                        onChange={(e) => {
                                            const time = getTimePart(pickupDatetime) || '08:00';
                                            setPickupDatetime(`${e.target.value}T${time}`);
                                        }}
                                    />
                                </div>
                                {errors.pickupDate?.message && (
                                    <p className="text-xs text-red-400 max-w-75">
                                        {errors.pickupDate?.message.toString()}
                                    </p>
                                )}
                                <div className="flex items-center justify-between border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-800/50 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                                    <input
                                        className="bg-transparent border-none p-0 text-neutral-dark dark:text-white focus:ring-0 w-full text-sm font-medium"
                                        type="time"
                                        onClick={(e) => e.currentTarget.showPicker()}
                                        value={getTimePart(pickupDatetime)}
                                        onChange={(e) => {
                                            const date =
                                                getDatePart(pickupDatetime) || new Date().toISOString().slice(0, 10);
                                            setPickupDatetime(`${date}T${e.target.value}`);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-slate-500 font-medium">Ngày trả xe</span>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-800/50 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                                    <input
                                        className="bg-transparent border-none p-0 text-neutral-dark dark:text-white focus:ring-0 w-full text-sm font-medium"
                                        type="date"
                                        onClick={(e) => e.currentTarget.showPicker()}
                                        value={getDatePart(returnDatetime)}
                                        onChange={(e) => {
                                            const time = getTimePart(returnDatetime) || '08:00';
                                            setReturnDatetime(`${e.target.value}T${time}`);
                                        }}
                                    />
                                </div>
                                {errors.returnDate?.message && (
                                    <p className="text-xs text-red-400 max-w-75">
                                        {errors.returnDate?.message.toString()}
                                    </p>
                                )}
                                <div className="flex items-center justify-between border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-800/50 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                                    <input
                                        className="bg-transparent border-none p-0 text-neutral-dark dark:text-white focus:ring-0 w-full text-sm font-medium"
                                        type="time"
                                        onClick={(e) => e.currentTarget.showPicker()}
                                        value={getTimePart(returnDatetime)}
                                        onChange={(e) => {
                                            const date =
                                                getDatePart(returnDatetime) || new Date().toISOString().slice(0, 10);
                                            setReturnDatetime(`${date}T${e.target.value}`);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="text-neutral-dark dark:text-white text-sm font-bold">
                        Địa điểm giao nhận (Phú Yên)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-neutral-dark dark:text-slate-300">
                                Điểm nhận xe <span className="text-red-500">*</span>
                            </span>
                            <input
                                className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-neutral-dark dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400 text-sm"
                                placeholder="Nhập điểm nhận xe"
                                type="text"
                                {...register('pickupPoint')}
                            />
                            {errors.pickupPoint?.message && (
                                <p className="text-xs text-red-400 max-w-75">
                                    {errors.pickupPoint?.message.toString()}
                                </p>
                            )}
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-neutral-dark dark:text-slate-300">
                                Điểm trả xe <span className="text-red-500">*</span>
                            </span>
                            <input
                                className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 px-4 py-3 text-neutral-dark dark:text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400 text-sm"
                                placeholder="Nhập điểm trả xe"
                                type="text"
                                {...register('returnPoint')}
                            />
                            {errors.returnPoint?.message && (
                                <p className="text-xs text-red-400 max-w-75">
                                    {errors.returnPoint?.message.toString()}
                                </p>
                            )}
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
}
