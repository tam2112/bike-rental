'use client';

import { Dispatch, SetStateAction, useActionState, useEffect, useTransition } from 'react';
import { checkReady } from '@/lib/actions/booking.action';
import { currency, deliveryFee, formatDateTimeLocal, thousandSeparator } from '@/lib/utils';

import { CalendarCheck, CalendarDays, Clock10, Info, MapPin, ShieldCheck, User2 } from 'lucide-react';

import { usePopup } from '@/hooks/usePopup';

import { MotorType } from '@/types/motor';

import StatusBadge from '@/components/admin/helper/StatusBadge';

type RightSideProps = {
    motorbike: MotorType;
    setStep: Dispatch<SetStateAction<number>>;
    pickupDatetime: string;
    setPickupDatetime: React.Dispatch<React.SetStateAction<string>>;
    returnDatetime: string;
    setReturnDatetime: React.Dispatch<React.SetStateAction<string>>;
};

export default function RightSide({
    motorbike,
    setStep,
    pickupDatetime,
    setPickupDatetime,
    returnDatetime,
    setReturnDatetime,
}: RightSideProps) {
    const popup = usePopup();

    const [checkState, checkAction] = useActionState(checkReady, { success: false, error: false, message: '' });
    const [isPending, startTransition] = useTransition();

    const handleProceed = () => {
        if (!pickupDatetime || !returnDatetime) {
            popup.error('Vui lòng chọn ngày nhận và trả xe');
            return;
        }

        const formData = new FormData();
        formData.append('motorbikeId', motorbike.id);
        formData.append('pickupDate', pickupDatetime);
        formData.append('returnDate', returnDatetime);

        startTransition(() => {
            checkAction(formData);
        });
    };

    useEffect(() => {
        if (checkState.success && checkState.ready) {
            setStep(2);
            popup.success('Xe máy đã sẵn sàng!');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (checkState.error && checkState.message) {
            popup.error(checkState.message);
        }
    }, [checkState, popup, setStep]);

    // Calculate estimated days
    let estimatedDays = 0;
    if (pickupDatetime && returnDatetime) {
        const start = new Date(pickupDatetime);
        const end = new Date(returnDatetime);
        if (end > start) {
            estimatedDays = Math.ceil((end.getTime() - start.getTime()) / 86400000);
        }
    }

    return (
        <div className="sticky top-24 flex flex-col gap-4">
            <div className="flex flex-col bg-white dark:bg-slate-850 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Giá thuê ngày</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-primary">
                                    {thousandSeparator(motorbike.pricePerDay)}
                                    {currency}
                                </span>
                                <span className="text-sm text-slate-400 font-medium">/ngày</span>
                            </div>
                        </div>
                        <StatusBadge status={motorbike.status.name} />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-neutral-dark dark:text-slate-300 uppercase">
                                Nhận xe
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                                    <CalendarDays size={22} />
                                </span>
                                <input
                                    type="datetime-local"
                                    value={pickupDatetime}
                                    min={formatDateTimeLocal(new Date())}
                                    onChange={(e) => setPickupDatetime(e.target.value)}
                                    onClick={(e) => e.currentTarget.showPicker()}
                                    className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-neutral-light dark:bg-slate-800/50 text-neutral-dark dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium outline-none cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-neutral-dark dark:text-slate-300 uppercase">
                                Trả xe
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                                    <CalendarCheck size={22} />
                                </span>
                                <input
                                    type="datetime-local"
                                    value={returnDatetime}
                                    min={
                                        pickupDatetime
                                            ? new Date(new Date(pickupDatetime).getTime() + 86400000)
                                                  .toISOString()
                                                  .slice(0, 16)
                                            : ''
                                    }
                                    onChange={(e) => setReturnDatetime(e.target.value)}
                                    onClick={(e) => e.currentTarget.showPicker()}
                                    className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-neutral-light dark:bg-slate-800/50 text-neutral-dark dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 font-medium outline-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-600 rounded-lg p-3 mb-4">
                        <h4 className="text-xs font-bold text-primary uppercase mb-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">
                                <Info size={16} />
                            </span>
                            Lưu ý quan trọng
                        </h4>
                        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-sm mt-0.5 text-slate-400">
                                    <Clock10 size={14} />
                                </span>
                                <span>
                                    Giờ hoạt động:{' '}
                                    <span className="font-medium text-slate-800 dark:text-slate-200">
                                        07:00 - 22:00
                                    </span>
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-sm mt-0.5 text-slate-400">
                                    <MapPin size={14} />
                                </span>
                                <span>
                                    Phạm vi:{' '}
                                    <span className="font-medium text-slate-800 dark:text-slate-200">Tỉnh Phú Yên</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 font-medium">
                            <span>
                                {thousandSeparator(motorbike.pricePerDay)} x {estimatedDays || '?'} ngày
                            </span>
                            <span>
                                {thousandSeparator(motorbike.pricePerDay * (estimatedDays || 0))}
                                {currency}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 font-medium">
                            <span>Phí giao xe</span>
                            <span>
                                {thousandSeparator(deliveryFee)}
                                {currency}
                            </span>
                        </div>
                        <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                        <div className="flex justify-between text-base font-bold text-neutral-dark dark:text-white">
                            <span>Tổng cộng (ước tính)</span>
                            <span>
                                {thousandSeparator(motorbike.pricePerDay * (estimatedDays || 0) + deliveryFee)}
                                {currency}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleProceed}
                        disabled={isPending}
                        type="button"
                        className="w-full py-3 bg-primary hover:opacity-90 text-white rounded-lg font-bold text-base shadow-md shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70"
                    >
                        {isPending ? 'Đang kiểm tra...' : 'Đặt ngay'}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-3 font-medium">
                        Không tính phí cho đến khi chủ xe xác nhận
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 flex justify-around border-t border-slate-100 dark:border-slate-700">
                    <div className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-primary text-xl">
                            <ShieldCheck />
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Bảo hiểm</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-primary text-xl">
                            <CalendarCheck />
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                            Hủy miễn phí
                        </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="material-symbols-outlined text-primary text-xl">
                            <User2 />
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                            Hỗ trợ 24/7
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
