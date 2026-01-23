'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { recoverSchema, RecoverSchema } from '@/lib/validation/user.form';
import { completePasswordRecovery, initiatePasswordRecovery, verifyRecoveryCode } from '@/lib/actions/user.action';

import { ArrowRight, LoaderCircle, Lock, LockKeyholeIcon, LockKeyholeOpenIcon, Mail } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePopup } from '@/hooks/usePopup';

import InputField from './helper/InputField';
import Banner from './helper/Banner';

export default function Recover() {
    const popup = usePopup();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<RecoverSchema>({
        resolver: zodResolver(recoverSchema()),
        defaultValues: {
            email: '',
            verificationCode: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        mode: 'onChange',
    });

    const router = useRouter();
    const [step, setStep] = useState<'email' | 'code' | 'password'>('email');
    const [userId, setUserId] = useState<string | null>(null);

    const [state] = useState({
        success: false,
        error: false,
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [showOtp, setShowOtp] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        if (step === 'email') {
            setLoading(true);
            const response = await initiatePasswordRecovery(state, { email: data.email });
            console.log('initiatePasswordRecovery response:', response);
            if (response.success && response.userId) {
                setLoading(false);
                setUserId(response.userId);
                setStep('code');
                setValue('email', data.email);
                popup.success(response.message || 'Mã OTP đã được gửi tới email của bạn');
            } else {
                setLoading(false);
                popup.error(response.message || 'Khôi phục thất bại');
            }
        } else if (step === 'code' && userId) {
            setLoading(true);
            const response = await verifyRecoveryCode(state, {
                userId,
                verificationCode: data.verificationCode!,
            });
            if (response.success) {
                setLoading(false);
                setStep('password');
                popup.success(response.message || 'Mã OTP đã được xác minh thành công');
            } else {
                setLoading(false);
                popup.error(response.message || 'Invalid OTP');
            }
        } else if (step === 'password' && userId) {
            setLoading(true);
            const response = await completePasswordRecovery(state, { ...data, userId });
            if (response.success) {
                setLoading(false);
                popup.success(response.message || 'Khôi phục mật khẩu thành công');
                await router.push('/dang-nhap');
            } else {
                setLoading(false);
                popup.error(response.message || 'Khôi phục thất bại');
            }
        }
    });

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 lg:p-10">
            <div className="w-full max-w-275 bg-background-light dark:bg-background-dark rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-170 max-sm:min-h-0 border border-slate-100 dark:border-slate-800">
                <Banner
                    backgroundImage="url(/images/auth/sign-in.jpg)"
                    text1="Vẻ đẹp hoang sơ của xứ"
                    text2="Hoa Vàng Cỏ Xanh"
                    description="Trải nghiệm tự do trên những cung đường ven biển tuyệt đẹp với dịch vụ thuê xe uy tín."
                />
                <div className="w-full md:w-7/12 lg:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center bg-white dark:bg-slate-850">
                    <div className="max-w-md mx-auto w-full flex flex-col h-full justify-center">
                        <div className="mb-8 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                Khôi phục mật khẩu!
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Vui lòng điền đầy đủ thông tin để khôi phục mật khẩu của bạn.
                            </p>
                        </div>
                        <form onSubmit={onSubmit} className="flex flex-col gap-5">
                            {/* email */}
                            <InputField
                                name="email"
                                label="Địa chỉ Email"
                                type="email"
                                icon={<Mail size={20} />}
                                placeholder="vidu@email.com"
                                className="disabled:cursor-not-allowed"
                                disabled={step !== 'email'}
                                register={register}
                                error={errors.email}
                            />
                            {/* code */}
                            {step === 'code' && (
                                <InputField
                                    name="verificationCode"
                                    label="Địa chỉ Email"
                                    type={showOtp ? 'number' : 'password'}
                                    icon={
                                        showOtp ? (
                                            <LockKeyholeOpenIcon
                                                size={14}
                                                className="cursor-pointer"
                                                id="hide-password"
                                                onClick={() => setShowOtp(false)}
                                            />
                                        ) : (
                                            <LockKeyholeIcon
                                                size={14}
                                                className="cursor-pointer"
                                                id="show-password"
                                                onClick={() => setShowOtp(true)}
                                            />
                                        )
                                    }
                                    placeholder="Nhập mã OTP (hết hạn trong 10 phút)"
                                    register={register}
                                    error={errors.verificationCode}
                                />
                            )}
                            {/* password */}
                            {step === 'password' && (
                                <>
                                    {/* new password */}
                                    <InputField
                                        name="newPassword"
                                        label="Mật khẩu mới"
                                        type="password"
                                        icon={<Lock size={20} />}
                                        placeholder="Nhập mật khẩu mới"
                                        register={register}
                                        error={errors.newPassword}
                                    />
                                    {/* confirm password */}
                                    <InputField
                                        name="confirmNewPassword"
                                        label="Mật khẩu mới"
                                        type="password"
                                        icon={<Lock size={20} />}
                                        placeholder="Nhập xác nhận mật khẩu mới"
                                        register={register}
                                        error={errors.confirmNewPassword}
                                    />
                                </>
                            )}
                            {/* button */}
                            <button
                                className="mt-2 w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                                type="submit"
                                disabled={loading}
                            >
                                <span>
                                    {step === 'password'
                                        ? 'Khôi phục'
                                        : step === 'email'
                                          ? 'Gửi mã OTP'
                                          : 'Xác nhận mã OTP'}
                                </span>
                                {loading ? (
                                    <LoaderCircle className="animate-spin" size={20} />
                                ) : (
                                    <span className="material-symbols-outlined text-[20px]">
                                        <ArrowRight size={20} />
                                    </span>
                                )}
                            </button>
                        </form>
                        <div className="mt-8 text-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Trở lại đăng nhập?</span>
                            <Link
                                className="font-bold text-primary hover:text-primary-dark ml-1 transition-colors"
                                href="/dang-nhap"
                            >
                                Nhấn vào đây
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
