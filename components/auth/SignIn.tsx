'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '@/lib/validation/user.form';
import { handleExpiredSession, signInUser } from '@/lib/actions/user.action';

import { ArrowRight, LoaderCircle, Lock, Mail } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePopup } from '@/hooks/usePopup';
import { adminRole } from '@/constants/role';
import { adminPath } from '@/constants/path';
import { useAuth } from '@/context/AuthContext';

import Banner from './helper/Banner';
import InputField from './helper/InputField';

export default function SignIn() {
    const popup = usePopup();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema()),
        mode: 'onChange',
    });

    const [state] = useState({
        success: false,
        error: false,
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setIsLoggedIn } = useAuth();
    const searchParams = useSearchParams();

    useEffect(() => {
        const reason = searchParams.get('reason');
        if (reason === 'expired') {
            // Thực hiện hiển thị popup ngay lập tức để user thấy
            popup.error('Phiên đăng nhập hết hạn. Hệ thống đã tự động đăng xuất.', 'Thông báo');

            // Gọi action dọn dẹp DB
            handleExpiredSession().then(() => {
                setIsLoggedIn(false);
                // Xóa URL param
                window.history.replaceState({}, '', '/dang-nhap');
            });
        }
    }, [searchParams, popup, setIsLoggedIn]);

    const onSubmit = handleSubmit(async (data) => {
        setLoading(true);
        const response = await signInUser(state, data);

        if (response.success) {
            setIsLoggedIn(true);
            if (response.role === adminRole) {
                router.push(adminPath);
            } else {
                router.push('/');
            }
            setLoading(false);
            popup.success('Đăng nhập thành công !!', 'Tuyệt vời');
        } else {
            setLoading(false);
            popup.error(response.message || 'Đăng nhập thất bại', 'OOPS');
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
                                Chào mừng trở lại!
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Vui lòng đăng nhập để quản lý chuyến đi của bạn.
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
                                register={register}
                                error={errors.email}
                            />
                            {/* password */}
                            <InputField
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                icon={<Lock size={20} />}
                                placeholder="••••••••"
                                register={register}
                                error={errors.password}
                            />
                            {/* button */}
                            <button
                                className="mt-2 w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                                type="submit"
                                disabled={loading}
                            >
                                <span>Đăng nhập</span>
                                {loading ? (
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
                                    Hoặc đăng nhập bằng
                                </span>
                            </div>
                        </div>
                        <SocialLogin /> */}
                        <div className="mt-8 text-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Chưa có tài khoản?</span>
                            <Link
                                className="font-bold text-primary hover:text-primary-dark ml-1 transition-colors"
                                href="/dang-ky"
                            >
                                Đăng ký ngay
                            </Link>
                        </div>
                        <div className="my-4 w-full border-t border-slate-200 dark:border-slate-700"></div>
                        <div className="text-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Quên mật khẩu?</span>
                            <Link
                                className="font-bold text-primary hover:text-primary-dark ml-1 transition-colors"
                                href="/khoi-phuc"
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
