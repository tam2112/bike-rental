'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { signUpSchema, SignUpSchema } from '@/lib/validation/user.form';
import { initiateSignupOTP, signUpUser, verifySignupOTP } from '@/lib/actions/user.action';

import {
    ArrowRight,
    LoaderCircle,
    Lock,
    LockKeyholeIcon,
    LockKeyholeOpenIcon,
    Mail,
    RefreshCw,
    User,
} from 'lucide-react';

import { usePopup } from '@/hooks/usePopup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';
import { adminRole } from '@/constants/role';
import { adminPath } from '@/constants/path';
import { assets } from '@/public/assets';

import Banner from './helper/Banner';
import InputField from './helper/InputField';

export default function SignUp() {
    const popup = usePopup();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema()),
        mode: 'onChange',
    });

    const router = useRouter();
    const { setIsLoggedIn } = useAuth();
    // eslint-disable-next-line react-hooks/incompatible-library
    const watchedEmail = watch('email');

    const [state, formAction] = useActionState(signUpUser, {
        success: false,
        error: false,
    });
    const [isPending, startTransition] = useTransition();
    const isProcessed = useRef(false);
    const [showOtp, setShowOtp] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
    const [isCountdownActive, setIsCountdownActive] = useState(false);
    const countdownInterval = useRef<NodeJS.Timeout | null>(null);
    const emailRef = useRef<string>('');

    // Send OTP on button click
    const handleSendOTP = async () => {
        if (!watchedEmail) {
            popup.error('Vui lòng nhập email trước', 'OOPS');
            return;
        }

        const res = await initiateSignupOTP(watchedEmail);
        if (res.success) {
            popup.success('OTP đã được gửi tới email của bạn', 'Tuyệt vời');
            emailRef.current = watchedEmail;
            setOtpSent(true);
            setOtpVerified(false);
            setIsCountdownActive(true);
            startCountdown();
        } else {
            popup.error(res.message || 'Gửi mã OTP thất bại', 'OOPS');
        }
    };

    const handleVerifyOTP = async (otp: string) => {
        if (!otp || !emailRef.current) {
            popup.error('Vui lòng nhập mã OTP', 'Thông báo');
            return false;
        }

        const verifyRes = await verifySignupOTP(emailRef.current, otp);
        if (verifyRes.success) {
            popup.success('OTP đã được xác minh thành công', 'Tuyệt vời');
            setOtpVerified(true);
            return true;
        } else {
            popup.error(verifyRes.message || 'Mã OTP không hợp lệ', 'OOPS');
            setOtpVerified(false);
            return false;
        }
    };

    // Countdown logic
    const startCountdown = () => {
        if (countdownInterval.current) clearInterval(countdownInterval.current);
        setCountdown(600);
        countdownInterval.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(countdownInterval.current!);
                    setIsCountdownActive(false);
                    setOtpSent(false);
                    setOtpVerified(false);
                    popup.error('Mã OTP đã hết hạn. Vui lòng gửi lại.');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (countdownInterval.current) clearInterval(countdownInterval.current);
        };
    }, []);

    // Update email ref when email changes (before OTP sent)
    useEffect(() => {
        if (!otpSent) {
            emailRef.current = watchedEmail || '';
        }
    }, [watchedEmail, otpSent]);

    const onSubmit = handleSubmit(async (data) => {
        if (!otpSent || !data.otp) {
            popup.error('Vui lòng gửi và nhập mã OTP');
            return;
        }
        if (!otpVerified) {
            const isValid = await handleVerifyOTP(data.otp);
            if (!isValid) {
                return; // Dừng submit nếu OTP sai
            }
        }
        // Ensure email is set for OTP verification
        data.email = emailRef.current;
        startTransition(() => {
            formAction({ ...data });
        });
    });

    useEffect(() => {
        if (state.success && !isProcessed.current) {
            isProcessed.current = true;
            setIsLoggedIn(true);

            // Clear OTP state
            setOtpSent(false);
            setIsCountdownActive(false);
            if (countdownInterval.current) clearInterval(countdownInterval.current);

            // Redirect based on role
            if (state.role === adminRole) {
                router.push(adminPath);
            } else {
                router.push('/');
            }
            popup.success('Đăng ký thành công! Đã đăng nhập.', 'Tuyệt vời');
        }
        if (state.error) {
            isProcessed.current = false;
            popup.error(state.message || 'Đăng ký thất bại', 'OOPS');
            setOtpVerified(false);
        }
    }, [state, router, setIsLoggedIn, popup]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 lg:p-10">
            <div className="w-full max-w-275 bg-white dark:bg-background-dark rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-170 border border-slate-100 dark:border-slate-800">
                <Banner
                    backgroundImage="url(/images/auth/sign-up.jpg)"
                    text1="Khám phá vẻ đẹp"
                    text2="xứ hoa vàng"
                    description="Đồng hành cùng bạn trên mọi cung đường Phú Yên. Dịch vụ cho thuê xe máy uy tín, hỗ trợ tận tình."
                />
                <div className="w-full md:w-7/12 lg:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center bg-white dark:bg-slate-850">
                    <div className="max-w-md mx-auto w-full flex flex-col h-full justify-center">
                        <div className="mb-8 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                Đăng ký tài khoản
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Nhập thông tin cá nhân của bạn để bắt đầu.
                            </p>
                        </div>
                        <form onSubmit={onSubmit} className="flex flex-col gap-5">
                            {/* full name */}
                            <InputField
                                name="fullName"
                                label="Họ và tên"
                                icon={<User size={20} />}
                                type="text"
                                placeholder="Nguyễn Văn A"
                                register={register}
                                error={errors.fullName}
                            />
                            {/* email */}
                            <InputField
                                name="email"
                                label="Địa chỉ Email"
                                icon={<Mail size={20} />}
                                type="email"
                                placeholder="vidu@email.com"
                                register={register}
                                error={errors.email}
                            />
                            {/* password */}
                            <InputField
                                name="password"
                                label="Mật khẩu"
                                icon={<Lock size={20} />}
                                type="password"
                                placeholder="••••••••"
                                register={register}
                                error={errors.password}
                            />
                            {/* confirm password */}
                            <InputField
                                name="confirmPassword"
                                label="Xác nhận mật khẩu"
                                icon={<Image src={assets.shieldLockIcon} alt="shield lock" width={20} height={20} />}
                                type="password"
                                placeholder="••••••••"
                                register={register}
                                error={errors.confirmPassword}
                            />
                            {/* Send OTP Button */}
                            <button
                                type="button"
                                onClick={handleSendOTP}
                                disabled={!watchedEmail || isCountdownActive}
                                className="mt-4 w-fit px-4 h-9 rounded-full text-sm font-medium transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-500 border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:bg-slate-850 dark:text-white disabled:dark:bg-slate-800/50 disabled:dark:text-white/90"
                            >
                                <RefreshCw size={14} className={isCountdownActive ? 'animate-spin' : ''} />
                                {isCountdownActive ? `Gửi lại trong ${formatTime(countdown)}` : 'Gửi mã OTP'}
                            </button>
                            {/* OTP Input */}
                            {otpSent && (
                                <>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-slate-400 text-[20px]">
                                                {showOtp ? (
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
                                                )}
                                            </span>
                                        </div>
                                        <input
                                            type={showOtp ? 'number' : 'password'}
                                            {...register('otp')}
                                            placeholder="Nhập OTP (Hết hạn sau 10 phút)"
                                            className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    onSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                    {errors.otp?.message && (
                                        <p className="text-red-500 text-sm text-left" style={{ maxWidth: '320px' }}>
                                            {errors.otp.message}
                                        </p>
                                    )}
                                </>
                            )}
                            {/* privacy */}
                            {/* <div className="flex items-start gap-3 mt-2">
                                <div className="flex h-5 items-center">
                                    <input
                                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                                        id="terms"
                                        type="checkbox"
                                    />
                                </div>
                                <label
                                    className="text-sm text-slate-500 dark:text-slate-400 leading-tight"
                                    htmlFor="terms"
                                >
                                    Tôi đồng ý với{' '}
                                    <Link
                                        className="font-medium text-primary hover:text-primary-hover underline"
                                        href="#"
                                    >
                                        Điều khoản dịch vụ{' '}
                                    </Link>
                                    và{' '}
                                    <Link
                                        className="font-medium text-primary hover:text-primary-hover underline"
                                        href="#"
                                    >
                                        Chính sách bảo mật
                                    </Link>
                                    .
                                </label>
                            </div> */}
                            {/* submit button */}
                            <button
                                className="mt-2 w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                                type="submit"
                                disabled={isPending}
                            >
                                <span>Đăng ký ngay</span>
                                {isPending ? (
                                    <LoaderCircle className="animate-spin" size={20} />
                                ) : (
                                    <span className="material-symbols-outlined text-[20px]">
                                        <ArrowRight size={20} />
                                    </span>
                                )}
                            </button>
                        </form>
                        {/* <div className="relative my-8">
                            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-surface-light dark:bg-surface-dark px-2 text-slate-500 dark:text-slate-400">
                                    Hoặc tiếp tục với
                                </span>
                            </div>
                        </div>
                        <SocialLogin /> */}
                        <div className="mt-8 text-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Bạn đã có tài khoản?</span>
                            <Link
                                className="font-bold text-primary hover:text-primary-hover ml-1 transition-colors"
                                href="/dang-nhap"
                            >
                                Đăng nhập ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
