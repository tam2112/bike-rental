'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { contactSchema, ContactSchema } from '@/lib/validation/contact.form';
import { sendContact } from '@/lib/actions/contact.action';
import { formatPhoneNumberRegex, myPhoneNumber } from '@/lib/utils';

import { CalendarDays, Loader2, Mail, MapPin, MapPinCheck, PhoneCall, Send, Smartphone, User } from 'lucide-react';

import { usePopup } from '@/hooks/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Contact() {
    const popup = usePopup();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema()),
    });

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const isProcessed = useRef(false);

    const [state, formAction] = useActionState(sendContact, {
        success: false,
        error: false,
        message: '',
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
            popup.success(state.message || 'Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công');
            router.refresh();

            reset();
            setHasSubmitted(false);
        } else if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Đã xảy ra lỗi khi gửi mail. Vui lòng thử lại sau.');
        }
    }, [state, router, hasSubmitted, reset, popup]);

    return (
        <div className="pb-10">
            <div className="flex h-full grow flex-col">
                <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
                    <div className="layout-content-container flex flex-col max-w-300 flex-1">
                        <div className="flex flex-wrap justify-between gap-3 p-4 pb-8">
                            <div className="flex min-w-72 flex-col gap-3">
                                <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white">
                                    Liên hệ thuê xe máy tại Phú Yên
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal max-w-2xl">
                                    Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7 cho chuyến đi tuyệt vời tại Phú Yên. Hãy để
                                    lại tin nhắn hoặc gọi ngay cho chúng tôi.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
                            <div className="lg:col-span-5 flex flex-col gap-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 p-5 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined text-[24px]">
                                                <PhoneCall size={24} />
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h2 className="text-base font-bold leading-tight">Hotline / Zalo</h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal mt-1">
                                                {formatPhoneNumberRegex(myPhoneNumber)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 p-5 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined text-[24px]">
                                                <MapPin size={24} />
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h2 className="text-base font-bold leading-tight">Địa chỉ văn phòng</h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal mt-1">
                                                123 Đường Hùng Vương, Tuy Hòa, Phú Yên
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 p-5 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <span className="material-symbols-outlined text-[24px]">
                                                <CalendarDays size={24} />
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h2 className="text-base font-bold leading-tight">Giờ hoạt động</h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal mt-1">
                                                7:00 Sáng - 22:00 Tối (Hàng ngày)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm h-64 lg:h-auto lg:flex-1 relative">
                                    <div className="w-full h-full bg-center bg-no-repeat bg-cover object-cover absolute inset-0">
                                        <iframe
                                            allowFullScreen
                                            height="100%"
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124896.97426171853!2d109.28485295!3d13.09066695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316fec178225017d%3A0x676449102657e2f1!2zVHAuIFR1eSBIw7JhLCBQaMO6IFnDqsyAbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1715420000000!5m2!1svi!2s"
                                            style={{ border: 0 }}
                                            width="100%"
                                        ></iframe>
                                        <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center group cursor-pointer hover:bg-slate-900/20 transition-all">
                                            <div className="bg-white dark:bg-slate-850 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                                                <span className="material-symbols-outlined text-red-500">
                                                    <MapPinCheck size={22} />
                                                </span>
                                                <span className="text-sm font-bold">Xem bản đồ</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-7">
                                <div className="bg-white dark:bg-slate-850 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 lg:p-8 h-full flex flex-col">
                                    <h2 className="text-2xl font-bold leading-tight tracking-tight mb-2">
                                        Gửi tin nhắn cho chúng tôi
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                                        Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong vòng 30 phút.
                                    </p>
                                    <form onSubmit={onSubmit} className="flex flex-col gap-5 grow">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    Họ và tên <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            <User size={20} />
                                                        </span>
                                                    </div>
                                                    <input
                                                        className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-4 py-3 text-sm focus:border-primary focus:ring-primary dark:text-white dark:placeholder-slate-500"
                                                        placeholder="Nguyễn Văn A"
                                                        type="text"
                                                        {...register('fullName')}
                                                    />
                                                    {errors.fullName?.message && (
                                                        <p className="text-xs text-red-400 max-w-75">
                                                            {errors.fullName?.message.toString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    Số điện thoại <span className="text-red-500">*</span>
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            <Smartphone size={20} />
                                                        </span>
                                                    </div>
                                                    <input
                                                        className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-4 py-3 text-sm focus:border-primary focus:ring-primary dark:text-white dark:placeholder-slate-500"
                                                        placeholder="0912 xxx xxx"
                                                        type="tel"
                                                        {...register('phone', {
                                                            onChange: (e) => {
                                                                // Tự động format khi người dùng gõ
                                                                e.target.value = formatPhoneNumberRegex(e.target.value);
                                                            },
                                                        })}
                                                    />
                                                    {errors.phone?.message && (
                                                        <p className="text-xs text-red-400 max-w-75">
                                                            {errors.phone?.message.toString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                Email (Tùy chọn)
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        <Mail size={20} />
                                                    </span>
                                                </div>
                                                <input
                                                    className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 pl-10 pr-4 py-3 text-sm focus:border-primary focus:ring-primary dark:text-white dark:placeholder-slate-500"
                                                    placeholder="email@example.com"
                                                    type="email"
                                                    {...register('email')}
                                                />
                                                {errors.email?.message && (
                                                    <p className="text-xs text-red-400 max-w-75">
                                                        {errors.email?.message.toString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 grow">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                Nội dung cần hỗ trợ <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-4 text-sm focus:border-primary focus:ring-primary dark:text-white dark:placeholder-slate-500 resize-none grow"
                                                placeholder="Tôi muốn thuê xe máy vào ngày..."
                                                rows={4}
                                                {...register('content')}
                                            ></textarea>
                                            {errors.content?.message && (
                                                <p className="text-xs text-red-400 max-w-75">
                                                    {errors.content?.message.toString()}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            className="mt-2 w-full rounded-lg bg-primary py-3 px-4 text-white font-bold text-sm shadow-md hover:bg-blue-600 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
                                            type="submit"
                                            disabled={isPending}
                                        >
                                            {isPending ? (
                                                <Loader2 size={20} className="animate-spin" />
                                            ) : (
                                                <span className="material-symbols-outlined text-[20px]">
                                                    <Send size={20} />
                                                </span>
                                            )}
                                            Gửi tin nhắn
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
                <button
                    aria-label="Chat Zalo"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all hover:scale-110"
                >
                    <span className="material-symbols-outlined">
                        <MessageCircleMore />
                    </span>
                </button>
                <button
                    aria-label="Call Now"
                    className="bg-primary hover:bg-blue-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all hover:scale-110"
                >
                    <span className="material-symbols-outlined">
                        <PhoneCall />
                    </span>
                </button>
            </div> */}
        </div>
    );
}
