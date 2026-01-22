'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BookingSchema } from '@/lib/validation/booking.form';
import { currency, raincoatFee, scratchInsurance, thousandSeparator } from '@/lib/utils';

import { PlusCircle } from 'lucide-react';

interface AdditionalProps {
    register: UseFormRegister<BookingSchema>;
    errors: FieldErrors<BookingSchema>;
}

export default function Additional({ register }: AdditionalProps) {
    return (
        <section className="bg-white dark:bg-slate-850 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-neutral-light dark:bg-slate-800/50">
                <h2 className="text-neutral-dark dark:text-white text-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <PlusCircle />
                    </span>
                    3. Dịch vụ cộng thêm
                </h2>
            </div>
            <div className="p-6 flex flex-col gap-4">
                <label className="flex items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-neutral-light dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex items-center h-6">
                        <input
                            className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                            type="checkbox"
                            defaultChecked={true}
                            {...register('isHelmet')}
                        />
                    </div>
                    <div className="flex flex-1 justify-between">
                        <div>
                            <p className="text-neutral-dark dark:text-white font-medium">
                                Mũ bảo hiểm chất lượng cao (x2)
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Đã bao gồm trong giá thuê</p>
                        </div>
                        <span className="font-bold text-accent dark:text-green-500 text-sm">Miễn phí</span>
                    </div>
                </label>
                <label className="flex items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-neutral-light dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex items-center h-6">
                        <input
                            className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                            type="checkbox"
                            {...register('isScratch')}
                        />
                    </div>
                    <div className="flex flex-1 justify-between">
                        <div>
                            <p className="text-neutral-dark dark:text-white font-medium">Bảo hiểm trầy xước</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Không lo chi phí sửa chữa nhỏ</p>
                        </div>
                        <span className="font-bold text-neutral-dark dark:text-white text-sm">
                            {thousandSeparator(scratchInsurance)}
                            {currency}/ngày
                        </span>
                    </div>
                </label>
                <label className="flex items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-neutral-light dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex items-center h-6">
                        <input
                            className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                            type="checkbox"
                            {...register('isRaincoat')}
                        />
                    </div>
                    <div className="flex flex-1 justify-between">
                        <div>
                            <p className="text-neutral-dark dark:text-white font-medium">Áo mưa tiện lợi (x2)</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Đề phòng những cơn mưa bất chợt
                            </p>
                        </div>
                        <span className="font-bold text-neutral-dark dark:text-white text-sm">
                            {thousandSeparator(raincoatFee)}
                            {currency}
                        </span>
                    </div>
                </label>
            </div>
        </section>
    );
}
