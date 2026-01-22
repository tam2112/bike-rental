'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { BrickWallShield, LogOut, Motorbike, User } from 'lucide-react';

import { useUserStore } from '@/store/user';
import { useAuth } from '@/context/AuthContext';
import { adminPath } from '@/constants/path';
import { adminRole } from '@/constants/role';
import { assets } from '@/public/assets';

import { SidebarHeaderSkeleton } from '../skeleton';

export default function Sidebar() {
    const sidebarLinks = [
        { id: 1, href: '/tai-khoan/thong-tin', label: 'Thông tin cá nhân', icon: User },
        { id: 2, href: '/tai-khoan/dat-xe', label: 'Quản lý đặt xe', icon: Motorbike },
    ];

    const { logout } = useAuth();
    const pathname = usePathname();
    const { currentUser, fetchCurrentUser, isLoading } = useUserStore();

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    const handleLogout = () => {
        logout();
    };

    return (
        <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-neutral-light dark:border-slate-700 p-6 sticky top-24">
                {isLoading ? (
                    <SidebarHeaderSkeleton />
                ) : (
                    <div className="flex items-center gap-4 mb-8">
                        <div className="rounded-full size-12">
                            <Image
                                src={currentUser?.avatar[0]?.url || assets.sample_profile}
                                alt="profile"
                                width={48}
                                height={48}
                                className="rounded-full object-cover h-12"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-neutral-dark dark:text-white text-base font-bold">
                                {currentUser?.fullName}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm sm:max-w-40 max-w-82 truncate">
                                {currentUser?.email}
                            </p>
                        </div>
                    </div>
                )}
                <nav className="flex flex-col gap-1">
                    {sidebarLinks.map(({ id, href, label, icon: Icon }) => (
                        <Link
                            key={id}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                                pathname === href
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-neutral-dark/80 dark:text-slate-300 hover:bg-neutral-light dark:hover:bg-slate-700/50 transition-colors group'
                            }`}
                            href={href}
                        >
                            <span
                                className={`material-symbols-outlined text-[20px] ${
                                    pathname === href ? '' : 'text-slate-400 group-hover:text-primary transition-colors'
                                }`}
                            >
                                <Icon size={22} />
                            </span>
                            <span className="text-sm font-medium">{label}</span>
                        </Link>
                    ))}
                    {currentUser && currentUser.role.name === adminRole && (
                        <Link
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-dark/80 dark:text-slate-300 hover:bg-neutral-light dark:hover:bg-slate-700/50 transition-colors group'
                            `}
                            href={adminPath}
                        >
                            <span
                                className={`material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary transition-colors`}
                            >
                                <BrickWallShield size={22} />
                            </span>
                            <span className="text-sm font-medium">Vào trang quản trị</span>
                        </Link>
                    )}
                    <div className="h-px bg-neutral-light dark:bg-slate-700 my-2"></div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            <LogOut size={22} />
                        </span>
                        <span className="text-sm font-medium">Đăng xuất</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
}
