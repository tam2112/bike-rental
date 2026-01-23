'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ArrowRight, CalendarDays, ChevronRight, LogIn, LogOut, Menu, Motorbike, User, X } from 'lucide-react';

import { useUserStore } from '@/store/user';
import { useAuth } from '@/context/AuthContext';
import { assets } from '@/public/assets';

import ThemeToggler from '../helper/ThemeToggler';
import { DesktopUserSkeleton, MobileUserSkeleton } from '../helper/skeleton';
import ThemeTogglerMobile from '../helper/ThemeTogglerMobile';

export default function Navbar() {
    const { currentUser, fetchCurrentUser, isLoading } = useUserStore();

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { isLoggedIn, logout } = useAuth();

    const navLinks = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Chọn xe', href: '/xe-may' },
        { name: 'Về chúng tôi', href: '/ve-chung-toi' },
        { name: 'Liên hệ', href: '/lien-he' },
    ];

    return (
        <>
            <div className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] dark:border-slate-700 bg-white dark:bg-background-dark backdrop-blur-md lg:px-10 px-4 py-3 shadow-sm">
                <div className="flex items-center gap-4">
                    <div onClick={() => router.push('/')} className="size-8 text-primary cursor-pointer">
                        <span className="material-symbols-outlined text-3xl">
                            <Motorbike size={30} />
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-neutral-dark dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
                            Aitho
                        </h2>
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Phú Yên</span>
                    </div>
                </div>
                <div className="flex-1 justify-end gap-8 hidden lg:flex">
                    <div className="flex items-center gap-9">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                className="text-neutral-dark dark:text-slate-200 text-sm font-medium hover:text-primary transition-colors"
                                href={link.href}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="text-xs text-right mr-2 hidden xl:block">
                            <p className="text-slate-500 font-medium">Giờ hoạt động</p>
                            <p className="font-bold text-neutral-dark dark:text-white">07:00 - 22:00</p>
                        </div>
                        <ThemeToggler />
                        {isLoading ? (
                            <DesktopUserSkeleton />
                        ) : isLoggedIn && currentUser ? (
                            <Link
                                href={'/tai-khoan/thong-tin'}
                                className="flex min-w-21 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-neutral-dark dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <Image
                                    src={currentUser.avatar[0]?.url || assets.sample_profile}
                                    alt="profile"
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover h-8"
                                />
                                <ArrowRight size={16} className="text-neutral-dark dark:text-white ml-2" />
                            </Link>
                        ) : (
                            <>
                                <button
                                    onClick={() => router.push('/dang-nhap')}
                                    className="flex min-w-21 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-neutral-dark dark:text-white text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <span className="truncate">Đăng nhập</span>
                                </button>
                                <button
                                    onClick={() => router.push('/xe-may')}
                                    className="flex min-w-21 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:brightness-110 transition-all shadow-md shadow-blue-200 dark:shadow-none"
                                >
                                    <span className="truncate">Đặt xe</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <button
                    className="lg:hidden text-neutral-dark dark:text-white cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    <span className="material-symbols-outlined">
                        <Menu size={22} />
                    </span>
                </button>
            </div>
            {/* --- MOBILE MENU --- */}
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 lg:hidden ${
                    open ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setOpen(false)}
            />
            {/* sidebar */}
            <div
                className={`fixed top-0 left-0 bottom-0 w-70 bg-white dark:bg-slate-900 z-70 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-5 border-b border-neutral-200 dark:border-slate-800 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Motorbike className="text-primary" size={24} />
                            <span className="font-bold text-lg dark:text-white">Aitho</span>
                        </div>
                        <button
                            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            <X size={24} className="dark:text-white" />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between px-6 py-4 text-neutral-dark dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                {link.name}
                                <ChevronRight size={16} className="text-slate-400" />
                            </Link>
                        ))}
                        <ThemeTogglerMobile isOpen={open} setIsOpen={setOpen} />
                    </nav>

                    <div className="p-6 border-t border-neutral-200 dark:border-slate-800 space-y-3">
                        <div className="mb-4">
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
                                Giờ làm việc
                            </p>
                            <div className="flex items-center gap-2 text-sm font-semibold dark:text-white">
                                <CalendarDays size={16} className="text-primary" />
                                07:00 - 22:00 (Hàng ngày)
                            </div>
                        </div>

                        {isLoading ? (
                            <MobileUserSkeleton />
                        ) : isLoggedIn && currentUser ? (
                            <div className="flex flex-col gap-3 pt-2">
                                {/* Profile Summary */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-1">
                                    <Image
                                        src={currentUser.avatar[0]?.url || assets.sample_profile}
                                        alt="profile"
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover size-10"
                                    />
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-sm text-neutral-dark dark:text-white truncate">
                                            {currentUser.fullName}
                                        </p>
                                        <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                                    </div>
                                </div>

                                <Link
                                    href="/tai-khoan/thong-tin"
                                    onClick={() => setOpen(false)}
                                    className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-white font-bold text-sm shadow-md shadow-blue-200 dark:shadow-none hover:brightness-110 transition-all"
                                >
                                    <User size={18} />
                                    Quản lý tài khoản
                                </Link>

                                <button
                                    onClick={logout}
                                    className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-red-200 text-red-600 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <LogOut size={18} />
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        router.push('/dang-nhap');
                                        setOpen(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <LogIn size={18} />
                                    Đăng nhập
                                </button>
                                <button
                                    onClick={() => {
                                        router.push('/xe-may');
                                        setOpen(false);
                                    }}
                                    className="w-full h-12 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-none hover:brightness-110 transition-all"
                                >
                                    Đặt xe ngay
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
