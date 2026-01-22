'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useNotificationStore } from '@/store/notification';
import { useUserStore } from '@/store/user';

import { Bell, Menu, Plus } from 'lucide-react';

import NotificationModal from '../helper/notification/NotificationModal';
import { motorPath } from '@/constants/path';
import { assets } from '@/public/assets';

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
    const { currentUser, fetchCurrentUser } = useUserStore();
    const { notifyNewCount, fetchNotifyNewCount } = useNotificationStore();

    useEffect(() => {
        fetchNotifyNewCount();
    }, [fetchNotifyNewCount]);

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false);

    return (
        <>
            <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 z-10">
                <div className="flex items-center gap-4 lg:hidden">
                    <button onClick={toggleSidebar} className="text-neutral-dark dark:text-slate-300">
                        <span className="material-symbols-outlined">
                            <Menu size={20} />
                        </span>
                    </button>
                    <span className="font-bold text-lg text-neutral-dark dark:text-white">Aitho</span>
                </div>
                <div className="hidden lg:flex items-center gap-4">
                    <h2 className="text-xl font-bold text-neutral-dark dark:text-white">Tổng quan</h2>
                </div>
                <div className="flex items-center gap-4 flex-1 justify-end">
                    {/* <div className="hidden sm:flex relative max-w-xs w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 text-xl">
                                <Search size={20} />
                            </span>
                        </div>
                        <input
                            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-neutral-light dark:bg-slate-800/50 text-neutral-dark dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
                            placeholder="Tìm xe tại Tuy Hòa..."
                            type="text"
                        />
                    </div> */}
                    <button
                        onClick={() => setShowNotification(true)}
                        className="flex items-center justify-center size-10 rounded-full text-neutral-dark dark:text-slate-300 hover:bg-neutral-light dark:hover:bg-slate-700 relative"
                    >
                        <span className="material-symbols-outlined">
                            <Bell size={20} />
                        </span>
                        {notifyNewCount > 0 && (
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-850 text-white flex items-center justify-center"></span>
                        )}
                    </button>
                    <button
                        onClick={() => router.push(`${motorPath}/them-moi`)}
                        className="hidden sm:flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-lg">
                            <Plus size={18} />
                        </span>
                        Thêm xe mới
                    </button>
                    <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700">
                        <div className="flex-col items-end hidden md:flex">
                            <span className="text-sm font-semibold text-neutral-dark dark:text-white">
                                Quản trị viên
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Quản lý</span>
                        </div>
                        <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border border-slate-200 dark:border-slate-600">
                            <Image
                                src={currentUser?.avatar[0]?.url || assets.sample_profile}
                                alt="profile"
                                width={36}
                                height={36}
                                className="rounded-full object-cover h-9"
                            />
                        </div>
                    </div>
                </div>
            </header>
            {showNotification && <NotificationModal setShowNotification={setShowNotification} />}
        </>
    );
}
